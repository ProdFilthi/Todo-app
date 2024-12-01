import { useState } from "react";
import { BiBook, BiTrash } from "react-icons/bi";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState("");
  const handleInputChange = (e) => setTasks(e.target.value);
  const addTask = () => {
    setTodos([...todos, { text: tasks, completed: false }]);
    setTasks("");
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };
  const deleteTask = (todoIndex) => {
    let updatedTodos = todos.filter((_, index) => todoIndex !== index);
    setTodos(updatedTodos);
  };
  const toggleCompletedTask = (index) => {
    setTodos(
      todos.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  return (
    <div className="bg-neutral-100 shadow rounded-md shadow-black w-96 h-96">
      <div className="flex items-center justify-between px-4 py-4 text-xl">
        <h1>Todo App</h1>
        <BiBook />
      </div>
      <div className="flex items-center justify-between px-4 py-4">
        <input
          onKeyDown={onKeyPress}
          className="py-4 px-4 rounded-l-md w-64"
          value={tasks}
          onChange={handleInputChange}
          type="text"
          placeholder="Add Task..."
        />
        <button
          className="py-4 px-4 w-24 bg-blue-500 rounded-r-md text-white"
          onClick={addTask}
        >
          Add Task
        </button>
      </div>
      <div>
        {todos.map((todo, index) => (
          <div
            className={`flex items-center justify-between px-8 py-2 cursor-pointer ${
              todo.completed ? "line-through text-blue-500" : ""
            }`}
            key={index}
          >
            <div onClick={() => toggleCompletedTask(index)}>{todo.text}</div>
            <BiTrash
              onClick={() => deleteTask(index)}
              className="cursor-pointer text-orange-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
