// In-memory fallback storage with seeded sample data
const bcrypt = require("bcryptjs");

// Create a few seeded users with hashed passwords so auth works against in-memory store
const inMemoryUsers = [
  {
    id: "user-1",
    name: "Alice Farmer",
    email: "alice@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "farmer",
    location: "Field A",
    cropType: "Wheat",
    createdAt: new Date(),
  },
  {
    id: "user-2",
    name: "Bob Provider",
    email: "bob@example.com",
    password: bcrypt.hashSync("password123", 10),
    role: "provider",
    location: "Depot 1",
    cropType: "", 
    createdAt: new Date(),
  },
];

// Seeded proposals referencing seeded users
const inMemoryProposals = [
  {
    _id: "proposal-1",
    title: "Drip Irrigation Setup",
    description: "Cost-effective drip system for small farms",
    price: 2500,
    targetCrops: ["Wheat", "Corn"],
    proposer: { _id: "user-2", name: "Bob Provider", email: "bob@example.com" },
    status: "active",
    createdAt: new Date(),
  },
];

const inMemoryWaterUsage = [
  { _id: "1", id: 1, field: "Wheat Field", litersUsed: 1200, status: "Optimal", createdAt: new Date() },
  { _id: "2", id: 2, field: "Rice Field", litersUsed: 1800, status: "High", createdAt: new Date() },
  { _id: "3", id: 3, field: "Corn Field", litersUsed: 900, status: "Low", createdAt: new Date() },
];

module.exports = { inMemoryUsers, inMemoryProposals, inMemoryWaterUsage };
