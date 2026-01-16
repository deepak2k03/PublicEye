const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const crypto = require("crypto"); // Built-in Node module to generate fake hashes

// GET all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

// POST - Create a new Project (Official Only - Simplified for Demo)
router.post("/", async (req, res) => {
  const { title, description, budget, location, officerId } = req.body;
  try {
    const newProject = new Project({
      title,
      description,
      budget,
      location,
      officerId
    });
    const project = await newProject.save();
    res.json(project);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// PUT - Verify a Project (The Core "PublicEye" Feature)
router.put("/verify/:id", async (req, res) => {
  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: "Project not found" });

    // 1. Increment Verification Count
    project.verificationCount += 1;

    // 2. SIMULATE SMART CONTRACT LOGIC
    // If we reach a threshold (e.g., 1 verification for demo), release funds
    if (project.verificationCount >= 1 && !project.fundsReleased) {
      project.status = "Verified";
      project.fundsReleased = true;
      // Generate a fake "Transaction Hash" to look like Ethereum
      project.transactionHash = "0x" + crypto.randomBytes(32).toString("hex");
    }

    await project.save();
    res.json(project);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;