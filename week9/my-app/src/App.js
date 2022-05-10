import Header from "./components/Header.js";
import TasksList from "./components/TasksList.js";
import TaskDetail from "./components/TaskDetail.js";
import AddTasks from "./components/AddTask.js";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import React from 'react';

import "./App.css";

function App() {

  const TASK_URL = "http://localhost:1234/task";
  const appName = "Norman";
  const [isShowForm, setIsShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  // useEffect(()=>{
  //   async function fetchData(){
  //     const response = await fetch("http://localhost:1234/task");
  //     const data = await response.json();
  //     console.log(data);
  //     setTasks(data);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {
    fetch(TASK_URL).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTasks(data);
      });
    });
  }, []);

  const deleteTask = (id) => {
    // setTasks(tasks.filter((task) => task.id !== id));
    fetch(`${TASK_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTasks(tasks.filter((task) => task.id !== id));
      });
  };

  const addTask = (task) => {
    // setTasks([...tasks, task]);

    fetch(`${TASK_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task, null, 2),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        task.id = res.id;
        setTasks([...tasks, task]);
      });
  };



  return (
    <BrowserRouter>
      <div className="App">
        <Link to="/">Home</Link>
        <Link to="/tasks">Tasks</Link>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header
                  appName={appName}
                  setIsShowForm={setIsShowForm}
                  isShowForm={isShowForm}
                />
                {isShowForm && <AddTasks addTask={addTask} />}
              </>
            }
          />
          <Route
            path="/tasks"
            element={
              <>
                <ul>
                  <TasksList tasks={tasks} deleteTask={deleteTask} />
                </ul>
              </>
            }
          />
          <Route
            path="/tasks/:taskId"
            element={
              <>
                  <TaskDetail/>
              </>
            }
          />
          <Route path="*" element={<h1>Sorry 404</h1>} />
        </Routes>
        {/* <Header
          name={appName}
          setIsShowForm={setIsShowForm}
          isShowForm={isShowForm}
        /> 
        {isShowForm && <AddTasks addTask={addTask} /> */}

        {/* <ul>
          <TasksList tasks={tasks} deleteTask={deleteTask} />
        </ul> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
