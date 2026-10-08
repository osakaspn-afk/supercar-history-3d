import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface Car3DProps {
  color: string;
  finish: 'metallic' | 'matte' | 'carbon';
  silhouette: 'porsche' | 'nissan' | 'lamborghini' | 'toyota';
  headlightsOn: boolean;
  doorsOpen: boolean;
  wingActive: boolean;
  wireframe: boolean;
  underglow: boolean;
  wheelSpinSpeed: number;
}

export const Car3DModel: React.FC<Car3DProps> = ({
  color,
  finish,
  silhouette,
  headlightsOn,
  doorsOpen,
  wingActive,
  wireframe,
  underglow,
  wheelSpinSpeed,
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const leftDoorRef = useRef<THREE.Group>(null);
  const rightDoorRef = useRef<THREE.Group>(null);
  const wingRef = useRef<THREE.Group>(null);
  const wheelRefs = useRef<THREE.Group[]>([]);

  // Car Body Material based on finish and color
  const bodyMaterial = useMemo(() => {
    if (wireframe) {
      return new THREE.MeshBasicMaterial({
        color: new THREE.Color(color).offsetHSL(0, 0, 0.2),
        wireframe: true,
      });
    }

    if (finish === 'matte') {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.65,
        metalness: 0.15,
      });
    }

    if (finish === 'carbon') {
      return new THREE.MeshStandardMaterial({
        color: new THREE.Color('#141417'),
        roughness: 0.35,
        metalness: 0.8,
      });
    }

    // Default: High-gloss metallic clearcoat
    return new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      reflectivity: 0.9,
    });
  }, [color, finish, wireframe]);

  // Carbon fiber accents material
  const carbonMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x181a1f,
      roughness: 0.4,
      metalness: 0.6,
      wireframe,
    });
  }, [wireframe]);

  // Glass material for windows and cockpit canopy
  const glassMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: 0x111622,
      metalness: 0.1,
      roughness: 0.05,
      transmission: 0.75,
      thickness: 0.8,
      transparent: true,
      opacity: 0.85,
      wireframe,
    });
  }, [wireframe]);

  // Headlight material with bloom emission
  const headlightEmissiveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: headlightsOn ? 0xffffff : 0x475569,
      emissive: headlightsOn ? 0xa5f3fc : 0x000000,
      emissiveIntensity: headlightsOn ? 3.5 : 0,
      roughness: 0.1,
    });
  }, [headlightsOn]);

  // Taillight material
  const taillightEmissiveMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: headlightsOn ? 0xff0022 : 0x450a0a,
      emissive: headlightsOn ? 0xff0033 : 0x200000,
      emissiveIntensity: headlightsOn ? 3.8 : 0.3,
      roughness: 0.2,
    });
  }, [headlightsOn]);

  // Wheel rim material
  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x262930,
      metalness: 0.9,
      roughness: 0.2,
      wireframe,
    });
  }, [wireframe]);

  // Tire rubber material
  const tireMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: 0x121316,
      roughness: 0.85,
      metalness: 0.1,
      wireframe,
    });
  }, [wireframe]);

  // Brake caliper material (Vibrant sports caliper)
  const caliperMaterial = useMemo(() => {
    const caliperColor =
      silhouette === 'porsche'
        ? 0xa3e635 // Acid Green / Racing Yellow
        : silhouette === 'nissan'
        ? 0xdc2626 // Nismo Red
        : silhouette === 'lamborghini'
        ? 0xeab308 // Giallo Yellow
        : 0xf97316; // GR Orange
    return new THREE.MeshStandardMaterial({
      color: caliperColor,
      metalness: 0.5,
      roughness: 0.3,
      wireframe,
    });
  }, [silhouette, wireframe]);

  // Animation updates (Doors, wing, wheels)
  useFrame((_, delta) => {
    // Door opening animation
    if (leftDoorRef.current && rightDoorRef.current) {
      if (silhouette === 'lamborghini') {
        // Scissor doors (rotate upward on X & Z axis)
        const targetRotX = doorsOpen ? -Math.PI * 0.42 : 0;
        leftDoorRef.current.rotation.x = THREE.MathUtils.lerp(leftDoorRef.current.rotation.x, targetRotX, delta * 5);
        rightDoorRef.current.rotation.x = THREE.MathUtils.lerp(rightDoorRef.current.rotation.x, targetRotX, delta * 5);
        leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, doorsOpen ? -0.15 : 0, delta * 5);
        rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, doorsOpen ? 0.15 : 0, delta * 5);
      } else {
        // Butterfly / Coupe doors (swing outward on Y axis)
        const targetAngle = doorsOpen ? 0.75 : 0;
        leftDoorRef.current.rotation.y = THREE.MathUtils.lerp(leftDoorRef.current.rotation.y, -targetAngle, delta * 5);
        rightDoorRef.current.rotation.y = THREE.MathUtils.lerp(rightDoorRef.current.rotation.y, targetAngle, delta * 5);
        leftDoorRef.current.rotation.x = THREE.MathUtils.lerp(leftDoorRef.current.rotation.x, 0, delta * 5);
        rightDoorRef.current.rotation.x = THREE.MathUtils.lerp(rightDoorRef.current.rotation.x, 0, delta * 5);
      }
    }

    // Active Aero Wing / DRS adjustment
    if (wingRef.current) {
      const targetPitch = wingActive ? -0.32 : -0.05; // Elevated high-downforce pitch vs low drag
      const targetElevation = wingActive ? 0.18 : 0;
      wingRef.current.rotation.x = THREE.MathUtils.lerp(wingRef.current.rotation.x, targetPitch, delta * 6);
      wingRef.current.position.y = THREE.MathUtils.lerp(wingRef.current.position.y, 0.72 + targetElevation, delta * 6);
    }

    // Spin wheels according to speed
    if (wheelSpinSpeed > 0) {
      wheelRefs.current.forEach((wheel) => {
        if (wheel) {
          wheel.rotation.x += delta * wheelSpinSpeed * 15;
        }
      });
    }
  });

  // Unique silhouettes parameters
  const isPorsche = silhouette === 'porsche';
  const isLambo = silhouette === 'lamborghini';
  const isNissan = silhouette === 'nissan';
  const isToyota = silhouette === 'toyota';

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* ============================================================ */}
      {/* 1. MAIN CHASSIS & LOWER BODY */}
      {/* ============================================================ */}
      {/* Lower underbody floor & floor pan */}
      <mesh position={[0, 0.18, 0]} material={carbonMaterial}>
        <boxGeometry args={[1.9, 0.08, 4.4]} />
      </mesh>

      {/* Front splitter */}
      <mesh position={[0, 0.14, 2.22]} material={carbonMaterial}>
        <boxGeometry args={[1.92, 0.04, 0.42]} />
      </mesh>

      {/* Rear diffuser with vertical strakes */}
      <mesh position={[0, 0.22, -2.18]} material={carbonMaterial} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[1.88, 0.14, 0.52]} />
      </mesh>
      {[-0.6, -0.2, 0.2, 0.6].map((xOffset, i) => (
        <mesh key={`diffuser-strake-${i}`} position={[xOffset, 0.18, -2.25]} material={carbonMaterial} rotation={[0.2, 0, 0]}>
          <boxGeometry args={[0.03, 0.12, 0.45]} />
        </mesh>
      ))}

      {/* Main Central Monocoque Body */}
      <mesh
        position={[0, 0.42, 0.05]}
        material={bodyMaterial}
        castShadow
        receiveShadow
      >
        {isLambo ? (
          // Wedge shape for Lamborghini
          <boxGeometry args={[1.86, 0.38, 4.2]} />
        ) : isNissan ? (
          // Muscular broad GT-R stance
          <boxGeometry args={[1.94, 0.46, 4.3]} />
        ) : isToyota ? (
          // Sculpted GT Supra / LFA body
          <boxGeometry args={[1.85, 0.42, 4.25]} />
        ) : (
          // Porsche teardrop curved body
          <boxGeometry args={[1.82, 0.44, 4.15]} />
        )}
      </mesh>

      {/* Front Hood / Nose Cone */}
      <mesh
        position={[0, isLambo ? 0.38 : 0.48, 1.48]}
        material={bodyMaterial}
        rotation={[isLambo ? 0.18 : 0.08, 0, 0]}
        castShadow
      >
        <boxGeometry args={[1.72, 0.24, 1.45]} />
      </mesh>

      {/* Front Hood Nostrils / Aerodynamic vents (iconic GT3 RS / Nismo / LFA) */}
      {[-0.38, 0.38].map((x, i) => (
        <mesh key={`hood-vent-${i}`} position={[x, isLambo ? 0.42 : 0.52, 1.35]} material={carbonMaterial}>
          <boxGeometry args={[0.22, 0.04, 0.48]} />
        </mesh>
      ))}

      {/* Rear Deck / Engine Bay Cover */}
      <mesh
        position={[0, isPorsche ? 0.58 : 0.48, -1.35]}
        material={bodyMaterial}
        rotation={[isPorsche ? -0.18 : -0.1, 0, 0]}
        castShadow
      >
        <boxGeometry args={[1.76, 0.26, 1.62]} />
      </mesh>

      {/* Mid/Rear Engine Glass Louvres / Vented Deck */}
      <mesh position={[0, 0.55, -1.25]} material={carbonMaterial} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[1.1, 0.04, 1.1]} />
      </mesh>

      {/* ============================================================ */}
      {/* 2. CABIN & CANOPY GLASS */}
      {/* ============================================================ */}
      {/* Cockpit Greenhouse Canopy */}
      <mesh position={[0, 0.78, 0.08]} material={glassMaterial} castShadow>
        {isPorsche ? (
          // Rounded Porsche 911 dome
          <sphereGeometry args={[0.9, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.48]} />
        ) : isLambo ? (
          // Low stealth fighter canopy
          <boxGeometry args={[1.38, 0.44, 1.95]} />
        ) : isToyota ? (
          // Double-bubble roof profile
          <boxGeometry args={[1.4, 0.46, 2.05]} />
        ) : (
          // GT-R tall upright greenhouse
          <boxGeometry args={[1.44, 0.52, 2.1]} />
        )}
      </mesh>

      {/* Roof Carbon Skin */}
      <mesh position={[0, 0.98, 0.02]} material={carbonMaterial}>
        <boxGeometry args={[1.28, 0.04, 1.65]} />
      </mesh>

      {/* Windshield A-Pillars & Frame */}
      <mesh position={[0, 0.76, 0.78]} material={carbonMaterial} rotation={[0.62, 0, 0]}>
        <boxGeometry args={[1.42, 0.04, 0.95]} />
      </mesh>

      {/* ============================================================ */}
      {/* 3. DOORS (INTERACTIVE OPEN/CLOSE) */}
      {/* ============================================================ */}
      {/* Left Door */}
      <group
        ref={leftDoorRef}
        position={[-0.94, 0.5, 0.25]} // Pivot point on front fender
      >
        <mesh position={[0, 0, -0.45]} material={bodyMaterial} castShadow>
          <boxGeometry args={[0.12, 0.46, 1.15]} />
        </mesh>
        {/* Left Side Mirror */}
        <mesh position={[-0.14, 0.24, -0.1]} material={carbonMaterial}>
          <boxGeometry args={[0.22, 0.1, 0.14]} />
        </mesh>
      </group>

      {/* Right Door */}
      <group
        ref={rightDoorRef}
        position={[0.94, 0.5, 0.25]} // Pivot point on front fender
      >
        <mesh position={[0, 0, -0.45]} material={bodyMaterial} castShadow>
          <boxGeometry args={[0.12, 0.46, 1.15]} />
        </mesh>
        {/* Right Side Mirror */}
        <mesh position={[0.14, 0.24, -0.1]} material={carbonMaterial}>
          <boxGeometry args={[0.22, 0.1, 0.14]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 4. ACTIVE AERODYNAMIC REAR WING (SPOILER) */}
      {/* ============================================================ */}
      <group ref={wingRef} position={[0, 0.72, -1.88]}>
        {/* Swan neck vertical wing uprights / struts */}
        <mesh position={[-0.55, 0.15, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.04, 0.34, 0.18]} />
        </mesh>
        <mesh position={[0.55, 0.15, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.04, 0.34, 0.18]} />
        </mesh>

        {/* Main Aerofoil Blade */}
        <mesh position={[0, 0.32, 0]} material={carbonMaterial} castShadow>
          <boxGeometry
            args={[
              isPorsche ? 2.05 : isNissan ? 1.95 : isLambo ? 1.9 : 1.85,
              0.05,
              0.42,
            ]}
          />
        </mesh>

        {/* Wing Endplates */}
        <mesh position={[-1.02, 0.32, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.03, 0.22, 0.46]} />
        </mesh>
        <mesh position={[1.02, 0.32, 0]} material={carbonMaterial}>
          <boxGeometry args={[0.03, 0.22, 0.46]} />
        </mesh>
      </group>

      {/* ============================================================ */}
      {/* 5. LIGHTING FIXTURES (HEADLIGHTS & TAILLIGHTS) */}
      {/* ============================================================ */}
      {/* Headlights (Left & Right) */}
      {[-0.65, 0.65].map((x, i) => (
        <group key={`headlight-${i}`} position={[x, 0.42, 2.12]}>
          <mesh material={headlightEmissiveMaterial}>
            {isPorsche ? (
              // 911 Iconic Rounded Quad-LED cluster
              <cylinderGeometry args={[0.13, 0.13, 0.08, 16]} />
            ) : isLambo ? (
              // Sharp angular Y-cluster
              <boxGeometry args={[0.28, 0.08, 0.14]} />
            ) : (
              // Slender modern sports headlight
              <boxGeometry args={[0.32, 0.09, 0.16]} />
            )}
          </mesh>
          {/* Functional Spotlight beams casting onto the road */}
          {headlightsOn && (
            <spotLight
              position={[0, 0, 0.1]}
              target-position={[x * 0.4, 0, 15]}
              angle={0.45}
              penumbra={0.6}
              intensity={80}
              distance={25}
              color={0xe0f2fe}
              castShadow
            />
          )}
        </group>
      ))}

      {/* Taillights */}
      {isNissan ? (
        // Iconic GT-R Quad Round Afterburner Taillights
        [-0.72, -0.42, 0.42, 0.72].map((x, i) => (
          <mesh key={`gtr-tail-${i}`} position={[x, 0.48, -2.18]} material={taillightEmissiveMaterial} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.06, 16]} />
          </mesh>
        ))
      ) : isPorsche ? (
        // Continuous horizontal rear LED lightbar
        <mesh position={[0, 0.52, -2.16]} material={taillightEmissiveMaterial}>
          <boxGeometry args={[1.72, 0.05, 0.06]} />
        </mesh>
      ) : isLambo ? (
        // Y-shaped / Hexagonal rear lamps
        [-0.6, 0.6].map((x, i) => (
          <mesh key={`lambo-tail-${i}`} position={[x, 0.48, -2.18]} material={taillightEmissiveMaterial}>
            <boxGeometry args={[0.36, 0.08, 0.06]} />
          </mesh>
        ))
      ) : (
        // Modern twin dual horizontal pods
        [-0.58, 0.58].map((x, i) => (
          <mesh key={`toyota-tail-${i}`} position={[x, 0.5, -2.17]} material={taillightEmissiveMaterial}>
            <boxGeometry args={[0.42, 0.07, 0.06]} />
          </mesh>
        ))
      )}

      {/* Exhaust Pipes (Titanium / Carbon Tips) */}
      {isLambo ? (
        // High-mount central hexagonal exhaust
        <mesh position={[0, 0.48, -2.2]} material={rimMaterial}>
          <cylinderGeometry args={[0.12, 0.12, 0.12, 6]} />
        </mesh>
      ) : isNissan ? (
        // Quad massive titanium exhaust tips
        [-0.68, -0.48, 0.48, 0.68].map((x, i) => (
          <mesh key={`exhaust-${i}`} position={[x, 0.22, -2.22]} material={rimMaterial} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.1, 16]} />
          </mesh>
        ))
      ) : (
        // Dual central or sport side exhausts
        [-0.24, 0.24].map((x, i) => (
          <mesh key={`exhaust-${i}`} position={[x, 0.25, -2.2]} material={rimMaterial} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.12, 16]} />
          </mesh>
        ))
      )}

      {/* ============================================================ */}
      {/* 6. WHEELS & SUSPENSION (4 CORNERS) */}
      {/* ============================================================ */}
      {[
        { x: -0.96, y: 0.32, z: 1.35, isLeft: true }, // Front Left
        { x: 0.96, y: 0.32, z: 1.35, isLeft: false }, // Front Right
        { x: -0.98, y: 0.34, z: -1.35, isLeft: true }, // Rear Left
        { x: 0.98, y: 0.34, z: -1.35, isLeft: false }, // Rear Right
      ].map((wPos, idx) => (
        <group
          key={`wheel-assembly-${idx}`}
          position={[wPos.x, wPos.y, wPos.z]}
        >
          {/* Brake Caliper (Stationary) */}
          <mesh
            position={[wPos.isLeft ? 0.04 : -0.04, 0.12, 0]}
            material={caliperMaterial}
          >
            <boxGeometry args={[0.06, 0.14, 0.14]} />
          </mesh>

          {/* Cross-Drilled Carbon-Ceramic Brake Disc (Stationary) */}
          <mesh
            position={[wPos.isLeft ? 0.02 : -0.02, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
            material={rimMaterial}
          >
            <cylinderGeometry args={[0.22, 0.22, 0.02, 24]} />
          </mesh>

          {/* Rotating Wheel Group */}
          <group
            ref={(el) => {
              if (el) wheelRefs.current[idx] = el;
            }}
          >
            {/* Rubber Tire */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={tireMaterial} castShadow>
              <torusGeometry args={[0.28, 0.09, 16, 32]} />
            </mesh>

            {/* Alloy Rim Barrel */}
            <mesh rotation={[0, 0, Math.PI / 2]} material={rimMaterial}>
              <cylinderGeometry args={[0.25, 0.25, 0.18, 20]} />
            </mesh>

            {/* Center Lock Nut / Hub */}
            <mesh
              position={[wPos.isLeft ? -0.1 : 0.1, 0, 0]}
              rotation={[0, 0, Math.PI / 2]}
              material={caliperMaterial}
            >
              <cylinderGeometry args={[0.05, 0.05, 0.04, 8]} />
            </mesh>

            {/* Rim Spokes (Star Pattern) */}
            {[0, 1, 2, 3, 4].map((spokeIdx) => {
              const angle = (spokeIdx * Math.PI * 2) / 5;
              return (
                <mesh
                  key={`spoke-${spokeIdx}`}
                  position={[
                    wPos.isLeft ? -0.08 : 0.08,
                    Math.cos(angle) * 0.12,
                    Math.sin(angle) * 0.12,
                  ]}
                  rotation={[angle, 0, 0]}
                  material={rimMaterial}
                >
                  <boxGeometry args={[0.03, 0.22, 0.035]} />
                </mesh>
              );
            })}
          </group>
        </group>
      ))}

      {/* ============================================================ */}
      {/* 7. UNDERGLOW NEON LIGHTING (TOGGLEABLE) */}
      {/* ============================================================ */}
      {underglow && (
        <group position={[0, 0.08, 0]}>
          <pointLight
            color={color}
            intensity={35}
            distance={3.5}
            decay={2}
          />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.8, 3.8]} />
            <meshBasicMaterial
              color={color}
              transparent
              opacity={0.35}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      )}
    </group>
  );
};
