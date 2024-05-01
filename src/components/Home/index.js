import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

import "./index.css"

const Home = ({ tasks, onDeleteTask }) => {
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [activeStatus, setActiveStatus] = useState("All");
  const [assigneeFilter, setAssigneeFilter] = useState("");
  const [teamFilter, setTeamFilter] = useState("");



  useEffect(() => {

    setFilteredTasks(tasks);
  }, [tasks]);

  const handleFilter = () => {
    let filtered = tasks;

    if (activeStatus !== "All") {
      filtered = filtered.filter((task) => task.status === activeStatus);
    }

    if (assigneeFilter) {
      filtered = filtered.filter((task) =>
        task.assignee.toLowerCase().includes(assigneeFilter.toLowerCase())
      );
    }

    if (teamFilter) {
      filtered = filtered.filter((task) =>
        task.linkedTo.toLowerCase().includes(teamFilter.toLowerCase())
      );
    }

    setFilteredTasks(filtered);
  };

  // Count the number of tasks for each status
  const countTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status).length;
  };

  const handleDeleteButton = (id) => {
    onDeleteTask(id);
    const updatedTasks = filteredTasks.filter((task) => task.id !== id);
    setFilteredTasks(updatedTasks);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the JWT token from cookies
    Cookies.remove('jwt_token')
    // Redirect to the login page
    navigate("/login");
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'text-blue';
      case 'Completed':
        return 'text-green';
      case 'Rejected':
        return 'text-red';
      default:
        return '';
    }
  };


  return (
    <div className="top-container">
      <h1 className="main-heading">Task Manager</h1>
      <div className="parent_container">
        <div className="parent-first-child-container">
          <Link to="/create" className="btn-primary">
            Add Task
          </Link>
          <button type="button" className="logout-button" onClick={handleLogout}>Logout</button>
        </div>
        <div>
          <div className="status-buttons">
            <button
              className={activeStatus === "All" ? "active" : "btn"}
              onClick={() => {
                setActiveStatus("All");
                handleFilter();
              }}
            >
              All ({tasks.length})
            </button>
            <button
              className={activeStatus === "Pending" ? "active" : "btn"}
              onClick={() => {
                setActiveStatus("Pending");
                handleFilter();
              }}
            >
              Pending ({countTasksByStatus("Pending")})
            </button>
            <button
              className={activeStatus === "Completed" ? "active" : "btn"}
              onClick={() => {
                setActiveStatus("Completed");
                handleFilter();
              }}
            >
              Completed ({countTasksByStatus("Completed")})
            </button>
            <button
              className={activeStatus === "Rejected" ? "active" : "btn"}
              onClick={() => {
                setActiveStatus("Rejected");
                handleFilter();
              }}
            >
              Rejected ({countTasksByStatus("Rejected")})
            </button>
          </div>
          <div className="filter-options">
            <div className="filters-container">
              <div className="filter-individual-cell">
                <label className="filter-input-label" htmlFor="filter-assignee_name">assignee_name</label>
                <input className="filter-input"
                id="filter-assignee_name"
                  type="text"
                  placeholder="Filter by assignee name"
                  value={assigneeFilter}
                  onChange={(e) => setAssigneeFilter(e.target.value)}
                />
              </div>
              <div className="filter-individual-cell">
                <label htmlFor="team_name" className="filter-input-label">team name</label>
                <input  className="filter-input"
                  id="team_name"
                  type="text"
                  placeholder="Filter by team name"
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                />
              </div>
            </div>

            <button className="Apply_Filters_button afb" onClick={handleFilter}>Apply Filters</button>
          </div>
        </div>

        {filteredTasks.length > 0 ? (
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Linked To</th>
                <th>Assignee</th>
                <th>Creation Date</th>
                <th>Due Date</th>
                <th>Edited Date</th>
                <th>Status</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody className="table_body">
              {filteredTasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.name}</td>
                  <td>{task.description}</td>
                  <td>{task.linkedTo}</td>
                  <td>{task.assignee}</td>
                  <td>{task.creationDate}</td>
                  <td>{task.dueDate}</td>
                  <td>{task.editedDate}</td>
                  <td className={getStatusClass(task.status)}>{task.status}</td>
                  <td>
                    <Link to={`/edit/${task.id}`} className="btn btn-primary">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDeleteButton(task.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="no-task-container">
            <h3>No Tasks are Available</h3>
          </div>
        )}
      </div>
      <div className="show_Button_Container">
        <Link to="/analytics" className="btn btn-primary">
          Analytics
        </Link>
      </div>
    </div>
  );
};

export default Home;
