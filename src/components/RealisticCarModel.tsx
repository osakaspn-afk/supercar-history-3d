import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export interface RealisticCarProps {
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

// Map brand silhouette to high-fidelity GLB models
const MODEL_PATHS: Record<string, string> = {
  porsche: '/models/porsche-911.glb',
  nissan: '/models/nissan-gtr.glb',
  lamborghini: '/models/lamborghini-aventador.glb',
  toyota: '/models/lexus-lfa.glb',
};

// Model-specific rotation and scale calibration offsets
const MODEL_CALIBRATIONS: Record<
  string,
  {
    targetLength: number;
    rotationY: number;
    rotationX?: number;
    rotationZ?: number;
    yOffset?: number;
  }
> = {
  porsche: {
    targetLength: 4.5,
    rotationY: 0, // In raw glTF, Sketchfab already converted to Y-up and facing forward (+Z)
    rotationX: 0,
    yOffset: 0.0,
  },
  nissan: {
    targetLength: 4.6,
    rotationY: 0, // Face forward (+Z), Y-up
    rotationX: 0,
    yOffset: 0.0,
  },
  lamborghini: {
    targetLength: 4.7,
    rotationY: Math.PI / 2, // Modeled along X axis (-X is front), rotate 90° to face +Z
    rotationX: 0,
    yOffset: 0.0,
  },
  toyota: {
    targetLength: 4.5,
    rotationY: 0, // Lexus LFA model is naturally Y-up and facing forward (+Z)
    rotationX: 0,
    yOffset: 0.0,
  },
};

export const RealisticCarModel: React.FC<RealisticCarProps> = ({
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
  const modelUrl = MODEL_PATHS[silhouette] || MODEL_PATHS.porsche;
  const calibration = MODEL_CALIBRATIONS[silhouette] || MODEL_CALIBRATIONS.porsche;

  // Load GLTF model with Draco decoder support
  const { scene } = useGLTF(modelUrl, '/draco/gltf/');

  const groupRef = useRef<THREE.Group>(null);
  const wheelsRef = useRef<THREE.Mesh[]>([]);
  const doorsRef = useRef<THREE.Mesh[]>([]);
  const wingRef = useRef<THREE.Mesh[]>([]);

  // Clone and configure materials & transforms
  const { clonedScene, carDimensions } = useMemo(() => {
    const clone = scene.clone(true);
    wheelsRef.current = [];
    doorsRef.current = [];
    wingRef.current = [];

    // Permanently preserve original materials from GLB so wireframe toggling never loses them
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.userData.baseMaterial = mesh.material;
        mesh.userData.baseMatName = (mesh.material as any)?.name || '';
      }
    });

    // Calculate initial raw bounding box
    const initialBox = new THREE.Box3().setFromObject(clone);
    const initialSize = new THREE.Vector3();
    initialBox.getSize(initialSize);

    // Determine primary length dimension (X vs Z)
    const rawLength = Math.max(initialSize.x, initialSize.z);
    const scaleFactor = rawLength > 0 ? calibration.targetLength / rawLength : 1;

    clone.scale.set(scaleFactor, scaleFactor, scaleFactor);

    // Apply rotation adjustments
    if (calibration.rotationX) clone.rotation.x = calibration.rotationX;
    if (calibration.rotationY) clone.rotation.y = calibration.rotationY;
    if (calibration.rotationZ) clone.rotation.z = calibration.rotationZ;

    clone.updateMatrixWorld(true);

    // Recalculate post-rotation bounding box to position cleanly on floor
    const alignedBox = new THREE.Box3().setFromObject(clone);
    const alignedCenter = new THREE.Vector3();
    alignedBox.getCenter(alignedCenter);

    // Offset so bottom of wheels touches ground y = 0 and centered horizontally
    clone.position.x = -alignedCenter.x;
    clone.position.y = -alignedBox.min.y + (calibration.yOffset || 0);
    clone.position.z = -alignedCenter.z;

    const finalSize = new THREE.Vector3();
    alignedBox.getSize(finalSize);

    return {
      clonedScene: clone,
      carDimensions: finalSize,
    };
  }, [scene, silhouette, calibration]);

  // Update materials dynamically (Paint, Glass, Lights, Calipers, Carbon, X-Ray)
  useMemo(() => {
    if (!clonedScene) return;

    wheelsRef.current = [];
    doorsRef.current = [];
    wingRef.current = [];

    // Custom automotive paint material
    let paintMat: THREE.Material;
    if (finish === 'matte') {
      paintMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        roughness: 0.65,
        metalness: 0.15,
      });
    } else if (finish === 'carbon') {
      paintMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#121316'),
        roughness: 0.35,
        metalness: 0.85,
      });
    } else {
      // High-end metallic clearcoat paint
      paintMat = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(color),
        metalness: 0.88,
        roughness: 0.16,
        clearcoat: 1.0,
        clearcoatRoughness: 0.08,
        reflectivity: 0.9,
      });
    }

    // Holographic CAD X-Ray Blueprint material
    const xrayMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#06b6d4'), // Neon Cyan Blueprint
      wireframe: true,
      transparent: true,
      opacity: 0.88,
    });

    // Glass material
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0e17,
      metalness: 0.1,
      roughness: 0.04,
      transmission: 0.8,
      thickness: 0.5,
      transparent: true,
      opacity: 0.85,
    });

    // Carbon fiber material
    const carbonMat = new THREE.MeshStandardMaterial({
      color: '#151618',
      roughness: 0.3,
      metalness: 0.75,
    });

    // Honeycomb grille material
    const grilleMat = new THREE.MeshStandardMaterial({
      color: 0x111317,
      roughness: 0.7,
      metalness: 0.4,
    });

    // Caliper material
    const caliperColor =
      silhouette === 'porsche'
        ? 0xa3e635 // Acid Green
        : silhouette === 'nissan'
        ? 0xdc2626 // Nismo Red
        : silhouette === 'lamborghini'
        ? 0xeab308 // Giallo Yellow
        : 0x2563eb; // Lexus F-Sport Blue

    const caliperMat = new THREE.MeshStandardMaterial({
      color: caliperColor,
      metalness: 0.7,
      roughness: 0.22,
    });

    // Wheel rim material
    const rimMat = new THREE.MeshStandardMaterial({
      color: silhouette === 'toyota' ? 0xd4d4d8 : 0x27272a,
      metalness: 0.9,
      roughness: 0.22,
    });

    // Traverse all meshes in the high-res 3D model
    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.castShadow = !wireframe;
        mesh.receiveShadow = !wireframe;

        const baseMat = mesh.userData.baseMaterial || mesh.material;
        const matName = (mesh.userData.baseMatName || (baseMat as any)?.name || '').toLowerCase();
        const nodeName = (mesh.name || '').toLowerCase();

        // Identify trim, plastic, emblem, or non-paint elements that should preserve native textures
        const isNonPaintTrim =
          matName.includes('plastic') ||
          matName.includes('rubber') ||
          matName.includes('tire') ||
          matName.includes('tyre') ||
          matName.includes('silver') ||
          matName.includes('chrome') ||
          matName.includes('license') ||
          matName.includes('logo') ||
          matName.includes('badge') ||
          matName.includes('interior') ||
          matName.includes('glass') ||
          matName.includes('window') ||
          matName.includes('light') ||
          matName.includes('lamp') ||
          matName.includes('mirror') ||
          matName.includes('exhaust') ||
          matName.includes('full_black');

        // Determine configured showroom material
        let targetMat: THREE.Material = baseMat;

        // 1. Car Body Paint Identification
        const isBodyPaint =
          !isNonPaintTrim &&
          (matName.includes('paint') ||
            matName.includes('bodycolor') ||
            matName === 'mt_body' ||
            matName.includes('car_body') ||
            matName.includes('coat') ||
            matName.includes('body') ||
            nodeName.includes('body') ||
            nodeName.includes('hood') ||
            nodeName.includes('door') ||
            nodeName === 'paint' ||
            nodeName === 'coloured');

        if (isBodyPaint) {
          targetMat = paintMat;
        } else if (matName.includes('carbon') || nodeName.includes('carbon')) {
          targetMat = carbonMat;
        } else if (nodeName.includes('grille')) {
          targetMat = grilleMat;
        } else if (
          matName.includes('glass') ||
          matName.includes('window') ||
          matName.includes('windscreen') ||
          nodeName.includes('window') ||
          nodeName.includes('windshield') ||
          nodeName.toLowerCase().startsWith('glass')
        ) {
          targetMat = glassMat;
        } else if (
          matName.includes('light') ||
          matName.includes('lamp') ||
          matName.includes('turnlight') ||
          nodeName.includes('headlight') ||
          nodeName.includes('taillight') ||
          nodeName === 'light'
        ) {
          const isRear = matName.includes('tail') || matName.includes('red') || nodeName.includes('rear');
          targetMat = new THREE.MeshStandardMaterial({
            color: isRear ? 0xff0022 : headlightsOn ? 0xffffff : 0x475569,
            emissive: isRear ? 0xff0033 : headlightsOn ? 0xa5f3fc : 0x000000,
            emissiveIntensity: headlightsOn ? 4.0 : 0.2,
            roughness: 0.1,
          });
        } else if (
          nodeName.includes('wheel_') ||
          (nodeName.includes('wheel') && !nodeName.includes('steering'))
        ) {
          targetMat = rimMat;
        } else if (
          matName.includes('caliper') ||
          nodeName.includes('caliper') ||
          (nodeName.includes('brake') && !nodeName.includes('rotor') && !nodeName.includes('disc'))
        ) {
          targetMat = caliperMat;
        }

        // Store showroom material reference
        mesh.userData.showroomMaterial = targetMat;

        // Apply X-Ray if enabled, otherwise restore showroom material
        mesh.material = wireframe ? xrayMat : targetMat;

        // Cache wheels for spinning animation
        if (
          nodeName.includes('wheel') ||
          nodeName.includes('tire') ||
          nodeName.includes('rim') ||
          matName.includes('tyre') ||
          matName.includes('tire')
        ) {
          wheelsRef.current.push(mesh);
        }

        // Cache doors for opening animation
        if (nodeName.includes('door')) {
          doorsRef.current.push(mesh);
        }

        // Cache spoiler / wing
        if (nodeName.includes('wing') || nodeName.includes('spoiler')) {
          wingRef.current.push(mesh);
        }
      }
    });
  }, [clonedScene, color, finish, wireframe, headlightsOn, silhouette]);

  // Frame animation loop (Wheel rotation, active aero, doors)
  useFrame((_, delta) => {
    // Wheel spinning animation
    if (wheelSpinSpeed > 0 && wheelsRef.current.length > 0) {
      wheelsRef.current.forEach((w) => {
        w.rotation.x += delta * wheelSpinSpeed * 18;
      });
    }

    // Active Aero Wing DRS tilt
    if (wingRef.current.length > 0) {
      const targetWingAngle = wingActive ? -0.28 : 0;
      wingRef.current.forEach((w) => {
        w.rotation.x = THREE.MathUtils.lerp(w.rotation.x, targetWingAngle, delta * 6);
      });
    }

    // Doors animation
    if (doorsRef.current.length > 0) {
      const targetDoorOpen = doorsOpen ? (silhouette === 'lamborghini' ? -0.75 : 0.6) : 0;
      doorsRef.current.forEach((d) => {
        if (silhouette === 'lamborghini') {
          d.rotation.x = THREE.MathUtils.lerp(d.rotation.x, targetDoorOpen, delta * 5);
        } else {
          d.rotation.y = THREE.MathUtils.lerp(d.rotation.y, targetDoorOpen, delta * 5);
        }
      });
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Real 3D GLB Model Instance */}
      <primitive object={clonedScene} />

      {/* Realistic Headlight Projector Beams */}
      {headlightsOn && (
        <>
          <spotLight
            position={[-0.7, 0.5, 2.2]}
            target-position={[-0.4, 0, 16]}
            angle={0.42}
            penumbra={0.65}
            intensity={90}
            distance={28}
            color={0xe0f2fe}
            castShadow
          />
          <spotLight
            position={[0.7, 0.5, 2.2]}
            target-position={[0.4, 0, 16]}
            angle={0.42}
            penumbra={0.65}
            intensity={90}
            distance={28}
            color={0xe0f2fe}
            castShadow
          />
        </>
      )}

      {/* Underglow Neon Kit */}
      {underglow && (
        <group position={[0, 0.08, 0]}>
          <pointLight color={color} intensity={35} distance={3.8} decay={2} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[carDimensions.x * 0.9, carDimensions.z * 0.9]} />
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

// Preload models for instant loading
Object.values(MODEL_PATHS).forEach((path) => {
  useGLTF.preload(path, '/draco/gltf/');
});
