import React, { Component, useState, useEffect, Suspense, useMemo } from 'react'
import { Canvas, useFrame, useLoader } from 'react-three-fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import * as THREE from 'three'
// import { Object3D } from 'three'

const Box = () => {
    const [hovered, setHovered] = useState(false)
    const [active, setActive] = useState(false)
    const props = {
      scale: active ? [1.5, 1.5, 1.5] : [1, 1, 1],
      color: hovered ? "hotpink" : "gray",
    }
  
    return (
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setActive(!active)}
        scale={props.scale}
        castShadow
      >
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshPhysicalMaterial attach="material" color={props.color} />
      </mesh>
    )
}

const Model = props => {
    const [model, setModel] = useState()
    const { url } = props

    // useMemo(() => {
    //     new OBJLoader().load(url, setModel)
    // }, [url])
    
    // return model ? <mesh object={model.scene}/> : <Box />

    useEffect(() => {
      new OBJLoader().load("/robot.obj", setModel)
    }, [])
  
    return model ? <primitive object={model.scene}/> : null
}

const Asset = props => {
    const { url } = props
    const obj = useLoader(OBJLoader, url)
    return <primitive object={obj.scene} dispose={null}/> 
}

const Cube = () => {
    return (
      <mesh>
        <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
        <meshStandardMaterial attach="material" color={'hotpink'} />
      </mesh>
    )
  }

const Scene = props => {
    // const { url } = props
    const url = process.env.PUBLIC_URL + "lego.obj"
    return (
        <Canvas>
            {/* <Box /> */}
            {/* <Model url={url}/> */}
            <Suspense fallback={<Cube />}>
                <Asset url={url} />
            </Suspense>
        </Canvas>
    )
}

export default Scene