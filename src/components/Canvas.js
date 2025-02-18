import { Suspense } from "react";
import { ACESFilmicToneMapping, SRGBColorSpace } from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text, Environment } from "@react-three/drei";
import Figure from "./Figure";
import { Environment3D } from "./Environment3D";

const Loading = () => {
  return <Text>Loading</Text>;
};

const Scene = () => (
  <>
    <color attach="background" args={["#f0f0f0"]} />
    <fog attach="fog" args={["#f0f0f0", 0, 100]} />

    <OrbitControls enableZoom={true} enablePan={true} />

    <ambientLight intensity={0.5} />
    <directionalLight
      position={[10, 10, 5]}
      intensity={1}
      castShadow
      shadow-mapSize={[1024, 1024]}
    />

    <Environment preset="city" />
    <Environment3D />

    <Figure position={[0, 5, 0]} />
  </>
);

export const CustomCanvas = () => (
  <Canvas
    camera={{ position: [0, 10, 20] }}
    shadows
    gl={{
      antialias: true,
      toneMapping: ACESFilmicToneMapping,
      outputEncoding: SRGBColorSpace,
    }}
  >
    <Suspense fallback={<Loading />}>
      <Scene />
    </Suspense>
  </Canvas>
);
