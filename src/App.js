import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./components/Home";
import CreateTask from "./components/CreateTask";
import EditTask from "./components/EditTask";
import Cookies from "js-cookie"

import Analytics from "./components/Analytics";
import "./index.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

import "./App.css"

const App = () => {
  // Load tasks from local storage or initialize an empty array
  const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);

  // Save tasks to local storage whenever tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleCreate = (newTask) => {
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleUpdate = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  function isAuthenticated() {
    // Define your authentication logic here
    // Example: Check if the user is logged in
    const jwtToken = Cookies.get('jwt_token');
    return jwtToken !== undefined;
  }

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/login" element={<SignIn/>} />
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/" element={isAuthenticated()?<Home tasks={tasks} onDeleteTask={handleDeleteTask} />:<Navigate to="/login" replace/>} />
          <Route exact path="/create" element={isAuthenticated()?<CreateTask onCreate={handleCreate} />:<Navigate to="/login" replace/>} />
          <Route exact path="/edit/:id" element={isAuthenticated()?<EditTask onUpdate={handleUpdate} tasks={tasks} />:<Navigate to="/login" replace/>} />
          <Route exact path="/analytics" element={isAuthenticated()?<Analytics tasks={tasks} />:<Navigate to="/login" replace/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
