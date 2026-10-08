import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const ModelLoadingFallback: React.FC<{ accentColor?: string }> = ({
  accentColor = '#00f0ff',
}) => {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.y += delta * 1.5;
    }
  });

  return (
    <group position={[0, 0.4, 0]}>
      {/* Sleek wireframe holographic silhouette while loading */}
      <mesh>
        <boxGeometry args={[1.85, 0.45, 4.3]} />
        <meshBasicMaterial color={accentColor} wireframe transparent opacity={0.4} />
      </mesh>

      {/* Rotating Holographic Telemetry Rings */}
      <group ref={ringRef}>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.4, 2.45, 64]} />
          <meshBasicMaterial color={accentColor} transparent opacity={0.8} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.8, 1.83, 32]} />
          <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Central Pulsing Beacon */}
      <pointLight color={accentColor} intensity={25} distance={5} />
    </group>
  );
};
