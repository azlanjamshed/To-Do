import React, { use, useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { ImSpellCheck } from "react-icons/im";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState(() => {
    const storedTodo = localStorage.getItem("myTodoList");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });
  const [dateTime, setDateTime] = useState("");

  function setinput() {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;
    if (todo.some((item) => item.text === trimmedValue)) {
      setInputValue("");
      setTimeout(() => {
        alert("Task already Assign");
      }, 10);

      return;
    }
    setTodo([...todo, { text: trimmedValue, isChecked: false }]);
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
  const handleDeleteAll = (e) => {
    setTodo([]);
  };

  useEffect(() => {
    const Interval = setInterval(() => {
      const date = new Date();
      const formatedDate = date.toLocaleDateString();
      const formatedTime = date.toLocaleTimeString();
      setDateTime(`${formatedDate}-${formatedTime}`);
    }, 1000);

    return () => clearInterval(Interval);
  }, []);

  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(todo));
  }, [todo]);
  useEffect(() => {
    const storedTodo = localStorage.getItem("myTodoList");
    if (storedTodo) {
      setTodo(JSON.parse(storedTodo));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 p-5">
      <h1 className="font-extrabold text-center text-white text-5xl md:text-8xl mb-10">
        Todo List
      </h1>
      <h3 className="font-bold text-center text-white text-xl md:text-4xl mb-5">
        {dateTime}
      </h3>
      <div className="flex flex-col md:flex-row justify-center gap-5 mb-10">
        <input
          className="border-2 border-white rounded-xl p-3 w-full md:w-96 bg-white text-black text-xl "
          type="text"
          placeholder="Add a new task..."
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-black text-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition"
          type="submit"
          onClick={handleClick}
        >
          Add Task
        </button>
      </div>

      <div className="max-w-3xl mx-auto ">
        <h3 className="text-white font-bold text-2xl mb-5">Your Tasks:</h3>

        <ul className="flex flex-col gap-5">
          {todo.map((value, index) => (
            <li
              key={index}
              className="bg-white text-black rounded-2xl flex justify-between items-center px-5 py-3 text-lg font-semibold shadow-lg"
            >
              <span
                className={`truncate ${
                  value.isChecked ? "line-through text-gray-400" : ""
                }`}
              >
                {value.text}
              </span>
              <span className="flex gap-3">
                <button
                  onClick={() => {
                    handleCheck(index);
                  }}
                  className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition"
                >
                  <FaCheck className="text-white text-lg" />
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 p-2 rounded-full hover:bg-red-600 transition"
                >
                  <MdDeleteForever className="text-white text-lg" />
                </button>
              </span>
            </li>
          ))}

          {todo.length === 0 && (
            <p className="text-white text-lg">
              No tasks yet — start by adding one!
            </p>
          )}
          {todo.length !== 0 && (
            <button
              className="bg-black w-30 h-10 rounded-2xl ml-[40%]"
              onClick={handleDeleteAll}
            >
              Clear All
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
