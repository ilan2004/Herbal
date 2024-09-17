import React, { useRef, useState, useEffect } from "react";
import { useGLTF, Html } from "@react-three/drei";
import { useThree, useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import * as THREE from 'three';

const Model = (props) => {
  const modelsRef = useRef();
  const { camera } = useThree();
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const [isRotating, setIsRotating] = useState(true);

  const { nodes, materials } = useGLTF("/basil.glb");

  useEffect(() => {
    const handleScroll = () => {
      if (isRotating) {
        const scrollPos = window.scrollY;
        const rotationAngle = scrollPos * 0.008;
        gsap.to(modelsRef.current.rotation, {
          x: rotationAngle,
          duration: 0.7,
        });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isRotating]);

  useFrame(() => {
    if (modelsRef.current && isRotating) {
      modelsRef.current.rotation.y += 0.005;
    }
  });

  const handleLeafClick = (leafName, leafPosition) => {
    setSelectedLeaf(leafName);
    setIsRotating(false);

    const cameraOffset = new THREE.Vector3(0.1, 0.1, 0.1);
    const scaledLeafPosition = leafPosition.clone().multiplyScalar(0.05);
    const cameraPosition = new THREE.Vector3().addVectors(scaledLeafPosition, cameraOffset);

    gsap.to(camera.position, {
      x: cameraPosition.x,
      y: cameraPosition.y,
      z: cameraPosition.z,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.lookAt(scaledLeafPosition);
      },
    });

    gsap.to(modelsRef.current.rotation, {
      x: 0,
      y: 0,
      z: 0,
      duration: 1.5,
      ease: "power2.inOut",
    });
  };

  const handleBackgroundClick = () => {
    if (selectedLeaf) {
      setSelectedLeaf(null);
      setIsRotating(true);

      gsap.to(camera.position, {
        x: 0,
        y: 0,
        z: 5,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => {
          camera.lookAt(0, 0, 0);
        },
      });
    }
  };

  return (
    <>
      <group ref={modelsRef} {...props} onClick={handleBackgroundClick}>
        <group scale={0.05} rotation={[Math.PI / 10, 0, 0]}>
          {/* Pot */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.basil_pot_lambert3_0.geometry}
            material={materials.lambert3}
            position={[0, 8, 0]}
          />

          {/* Leaf 1 */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.basil_plant_m_basil_leaf_0.geometry}
            material={materials.m_basil_leaf}
            onClick={(event) => {
              event.stopPropagation();
              const leafPosition = new THREE.Vector3(10, 80, 10);
              handleLeafClick("Leaf 1", leafPosition);
            }}
          />

          {/* Leaf 2 */}
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.basil_plant_lambert4_0.geometry}
            material={materials.lambert4}
            onClick={(event) => {
              event.stopPropagation();
              const leafPosition = new THREE.Vector3(-10, 75, -10);
              handleLeafClick("Leaf 2", leafPosition);
            }}
          />

          {/* Add more leaf meshes here as needed */}
        </group>
      </group>

      {selectedLeaf && (
        <Html position={[0, 0, -1]} center>
        <div className="leaf-details" style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '10px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          width: '200px',
          color: '#333',
          fontFamily: 'Arial, sans-serif',
          lineHeight: '1.4',
          transition: 'transform 0.3s ease-in-out',
          transform: 'scale(1)'
        }}>
          <h2 style={{
            margin: '0 0 8px',
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#4CAF50',
            borderBottom: '1px solid #4CAF50',
            paddingBottom: '4px',
            textAlign: 'center',
          }}>
            Essential Oils: {selectedLeaf}
          </h2>
          <p style={{
            fontSize: '14px',
            margin: '0',
            textAlign: 'justify'
          }}>
            Often used in cooking and traditional medicine for their anti-inflammatory and antioxidant properties. {selectedLeaf}.
          </p>
        </div>
      </Html>      
      )}
    </>
  );
};

export default Model;