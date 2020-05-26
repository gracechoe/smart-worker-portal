import React, { Suspense, useRef, useRender } from "react";
import { Canvas, useThree, useLoader } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import PropTypes from "prop-types";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Box from "./Box";

// const Asset = ({ url, fileName }) => {
//   const obj = useLoader(OBJLoader, "robot.obj");
//   if (url == "") {
//     return <Box position={[0, 0, 0]} />;
//   } else {
//     console.log(obj);
//     obj.scale.set(1, 1, 1);
//     // useFrame(() => (obj.rotation.y += 0.01));
//     return <primitive object={obj} dispose={null} />;
//   }
// };

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

const Model = ({ object }) => {
  return object ? (
    <primitive object={object} dispose={null} />
  ) : (
    <Box position={[0, 0, 0]} />
  );
};

Model.propTypes = {
  object: PropTypes.object.isRequired,
};

const Scene = ({ obj }) => {
  return (
    <>
      <Canvas
        style={{ width: 500, height: 300 }}
        camera={{
          fov: 75,
          far: 1000,
          position: [50, 70, 70],
        }}
      >
        <pointLight position={[50, 50, 50]} />
        <Model object={obj} />
        {/* <Suspense fallback={<Box />}>
          <Model object={obj} />
        </Suspense> */}
      </Canvas>
    </>
  );
};

export default Scene;
