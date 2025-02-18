import { Grid } from "@react-three/drei";

export const Environment3D = () => (
  <>
    <Grid
      renderOrder={-1}
      position={[0, -0.5, 0]}
      infiniteGrid
      cellSize={0.6}
      cellThickness={0.6}
      sectionSize={3.3}
      sectionThickness={1}
      sectionColor="#606060"
      fadeDistance={30}
      fadeStrength={1}
    />
  </>
);
