const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

let tasks = []; // In-memory store for tasks

// Get all tasks
app.get("/tasks", (req, res) => {
	res.json(tasks);
});

// Add a new task
app.post("/tasks", (req, res) => {
	const newTask = req.body;
	tasks.push(newTask);
	res.status(201).json(newTask);
});

// Delete a task
app.delete("/tasks/:id", (req, res) => {
	const { id } = req.params;
	tasks = tasks.filter((task) => task.id !== id);
	res.status(204).send();
});

app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);
});
