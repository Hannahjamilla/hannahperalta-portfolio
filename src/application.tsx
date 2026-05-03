import { Canvas } from '@react-three/fiber'
import { Suspense, useState } from 'react'
import { Environment } from '@react-three/drei'
import SceneContainer from './components/scene/scene-container'
import OverlayUi from './components/ui/overlay-ui'

export type Section = 'home' | 'experience' | 'academic' | 'personal' | 'skills'

export default function App() {
  const [section, setSection] = useState<Section>('home')
  const [isDarkMode, setIsDarkMode] = useState(true)

  const bgColor = isDarkMode ? '#0d100f' : '#ffffff'

  return (
    <div className="w-screen h-screen relative overflow-hidden transition-colors duration-700" style={{ backgroundColor: bgColor }}>
      
      {/* 3D background */}
      <div className="absolute inset-0 z-0">
        <Canvas 
          camera={{ position: [0, 0, 10], fov: 35 }} 
          dpr={[1, 2]}
        >
          <color attach="background" args={[bgColor]} />
          <ambientLight intensity={isDarkMode ? 0.3 : 1} />
          <Suspense fallback={null}>
            <SceneContainer section={section} isDarkMode={isDarkMode} />
            <Environment preset={isDarkMode ? "night" : "studio"} />
          </Suspense>
        </Canvas>
      </div>

      {/* Main Container with Snapping for Mobile, Split-Scroll for Desktop */}
      <div 
        id="scroll-area" 
        className="relative z-10 w-full h-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory md:snap-none scrollbar-hide md:scrollbar-premium"
      >
        <OverlayUi 
          section={section} 
          setSection={setSection} 
          isDarkMode={isDarkMode} 
          setIsDarkMode={setIsDarkMode} 
        />
      </div>
    </div>
  )
}
