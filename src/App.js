import React, { Component, useRef, useState, Suspense } from "react";
import Table from "./Table";
import Form from "./Form";
import FileInput from "./FileInput";
import Scene from "./Scene";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

class App extends Component {
  state = {
    characters: [],
    projectName: "",
    file: "/robot.obj",
  };

  removeCharacter = (index) => {
    const { characters } = this.state;

    this.setState({
      characters: characters.filter((character, i) => {
        return i !== index;
      }),
    });
  };

  handleSubmit = (character) => {
    this.setState({ characters: [...this.state.characters, character] });
  };

  handleFileSubmit = (fileState) => {
    this.setState({
      projectName: fileState.projectName,
      file: fileState.file,
    });
  };

  render() {
    const { characters } = this.state;

    return (
      <div className="container">
        {/* <h1>Table Example</h1>
                <Table characterData={characters} removeCharacter={this.removeCharacter}/>
                <Form handleSubmit={this.handleSubmit}/>
                <br /> */}
        <h1>AR Smart Worker Web Portal</h1>
        <FileInput handleSubmit={this.handleFileSubmit} />
        {/* <img src="/panda.jpg" alt="image"/> */}
        <Scene url={this.state.file} />
      </div>
    );
  }
}

export default App;
