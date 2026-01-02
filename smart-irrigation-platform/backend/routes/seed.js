const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { isMongoConnected } = require("../db/index.js");
const User = require("../models/User");
const Proposal = require("../models/Proposal");
const WaterUsage = require("../models/WaterUsage");

// Lightweight seed endpoint to populate MongoDB with sample data when connected
router.post("/", async (req, res) => {
  if (!isMongoConnected()) return res.status(400).json({ message: "MongoDB not connected" });

  try {
    // Avoid duplicating seeds
    const existingUsers = await User.countDocuments();
    if (existingUsers > 0) {
      return res.json({ message: "Database already seeded" });
    }

    const users = [
      { name: "Alice Farmer", email: "alice@example.com", password: bcrypt.hashSync("password123", 10), role: "farmer", location: "Field A", cropType: "Wheat" },
      { name: "Bob Provider", email: "bob@example.com", password: bcrypt.hashSync("password123", 10), role: "provider", location: "Depot 1" },
    ];

    const createdUsers = await User.insertMany(users);

    const proposals = [
      { title: "Drip Irrigation Setup", description: "Cost-effective drip system", price: 2500, targetCrops: ["Wheat", "Corn"], proposer: createdUsers[1]._id },
    ];

    await Proposal.insertMany(proposals);

    const water = [
      { field: "Wheat Field", litersUsed: 1200, status: "Optimal", userId: createdUsers[0]._id },
      { field: "Rice Field", litersUsed: 1800, status: "High", userId: createdUsers[0]._id },
    ];

    await WaterUsage.insertMany(water);

    res.json({ message: "Seeded database successfully" });
  } catch (err) {
    console.error("Seed error:", err);
    res.status(500).json({ message: "Seed failed", error: err.message });
  }
});

module.exports = router;
