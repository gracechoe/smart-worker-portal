import React, { useState } from "react";
import AuthenticatedApp from "./AuthenticatedApp.js";
import UnauthenticatedApp from "./UnauthenticatedApp.js";

const App = () => {
  const [state, setWholeState] = useState({
    accessKey: "",
    organization: "",
    loggedIn: false,
  });

  const setState = (partialState) => {
    setWholeState({
      ...state,
      ...partialState,
    });
  };

  const setLogin = (organization, accessKey) => {
    setState({ loggedIn: true, accessKey: accessKey, organization: organization });
  };

  const renderApp = () => {
    return state.loggedIn ? (
      <AuthenticatedApp accessKey={state.accessKey, state.organization} />
    ) : (
      <UnauthenticatedApp setLogin={setLogin} />
    );
  };

  const setLogout = () => {
    setState({ accessKey: "", loggedIn: false, organization: "" });
  };

  const renderLogout = () => {
    return (
      state.loggedIn && (
        <div style={buttonContainerStyle}>
          <button style={buttonStyle} onClick={setLogout}>
            Logout
          </button>
        </div>
      )
    );
  };

  const portalHeader = "AR SmartWorker Portal";

  const bannerStyle = {
    "background-color": "#336699",
    position: "fixed" /* Set the navbar to fixed position */,
    top: 0,
    width: "100%",
    overflow: "hidden",
  };

  const headerStyle = {
    color: "#ffffff",
    margin: "0px 0px 0px 20px",
    fontFamily: "Barlow Condensed",
    display: "inline-block",
  };

  const appStyle = {
    marginTop: 70,
  };

  const buttonContainerStyle = {
    float: "right",
  };

  const buttonStyle = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    margin: "0 auto",
    padding: "10px 10px 5px 0px",
    fontSize: "11px",
    float: "right",
  };

  return (
    <div style={{ position: "relative" }}>
      <div style={bannerStyle}>
        <h2 style={headerStyle}>{portalHeader}</h2>
        {renderLogout()}
      </div>
      <div style={appStyle}>{renderApp()}</div>
    </div>
  );
};

export default App;
