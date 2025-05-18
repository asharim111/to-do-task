import React, { useState } from "react";

const TaskForm = ({ onAdd }) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (name.trim()) {
          onAdd(name);
          setName("");
        }
      }}
      className="task-form"
    >
      <input
        type="text"
        placeholder="Add a new task"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default TaskForm;
