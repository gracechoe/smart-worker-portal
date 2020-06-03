import React, { useState } from "react";
import { postData } from "./handleRequest.js";

const LoginForm = ({ setUnregistered, setLogin }) => {
  const [state, setWholeState] = useState({
    username: "",
    password: "",
    accessKey: "",
  });

  const initialLoginState = {
    username: "",
    password: "",
    accessKey: "",
  };

  const setState = (partialState) => {
    setWholeState({
      ...state,
      ...partialState,
    });
  };

  const handleChange = (event) => {
    setState({
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async () => {
    const body = {
      user: state.username,
      pass: state.password,
    };
    const response = await postData(
      "http://70.187.182.170:3000/api/login",
      body
    );
    console.log(response);
    if (response.error) {
      alert("Incorrect username or password");
    } else {
      setLogin(response.payload.accessToken);
    }
  };

  const submitLoginForm = async () => {
    await handleLogin();
    setState(initialLoginState);
  };

  const switchToRegistration = () => {
    setUnregistered();
  };

  const renderLoginForm = () => {
    return (
      <form style={formStyle}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={state.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={state.password}
          onChange={handleChange}
        />
        <input
          type="button"
          value="Login"
          onClick={submitLoginForm}
          style={buttonStyle}
        />
        <input
          type="button"
          value="Create a new account"
          onClick={switchToRegistration}
          style={buttonStyle2}
        />
      </form>
    );
  };

  const formStyle = {
    margin: "0 auto",
    width: "90%",
  };

  const buttonStyle = {
    width: "100%",
    marginTop: 10,
    // marginLeft: 10,
  };

  const buttonStyle2 = {
    width: "100%",
    // marginLeft: 10,
  };

  return <div>{renderLoginForm()}</div>;
};

export default LoginForm;
