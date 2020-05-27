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

  const postModelData = async (url = "", data = {}) => {
    const postHeader = {
      Accept: "application/json",
      Authorization: bearerKey,
    };

    const modelData = new FormData();
    modelData.append("data", data.data);
    modelData.append("name", data.name);
    const response = await fetch(url, {
      method: "POST",
      headers: postHeader,
      body: modelData,
    });

    return response.json();
  };

  const postStepsData = async (url = "", data = {}) => {
    const postHeader = {
      Accept: "application/json",
      Authorization: bearerKey,
      "Content-Type": "application/json",
    };

    const response = await fetch(url, {
      method: "POST",
      headers: postHeader,
      body: JSON.stringify(data),
    });

    return response.json();
  };

  const postModel = async () => {
    const body = {
      name: state.projectName,
      data: state.file, // regular File object
    };
    const assetData = await postModelData(
      "http://70.187.182.170:3000/api/assets/insert",
      body,
      "application/x-www-form-urlencoded"
    );
    console.log(assetData);

    return assetData.id;
  };

  const postSteps = async (steps, assetId) => {
    console.log("POSTING STEPS");
    for (var i = 0; i < steps.length; i++) {
      const textData = {
        text: steps[i].text,
        assetID: assetId,
        step: i + 1,
        organization: "UCI",
      };
      const partsData = {
        name: steps[i].part,
        assetID: assetId,
        step: i + 1,
        organization: "UCI",
      };
      console.log(textData);
      console.log(partsData);
      await postStepsData(
        "http://70.187.182.170:3000/api/steps/insert",
        textData
      ).then((data) => {
        console.log(data);
      });
      if (steps[i].part !== "None") {
        await postStepsData(
          "http://70.187.182.170:3000/api/parts/insert",
          partsData
        ).then((data) => {
          console.log(data);
        });
      }
    }
  };

  const handleTutorialSubmit = async (steps) => {
    const assetId = await postModel();
    console.log(assetId);
    if (assetId) {
      await postSteps(steps, assetId);
    }
    setState(initialState);
    alert("New tutorial successfully created.");
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
