const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 8000;

let todos = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// Get all todos
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post("/api/todos", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "Task is required" });
  const newTodo = { id: Date.now(), task, completed: false };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Toggle complete status
app.put("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.map(todo =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  );
  res.json({ message: "Todo updated successfully" });
});

// Delete a todo
app.delete("/api/todos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.json({ message: "Todo deleted successfully" });
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
