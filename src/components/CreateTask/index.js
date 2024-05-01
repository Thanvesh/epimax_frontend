import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import "./index.css"; // Import CSS file for component-specific styles

const CreateTask = ({ onCreate }) => {
  const userList = ["Thanvesh", "Ram", "Gopal", "Siddarth"];
  const teamList = ["FrontEnd team", "Backend", "Deploy", "Testing"];

  const getCurrentDate = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];
    return formattedDate;
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    linkedTo: "",
    assignee: "",
    creationDate: getCurrentDate(),
    dueDate: "",
    editedDate: "",
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      editedDate: "",
    }));
  };

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = { ...formData, id: uuidv4() };
    onCreate(newTask);
    navigate("/");
  };

  return (
    <div className="create-task-container">
      <div className="create-task-card">
        <h2 className="create-task-heading">Create Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="linkedTo">Linked To:</label>
            <select
              id="linkedTo"
              name="linkedTo"
              value={formData.linkedTo}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {teamList.map((team) => (
                <option key={team} value={team}>
                  {team}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="assignee">Assignee:</label>
            <select
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
            >
              <option value="">Select</option>
              {userList.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date:</label>
            <input
              type="date"
              id="dueDate"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
            <Link to="/" className="btn btn-secondary ml-2">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
