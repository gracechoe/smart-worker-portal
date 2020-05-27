import React, { useState } from "react";
import FileInput from "./FileInput";
import Scene from "./Scene";
import Panel from "./Panel";
import useDynamicLoader from "./hooks/useDynamicLoader";

const App = () => {
  const [state, setWholeState] = useState({
    characters: [],
    projectName: "",
    fileName: "",
    url: "",
    file: null,
    model: null,
  });

  const initialState = {
    characters: [],
    projectName: "",
    fileName: "",
    url: "",
    model: null,
  };

  const { loaded, object } = useDynamicLoader(state.url, state.fileName);
  const objCopy = JSON.parse(JSON.stringify(object));

  const setState = (partialState) => {
    setWholeState({
      ...state,
      ...partialState,
    });
  };

  const handleFileSubmit = (fileState) => {
    setState({
      projectName: fileState.projectName,
      url: fileState.url,
      fileName: fileState.fileName,
      file: fileState.file,
    });
  };

  const bearerKey =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiZHdqaWFuZ0B1Y2kuZWR1IiwiaWF0IjoxNTg5MjA5OTA1LCJleHAiOjE1ODkyOTYzMDV9.gNpipNY8vbi5BRa1Y2zy8Np_6QLJSQiHRMK_5lvFYVA";

  const postData = (url = "", data = {}, contentType) => {
    console.log(data);
    const formData = new FormData();
    formData.append("data", data.data);
    formData.append("name", data.name);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    const postHeader = {
      Accept: "application/json",
      // "Content-Type": contentType,
      Authorization: bearerKey,
    };
    fetch(url, {
      method: "POST",
      headers: postHeader,
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  };

  const postModel = () => {
    console.log("At postModel");
    var assetID = 0;
    const body = {
      name: state.projectName,
      data: state.file, // regular File object
    };
    postData(
      "http://70.187.182.170:3000/api/assets/insert",
      body,
      "application/x-www-form-urlencoded"
    ).then((data) => {
      console.log(data);
    });
  };

  const postSteps = (steps) => {
    console.log("POSTING STEPS");
    for (var i = 0; i < steps.length; i++) {
      const textData = {
        text: steps[i].text,
        assetID: 2,
        step: i + 1,
        organization: "UCI",
      };
      const partsData = {
        name: steps[i].part,
        assetID: 2,
        step: i + 1,
        organization: "UCI",
      };
      console.log(textData);
      console.log(partsData);
      postData(
        "http://70.187.182.170:3000/api/steps/insert",
        textData,
        "application/json"
      ).then((data) => {
        console.log(data);
      });
      if (steps[i].part !== "None") {
        postData(
          "http://70.187.182.170:3000/api/parts/insert",
          partsData,
          "application/json"
        ).then((data) => {
          console.log(data);
        });
      }
    }
  };

  const handleTutorialSubmit = (steps) => {
    postModel();
    // postSteps(steps);
    // setState(initialState);
    alert("New tutorial successfully created");
  };

  const portalHeader = " AR Smart Worker Web Portal";

  const renderFileInput = () => {
    console.log("loaded: ", loaded, object, state.projectName);
    const projectHeader = "Tutorial: " + state.projectName;
    if (state.projectName !== "" && loaded) {
      return <h2>{projectHeader}</h2>;
    } else {
      return <FileInput handleSubmit={handleFileSubmit} />;
    }
  };

  const renderScene = () => {
    return state.projectName && <Scene obj={object} />;
  };

  const renderPanel = () => {
    if (state.projectName !== "" && loaded) {
      return <Panel obj={objCopy} handleSubmit={handleTutorialSubmit} />;
    }
  };

  return (
    <div className="container">
      <h1>{portalHeader}</h1>
      {renderFileInput()}
      {renderScene()}
      {renderPanel()}
    </div>
  );
};

export default App;
