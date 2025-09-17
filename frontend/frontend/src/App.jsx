import { useState, useEffect } from "react";
import AddTask from "./components/AddTask.jsx";
import TaskList from "./components/TaskList.jsx";

function App() {
  const [tasks, setTasks] = useState([]);
  const API_URL = "http://localhost:5000/tasks";

  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
    else fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addTask = async (text) => {
    if (!text.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      const newTask = await res.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, updatedFields) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields),
      });
      const updated = await res.json();
      setTasks(tasks.map(t => (t._id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <div style={{ margin: "20px", fontFamily: "Arial, sans-serif", maxWidth: "500px" }}>
      <h2 style={{ textAlign: "center" }}>📝 To-Do App </h2>
      <AddTask addTask={addTask} />
      <TaskList tasks={sortedTasks} updateTask={updateTask} deleteTask={deleteTask} />
    </div>
  );
}

export default App;
