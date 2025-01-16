import { useState, useEffect } from "react";
import { Edit, DeleteOutline } from "@mui/icons-material";

function App() {
  const [TaskVal, setTaskVal] = useState("");
  const [TaskList, setTaskList] = useState(JSON.parse(localStorage.getItem("task-list") || "[]"));

  // Update localStorage whenever the TaskList state changes
  useEffect(() => {
    localStorage.setItem("task-list", JSON.stringify(TaskList));
  }, [TaskList]);

  // add task to the task list
  const addTask = () => {
    if (TaskVal.trim() !== "") {
      setTaskList([
        ...TaskList,
        { id: Date.now(), title: TaskVal, checked: false },
      ]);
      setTaskVal(""); 
    }
  };

  // Remove the task from the list
  const RemoveTask = (id) => {
    setTaskList(TaskList.filter((task) => task.id !== id));
  };

  // Update an existing task by filling the input with the task's title
  const UpdateTask = (task) => {
    // Remove the task from the list
    RemoveTask(task.id); 
    // Fill the input by task title
    setTaskVal(task.title);
  };

  // Toggle the task checked state
  const ToggleTaskChecked = (id) => {
    setTaskList(
      TaskList.map((task) =>
        task.id === id ? { ...task, checked: !task.checked } : task
      )
    );
  };

  // Render the list of tasks
  const AllTasks = TaskList.map((task) => {
    return (
      <li key={task.id} className="flex items-center gap-1 py-2">
        <input
          type="checkbox"
          id={task.id}
          checked={task.checked}
          onChange={() => ToggleTaskChecked(task.id)} // Toggle task checked state
        />
        <label
          htmlFor={task.id}
          className={`grow ${task.checked ? "line-through text-gray-500" : ""}`}
        >
          {task.title}
        </label>
        <div className="flex items-center gap-1">
          <button
            onClick={() => RemoveTask(task.id)}
            className="flex justify-center items-center bg-red-600 h-[2rem] aspect-square rounded-lg"
          >
            <DeleteOutline className="text-white" fontSize="small" />
          </button>
          <button
            onClick={() => UpdateTask(task)}
            className="flex justify-center items-center bg-green-600 h-[2rem] aspect-square rounded-lg"
          >
            <Edit className="text-white" fontSize="small" />
          </button>
        </div>
      </li>
    );
  });

  return (
    <div className="todo-container px-2 py-2 bg-white rounded-lg w-[300px] max-w-[90%]">
      <h1 className="text-2xl font-bold">To-Do List</h1>
      <input
        type="text"
        placeholder="Your task here"
        className="w-full py-2 px-3 border border-gray-400 rounded-md outline-none md:w-full"
        value={TaskVal}
        onChange={(e) => setTaskVal(e.target.value)} // Update task input value
      />
      <button
        onClick={addTask}
        disabled={!TaskVal.trim()}
        className={`w-full mt-1 p-2 bg-cyan-500 rounded-md text-white  ${!TaskVal.trim() ? "opacity-50" : ""}`}
      >
        Add Task
      </button>
      <ul className="divide-y">{AllTasks}</ul>
    </div>
  );
}

export default App;
