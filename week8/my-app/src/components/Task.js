import { AiFillDelete } from "react-icons/ai";

function Task({ task, deleteTask }) {
  return (
    <li>
      <div className="task">
        <div>
          <p>{task.text} </p>
          <AiFillDelete onClick={() => deleteTask(task.id)} />
        </div>

        <p>{task.date}</p>
      </div>
    </li>
  );
}

export default Task;
