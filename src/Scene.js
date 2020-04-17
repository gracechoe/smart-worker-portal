import React, { useState, useEffect, Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "react-three-fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";

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
      <boxBufferGeometry attach="geometry" args={[1, 1, 1]} />
      <meshStandardMaterial
        attach="material"
        color={hovered ? "hotpink" : "orange"}
      />
    </mesh>
  );
};

const Asset = ({ url }) => {
  var obj = useLoader(OBJLoader, url);
  console.log(obj);
  var mesh = obj.children[0];
  mesh.scale.set(1, 1, 1);
  useFrame(() => (mesh.rotation.x = mesh.rotation.y += 0.01));
  return <primitive object={obj} dispose={null} />;
};

const Scene = ({ url }) => {
  return (
    <Canvas>
      <pointLight position={[10, 10, 10]} />
      <Suspense fallback={<Box />}>
        <Asset url={String(url)} />
      </Suspense>
    </Canvas>
  );
};

export default Scene;
