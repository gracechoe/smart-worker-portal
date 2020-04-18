import React, { useState, Suspense, useRef, useRender } from "react";
import { Canvas, useFrame, useLoader, useThree } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const LoadOBJ = (url) => {
  return useLoader(OBJLoader, url);
};

const LoadFBX = (url) => {
  return useLoader(FBXLoader, url);
};

const loaderMap = {
  obj: LoadOBJ,
  fbx: LoadFBX,
};

const Box = (props) => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
    >
      <boxBufferGeometry attach="geometry" args={[30, 30, 30]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};

const getModelType = (fileName) => {
  var objExt = /(\.obj)$/i;
  var fbxExt = /(\.fbx)$/i;
  if (objExt.exec(fileName)) {
    return "obj";
  }
  if (fbxExt.exec(fileName)) {
    return "fbx";
  }
};

const Asset = ({ url, fileName }) => {
  // const { camera } = useThree();
  // for (var mesh of obj.children) {
  //   mesh.scale.set(1, 1, 1);
  // }

  var obj;
  var loader = loaderMap[getModelType(fileName)];
  obj = loader(url);

  // console.log(obj);
  obj.scale.set(1, 1, 1);
  useFrame(() => (obj.rotation.y += 0.01));
  return <primitive object={obj} dispose={null} />;
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useRender(() => {
    orbitRef.current.update();
  });

  return (
    <orbitControls
      autoRotate
      maxPolarAngle={Math.PI / 3}
      minPolarAngle={Math.PI / 3}
      args={[camera, gl.domElement]}
      ref={orbitRef}
    />
  );
};

const Scene = ({ url, fileName }) => {
  return (
    <>
      <Canvas
        style={{ width: 1000, height: 500 }}
        camera={{
          fov: 75,
          far: 1000,
          position: [300, 300, 300],
        }}
      >
        <pointLight position={[50, 50, 50]} />
        <Suspense fallback={<Box />}>
          <Asset url={String(url)} fileName={fileName} />
        </Suspense>
      </Canvas>
    </>
  );
};

export default Scene;
