import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import React from 'react';

function TaskDetail() {
  const { taskId } = useParams();

  const [task, setTask] = useState({});

  useEffect(() => {
    const TASK_URL = `http://localhost:1234/users?task=${taskId}`;
    fetch(`${TASK_URL}`).then((response) => {
      response.json().then((data) => {
        console.log(data);
        setTask(data[0]);
      });
    });
  }, [taskId]);

  return <div>You are viewing the detail of task {task.name}</div>;
}

export default TaskDetail;
