import axios from "axios";
import Swal from "sweetalert2";

const baseURL = "http://localhost:8080/todo";

const getAllToDo = (setToDo) => {
  axios
    .get(`${baseURL}/list`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then(({ data }) => {
      setToDo(data);
    })
    .catch((err) => console.log(err));
};

const addToDo = (text, setText, setToDo) => {
  axios
    .post(
      `${baseURL}/create`,
      { text },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then((data) => setText(""), Swal.fire("To Do Added!"), getAllToDo(setToDo))
    .catch((err) => Swal.fire("Error Adding"));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  axios
    .put(
      `${baseURL}/update/${toDoId}`,
      { text },
      {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    )
    .then(
      (data) => setText(""),
      Swal.fire("To Do Updated!"),
      setIsUpdating(false),
      getAllToDo(setToDo)
    )
    .catch((err) => Swal.fire("Error updating"));
};

const deleteToDo = (toDoId, setToDo) => {
  axios
    .delete(`${baseURL}/delete/${toDoId}`, {
      headers: {
        "x-auth-token": localStorage.getItem("token"),
      },
    })
    .then((data) => getAllToDo(setToDo), Swal.fire("To Do Deleted!"))
    .catch((err) => Swal.fire("Error deleting"));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };
