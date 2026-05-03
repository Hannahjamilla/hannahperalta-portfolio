import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float, Sparkles, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import type { Section } from '../../application'

interface SceneProps {
  section: Section
  isDarkMode: boolean
}

export default function SceneContainer({ section: _section, isDarkMode }: SceneProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, (state.mouse.y * Math.PI) / 20, 0.05)
    }
  })

  const accentColor = isDarkMode ? '#ffffff' : '#000000'

  return (
    <>
      <Sparkles count={40} scale={20} size={1} speed={0.5} color={accentColor} opacity={isDarkMode ? 0.1 : 0.02} />
      
      {/* Pushed to the far right and smaller to ensure NO overlap with text */}
      <group position={[6, -2, -5]}>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh ref={meshRef}>
            <sphereGeometry args={[2, 64, 64]} />
            <MeshTransmissionMaterial 
              backside
              samples={6}
              thickness={1.5}
              roughness={0.1}
              chromaticAberration={0.05}
              anisotropy={0.1}
              distortion={0}
              distortionScale={0}
              temporalDistortion={0}
              color={isDarkMode ? '#000000' : '#ffffff'}
              transmission={1}
              transparent
              opacity={isDarkMode ? 0.3 : 0.05}
            />
          </mesh>
        </Float>

        <ContactShadows 
          position={[0, -4, 0]}
          opacity={isDarkMode ? 0.05 : 0.02} 
          scale={10} 
          blur={2} 
          far={10} 
          color={accentColor} 
        />
      </group>
    </>
  )
}
