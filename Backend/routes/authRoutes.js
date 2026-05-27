const express = require("express");
const AWS = require("aws-sdk");
const router = express.Router();
AWS.config.update({
  region: "ap-south-1"
});
const db = new AWS.DynamoDB.DocumentClient();
const TABLE = "Users";
// Signup Route
router.post("/signup", async (req, res) => {
  console.log("POST /signup hit");
  try {
    const {
      name,
      email,
      password
    } = req.body;
    console.log("Request Body:", req.body);
    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }
    // Check Existing User
    const existingUser = await db.get({
      TableName: TABLE,
      Key: { email }
    }).promise();
    console.log("Existing User:", existingUser);
    if (existingUser.Item) {
      return res.status(400).json({
        message: "Email already registered"
      });
    }
    // Save User
    await db.put({
      TableName: TABLE,
      Item: {
        email,
        name,
        password,
        createdAt: new Date().toISOString()
      }
    }).promise();
    console.log("User saved successfully");
    res.json({
      message: "Signup successful"
    });
  } catch (err) {
    console.error("Signup Error:", err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});
// Login Route
router.post("/login", async (req, res) => {
  console.log("POST /login hit");
  try {
    const {
      email,
      password
    } = req.body;
    console.log(req.body);
    const user = await db.get({
      TableName: TABLE,
      Key: { email }
    }).promise();
    console.log("User Found:", user);
    if (!user.Item) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    if (user.Item.password !== password) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }
    res.json({
      message: "Login successful"
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});
module.exports = router;