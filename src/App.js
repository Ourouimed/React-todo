import { useState, useEffect } from "react";
import { Edit, DeleteOutline } from "@mui/icons-material";

function App() {
  const [TaskVal, setTaskVal] = useState("");
  const [TaskList, setTaskList] = useState(
    JSON.parse(localStorage.getItem("task-list") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(TaskList));
  }, [TaskList]);

  // Add task to task list
  const addTask = () => {
    if (TaskVal.trim() !== "") {
      setTaskList([
        ...TaskList,
        { id: Date.now(), title: TaskVal, checked: false },
      ]);
      setTaskVal("");
    }
  };

  // Remove task
  const RemoveTask = (id) => {
    setTaskList(TaskList.filter((task) => task.id !== id));
  };

  // Update task
  const UpdateTask = (task) => {
    RemoveTask(task.id);
    setTaskVal(task.title);
  };

  // Toggle task checked state
  const ToggleTaskChecked = (id) => {
    setTaskList(
      TaskList.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // Render tasks
  const AllTasks = TaskList.map((task) => {
    return (
      <li key={task.id} className="flex align-center gap-1 py-2">
        <input
          type="checkbox"
          id={task.id}
          checked={task.checked}
          onChange={() => ToggleTaskChecked(task.id)}
        />
        <label
          for={task.id}
          className={`grow ${task.checked ? "line-through text-gray-500" : ""}`}
        >
        {task.title}
        </label>
        <div className="flex align-center gap-1">
          <button onClick={() => RemoveTask(task.id)}>
            <DeleteOutline className="text-5xl" />
          </button>
          <button onClick={() => UpdateTask(task)}>
            <Edit />
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="todo-container px-2 py-2 bg-white rounded-lg w-[300px] max-w-[90%]">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <div className="flex align-center gap-1">
        <input
          type="text"
          placeholder="Your task here"
          className="grow py-2 px-3 border border-gray-400 rounded-md outline-none"
          value={TaskVal}
          onChange={(e) => {
            setTaskVal(e.target.value);
          }}
        />
        <button
          onClick={addTask}
          disabled={!TaskVal.trim()}
          className={`p-2 bg-cyan-500 rounded-md text-white  ${!TaskVal.trim() ? "opacity-50" : ""}`} 
        >
          Add Task
        </button>
      </div>
      <ul className="divide-y">{AllTasks}</ul>
    </div>
  );
}

export default App;
