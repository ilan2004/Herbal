'use client'
import React, { useRef, useCallback } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber'
import { Suspense } from 'react';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'
import './Object.css'
import Loader from '../Loader/Loader.jsx'
import Model from '../model/model'  // Make sure this path is correct

const CameraLogger = () => {
  const { camera } = useThree();
  
  const handleCameraChange = useCallback(() => {
    console.log('Camera position:', camera.position);
    console.log('Camera rotation:', camera.rotation);
    console.log('Camera zoom:', camera.zoom);
  }, [camera]);

  return <OrbitControls 
    onChange={handleCameraChange}
    minPolarAngle={Math.PI / 4}
    maxPolarAngle={Math.PI / 1.5}
    minDistance={3}
    maxDistance={8}
  />;
};

const AnimatedModel = () => {
  const modelsRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    modelsRef.current.position.y = Math.sin(t * 0.5) * 0.05;
  });

  return (
    <group ref={modelsRef} position={[0, -0.5, 0]}>
      <Model />
    </group>
  );
};

const Scene = () => {
  const spotLightRef = useRef();
  const pointLightRef = useRef();

  return (
    <>

      
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, 5]}
        fov={50}
        rotation={[-0.7858795112270429, 0.031017384013626914, 0.031032315362367228]}
      />

      <ambientLight intensity={0.2} color="#e0f2e0" />

      <directionalLight 
        position={[5, 5, 2]} 
        intensity={1} 
        color="#ffffff"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <directionalLight position={[-5, 3, -2]} intensity={0.6} color="#c9e8ff" />

      <spotLight
        ref={spotLightRef}
        position={[-2, 7, 3]}
        angle={Math.PI / 6}
        penumbra={1}
        intensity={1.5}
        color="#9BEBAA"
        castShadow
      />

      <pointLight 
        ref={pointLightRef}
        position={[0, -3, 0]} 
        intensity={0.4} 
        color="#ffffff" 
      />

      <Environment preset="sunset" />

      <AnimatedModel />
      
      <CameraLogger />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </>
  );
};

const Object = () => {
  return (
    <Canvas style={{ width: '800px', height: '800px' }} className='draww'>
      <Suspense fallback={<Loader/>}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}

export default Object;