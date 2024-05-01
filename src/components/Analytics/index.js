import React, { useState } from "react";
import { PieChart, Pie, Tooltip, Cell } from "recharts";

const Analytics = ({ tasks }) => {
  const [data, setData] = useState([]);

  const chartColors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF"];

  const calculateTaskStatusCounts = () => {
    const statusCounts = tasks.reduce((acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    }, {});

    const newData = Object.keys(statusCounts).map((status, index) => ({
      name: status,
      value: statusCounts[status],
      fill: chartColors[index % chartColors.length],
    }));

    setData(newData);
  };

  const renderPieChart = () => {
    return (
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    );
  };

  return (
    <div className="analytics-container">
      <h2 className="analytics-title">Task Status Analytics</h2>
      {tasks.length > 0 ? (
        <>
          <button className="generate-analytics-btn" onClick={calculateTaskStatusCounts}>
            Generate Analytics
          </button>
          {data.length > 0 && renderPieChart()}
        </>
      ) : (
        <p className="no-tasks-msg">No tasks available</p>
      )}
    </div>
  );
};

export default Analytics;
