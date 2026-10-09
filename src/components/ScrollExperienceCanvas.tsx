import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { RealisticCarModel } from './RealisticCarModel';
import { ModelLoadingFallback } from './ModelLoadingFallback';
import { WindTunnelAero } from './WindTunnelAero';

interface ScrollExperienceCanvasProps {
  scrollProgress: number; // 0.0 to 1.0
  isFreeOrbit: boolean;
  color: string;
  finish: 'metallic' | 'matte' | 'carbon';
  silhouette: 'porsche' | 'nissan' | 'lamborghini' | 'toyota';
  accentColor: string;
  wheelSpinSpeed: number;
}

// Cinematic Camera Choreographer that smoothly interpolates based on scroll
const CinematicCameraRig: React.FC<{
  scrollProgress: number;
  isFreeOrbit: boolean;
}> = ({ scrollProgress, isFreeOrbit }) => {
  const currentPos = useRef(new THREE.Vector3(4.8, 1.8, 5.0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0.4, 0));

  useFrame(({ camera }, delta) => {
    if (isFreeOrbit) return;

    // Define Camera Choreography Keyframes [x, y, z] and [lookAtX, lookAtY, lookAtZ]
    const keyframes = [
      // 0. Hero Overview (0.0)
      { pos: [4.8, 1.8, 5.0], target: [0, 0.4, 0] },
      // 1. Front Aero Zoom (0.22)
      { pos: [2.2, 0.85, 2.7], target: [0.2, 0.35, 1.3] },
      // 2. Low Side Stance & Powertrain (0.45)
      { pos: [4.0, 0.65, 0.0], target: [0, 0.35, 0] },
      // 3. Overhead Cockpit & Monocoque (0.68)
      { pos: [1.4, 3.8, 1.4], target: [0, 0.3, 0] },
      // 4. Rear Diffuser & Active Wing (0.85)
      { pos: [-2.4, 0.95, -3.8], target: [0, 0.5, -0.8] },
      // 5. Studio Turntable Landing (1.0)
      { pos: [4.2, 1.8, 4.6], target: [0, 0.4, 0] },
    ];

    // Calculate segment interpolation
    const totalSegments = keyframes.length - 1;
    const progress = Math.min(Math.max(scrollProgress, 0), 1);
    const scaled = progress * totalSegments;
    const index = Math.floor(scaled);
    const nextIndex = Math.min(index + 1, totalSegments);
    const segmentT = scaled - index;

    // Smooth cubic easing for silky transitions
    const easedT = segmentT * segmentT * (3 - 2 * segmentT);

    const k1 = keyframes[index];
    const k2 = keyframes[nextIndex];

    const targetX = THREE.MathUtils.lerp(k1.pos[0], k2.pos[0], easedT);
    const targetY = THREE.MathUtils.lerp(k1.pos[1], k2.pos[1], easedT);
    const targetZ = THREE.MathUtils.lerp(k1.pos[2], k2.pos[2], easedT);

    const lookX = THREE.MathUtils.lerp(k1.target[0], k2.target[0], easedT);
    const lookY = THREE.MathUtils.lerp(k1.target[1], k2.target[1], easedT);
    const lookZ = THREE.MathUtils.lerp(k1.target[2], k2.target[2], easedT);

    // Smooth lerp camera towards targets
    const lerpSpeed = Math.min(delta * 4.5, 0.15);
    currentPos.current.x = THREE.MathUtils.lerp(currentPos.current.x, targetX, lerpSpeed);
    currentPos.current.y = THREE.MathUtils.lerp(currentPos.current.y, targetY, lerpSpeed);
    currentPos.current.z = THREE.MathUtils.lerp(currentPos.current.z, targetZ, lerpSpeed);

    currentLookAt.current.x = THREE.MathUtils.lerp(currentLookAt.current.x, lookX, lerpSpeed);
    currentLookAt.current.y = THREE.MathUtils.lerp(currentLookAt.current.y, lookY, lerpSpeed);
    currentLookAt.current.z = THREE.MathUtils.lerp(currentLookAt.current.z, lookZ, lerpSpeed);

    camera.position.copy(currentPos.current);
    camera.lookAt(currentLookAt.current);
  });

  return null;
};

export const ScrollExperienceCanvas: React.FC<ScrollExperienceCanvasProps> = ({
  scrollProgress,
  isFreeOrbit,
  color,
  finish,
  silhouette,
  accentColor,
  wheelSpinSpeed,
}) => {
  // Compute dynamic state based on scroll section:
  // - Wind Tunnel particles active around Chapter 1 (0.15 to 0.4)
  const isAeroChapter = scrollProgress > 0.12 && scrollProgress < 0.42;

  // - Doors open around Chapter 3 (0.55 to 0.76)
  const doorsOpen = scrollProgress > 0.55 && scrollProgress < 0.76;

  // - Active DRS wing tilts up around Chapter 4 (0.75 to 0.95)
  const wingActive = scrollProgress > 0.72 && scrollProgress < 0.95;

  // - Dynamic spin speed during scroll
  const effectiveSpinSpeed = wheelSpinSpeed > 0 ? wheelSpinSpeed : (scrollProgress > 0.3 && scrollProgress < 0.6 ? 0.8 : 0);

  return (
    <div className="w-full h-full relative select-none">
      <Canvas
        camera={{ position: [4.8, 1.8, 5.0], fov: 42 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
      >
        {/* Cinematic Studio Lights */}
        <ambientLight intensity={0.6} color="#0f172a" />
        <directionalLight position={[6, 9, 6]} intensity={2.2} color="#ffffff" />
        <directionalLight position={[-6, 5, -6]} intensity={1.4} color={accentColor} />
        <spotLight position={[0, 9, 2]} intensity={40} angle={0.6} penumbra={0.8} color="#ffffff" />

        {/* Real 3D Supercar Model */}
        <Suspense fallback={<ModelLoadingFallback accentColor={accentColor} />}>
          <RealisticCarModel
            color={color}
            finish={finish}
            silhouette={silhouette}
            headlightsOn={true}
            doorsOpen={doorsOpen}
            wingActive={wingActive}
            wireframe={false}
            underglow={true}
            wheelSpinSpeed={effectiveSpinSpeed}
          />
        </Suspense>

        {/* Aerodynamic Wind Tunnel Flow Streamlines */}
        <WindTunnelAero active={isAeroChapter} accentColor={accentColor} />

        {/* Contact Shadow on Floor - Precomputed with frames=1 */}
        <ContactShadows
          position={[0, 0.005, 0]}
          opacity={0.8}
          scale={10}
          blur={1.8}
          far={3.5}
          resolution={512}
          frames={1}
        />

        {/* Studio Floor & Turntable */}
        <group position={[0, 0, 0]}>
          <gridHelper args={[32, 32, '#1e293b', '#0f172a']} position={[0, 0.001, 0]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <circleGeometry args={[5.2, 48]} />
            <meshStandardMaterial color="#090d16" roughness={0.2} metalness={0.85} />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
            <ringGeometry args={[5.15, 5.25, 64]} />
            <meshBasicMaterial
              color={accentColor || '#38bdf8'}
              transparent
              opacity={0.7}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>

        {/* Cinematic Camera Rig driven by Scroll */}
        <CinematicCameraRig scrollProgress={scrollProgress} isFreeOrbit={isFreeOrbit} />

        {/* Orbit Controls (Active when in Free Orbit Mode or at the end turntable) */}
        {isFreeOrbit && (
          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.06}
            minDistance={2.4}
            maxDistance={9.5}
            maxPolarAngle={Math.PI / 2 - 0.04}
            autoRotate={false}
          />
        )}
      </Canvas>
    </div>
  );
};
