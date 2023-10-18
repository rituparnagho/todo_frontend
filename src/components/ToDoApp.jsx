import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
} from "../utils/HandleApi";
import { useLocation, useNavigate } from "react-router-dom";

const ToDoApp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState();

  useEffect(() => {
    getAllToDo(setToDo);
    !localStorage.getItem("token") && navigate("/login");
  }, [toDo, navigate, location.pathname]);

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };

  return (
    <div className="container">
      <h1>To Do App</h1>
      <div className="top">
        <input
          type="text"
          placeholder="Add ToDos...."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div
          className="add"
          onClick={
            isUpdating
              ? () => updateToDo(toDoId, text, setToDo, setText, setIsUpdating)
              : () => addToDo(text, setText, setToDo)
          }
        >
          {isUpdating ? "Update" : "Add"}
        </div>
      </div>

      <div className="list">
        {toDo.map((item) => (
          <ToDoList
            key={item._id}
            text={item.text}
            updateMode={() => updateMode(item._id, item.text)}
            deleteToDo={() => deleteToDo(item._id, setToDo)}
          />
        ))}
      </div>
    </div>
  );
};

export default ToDoApp;
