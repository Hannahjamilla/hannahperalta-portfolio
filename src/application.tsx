import { useState } from 'react'

export type Section = 'home' | 'experience' | 'academic' | 'personal' | 'skills'

export default function App() {
  const [isDarkMode] = useState(true)

  const bgColor = isDarkMode ? '#0d100f' : '#ffffff'

  return (
    <div className="w-screen h-screen relative overflow-hidden flex items-center justify-center transition-colors duration-700 p-8" style={{ backgroundColor: bgColor, color: isDarkMode ? '#ffffff' : '#000000' }}>
      
      {/* Background Animated Orbs */}
      <div className="absolute top-1/2 left-1/4 w-[40vw] h-[40vw] bg-neutral-600/10 rounded-full mix-blend-screen filter blur-[100px] animate-pulse transform -translate-y-1/2" style={{ animationDuration: '4s' }} />
      <div className="absolute top-1/2 right-1/4 w-[30vw] h-[30vw] bg-stone-500/10 rounded-full mix-blend-screen filter blur-[80px] animate-pulse transform -translate-y-1/2" style={{ animationDuration: '6s' }} />
      
      {/* Glassmorphism Container */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-20 backdrop-blur-md bg-white/5 p-12 md:p-16 rounded-3xl border border-white/10 shadow-2xl">
        
        {/* Left Side: Large Typography */}
        <div className="flex-1 text-center md:text-right">
          <h1 className="text-5xl md:text-7xl font-extralight tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-br from-white via-white/80 to-white/40">
            Currently<br />
            <span className="font-normal text-white/50">Updating</span>
          </h1>
        </div>
        
        {/* Divider */}
        <div className="hidden md:block w-px h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
        <div className="block md:hidden w-32 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

        {/* Right Side: Message */}
        <div className="flex-1 text-center md:text-left max-w-md">
          <div className="space-y-6">
            <p className="text-xl font-light leading-relaxed text-white/90">
              Hello! I am currently working on some exciting new additions to my portfolio.
            </p>
            <p className="text-base font-light leading-relaxed text-white/50">
              The site is taking a short break while I set things up behind the scenes. I can't wait to share the final result with you. Please check back a little later.
            </p>
            
            <div className="pt-4 flex justify-center md:justify-start">
              <div className="h-1 w-12 bg-white/30 rounded-full"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
