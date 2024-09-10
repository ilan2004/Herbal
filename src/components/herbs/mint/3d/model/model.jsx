import React, { useRef, useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { a } from '@react-spring/three';
import gsap from "gsap";

const Model = (props) => {
  const modelsRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const rotationAngle = scrollPos * 0.008; // Adjust the multiplier as needed
      gsap.to(modelsRef.current.rotation, {
        x: rotationAngle,
        duration: 0.7 // Adjust the duration as needed
      });
    };

    const rotateMesh = () => {
      gsap.to(modelsRef.current.rotation, {
        y: Math.PI * 2, // Full rotation (adjust as needed)
        duration: 10, // Adjust the duration as needed
        repeat: -1, // Repeat indefinitely
        ease: "linear" // Use linear easing for consistent speed
      });
    };

    window.addEventListener("scroll", handleScroll);
    rotateMesh(); // Call rotateMesh function

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const { nodes, materials } = useGLTF('/basil.glb'); // Updated path

  return (
    <a.group ref={modelsRef} {...props}>
      <group {...props}>
      <group scale={0.05}  rotation={[Math.PI / 10, 0, 0]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.basil_pot_lambert3_0.geometry}
            material={materials.lambert3}
            position={[0, 8, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.basil_plant_m_basil_leaf_0.geometry}
            material={materials.m_basil_leaf}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.basil_plant_lambert4_0.geometry}
            material={materials.lambert4}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Dirt_lambert5_0.geometry}
            material={materials.lambert5}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere1_lambert6_0.geometry}
            material={materials.lambert6}
            position={[0, 16.532, -5.005]}
            rotation={[0, -0.585, 0]}
            scale={[1.388, 0.827, 0.827]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere2_lambert6_0.geometry}
            material={materials.lambert6}
            position={[-5.111, 16.296, -0.854]}
            rotation={[0, -1.529, -0.053]}
            scale={[1.388, 0.827, 0.827]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere3_lambert6_0.geometry}
            material={materials.lambert6}
            position={[1.852, 16.281, 5.427]}
            rotation={[-3.087, -0.712, -3.139]}
            scale={[1.388, 0.827, 0.827]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere4_lambert6_0.geometry}
            material={materials.lambert6}
            position={[-2.711, 16.329, 3.042]}
            rotation={[0.058, 1.159, -0.005]}
            scale={[1.388, 0.827, 0.827]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.pSphere5_lambert6_0.geometry}
            material={materials.lambert6}
            position={[4.796, 16.257, -2.541]}
            rotation={[0.055, 0.721, -0.003]}
            scale={[1.388, 0.827, 0.827]}
          />
        </group>
      </group>
    </a.group>
  );
};

export default Model;
