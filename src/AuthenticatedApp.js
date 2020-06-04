import React, { useState } from "react";
import FileInput from "./FileInput";
import Scene from "./Scene";
import Panel from "./Panel";
import Home from "./Home";
import useDynamicLoader from "./hooks/useDynamicLoader";
import { postModelData, postData } from "./handleRequest.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const AuthenticatedApp = ({ accessKey, organization }) => {
  const [state, setWholeState] = useState({
    characters: [],
    projectName: "",
    fileName: "",
    url: "",
    file: null,
    model: null
  });

  const initialState = {
    characters: [],
    projectName: "",
    fileName: "",
    url: "",
    file: null,
    model: null
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

  const postModel = async () => {
    const body = {
      name: state.projectName,
      data: state.file, // regular File object
    };
    const assetData = await postModelData(
      "http://70.187.182.170:3000/api/assets/insert",
      body,
      accessKey
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
        organization: organization,
      };
      const partsData = {
        name: steps[i].part,
        assetID: assetId,
        step: i + 1,
        organization: organization,
      };
      console.log(textData);
      console.log(partsData);
      await postData(
        "http://70.187.182.170:3000/api/steps/insert",
        textData,
        accessKey
      ).then((data) => {
        console.log(data);
      });
      if (steps[i].part !== "None") {
        await postData(
          "http://70.187.182.170:3000/api/parts/insert",
          partsData,
          accessKey
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

  // const portalHeader = " AR Smart Worker Web Portal";

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
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Create</Tab>
        </TabList>
        <TabPanel>
          <Home accessKey={accessKey}/>
        </TabPanel>
        <TabPanel>
          {renderFileInput()}
          {renderScene()}
          {renderPanel()}
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default AuthenticatedApp;
