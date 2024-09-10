'use client'
import React, { useRef, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber'
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

const Scene = () => {
  return (
    <>
      
      {/* Set up the camera with the desired rotation */}
      <PerspectiveCamera 
        makeDefault 
        position={[0, 0, 5]}
        fov={50}
        rotation={[-0.7858795112270429, 0.031017384013626914, 0.031032315362367228]}
      />

      {/* Enhanced studio-like lighting setup */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-5, 5, -5]} intensity={1} color="#ffffff" />
      <spotLight position={[0, 10, 0]} intensity={1.5} penumbra={1} angle={Math.PI / 4} />
      
      {/* Soft fill light */}
      <pointLight position={[-5, 0, -5]} intensity={0.5} color="#ffffff" />

      {/* Environment for realistic reflections */}
      <Environment preset="studio" />

      {/* Green plant model */}
      <Model />
      
      <CameraLogger />
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