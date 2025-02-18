import { useControls } from "leva";

const GOOD_SVG_OPTIONS = {
  Toucan: "/toucan.svg",
  Adidas: "/adidas3.svg",
  Coffee: "/coffee.svg",
  "Signature 1": "/signature1.svg",
  "Signature 2": "/signature2.svg",
  "Brazil Map": "/brazil-map.svg",
  Insignia: "/oyu.svg",
  "Adidas (bad)": "/adidas4.svg",
};

export const useSceneControls = () => {
  return useControls({
    isCCW: {
      value: false,
      label: "Counterclockwise",
    },
    selectedSvg: {
      options: GOOD_SVG_OPTIONS,
      value: GOOD_SVG_OPTIONS.Toucan,
      label: "SVG",
    },
    depth: {
      value: 10,
      min: 1,
      max: 50,
      step: 1,
      label: "Depth",
    },
    scale: {
      value: 0.07,
      min: 0.01,
      max: 1,
      step: 0.01,
      label: "Scale",
    },
    bevelEnabled: {
      value: false,
      label: "Enable Bevel",
    },
    bevelThickness: {
      value: 0.2,
      min: 0,
      max: 2,
      step: 0.1,
      label: "Bevel Thickness",
    },
    bevelSize: {
      value: 0.2,
      min: 0,
      max: 2,
      step: 0.1,
      label: "Bevel Size",
    },
    bevelSegments: {
      value: 3,
      min: 1,
      max: 10,
      step: 1,
      label: "Bevel Segments",
    },
    color: {
      value: "#ff0000",
      label: "Color",
    },
    metalness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.1,
      label: "Metalness",
    },
    roughness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.1,
      label: "Roughness",
    },
    wireframe: {
      value: false,
      label: "Wireframe",
    },
    rotationX: {
      value: Math.PI,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: 0.1,
      label: "Rotation X",
    },
    rotationY: {
      value: 0,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: 0.1,
      label: "Rotation Y",
    },
    rotationZ: {
      value: 0,
      min: -Math.PI * 2,
      max: Math.PI * 2,
      step: 0.1,
      label: "Rotation Z",
    },
    simplifyTolerance: {
      value: 0,
      min: 0,
      max: 10,
      step: 0.1,
      label: "Simplify Tolerance",
    },
    curveSegments: {
      value: 12,
      min: 1,
      max: 30,
      step: 1,
      label: "Curve Segments",
    },
  });
};
