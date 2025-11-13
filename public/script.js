const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

async function fetchTodos() {
  const res = await fetch("/api/todos");
  const data = await res.json();
  todoList.innerHTML = "";
  data.forEach(todo => {
    const li = document.createElement("li");
    li.textContent = todo.task;
    if (todo.completed) li.classList.add("completed");
    li.onclick = () => toggleComplete(todo.id);
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteTodo(todo.id);
    };
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

async function addTodo() {
  const task = taskInput.value.trim();
  if (!task) return alert("Please enter a task!");
  await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ task })
  });
  taskInput.value = "";
  fetchTodos();
}

async function toggleComplete(id) {
  await fetch(`/api/todos/${id}`, { method: "PUT" });
  fetchTodos();
}

async function deleteTodo(id) {
  await fetch(`/api/todos/${id}`, { method: "DELETE" });
  fetchTodos();
}

addBtn.addEventListener("click", addTodo);
fetchTodos();
