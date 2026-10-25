
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const feedbackSchema = new mongoose.Schema({
  courseName: { type: String, required: true },
  courseDuration: { type: String, default: "Not specified" },
  comments: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
}, { timestamps: true });

const Feedback = mongoose.model("Feedback", feedbackSchema);

app.get("/api/feedback", async (req, res) => {
  try {
    res.json(await Feedback.find().sort({ createdAt: -1 }));
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post("/api/feedback", async (req, res) => {
  try {
    res.status(201).json(await Feedback.create(req.body));
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.put("/api/feedback/:id", async (req, res) => {
  try {
    const item = await Feedback.findByIdAndUpdate(
      req.params.id, req.body,
      { new: true, runValidators: true }
    );
    if (!item) return res.status(404).json({ message: "Feedback not found" });
    res.json(item);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.delete("/api/feedback/:id", async (req, res) => {
  try {
    const item = await Feedback.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Feedback not found" });
    res.json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

app.get("/", (req, res) => res.send("Feedback API is running"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running");
    });
  })
  .catch(err => console.log("MongoDB connection error:", err.message));
