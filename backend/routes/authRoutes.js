"use strict";

const express = require("express");
const {
  registerUser,
  loginUser,
  verifyPasscode,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify-passcode", verifyPasscode);
router.get("/profile", protect, getUserProfile);

module.exports = router;
