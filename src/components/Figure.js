import React, { useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useSceneControls } from "./Controls";
import { mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';


const Figure = ({ position }) => {
  const {
    isCCW,
    selectedSvg,
    depth,
    scale,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelSegments,
    color,
    metalness,
    roughness,
    wireframe,
    rotationX,
    rotationY,
    rotationZ,
    curveSegments,
  } = useSceneControls();

  const svgData = useLoader(SVGLoader, selectedSvg);
  const meshRef = useRef();

  const shapes = svgData.paths.flatMap((path) => path.toShapes(isCCW));

  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth,
    bevelEnabled,
    bevelThickness,
    bevelSize,
    bevelSegments,
    curveSegments,
  });
  geometry.center();

  return (
    <mesh
      position={position}
      geometry={geometry}
      scale={scale}
      rotation={[rotationX, rotationY, rotationZ]}
      ref={meshRef}
    >
      <meshStandardMaterial
        color={color}
        metalness={metalness}
        roughness={roughness}
        wireframe={wireframe}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export default Figure;
