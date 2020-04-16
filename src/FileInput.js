import React, { Component } from 'react'

class FileInput extends Component {
    initialState = {
        projectName: "",
        file: null,
    }
    state = this.initialState

    fileInput = React.createRef();

    handleNameChange = event => {
        this.setState({
            projectName: event.target.value, 
        })
    }

    handleFileChange = event => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0]), 
        })
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }
  
    render() {
        const { projectName } = this.state
        return (
            <form>
                <label htmlFor="projectName">Project Name</label>
                <input
                    type="text"
                    name="projectName"
                    id="projectName"
                    value={projectName}
                    onChange={this.handleNameChange} />
                <label htmlFor="file">Upload file:</label>
                <input 
                    type="file"
                    name="file" 
                    id="file" 
                    onChange={this.handleFileChange}
                    />
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
      );
    }
  }

export default FileInput;