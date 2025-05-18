import React from "react";

const TaskList = ({ tasks, onToggle, onDelete }) => (
  <ul className="task-list">
    {tasks.map((task) => (
      <li key={task._id} className={task.completed ? "completed" : ""}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task._id, !task.completed)}
        />
        <span>{task.name}</span>
        <button onClick={() => onDelete(task._id)}>Delete</button>
      </li>
    ))}
  </ul>
);

export default TaskList;
