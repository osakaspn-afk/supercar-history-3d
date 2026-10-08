import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RealisticCarModel } from './RealisticCarModel';
import { ModelLoadingFallback } from './ModelLoadingFallback';
import type { Car3DProps } from './Car3DModel';
import { WindTunnelAero } from './WindTunnelAero';

export type CameraPreset = 'cinematic' | 'front_quarter' | 'side_profile' | 'rear_aero' | 'top_aero' | 'wheel_focus';
export type StudioEnvironment = 'cyber' | 'showroom' | 'sunset' | 'aero';

interface ShowroomCanvasProps extends Car3DProps {
  autoRotate: boolean;
  cameraPreset: CameraPreset;
  environment: StudioEnvironment;
  windTunnelActive: boolean;
  accentColor: string;
}

// Controller to smoothly animate OrbitControls camera position to preset angles
const CameraController: React.FC<{ preset: CameraPreset; autoRotate: boolean }> = ({ preset, autoRotate }) => {
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (!controlsRef.current) return;
    const controls = controlsRef.current;

    switch (preset) {
      case 'cinematic':
        controls.object.position.set(4.5, 2.2, 5.0);
        controls.target.set(0, 0.4, 0);
        break;
      case 'front_quarter':
        controls.object.position.set(3.6, 1.4, 3.8);
        controls.target.set(0, 0.4, 0.4);
        break;
      case 'side_profile':
        controls.object.position.set(5.2, 0.8, 0.0);
        controls.target.set(0, 0.4, 0);
        break;
      case 'rear_aero':
        controls.object.position.set(-2.8, 1.5, -4.2);
        controls.target.set(0, 0.6, -1.0);
        break;
      case 'top_aero':
        controls.object.position.set(0.01, 7.5, 0.2);
        controls.target.set(0, 0, 0);
        break;
      case 'wheel_focus':
        controls.object.position.set(2.4, 0.45, 1.6);
        controls.target.set(0.9, 0.35, 1.35);
        break;
    }
    controls.update();
  }, [preset]);

  return (
    <OrbitControls
      ref={controlsRef}
      enablePan={false}
      enableDamping
      dampingFactor={0.06}
      minDistance={2.4}
      maxDistance={9.5}
      maxPolarAngle={Math.PI / 2 - 0.04} // Prevent clipping below the floor
      autoRotate={autoRotate}
      autoRotateSpeed={1.2}
    />
  );
};

export const ShowroomCanvas: React.FC<ShowroomCanvasProps> = ({
  autoRotate,
  cameraPreset,
  environment,
  windTunnelActive,
  accentColor,
  ...carProps
}) => {
  // Configure environment lighting
  const getLighting = () => {
    switch (environment) {
      case 'cyber':
        return (
          <>
            <ambientLight intensity={0.4} color="#0f172a" />
            <directionalLight position={[6, 8, 5]} intensity={1.5} color="#38bdf8" />
            <directionalLight position={[-6, 4, -5]} intensity={1.8} color="#ec4899" />
            <spotLight position={[0, 9, 0]} intensity={40} angle={0.5} penumbra={0.7} color="#ffffff" castShadow />
          </>
        );
      case 'sunset':
        return (
          <>
            <ambientLight intensity={0.6} color="#78350f" />
            <directionalLight position={[10, 6, 8]} intensity={3.0} color="#fb923c" castShadow />
            <directionalLight position={[-8, 3, -6]} intensity={1.2} color="#f43f5e" />
          </>
        );
      case 'aero':
        return (
          <>
            <ambientLight intensity={0.5} color="#0369a1" />
            <directionalLight position={[0, 10, 4]} intensity={2.8} color="#e0f2fe" />
            <directionalLight position={[0, -2, 0]} intensity={0.4} color="#0284c7" />
          </>
        );
      case 'showroom':
      default:
        return (
          <>
            <ambientLight intensity={0.8} color="#ffffff" />
            <directionalLight position={[5, 10, 5]} intensity={2.2} color="#ffffff" castShadow />
            <directionalLight position={[-5, 7, -5]} intensity={1.4} color="#e2e8f0" />
            <spotLight position={[0, 8, 0]} intensity={45} angle={0.65} penumbra={0.8} color="#ffffff" />
          </>
        );
    }
  };

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        shadows
        camera={{ position: [4.2, 1.8, 4.6], fov: 42 }}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        {/* Environment Lights */}
        {getLighting()}

        {/* Real 3D Supercar Model */}
        <Suspense fallback={<ModelLoadingFallback accentColor={accentColor} />}>
          <RealisticCarModel {...carProps} />
        </Suspense>

        {/* Aerodynamic Wind Tunnel Particles */}
        <WindTunnelAero active={windTunnelActive} accentColor={accentColor} />

        {/* Soft Contact Ground Shadows */}
        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.75}
          scale={10}
          blur={1.8}
          far={3.5}
        />

        {/* Studio Ground Grid & Floor */}
        <group position={[0, 0, 0]}>
          {/* Subtle Grid floor */}
          <gridHelper
            args={[30, 30, environment === 'cyber' ? '#ec4899' : '#334155', '#1e293b']}
            position={[0, 0.001, 0]}
          />
          {/* Circular Showroom Turntable */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
            <circleGeometry args={[4.8, 64]} />
            <meshStandardMaterial
              color={environment === 'cyber' ? '#090d16' : '#0d131f'}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
          {/* Outer Ring Accent */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
            <ringGeometry args={[4.75, 4.85, 64]} />
            <meshBasicMaterial
              color={accentColor || '#38bdf8'}
              transparent
              opacity={0.65}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* Camera Preset & Interactive Orbit Controls */}
        <CameraController preset={cameraPreset} autoRotate={autoRotate} />
      </Canvas>
    </div>
  );
};
