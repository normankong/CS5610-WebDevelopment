import Task from './Task.js';
import React from 'react';

function TasksList({tasks, deleteTask}) {
  
  return (
    <>
      {tasks.length === 0 && <p>No more tasks</p>}
      
      {tasks.map((task) => (
        <Task key={task._id} task={task} deleteTask={deleteTask}/>
      ))}
    </>
  );
}

export default TasksList;
