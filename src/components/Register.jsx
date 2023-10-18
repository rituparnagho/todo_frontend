import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/user/register", { name, email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "Already registered") {
          Swal.fire("E-mail already registered! Please Login to proceed.");
          navigate("/login");
        } else {
          Swal.fire("Registered successfully! Please Login to proceed.");
          navigate("/login");
        }
      })
      .catch((err) => Swal.fire(err.response.data.message));
  };

  return (
    <div className="form__login">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input__box">
            <input
              type="text"
              placeholder="Enter Name"
              id="exampleInputname"
              onChange={(event) => setName(event.target.value)}
              required
            />
          </div>
          <div className="input__box">
            <input
              type="email"
              placeholder="Enter Email"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="input__box">
            <input
              type="password"
              placeholder="Enter Password"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Register
          </button>
          <br />
          <br />
          <div>
            <p>
              If you already registered <Link to="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
