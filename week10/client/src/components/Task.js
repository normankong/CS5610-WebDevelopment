import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

function Task({ task, deleteTask }) {
  return (
    <li>
      <div className="task">
        <div>
          <Link to={`/tasks/${task.id}`}><p>{task.text}</p></Link>
          <AiFillDelete onClick={() => deleteTask(task._id)} />
        </div>
        <p>{task.date}</p>
      </div>
    </li>
  );
}

export default Task;
