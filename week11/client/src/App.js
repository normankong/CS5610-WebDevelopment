import Header from "./components/Header.js";
import TasksList from "./components/TasksList.js";
import TaskDetail from "./components/TaskDetail.js";
import AddTasks from "./components/AddTask.js";
// import Navigation from "./components/Navigation.js";
import NavigationWithBootStrap from "./components/NavigationWithBootStrap.js";

import ProtectedRoute from "./components/ProtectedRoute.js";
import Profile from "./components/Profile.js";
import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';

import "./App.css";

function App() {

  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const TASK_URL = "http://localhost:5000/tasks";
  const appName = "Norman";
  const [isShowForm, setIsShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch(TASK_URL).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTasks(data);
      });
    });
  }, []);

  const deleteTask = async (id) => {

    const token = await getAccessTokenSilently();

    fetch(`${TASK_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setTasks(tasks.filter((task) => task._id !== id));
      });
  };

  const addTask = (task) => {
    fetch(`${TASK_URL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task, null, 2),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        task._id = res._id;
        setTasks([...tasks, task]);
      });
  };

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <>
      <div className="App">
        {/* <Navigation/> */}
        <NavigationWithBootStrap/>
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
          <Route
            path="/profile"
            // element={<Profile/>}
            element={<ProtectedRoute protectedComponent={Profile} />}
          />
          <Route path="*" element={<h1>Sorry 404</h1>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
