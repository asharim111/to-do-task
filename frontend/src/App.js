import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import API from "./api";
import AuthForm from "./components/AuthForm";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import "./style.css";

// Helper to check if JWT exists
const isAuthenticated = () => !!localStorage.getItem("token");

function App() {
  const [user, setUser] = useState(isAuthenticated());
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  // Fetch tasks after login
  useEffect(() => {
    if (user) {
      API.get("/tasks")
        .then((res) => setTasks(res.data))
        .catch(() => setError("Failed to fetch tasks"));
    }
  }, [user]);

  // Register handler
  const handleRegister = async (email, password) => {
    try {
      const res = await API.post("/auth/register", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  // Login handler
  const handleLogin = async (email, password) => {
    try {
      const res = await API.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setUser(true);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  // Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(false);
    setTasks([]);
  };

  // Add task
  const addTask = async (name) => {
    try {
      const res = await API.post("/tasks", { name });
      setTasks([...tasks, res.data]);
      setError("");
    } catch {
      setError("Failed to add task");
    }
  };

  // Toggle complete
  const toggleTask = async (id, completed) => {
    try {
      const res = await API.put(`/tasks/${id}`, { completed });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
      setError("");
    } catch {
      setError("Failed to update task");
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      setError("");
    } catch {
      setError("Failed to delete task");
    }
  };

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <div>
                  <button className="logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                  <h2>Your Tasks</h2>
                  <TaskForm onAdd={addTask} />
                  <TaskList
                    tasks={tasks}
                    onToggle={toggleTask}
                    onDelete={deleteTask}
                  />
                  {error && <p className="error">{error}</p>}
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <div>
                  <AuthForm onSubmit={handleLogin} isRegister={false} />
                  <p>
                    Don't have an account? <a href="/register">Register</a>
                  </p>
                  {error && <p className="error">{error}</p>}
                </div>
              )
            }
          />
          <Route
            path="/register"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <div>
                  <AuthForm onSubmit={handleRegister} isRegister={true} />
                  <p>
                    Already have an account? <a href="/login">Login</a>
                  </p>
                  {error && <p className="error">{error}</p>}
                </div>
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
