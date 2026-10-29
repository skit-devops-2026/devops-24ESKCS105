
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();


// Register a new user
router.post("/register", async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Check whether all fields are filled.
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required"
      });
    }

    // Password must contain at least 6 characters.
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters"
      });
    }

    // Check if this email is already registered.
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    // Hash the password before saving it.
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user in the database.
    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword
    });

    // Send the user's details without the password.
    res.status(201).json({
      message: "Account created",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
});


// Login an existing user
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Find the user using their email.
    const user = await User.findOne({ email: email });

    // Check the email and password.
    if (
      !user ||
      !(await bcrypt.compare(password || "", user.password))
    ) {
      return res.status(401).json({
        message: "Email or password is incorrect"
      });
    }

    // Create a token after successful login.
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email
      },
      process.env.JWT_SECRET || "local_demo_secret_change_me",
      {
        expiresIn: "2h"
      }
    );

    // Send the token and user details to the frontend.
    res.json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});


// Make these routes available to the server.
export default router;
