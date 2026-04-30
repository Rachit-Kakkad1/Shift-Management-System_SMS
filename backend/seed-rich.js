"use strict";

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User.Model");
const Shift = require("./models/Shift.Model");
const connectDB = require("./config/db");
const moment = require("moment");

const seedRichData = async () => {
  try {
    await connectDB();

    // Clear existing data (optional, but good for a "fresh" best-ever look)
    await User.deleteMany({});
    await Shift.deleteMany({});

    console.log("Seeding rich dummy data...");

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash("Password123!", salt);
    const passcodeHash = await bcrypt.hash("1234", salt);

    const teams = ["sozialarbeiter", "sozialbetreuer", "sozialbetreuerhelfer"];
    const names = [
      "Alex Smith", "Sarah Johnson", "Michael Brown", "Emma Wilson", 
      "Oliver Taylor", "Sophia Davies", "James Miller", "Isabella Moore",
      "Liam Anderson", "Mia Thomas", "Noah Jackson", "Ava White",
      "Lucas Harris", "Charlotte Martin", "Mason Thompson", "Amelia Garcia"
    ];

    const users = [];
    for (let i = 0; i < names.length; i++) {
      const user = await User.create({
        name: names[i],
        email: `${names[i].toLowerCase().replace(" ", ".")}@shiftsync.com`,
        password: passwordHash,
        passcodeHash: passcodeHash,
        role: i === 0 ? "admin" : (i === 1 ? "hr" : "employee"),
        isActive: true,
        team: teams[i % teams.length],
        workType: i % 4 === 0 ? "part-time" : "full-time"
      });
      users.push(user);
    }

    console.log(`Created ${users.length} employees.`);

    // Create shifts for current month and next month
    const startOfMonth = moment().startOf('month');
    const endOfNextMonth = moment().add(1, 'month').endOf('month');

    const shifts = [];
    let current = moment(startOfMonth);

    while (current.isBefore(endOfNextMonth)) {
      if (current.day() !== 0 && current.day() !== 6) { // Weekdays only
        // Assign 5-8 users per day
        const dailyUsers = users.sort(() => 0.5 - Math.random()).slice(0, 8);
        
        dailyUsers.forEach((user, index) => {
          const isMorning = index < 4;
          const start = moment(current).hour(isMorning ? 8 : 13).minute(isMorning ? 0 : 30);
          const end = moment(current).hour(isMorning ? 13 : 22).minute(0);

          shifts.push({
            employee: user._id,
            start: start.toDate(),
            end: end.toDate(),
            notes: `Regular ${isMorning ? 'Morning' : 'Evening'} Shift`
          });
        });
      }
      current.add(1, 'day');
    }

    await Shift.insertMany(shifts);
    console.log(`Created ${shifts.length} shifts.`);

    console.log("Rich seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding rich data:", error);
    process.exit(1);
  }
};

seedRichData();
