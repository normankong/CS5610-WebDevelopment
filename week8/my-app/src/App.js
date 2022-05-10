import Header from "./components/Header.js";
import TasksList from "./components/TasksList.js";
import AddTasks from "./components/AddTask.js";
import { useState } from "react";

import "./App.css";

function App() {
  const appName = "Norman";
  const [isShowForm, setIsShowForm] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Go over week 8 material",
      date: "March 4th at 1 pm",
    },
    {
      id: 2,
      text: "Do quiz 8",
      date: "March 4th at 6 pm",
    },
    {
      id: 3,
      text: "Work on assignment 2",
      date: "March 5th at 8 am",
    },
  ]);

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  }
  
  return (
    <div className="App">
      <Header name={appName} setIsShowForm={setIsShowForm} isShowForm={isShowForm}/>
      {isShowForm && <AddTasks addTask={addTask} />}
      <ul>
        <TasksList tasks={tasks} deleteTask={deleteTask} />
      </ul>
    </div>
  );
}

export default App;
