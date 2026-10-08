import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WindTunnelProps {
  active: boolean;
  accentColor: string;
}

export const WindTunnelAero: React.FC<WindTunnelProps> = ({ active, accentColor }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 180;

  // Generate stream particles
  const [positions, speeds] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const spd = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 1.8;
      const y = 0.2 + Math.random() * 0.9;
      const z = -3.5 + Math.random() * 8.0;

      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      spd[i] = 4.0 + Math.random() * 5.0;
    }

    return [pos, spd];
  }, [particleCount]);

  useFrame((_, delta) => {
    if (!active || !pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const array = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      let z = array[i * 3 + 2];
      z -= speeds[i] * delta; // Air moves front to back (Z goes from front positive to rear negative)

      // Reset when particle exits behind car
      if (z < -4.0) {
        z = 4.5 + Math.random() * 0.5;
        array[i * 3] = (Math.random() - 0.5) * 1.8;
        array[i * 3 + 1] = 0.2 + Math.random() * 0.9;
      }

      // Aerodynamic curvature calculation over car body
      const x = array[i * 3];
      let y = array[i * 3 + 1];

      // Nose curve (Z from 2.2 to 1.0)
      if (z > 0.8 && z < 2.2) {
        y = THREE.MathUtils.lerp(y, 0.45 + Math.abs(x) * 0.05, 0.08);
      }
      // Windshield lift (Z from 0.8 to -0.3)
      else if (z >= -0.3 && z <= 0.8) {
        y = THREE.MathUtils.lerp(y, 0.95 - (z - 0.2) * 0.4, 0.12);
      }
      // Rear wing vortex downforce (Z around -1.8)
      else if (z < -1.5 && z > -2.2) {
        y = THREE.MathUtils.lerp(y, 0.82 + Math.sin(z * 4) * 0.05, 0.08);
      }

      array[i * 3 + 1] = y;
      array[i * 3 + 2] = z;
    }

    posAttr.needsUpdate = true;
  });

  if (!active) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color={accentColor || '#00f0ff'}
        size={0.065}
        transparent
        opacity={0.75}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};
