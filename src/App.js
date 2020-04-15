import React, { Component, useRef, useState, Suspense } from 'react'
import Table from './Table'
import Form from './Form'
import FileInput from './FileInput'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const Box = props => {
    // This reference will give us direct access to the mesh
    const mesh = useRef()
    
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))
    
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? [1, 1, 1] : [1, 1, 1]}
        onClick={e => setActive(!active)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}>
        <boxBufferGeometry attach="geometry" args={[2, 2, 2]} />
        <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
}

const Asset = url => {
    const obj = useLoader(OBJLoader, url)
    return <mesh object={obj.scene} dispose={null} />
}

class App extends Component {
    state = {
        characters: [],
        projectName: "",
        file: null,
    }
    
    removeCharacter = index => {
        const { characters } = this.state
        
        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index
            })
        })
    }

    handleSubmit = character => {
        this.setState({ characters: [...this.state.characters, character]})
    }
    
    handleFileSubmit = fileState => {
        this.setState({
            projectName: fileState.projectName,
            file: fileState.file,
        })

    }
    // handleSubmit = file => {
    //     this.setState({ uploadFile: file})
    // }
    render() {
        const { characters } = this.state

        return (
            <div className="container">
                <h1>Table Example</h1>
                <Table characterData={characters} removeCharacter={this.removeCharacter}/>
                <Form handleSubmit={this.handleSubmit}/>
                <br />
                <h1>AR Smart Worker Web Portal</h1>
                <FileInput handleSubmit={this.handleFileSubmit}/>
                <img src={this.state.file} alt="image"/>
            </div>

        )
    }
}

export default App