import React from "react";

const Todo = ({ tasks }) => {
  return (
    <div>
      <h2>My Todo List</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
