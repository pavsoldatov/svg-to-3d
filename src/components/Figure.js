import React, { useCallback, useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader";
import { useSceneControls } from "./Controls";
import { GLTFExporter, STLExporter } from "three/examples/jsm/Addons.js";

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

  const handleGLBExport = useCallback(() => {
    if (!meshRef.current) return;

    const exporter = new GLTFExporter();

    // Create a scene with just your mesh to preserve transforms
    const scene = new THREE.Scene();
    const meshClone = meshRef.current.clone();
    scene.add(meshClone);

    const options = {
      binary: true,
      trs: true,
    };

    exporter.parse(
      scene, // Export the scene instead of just the mesh
      (buffer) => {
        const blob = new Blob([buffer], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "model.glb";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        meshClone.geometry.dispose();
        if (meshClone.material) {
          if (Array.isArray(meshClone.material)) {
            meshClone.material.forEach((material) => material.dispose());
          } else {
            meshClone.material.dispose();
          }
        }
        scene.remove(meshClone);
        meshClone.clear();
      },
      (error) => {
        console.error("An error occurred while exporting:", error);
      },
      options
    );
  }, []);

  const handleSTLExport = useCallback(() => {
    if (!meshRef.current) return;

    const exporter = new STLExporter();

    // Create a scene with the mesh to preserve transforms
    const scene = new THREE.Scene();
    const meshClone = meshRef.current.clone();
    scene.add(meshClone);

    const result = exporter.parse(scene, { binary: true });

    // Create blob and download
    const blob = new Blob([result], { type: "application/octet-stream" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "model.stl";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    meshClone.geometry.dispose();
    if (meshClone.material) {
      if (Array.isArray(meshClone.material)) {
        meshClone.material.forEach((material) => material.dispose());
      } else {
        meshClone.material.dispose();
      }
    }
    scene.remove(meshClone);
    meshClone.clear();
  }, []);

  useEffect(() => {
    window.addEventListener("export-glb", handleGLBExport);
    return () => window.removeEventListener("export-glb", handleGLBExport);
  }, [handleGLBExport]);

  useEffect(() => {
    window.addEventListener("export-stl", handleSTLExport);
    return () => window.removeEventListener("export-stl", handleSTLExport);
  }, [handleSTLExport]);

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
