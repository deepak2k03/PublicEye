const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Project = require("./models/Project");

// Load env vars
dotenv.config();

// Realistic Mock Data
const sampleProjects = [
  {
    title: "City Center Flyover Construction",
    description: "Construction of a 4-lane flyover connecting Sector 18 to the main highway to reduce traffic congestion.",
    budget: 450000000, // 45 Crores
    location: "Sector 18, Noida",
    status: "In Progress",
    verificationCount: 0,
    fundsReleased: false
  },
  {
    title: "Community Health Center Renovation",
    description: "Upgrading medical equipment and structural repairs for the district health center.",
    budget: 2500000, // 25 Lakhs
    location: "Indira Nagar, Lucknow",
    status: "Proposed",
    verificationCount: 0,
    fundsReleased: false
  },
  {
    title: "Solar Street Lighting Phase 1",
    description: "Installation of 500 automated solar street lights in rural districts.",
    budget: 12000000, // 1.2 Crores
    location: "Varanasi Outskirts",
    status: "Verified",
    verificationCount: 5,
    fundsReleased: true,
    transactionHash: "0x8f2d...3a1b" // Fake hash for demo
  },
  {
    title: "Smart Waste Management System",
    description: "Deployment of IoT-enabled waste bins and automated collection trucks.",
    budget: 8500000, // 85 Lakhs
    location: "Cyber City, Gurugram",
    status: "Proposed",
    verificationCount: 0,
    fundsReleased: false
  },
  {
    title: "Public Library Digitalization",
    description: "Procurement of 50 computers and high-speed internet infrastructure for the central library.",
    budget: 1500000, // 15 Lakhs
    location: "Civil Lines, Prayagraj",
    status: "In Progress",
    verificationCount: 0,
    fundsReleased: false
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await Project.deleteMany({});
    console.log("🧹 Cleared existing projects");

    // Insert new data
    await Project.insertMany(sampleProjects);
    console.log("🌱 Database Seeded Successfully with 5 Projects!");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();