import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:8080/user/login", { email, password })
      .then((result) => {
        console.log("result", result);
        if (result.status === 200) {
          console.log("Login Success");
          localStorage.setItem("token", result.data.token);
          Swal.fire("Login successful!");
          navigate("/");
        } else {
          Swal.fire("Incorrect password! Please try again.");
        }
      })
      .catch((err) => Swal.fire(err.response.data.message));
  };
  return (
    <div className="form__login">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <div className="input__box">
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control"
              id="exampleInputEmail1"
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="input__box">
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <br />
          <br />
          <div>
            <p>
              Don't have account? <Link to="/register"> Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
