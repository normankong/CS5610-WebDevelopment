import { useState } from "react";

function AddTasks({ addTask }) {
  const [text, setText] = useState("");
  const [date, setDate] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    if (!text || !date) {
      alert("Enter a task");
      return false;
    }

    addTask({ text, date, id: Math.random() });
    setText("");
    setDate("");
    return false;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label>Day and time</label>
        <input
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <input type="submit" value="Save Task" />
    </form>
  );
}

export default AddTasks;
