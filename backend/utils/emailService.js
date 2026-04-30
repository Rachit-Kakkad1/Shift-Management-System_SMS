"use strict";

const nodemailer = require("nodemailer");

const sendWelcomeEmail = async (userEmail, name, password, role, passcode = null) => {
  try {
    // Check if SMTP credentials exist
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("Email service: SMTP credentials missing in .env. Email not sent.");
      return false;
    }

    const transporter = nodemailer.createTransport({
      service: "gmail", // You can change this to your provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    let message = `
      <h1>Welcome to ShiftSync, ${name}!</h1>
      <p>Your account has been created successfully.</p>
      <p><strong>Email:</strong> ${userEmail}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Role:</strong> ${role.toUpperCase()}</p>
    `;

    if (passcode && (role === "admin" || role === "hr")) {
      message += `<p><strong>Internal Dashboard Passcode:</strong> ${passcode}</p>`;
      message += `<p><em>Please use this passcode for 2FA verification when logging in to the dashboard.</em></p>`;
    }

    message += `<p>Login here: <a href="${process.env.CLIENT_URL}/login">${process.env.CLIENT_URL}/login</a></p>`;

    const mailOptions = {
      from: `"ShiftSync Operations" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: "Your ShiftSync Account Credentials",
      html: message,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
    return true;
  } catch (error) {
    console.error("Failed to send email:", error);
    return false;
  }
};

module.exports = { sendWelcomeEmail };
