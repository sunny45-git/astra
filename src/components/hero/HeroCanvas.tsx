import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { CanvasFallback } from './CanvasFallback';

// ASTRA Central Celestial Core Sculpture
const AstraCelestialCore: React.FC<{ mouse: React.MutableRefObject<[number, number]> }> = ({ mouse }) => {
  const groupRef = useRef<THREE.Group>(null);
  const outerCrystalRef = useRef<THREE.Mesh>(null);
  const innerCoreRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const innerRingRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Gentle floating oscillation
      groupRef.current.rotation.y += delta * 0.22;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.35) * 0.12;

      // Mouse Parallax smooth lerp
      const targetX = mouse.current[0] * 0.45;
      const targetY = mouse.current[1] * 0.35;
      groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05;
    }

    if (innerCoreRef.current) {
      // Counter rotation for deep celestial complexity
      innerCoreRef.current.rotation.x -= delta * 0.45;
      innerCoreRef.current.rotation.z += delta * 0.35;
    }

    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.18;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group ref={groupRef} position={[1.4, 0, 0]}>
      {/* 1. Outer Translucent Celestial Crystal (Icosahedron) */}
      <mesh ref={outerCrystalRef} castShadow receiveShadow scale={1.45}>
        <icosahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          roughness={0.04}
          transmission={0.94}
          thickness={1.9}
          ior={1.55}
          reflectivity={0.92}
          clearcoat={1}
          clearcoatRoughness={0.08}
          color="#e0f2fe"
          attenuationColor="#38bdf8"
          attenuationDistance={1.4}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 2. Geometric Cyan Vector Cage */}
      <mesh scale={1.47}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          wireframe
          color="#00f5ff"
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* 3. Pulsing Cosmic Quantum Core (Octahedron) */}
      <mesh ref={innerCoreRef} scale={0.7}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#6366f1"
          emissiveIntensity={1.2}
          roughness={0.15}
          metalness={0.85}
          wireframe
        />
      </mesh>

      {/* 4. Astrolabe Celestial Orbit Ring (Cyan) */}
      <mesh ref={outerRingRef} rotation={[Math.PI / 3, 0, 0]} scale={2.0}>
        <torusGeometry args={[1, 0.028, 16, 100]} />
        <meshStandardMaterial
          color="#00f5ff"
          emissive="#00f5ff"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          transparent
          opacity={0.65}
        />
      </mesh>

      {/* 5. Secondary Celestial Orbit Ring (Violet) */}
      <mesh ref={innerRingRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]} scale={2.25}>
        <torusGeometry args={[1, 0.02, 16, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#8b5cf6"
          emissiveIntensity={0.5}
          roughness={0.15}
          metalness={0.85}
          transparent
          opacity={0.55}
        />
      </mesh>

      {/* 6. Orbital Satellite Nodes */}
      <mesh position={[2.0, 0.5, 0]} scale={0.09}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[-1.8, -1.2, 0.8]} scale={0.07}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// Floating Cosmic Shards & Glass Spheres
const FloatingCosmicObjects: React.FC<{ mouse: React.MutableRefObject<[number, number]> }> = ({ mouse }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.07;
      groupRef.current.position.x = mouse.current[0] * 0.2;
      groupRef.current.position.y = mouse.current[1] * 0.15;
    }
  });

  const objects = [
    { pos: [-2.4, 2.0, -1.2] as [number, number, number], scale: 0.42, color: '#38bdf8', speed: 1.6 },
    { pos: [3.4, 2.4, -1.6] as [number, number, number], scale: 0.6, color: '#8b5cf6', speed: 1.2 },
    { pos: [2.8, -2.2, -0.9] as [number, number, number], scale: 0.48, color: '#00f5ff', speed: 1.4 },
    { pos: [-1.4, -2.4, -1.7] as [number, number, number], scale: 0.32, color: '#60a5fa', speed: 2.0 },
    { pos: [0.3, 2.8, -2.2] as [number, number, number], scale: 0.38, color: '#c084fc', speed: 1.3 },
  ];

  return (
    <group ref={groupRef}>
      {objects.map((obj, idx) => (
        <Float key={idx} speed={obj.speed} rotationIntensity={0.6} floatIntensity={1.2}>
          <mesh position={obj.pos} scale={obj.scale}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhysicalMaterial
              roughness={0.08}
              transmission={0.88}
              thickness={1.3}
              ior={1.5}
              reflectivity={0.88}
              clearcoat={1}
              color={obj.color}
              transparent
              opacity={0.88}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// Cinematic Studio Lighting
const AstraStudioLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.55} />
      {/* Electric Cyan Key Light */}
      <pointLight position={[5, 4, 4]} intensity={2.4} color="#00f5ff" distance={16} />
      {/* Subtle Violet Fill Light */}
      <pointLight position={[-5, -3, 3]} intensity={2.2} color="#8b5cf6" distance={16} />
      {/* Top Rim Light */}
      <directionalLight position={[0, 8, -5]} intensity={1.4} color="#38bdf8" />
    </>
  );
};

export const HeroCanvas: React.FC = () => {
  const mouse = useRef<[number, number]>([0, 0]);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = [
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasWebGL) {
    return <CanvasFallback />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        className="w-full h-full"
      >
        <AstraStudioLighting />
        <AstraCelestialCore mouse={mouse} />
        <FloatingCosmicObjects mouse={mouse} />
        
        {/* Cosmic Stardust Particles */}
        <Sparkles
          count={70}
          scale={11}
          size={2.5}
          speed={0.4}
          opacity={0.5}
          color="#00f5ff"
        />
        <Sparkles
          count={45}
          scale={9}
          size={3.2}
          speed={0.25}
          opacity={0.4}
          color="#a855f7"
        />
      </Canvas>
    </div>
  );
};
