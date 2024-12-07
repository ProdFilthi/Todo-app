import { useEffect, useState } from "react";
import { BiBook, BiTrash } from "react-icons/bi";

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    try {
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      return [];
    }
  });

  const [tasks, setTasks] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleInputChange = (e) => setTasks(e.target.value);

  const addTask = () => {
    if (tasks.trim() !== "") {
      setTodos([...todos, { text: tasks, completed: false }]);
      setTasks("");
    }
  };

  const keyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  const deleteTask = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const toggleCompleted = (index) => {
    const updatedTodos = todos.map((todo, i) =>
      i === index ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  };

  return (
    <div className="bg-neutral-300 min-w-96 min-h-96 rounded-md shadow-md shadow-blue-500 p-4">
      <div className="flex items-center justify-between px-2 py-2">
        <h1 className="text-2xl">Todo App</h1>
        <BiBook className="text-2xl" />
      </div>
      <div className="flex items-center justify-center mb-4">
        <input
          onKeyDown={keyPress}
          value={tasks}
          onChange={handleInputChange}
          type="text"
          placeholder="Add Task..."
          className="py-2 rounded-l-md px-4 outline-none border-2 border-blue-500"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white rounded-r-md w-32 h-10"
        >
          Add Task
        </button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <div
            key={index}
            className="flex items-center justify-between px-8 py-2 mt-2 bg-white shadow rounded-md"
          >
            <span
              onClick={() => toggleCompleted(index)}
              className={`cursor-pointer ${
                todo.completed ? "line-through text-blue-500" : ""
              }`}
            >
              {todo.text}
            </span>
            <BiTrash
              className="cursor-pointer text-red-500"
              onClick={() => deleteTask(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
