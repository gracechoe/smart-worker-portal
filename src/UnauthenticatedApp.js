import React, { useState } from "react";
import { postData } from "./handleRequest.js";
import RegistrationForm from "./RegistrationForm.js";
import LoginForm from "./LoginForm.js";

const UnauthenticatedApp = ({ setLogin }) => {
  const [registered, setRegisteredState] = useState(true);

  const setUnregistered = () => {
    setRegisteredState(false);
  };

  const setRegistered = () => {
    setRegisteredState(true);
  };

  const renderForm = () => {
    return registered ? (
      <LoginForm setUnregistered={setUnregistered} setLogin={setLogin} />
    ) : (
      <RegistrationForm setRegistered={setRegistered} />
    );
  };

  const appStyle = {
    width: "40%",
    margin: "auto",
    padding: "30px 10px 30px 10px",
    "box-shadow":
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  return <div style={appStyle}>{renderForm()}</div>;
};

export default UnauthenticatedApp;
