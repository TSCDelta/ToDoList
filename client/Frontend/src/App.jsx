import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [newTask, setNewTask] = useState("");

	// Fetch tasks when the component loads
	useEffect(() => {
		axios
			.get("http://localhost:5000/tasks")
			.then((response) => setTasks(response.data))
			.catch((error) => console.error("Error fetching tasks:", error));
	}, []);

	// Add a new task
	const addTask = () => {
		if (!newTask) return;
		const task = { id: Date.now().toString(), task: newTask };
		axios
			.post("http://localhost:5000/tasks", task)
			.then((response) => setTasks([...tasks, response.data]))
			.catch((error) => console.error("Error adding task:", error));
		setNewTask("");
	};

	// Delete a task
	const deleteTask = (id) => {
		axios
			.delete(`http://localhost:5000/tasks/${id}`)
			.then(() => setTasks(tasks.filter((task) => task.id !== id)))
			.catch((error) => console.error("Error deleting task:", error));
	};

	// Move task up
	const moveTaskUp = (index) => {
		if (index === 0) return; // Can't move the first item up
		const updatedTasks = [...tasks];
		[updatedTasks[index], updatedTasks[index - 1]] = [
			updatedTasks[index - 1],
			updatedTasks[index],
		];
		setTasks(updatedTasks);
	};

	// Move task down
	const moveTaskDown = (index) => {
		if (index === tasks.length - 1) return; // Can't move the last item down
		const updatedTasks = [...tasks];
		[updatedTasks[index], updatedTasks[index + 1]] = [
			updatedTasks[index + 1],
			updatedTasks[index],
		];
		setTasks(updatedTasks);
	};

	return (
		<div className='App'>
			<h1>To-Do List</h1>
			<input
				type='text'
				value={newTask}
				onChange={(e) => setNewTask(e.target.value)}
				placeholder='Enter a new task...'
			/>
			<button onClick={addTask}>Add Task</button>

			<ul>
				{tasks.map((task, index) => (
					<li key={task.id}>
						<span>{task.task}</span>
						<div className='buttons'>
							<button onClick={() => moveTaskUp(index)}>⬆️</button>
							<button onClick={() => moveTaskDown(index)}>⬇️</button>
							<button onClick={() => deleteTask(task.id)}>❌</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
