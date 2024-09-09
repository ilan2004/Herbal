'use client'
import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react';
import { OrbitControls, Environment } from '@react-three/drei'
import './Object.css'
import Loader from '../Loader/Loader.jsx'
import Model from '../model/model'  // Make sure this path is correct

const Object = () => {
  const orbitControlsRef = useRef();

  return (
    <Canvas 
      style={{ width: '800px', height: '800px' }} 
      className='draww' 
      camera={{ position: [0, 0, 5], fov: 50 }}
    >
      <Suspense fallback={<Loader/>}>
        {/* Studio-like lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, 5, -5]} intensity={0.8} />
        <spotLight position={[0, 10, 0]} intensity={1.5} penumbra={1} />

        {/* Environment for realistic reflections */}
        <Environment preset="studio" />

        <Model />
        
        <OrbitControls 
          ref={orbitControlsRef}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          minDistance={3}
          maxDistance={8}
        />
      </Suspense>
    </Canvas>
  )
}

export default Object;