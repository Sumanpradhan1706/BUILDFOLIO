import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Stars } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

function AnimatedSphere({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.5;
    }
  });

  return (
    <Sphere ref={meshRef} args={[scale, 100, 100]} position={position}>
      <MeshDistortMaterial
        color="#00C6FF"
        attach="material"
        distort={0.6}
        speed={2.5}
        roughness={0.1}
        metalness={0.9}
        emissive="#00C6FF"
        emissiveIntensity={0.4}
      />
    </Sphere>
  );
}

function FloatingRings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.2;
      groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.4) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[0, 0, (Math.PI / 3) * i]}>
          <torusGeometry args={[3.5, 0.08, 16, 100]} />
          <meshStandardMaterial
            color="#00C6FF"
            emissive="#00C6FF"
            emissiveIntensity={0.8}
            transparent
            opacity={0.7}
            wireframe={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#00C6FF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowingSpheres() {
  const positions: [number, number, number][] = [
    [4, 1, -3],
    [-4, -1, -2],
    [2, -3, 1],
    [-3, 2, -1],
  ];

  return (
    <>
      {positions.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial
            color="#00C6FF"
            emissive="#00C6FF"
            emissiveIntensity={2}
            transparent
            opacity={0.8}
          />
        </mesh>
      ))}
    </>
  );
}

export default function ThreeBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }}>
        <color attach="background" args={['#0A0A12']} />
        <fog attach="fog" args={['#0A0A12', 5, 25]} />
        
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00C6FF" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#00C6FF" />
        <pointLight position={[0, 5, 5]} intensity={0.8} color="#0099FF" />
        <spotLight position={[0, 10, 0]} intensity={1.5} color="#00C6FF" angle={0.3} penumbra={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <AnimatedSphere position={[-3, 2, 0]} scale={1.2} />
        <AnimatedSphere position={[3, -2, -2]} scale={1} />
        <AnimatedSphere position={[0, 0, -4]} scale={0.8} />
        
        <FloatingRings />
        <Particles />
        <GlowingSpheres />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  );
}
