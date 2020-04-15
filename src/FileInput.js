import React, { Component } from 'react'

class FileInput extends Component {
    initialState = {
        projectName: "",
        file: null,
    }
    state = this.initialState

    fileInput = React.createRef();

    handleNameChange = event => {
        const { name, value } = event.target

        this.setState({
            [name]: value, 
        })
    }

    handleFileChange = event => {
        const { name } = event.target

        this.setState({
            [name]: URL.createObjectURL(event.target.files[0]), 
        })

        // alert(
        //     `Selected file - ${this.fileInput.current.files[0].name}`
        // );
    }

    submitForm = () => {
        this.props.handleSubmit(this.state)
        this.setState(this.initialState)
    }


    // handleSubmit(event) {
    //   event.preventDefault();
    //   alert(
    //     `Selected file - ${this.fileInput.current.files[0].name}`
    //   );
    // }
  
    render() {
        const { projectName, file } = this.state
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
                {/* <input type="file" id="file" ref={this.fileInput} onChange={this.handleChange}/> */}
                <input type="button" value="Submit" onClick={this.submitForm} />
            </form>
      );
    }
  }

export default FileInput;