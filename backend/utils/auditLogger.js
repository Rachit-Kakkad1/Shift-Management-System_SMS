"use strict";

const Log = require("../models/Log.Model");

const logAction = async (userId, action, details) => {
  try {
    if (!userId || !action) {
      console.warn("Audit logger: userId and action are required.");
      return;
    }
    await Log.create({
      userId,
      action,
      details,
    });
  } catch (error) {
    console.error("Failed to log action:", error);
  }
};

module.exports = { logAction };
