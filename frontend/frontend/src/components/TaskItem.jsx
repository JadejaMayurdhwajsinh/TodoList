import { useState, useRef, useEffect } from "react";

function TaskItem({ task, updateTask, deleteTask }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(task.text);
  const inputRef = useRef(null);

  // Auto-focus when editing
  useEffect(() => {
    if (editing && inputRef.current) inputRef.current.focus();
  }, [editing]);

  const handleUpdate = () => {
    updateTask(task._id, { text });
    setEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleUpdate();
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "8px",
        padding: "8px",
        borderRadius: "4px",
        backgroundColor: "#f0f0f0",
      }}
    >
      {editing ? (
        <input
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          onBlur={handleUpdate}
          style={{ flex: 1, fontSize: "16px", padding: "4px" }}
        />
      ) : (
        <span
          onClick={() => updateTask(task._id, { completed: !task.completed })}
          style={{
            flex: 1,
            cursor: "pointer",
            textDecoration: task.completed ? "line-through" : "none",
          }}
        >
          {task.text}
        </span>
      )}

      <div>
        <button
          onClick={() => setEditing(true)}
          style={{
            marginRight: "5px",
            padding: "4px 8px",
            cursor: "pointer",
            backgroundColor: "#ff9800",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          ✏️
        </button>
        <button
          onClick={() => deleteTask(task._id)}
          style={{
            padding: "4px 8px",
            cursor: "pointer",
            backgroundColor: "#f44336",
            color: "white",
            border: "none",
            borderRadius: "4px",
          }}
        >
          ❌
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
