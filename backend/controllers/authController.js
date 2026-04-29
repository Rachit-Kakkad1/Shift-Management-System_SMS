"use strict";

const User = require("../models/User.Model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { logAction } = require("../utils/auditLogger");
const { sendWelcomeEmail } = require("../utils/emailService");

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, team, workType, role, passcode } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    let hashedPasscode = null;
    if (passcode) {
      hashedPasscode = await bcrypt.hash(passcode, salt);
    } else if (role === "admin" || role === "hr") {
      // Default passcode for admin/hr if none provided
      hashedPasscode = await bcrypt.hash("1234", salt);
    }

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      passcodeHash: hashedPasscode,
      team,
      workType,
      role: role || "employee",
    });

    // Send Welcome Email (async, don't wait for it to respond to client)
    sendWelcomeEmail(email, name, password, role || "employee", passcode || "1234");

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      team: user.team,
      workType: user.workType,
      role: user.role,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    if (user.role === "admin" || user.role === "hr") {
      const sessionId = crypto.randomUUID();
      user.twoFactorSessionId = sessionId;
      user.twoFactorSessionExpires = new Date(Date.now() + 10 * 60 * 1000);
      await user.save();

      return res.json({
        _id: user._id,
        role: user.role,
        twoFactorSessionId: sessionId,
        message: "2FA required",
      });
    }

    await logAction(user._id, "login", "User logged in successfully");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      team: user.team,
      workType: user.workType,
      role: user.role,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const verifyPasscode = async (req, res) => {
  try {
    const { email, twoFactorSessionId, passcode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.passcodeLockUntil && user.passcodeLockUntil > Date.now()) {
      return res.status(429).json({ message: "Too many attempts, account locked temporarily" });
    }

    if (
      !user.twoFactorSessionId ||
      user.twoFactorSessionId !== twoFactorSessionId ||
      !user.twoFactorSessionExpires ||
      user.twoFactorSessionExpires < Date.now()
    ) {
      return res.status(401).json({ message: "Invalid or expired 2FA session" });
    }

    const isMatch = await bcrypt.compare(passcode, user.passcodeHash || "");
    if (!isMatch) {
      user.passcodeAttempts = (user.passcodeAttempts || 0) + 1;
      let msg = "Invalid passcode";
      let status = 401;
      
      if (user.passcodeAttempts >= 5) {
        user.passcodeLockUntil = new Date(Date.now() + 15 * 60 * 1000);
        msg = "Too many attempts, account locked temporarily";
        status = 429;
      }
      
      await user.save();
      await logAction(user._id, "login_failed", "Failed 2FA verification");
      return res.status(status).json({ message: msg });
    }

    user.passcodeAttempts = 0;
    user.passcodeLockUntil = null;
    user.twoFactorSessionId = null;
    user.twoFactorSessionExpires = null;
    await user.save();

    await logAction(user._id, "login", "User logged in successfully via 2FA");

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      team: user.team,
      workType: user.workType,
      role: user.role,
      isActive: user.isActive,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  verifyPasscode,
  getUserProfile,
};
