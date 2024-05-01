import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

import "./index.css"

const EditTask = ({ tasks, onUpdate }) => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    linkedTo: "",
    assignee: "",
    creationDate: "",
    dueDate: "",
    editedDate: "",
    status: "Pending",
  });

  useEffect(() => {
    const task = tasks.find((task) => task.id === id);
    if (task) {
      setFormData({
        ...task,
        editedDate: "", // Reset editedDate to empty when editing
      });
    }
  }, [id, tasks]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
      editedDate: "", // Reset editedDate to empty when any field changes
    }));
  };

  const navigate=useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const isoDateString = new Date().toISOString();
const spaceAddedDateString = isoDateString.slice(0, 10) + " " + isoDateString.slice(11);
const editedTask = { ...formData, editedDate: spaceAddedDateString };
    onUpdate(editedTask);
    navigate("/")

  };

  return (
    <div className="edit-task-container">
      <h2 className="edit-task-heading ">Edit Task</h2>
      <form onSubmit={handleSubmit} className="edit-task-card">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Linked To:</label>
          <input
            type="text"
            name="linkedTo"
            value={formData.linkedTo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Assignee:</label>
          <input
            type="text"
            name="assignee"
            value={formData.assignee}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Creation Date:</label>
          <input
            type="date"
            name="creationDate"
            value={formData.creationDate}
            readOnly // Read-only field to display creationDate
          />
        </div>
        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Edited Date:</label>
          <input
            type="text"
            name="editedDate"
            value={formData.editedDate || "Not edited"}
            readOnly // Read-only field to display editedDate
          />
        </div>
        <div className="form-group">
          <label>Status:</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
        <Link to="/" className="btn btn-secondary ml-2">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditTask;
