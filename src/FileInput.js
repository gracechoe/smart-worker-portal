import React, { Component } from "react";

// const fileValidation = (fileName) => {
//   var allowedExtensions = /(\.obj|\.fbx)$/i;
//   return allowedExtensions.exec(fileName);
// };

class FileInput extends Component {
  initialState = {
    projectName: "",
    fileName: "",
    url: null,
    file: null,
  };
  state = this.initialState;

  fileInput = React.createRef();

  handleNameChange = (event) => {
    this.setState({
      projectName: event.target.value,
    });
  };

  handleFileChange = (event) => {
    const name = event.target.files[0].name;
    this.setState({
      fileName: name,
      url: URL.createObjectURL(event.target.files[0]),
      file: event.target.files[0],
    });
  };

  submitForm = () => {
    this.props.handleSubmit(this.state);
    this.setState(this.initialState);
  };

  render() {
    const formStyle = {
      color: "white",
    };
    const inputStyle = {
      color: "white",
      width: "75%",
    };
    const { projectName } = this.state;
    return (
      <form>
        <label htmlFor="projectName">Project Name</label>
        <input
          type="text"
          name="projectName"
          id="projectName"
          value={projectName}
          onChange={this.handleNameChange}
        />
        <label htmlFor="upload">Upload file:</label>
        <input
          type="file"
          name="upload"
          id="upload"
          accept=".obj, .fbx"
          onChange={this.handleFileChange}
        />
        <input
          type="button"
          value="Create New Tutorial"
          onClick={this.submitForm}
        />
      </form>
    );
  }
}

export default FileInput;
