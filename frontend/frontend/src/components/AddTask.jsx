import { useState } from "react";

function AddTask({ addTask }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    addTask(text);
    setText("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAdd();
  };

  return (
    <div style={{ display: "flex", marginBottom: "10px" }}>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Enter task"
        style={{ flex: 1, padding: "8px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button
        onClick={handleAdd}
        disabled={!text.trim()}
        style={{
          padding: "8px 16px",
          marginLeft: "10px",
          fontSize: "16px",
          cursor: text.trim() ? "pointer" : "not-allowed",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
        }}
      >
        Add
      </button>
    </div>
  );
}

export default AddTask;
