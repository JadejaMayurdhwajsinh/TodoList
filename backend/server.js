const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Task = require("./models/tasks");
require('dotenv').config();

const app = express();
app.use(cors());       
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Read all tasks
app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create task
app.post("/tasks", async (req, res) => {
  const task = new Task({ text: req.body.text });
  await task.save();
  res.json(task);
});

// Update task (toggle completed or update text)
app.put("/tasks/:id", async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { text: req.body.text, completed: req.body.completed },
    { new: true }
  );
  res.json(task);
});

// Delete task
app.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

app.listen(5000, () => console.log("🚀 Backend running on http://localhost:5000"));
