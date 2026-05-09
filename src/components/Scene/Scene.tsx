import { useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { useDevicePerf } from '../../hooks/useDevicePerf';
import { paramsForTier } from './constants';
import NeuralNetwork from './NeuralNetwork';

export default function Scene() {
  const tier = useDevicePerf();
  // Memoize per-tier params so the reference is stable across re-renders.
  // Without this, NeuralNetwork's useMemo (which depends on params) would
  // rebuild the whole node graph with new random positions every render,
  // causing a visible flicker / rearrange.
  const params = useMemo(() => paramsForTier(tier), [tier]);

  return (
    <Canvas
      dpr={params.dpr}
      camera={{ position: [0, 0, 9], fov: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={0.6} color="#22D3EE" />
      <pointLight position={[-8, -6, -10]} intensity={0.4} color="#A78BFA" />
      <NeuralNetwork params={params} />
      {params.bloom && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.7}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={0.7} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
