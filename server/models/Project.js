const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true }, // The "Locked" funds
  location: { type: String, required: true },
  status: { 
    type: String, 
    enum: ["Proposed", "In Progress", "Verified", "Completed"], 
    default: "Proposed" 
  },
  officerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  verificationCount: { type: Number, default: 0 },
  fundsReleased: { type: Boolean, default: false },
  transactionHash: { type: String, default: "" }, // Simulated Blockchain Hash
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Project", ProjectSchema);