"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.Model");
const connectDB = require("./config/db");

const seedAdmin = async () => {
  try {
    await connectDB();

    const adminEmail = "admin@shiftsync.com";
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (existingAdmin) {
      console.log("Admin user already exists.");
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("Password123!", salt);
    const passcodeHash = await bcrypt.hash("1234", salt);

    await User.create({
      name: "System Admin",
      email: adminEmail,
      password: passwordHash,
      passcodeHash: passcodeHash,
      role: "admin",
      isActive: true,
      team: "sozialarbeiter",
      workType: "full-time"
    });

    console.log("-----------------------------------------");
    console.log("Admin account created successfully!");
    console.log(`Email: ${adminEmail}`);
    console.log("Password: Password123!");
    console.log("Passcode: 1234");
    console.log("-----------------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
