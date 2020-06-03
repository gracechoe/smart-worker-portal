import React, { useState } from "react";
import { postData } from "./handleRequest.js";

const RegistrationForm = ({ setRegistered }) => {
  const [state, setWholeState] = useState({
    username: "",
    password: "",
    password2: "",
    organization: "",
  });

  const initialRegisterState = {
    username: "",
    password: "",
    password2: "",
    organization: "",
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

  const addUser = async () => {
    if (state.password !== state.password2) {
      alert("Passwords do not match");
      return false;
    }
    const body = {
      user: state.username,
      pass: state.password,
      organization: state.organization,
    };

    const response = await postData(
      "http://70.187.182.170:3000/api/signup",
      body
    );

    console.log(response);
    if (response.error) {
      alert("Registration was unsuccessful, please try again");
      return false;
    } else {
      return true;
    }
  };

  const submitRegisterForm = async () => {
    const newUser = await addUser();
    // setState(initialState);
    if (!newUser) {
      setState(initialRegisterState);
    } else {
      setRegistered();
    }
  };

  const switchToLogin = () => {
    setRegistered();
  };

  const renderRegisterForm = () => {
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
        <label htmlFor="password2">Re-enter password</label>
        <input
          type="password"
          name="password2"
          id="password2"
          value={state.password2}
          onChange={handleChange}
        />
        <label htmlFor="organization">Organization</label>
        <input
          type="text"
          name="organization"
          id="organization"
          value={state.organization}
          onChange={handleChange}
        />
        <input
          type="button"
          value="Register"
          onClick={submitRegisterForm}
          style={buttonStyle}
        />
        <input
          type="button"
          value="Back to login page"
          onClick={switchToLogin}
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

  return <div>{renderRegisterForm()}</div>;
};

export default RegistrationForm;
