import React, { useEffect, useState } from "react";
import { FaCheck, FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState(() => {
    const storedTodo = localStorage.getItem("myTodoList");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  const [dateTime, setDateTime] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Add or update task
  function setinput() {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    if (editIndex !== null) {
      const updated = [...todo];
      updated[editIndex].text = trimmedValue;
      setTodo(updated);
      setEditIndex(null);
    } else {
      if (todo.some((item) => item.text === trimmedValue)) {
        setInputValue("");
        setTimeout(() => {
          alert("Task already exists!");
        }, 10);
        return;
      }
      setTodo([...todo, { text: trimmedValue, isChecked: false }]);
    }
    setInputValue("");
  }

  const handleClick = (e) => {
    e.preventDefault();
    setinput();
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setinput();
    }
  };

  const handleDelete = (index) => {
    const updatedTodo = todo.filter((_, i) => i !== index);
    setTodo(updatedTodo);
  };

  const handleCheck = (index) => {
    const updateTodo = todo.map((item, i) => {
      if (i === index) {
        return { ...item, isChecked: !item.isChecked };
      }
      return item;
    });
    setTodo(updateTodo);
  };

  const handleDeleteAll = () => {
    setTodo([]);
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setInputValue(todo[index].text);
  };

  // Date & Time
  useEffect(() => {
    const Interval = setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleDateString();
      const formatedTime = date.toLocaleTimeString();
      setDateTime(`${formatedDate} - ${formatedTime}`);
    }, 1000);

    return () => clearInterval(Interval);
  }, []);

  // LocalStorage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(todo));
  }, [todo]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 flex flex-col items-center">
      <h1 className="font-extrabold text-center text-white text-5xl md:text-7xl mb-6 drop-shadow-lg">
        ✨ Todo App
      </h1>
      <h3 className="font-bold text-center text-white text-lg md:text-2xl mb-8 bg-white/20 px-5 py-2 rounded-full shadow-md">
        {dateTime}
      </h3>

      {/* Input Section */}
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-10 w-full max-w-2xl">
        <input
          className="border-0 outline-none rounded-2xl px-5 py-3 w-full bg-white/80 text-black text-lg shadow-md focus:ring-4 focus:ring-pink-300"
          type="text"
          placeholder="✍️ Add or edit a task..."
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-lg font-bold hover:scale-105 transition"
          type="submit"
          onClick={handleClick}
        >
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Tasks Section */}
      <div className="max-w-3xl w-full">
        <h3 className="text-white font-bold text-2xl mb-5">📋 Your Tasks:</h3>

        <ul className="flex flex-col gap-4">
          {todo.map((value, index) => (
            <li
              key={index}
              className="backdrop-blur-md bg-white/20 text-white rounded-2xl flex justify-between items-center px-5 py-4 text-lg font-semibold shadow-md"
            >
              {/* Numbering */}
              <span className="mr-3 font-bold text-pink-200">{index + 1}.</span>

              {/* Task Text */}
              <span
                className={`flex-1 truncate ${
                  value.isChecked ? "line-through text-gray-300" : ""
                }`}
              >
                {value.text}
              </span>

              {/* Actions */}
              <span className="flex gap-3">
                <button
                  onClick={() => handleCheck(index)}
                  className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition"
                >
                  <FaCheck className="text-white text-md" />
                </button>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 p-2 rounded-full hover:bg-yellow-600 transition"
                >
                  <FaEdit className="text-white text-md" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
                >
                  <MdDeleteForever className="text-white text-md" />
                </button>
              </span>
            </li>
          ))}

          {todo.length === 0 && (
            <p className="text-white text-lg text-center">
              🚀 No tasks yet — start by adding one!
            </p>
          )}
        </ul>

        {/* Clear All Button */}
        {todo.length !== 0 && (
          <button
            className="mt-8 w-full py-3 rounded-2xl bg-black/40 text-white font-bold shadow-lg hover:bg-black/60 transition"
            onClick={handleDeleteAll}
          >
            🗑 Clear All
          </button>
        )}
      </div>
    </div>
  );
};

export default Todo;
