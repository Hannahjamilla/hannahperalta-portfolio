import React, { useRef, useMemo } from 'react';
import { ArrowLeft, Moon, Sun } from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BeyondTheScreenProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  onBack: () => void;
}

/* ─── SUBTLE 3D BACKGROUND: Drifting particles only ─── */
function DriftingDots({ dark, count = 300 }: { dark: boolean; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 30;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 15;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.008;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
    // subtle mouse parallax
    ref.current.position.x = state.pointer.x * 0.3;
    ref.current.position.y = state.pointer.y * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color={dark ? '#ffffff' : '#1a1a1a'} transparent opacity={0.25} sizeAttenuation depthWrite={false} />
    </points>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function BeyondTheScreen({ dark, setDark, onBack }: BeyondTheScreenProps) {
  const t = (isDark: boolean, d: string, l: string) => isDark ? d : l;
  const bgMain = t(dark, 'bg-[#111111]', 'bg-[#f8f5ef]');
  const textMain = t(dark, 'text-[#e8e4db]', 'text-[#1a1a1a]');
  const border = t(dark, 'border-[#2d2d2d]', 'border-[#dcd6c8]');
  
  return (
    <div className={`min-h-screen ${bgMain} ${textMain} font-serif selection:bg-[#c23b3b]/30 selection:text-current transition-colors duration-700 overflow-x-clip relative`}>

      {/* WebGL particle background — very subtle, behind everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <DriftingDots dark={dark} />
        </Canvas>
      </div>

      {/* Noise */}
      <div className="fixed inset-0 opacity-[0.015] pointer-events-none mix-blend-difference z-[1]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      <div className={`max-w-[1400px] mx-auto w-full relative z-10 min-h-screen border-x border-dashed ${border} ${bgMain}`}>

        {/* HEADER */}
        <header className={`sticky top-0 z-50 flex items-center justify-between py-2 px-4 md:py-3 md:px-6 border-b-2 border-dashed ${border} ${t(dark, 'bg-[#151515]/95', 'bg-[#fffefb]/95')} backdrop-blur-xl shadow-sm transition-all duration-500`}>
          
          <button onClick={onBack} className={`flex items-center gap-2 font-serif italic text-[10px] md:text-xs transition-all duration-300 group px-3 py-1 md:px-4 md:py-1.5 border border-current rounded-full shadow-[2px_2px_0px_currentColor] hover:shadow-[3px_3px_0px_currentColor] active:translate-y-0.5 active:shadow-none ${t(dark, 'hover:bg-white/5', 'hover:bg-[#f4f1ea]')}`}>
            <span className="flex items-center justify-center group-hover:-translate-x-1 transition-transform duration-300">
              <ArrowLeft size={12} />
            </span>
            <span className="font-bold tracking-wide">Take Me Back</span>
          </button>

          <div className="absolute left-1/2 -translate-x-1/2 flex-col items-center justify-center font-mono uppercase tracking-[0.3em] opacity-80 hidden md:flex pointer-events-none group">
             <span className="text-[8px] font-black tracking-[0.4em] px-3 py-1 border border-current rounded-sm shadow-sm opacity-60">Jaja's Scrapbook</span>
          </div>

          <button onClick={() => setDark(!dark)} className={`flex items-center gap-2 font-serif italic text-[10px] md:text-xs transition-all duration-300 group px-3 py-1 md:px-4 md:py-1.5 border border-current rounded-full shadow-[2px_2px_0px_currentColor] hover:shadow-[3px_3px_0px_currentColor] active:translate-y-0.5 active:shadow-none ${t(dark, 'hover:bg-white/5', 'hover:bg-[#f4f1ea]')}`} aria-label="Toggle theme">
            <span className="font-bold tracking-wide hidden sm:block">{dark ? "Lights On" : "Lights Off"}</span>
            <span className="font-bold tracking-wide sm:hidden">{dark ? "Light" : "Dark"}</span>
            <span className="flex items-center justify-center group-hover:rotate-45 transition-transform duration-500">
              {dark ? <Sun size={12} className="text-amber-200" /> : <Moon size={12} className="text-indigo-900" />}
            </span>
          </button>
        </header>

        {/* HERO */}
        <section className={`border-b ${border} relative min-h-[60vh] md:min-h-[75vh] flex items-end overflow-hidden`}>
          <div className="absolute inset-0 z-0">
            <img src="/images/Me-more about me.webp" alt="Hannah Peralta" className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100 origin-center" />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#111111] via-[#111111]/70 to-[#111111]/10 mix-blend-multiply"></div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent"></div>
          <div className="absolute top-1/4 left-0 w-full overflow-hidden pointer-events-none flex flex-col justify-center gap-12 opacity-10 select-none z-10 text-white mix-blend-overlay">
            <div className="whitespace-nowrap font-black uppercase text-[15vw] leading-none animate-marquee">BEYOND THE SCREEN — BEYOND THE SCREEN — </div>
          </div>
          <div className="relative z-20 w-full max-w-[1400px] mx-auto px-6 md:px-12 xl:px-16 pb-12 md:pb-16 text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 md:gap-12">
              <div className="flex-1">
                <div className="inline-flex items-center gap-4 mb-6">
                  <span className="h-px w-10 bg-white/50"></span>
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-white/80">Beyond the Screen</span>
                </div>
                <h1 className="text-6xl sm:text-7xl xl:text-[7rem] font-black uppercase tracking-tighter leading-[0.8] mb-0 drop-shadow-2xl">
                  <span className="block mb-2">Beyond</span>
                  <span className="block ml-6 sm:ml-12 text-5xl sm:text-6xl xl:text-7xl opacity-80 font-serif italic text-white/90">&amp;</span>
                  <span className="block mt-2 italic font-light tracking-tight text-[#ff6b6b]">Behind</span>
                </h1>
              </div>
              <div className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right gap-6 pt-8 md:pt-0">
                <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/70 border border-white/20 px-3 py-1 backdrop-blur-sm">Est. 2024</div>
                <div className="font-serif text-sm md:text-base text-white/80 leading-relaxed max-w-sm">
                  <p>An editorial glimpse into the analog activities, creative pursuits, and physical spaces that balance the digital craft.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══ NEWSPAPER BROADSHEET LAYOUT ═══ */}
        <div className={`max-w-[1100px] mx-auto px-4 md:px-8 py-12 md:py-16`}>
          
          {/* Magazine Header */}
          <div className={`border-b-8 border-double ${border} pb-8 mb-12 text-center relative`}>
            
            <div className="flex justify-center md:justify-between items-center font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold border-b border-current pb-4 mb-8 opacity-80">
              <span className="hidden md:inline">Vol. 1 &mdash; No. 01</span>
              <span>The Analog Section</span>
              <span className="hidden md:inline">Est. July 12</span>
            </div>
            
            <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-4">
              Life Beyond
              <br />
              <span className="italic font-light tracking-normal opacity-80 text-4xl md:text-6xl lg:text-7xl">&amp;</span> The Screen
            </h2>
          </div>

          {/* Editor's Note - Enhanced & Smaller */}
          <div className={`relative border border-current p-6 md:p-8 mb-16 max-w-2xl mx-auto shadow-[4px_8px_16px_rgba(0,0,0,0.1)] transform rotate-1 ${t(dark, 'bg-[#1e1d1a]', 'bg-[#fffcf0]')}`}
               style={{ backgroundImage: `repeating-linear-gradient(transparent, transparent 27px, ${dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'} 27px, ${dark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.04)'} 28px)`, backgroundPosition: '0 10px' }}>
            
            {/* Masking Tape */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-7 bg-current opacity-[0.05] transform -rotate-2 z-20 backdrop-blur-sm"></div>

            {/* Paper clip */}
            <div className="absolute -top-5 left-6 md:left-10 w-3.5 h-12 border-2 border-current rounded-full transform -rotate-12 bg-transparent opacity-60 z-20 shadow-[2px_2px_4px_rgba(0,0,0,0.2)]"></div>
            <div className="absolute -top-3 left-[29px] md:left-[45px] w-1.5 h-9 border-2 border-current rounded-full transform -rotate-12 bg-transparent opacity-60 z-20"></div>
            
            {/* Red Stamp */}
            <div className="absolute top-6 right-6 border-2 border-red-600 rounded-sm px-2 py-0.5 transform rotate-12 opacity-70 z-10 hidden sm:block">
              <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-red-600 font-bold">Memo // 01</span>
            </div>

            <div className="flex justify-center mb-6 relative z-10">
              <span className={`inline-block px-3 py-1 text-[8px] uppercase tracking-[0.4em] font-mono font-bold ${t(dark, 'bg-[#e8e4db] text-[#111111]', 'bg-[#111111] text-[#f8f5ef]')} transform -rotate-1 shadow-sm`}>
                Editor's Note
              </span>
            </div>
            
            <div className="relative px-6 md:px-12">
              <span className="font-serif text-6xl absolute -top-4 -left-2 opacity-10">“</span>
              <p className="font-serif text-[16px] md:text-lg font-light italic leading-[28px] text-center relative z-10 opacity-90">
                Sometimes the best ideas don't come from going out, but from staying in, eating good food, and just cherishing the little things in life.
                <br />
                <span className="font-bold text-sm uppercase tracking-widest mt-2 block not-italic">&mdash; Jaja</span>
              </p>
              <span className="font-serif text-6xl absolute -bottom-8 -right-2 opacity-10">”</span>
            </div>
          </div>

          {/* Newspaper Columns Area - Masonry Flow */}
          <div className="columns-1 md:columns-3 gap-8 md:gap-12">
            
            {/* 1. Exploration Article */}
            <article className="break-inside-avoid mb-10 inline-block w-full">
              <div className={`border-l-4 ${border} pl-4 mb-4`}>
                <h3 className={`font-serif text-3xl md:text-4xl font-black uppercase tracking-tighter leading-[0.9]`}>Comfort &amp;<br/>Curiosities</h3>
              </div>
              <div className="flex items-center gap-2 mb-4 opacity-70">
                <span className="w-2 h-2 bg-current rounded-full"></span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] font-bold border-b border-current pb-0.5">Life's Simple Joys</span>
              </div>
              <p className="font-serif text-[15px] leading-[1.8] text-justify opacity-90 mb-4">
                <span className="float-left text-6xl font-black mr-3 leading-[0.7] mt-2">I</span> absolutely love going out and traveling, but only if it's with fun people&mdash;yung sa masaya, and yung mga gusto ko lang kasama, hahahaha! But on the flip side, there are plenty of days where I just want to stay in the comfort of my room and binge-watch my favorite shows. Add some adobo, sinigang, bangus, or tulingan with gata to the mix, and I am in heaven!
              </p>
              <p className="font-serif text-[15px] leading-[1.8] text-justify opacity-90 mb-4">
                I'm also incredibly easy to make laugh—madali lang ako patawanin! I think keeping things light and joyful is the best way to live. Oh, and I am obsessed with dogs. They are just the absolute best! Frogs, on the other hand? Absolutely not, hahaha.
              </p>
              <p className="font-serif text-[15px] leading-[1.8] text-justify opacity-90 font-bold italic">
                I guess you could say my comfort zone is filled with good food, cute dogs, and lots of laughter.
              </p>
            </article>

            {/* GROUPED FOR MOBILE: Logbook and Feature Image */}
            <div className="break-inside-avoid mb-10 w-full grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-10 items-stretch">
              
              {/* 2. Enhanced Travel Log (Notepad Style) */}
              <div className={`w-full h-full relative border-x-2 border-b-2 border-t-[8px] md:border-t-[12px] ${border} p-3 pb-4 md:p-6 md:pb-8 shadow-lg ${t(dark, 'bg-[#1e1d1a]', 'bg-[#fffdf7]')} flex flex-col`}
                   style={{ backgroundImage: `repeating-linear-gradient(transparent, transparent 31px, ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 31px, ${dark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} 32px)`, backgroundPosition: '0 40px' }}>
                {/* Torn top edge */}
                <div className="absolute top-[-10px] md:top-[-14px] left-0 right-0 h-4 bg-transparent" style={{ backgroundImage: `radial-gradient(circle at 10px 14px, transparent 12px, ${dark ? '#111111' : '#f8f5ef'} 13px)`, backgroundSize: '20px 20px', backgroundRepeat: 'repeat-x' }}></div>
                
                <div className={`absolute -top-5 md:-top-6 right-2 md:right-4 ${t(dark, 'bg-[#e8e4db] text-[#111111]', 'bg-[#111111] text-[#f8f5ef]')} px-2 md:px-3 py-1 font-mono text-[7px] md:text-[9px] uppercase tracking-widest font-black transform rotate-2 shadow-md`}>
                  Favorites
                </div>
                <h4 className="font-mono text-[8px] md:text-[11px] uppercase tracking-widest font-bold mb-2 md:mb-4 mt-2 opacity-90 leading-tight">Comfort Foods &amp; Joys</h4>
                <ul className="font-serif text-[11px] md:text-[15px] italic opacity-90 flex-1 flex flex-col justify-around list-none pl-1 md:pl-2 py-2">
                  <li className="flex items-start md:items-center gap-2 md:gap-3"><span className="text-red-500 font-sans not-italic text-[10px] md:text-sm mt-0.5 md:mt-0">✔</span> <span className="leading-tight">Strawberry &amp; Vanilla Ice Cream</span></li>
                  <li className="flex items-start md:items-center gap-2 md:gap-3"><span className="text-red-500 font-sans not-italic text-[10px] md:text-sm mt-0.5 md:mt-0">✔</span> <span className="leading-tight">Adobo, Sinigang, Bangus &amp; Tulingan with gata</span></li>
                  <li className="flex items-start md:items-center gap-2 md:gap-3"><span className="text-red-500 font-sans not-italic text-[10px] md:text-sm mt-0.5 md:mt-0">✔</span> <span className="leading-tight">Playing with cute dogs (No frogs!)</span></li>
                </ul>
              </div>
  
              {/* 3. Feature Image with Polaroid/Film Design */}
              <figure className="w-full h-full m-0 relative group p-1 md:p-2 block flex flex-col">
                {/* Offset Decorative Border */}
                <div className={`absolute inset-0 border-2 border-current opacity-30 transform rotate-3 group-hover:rotate-1 transition-transform duration-700 bg-current/5`}></div>
                
                <div className={`relative flex-1 flex flex-col ${t(dark, 'bg-[#1a1a1a]', 'bg-white')} p-2 md:p-4 pb-8 md:pb-12 border shadow-2xl transform -rotate-2 group-hover:rotate-0 transition-transform duration-700 ${border}`}>
                  {/* Thick Tape Top */}
                  <div className="absolute -top-3 md:-top-4 left-1/2 -translate-x-1/2 w-16 md:w-24 h-5 md:h-8 bg-current opacity-[0.1] transform rotate-1 z-10"></div>
                  {/* Tape Bottom Corner */}
                  <div className="absolute -bottom-3 md:-bottom-4 -right-3 md:-right-4 w-8 md:w-12 h-4 md:h-6 bg-current opacity-[0.1] transform -rotate-45 z-10"></div>
                  
                  {/* Film Overlay Label */}
                  <div className="absolute top-2 md:top-6 right-2 md:right-6 bg-red-600 text-white font-mono text-[5px] md:text-[7px] font-black uppercase tracking-widest px-1.5 md:px-2 py-0.5 md:py-1 transform rotate-90 origin-top-right z-20 mix-blend-screen opacity-90">
                    ISO 400
                  </div>
  
                  <div className="flex-1 min-h-[150px] overflow-hidden filter grayscale contrast-110 hover:grayscale-0 transition-all duration-700 border border-current/20 shadow-inner mb-6 md:mb-10">
                    <img src="/images/meme.webp" alt="Exploration" className="w-full h-full object-cover" />
                  </div>
                  <figcaption className="font-mono text-[7px] md:text-[11px] uppercase tracking-[0.2em] px-1 md:px-2 flex justify-between items-end opacity-90 font-bold border-b border-current pb-1 md:pb-2 absolute bottom-2 left-2 right-2 md:bottom-4 md:left-4 md:right-4">
                    <span className="text-sm md:text-2xl font-serif font-black leading-none italic pr-2 md:pr-4">01</span>
                    <span className="text-right leading-[1.1]">Making<br/>Memories</span>
                  </figcaption>
                </div>
              </figure>
            </div>
            
            {/* 4. Treasuring Every Detail */}
            <article className={`break-inside-avoid mb-10 inline-block w-full relative p-6 border-y-4 border-x-2 border-double ${border} mt-2`}>
              {/* Decorative brackets */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-current"></div>
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-current"></div>
              
              <h3 className="font-serif text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4 text-center">Treasuring<br/>Every Detail</h3>
              <div className="flex items-center justify-center gap-2 mb-6 opacity-70">
                <span className="w-full h-px bg-current"></span>
                <span className="font-mono text-[8px] uppercase tracking-[0.3em] font-bold whitespace-nowrap px-2">Letters &amp; Scraps</span>
                <span className="w-full h-px bg-current"></span>
              </div>
              <p className="font-serif text-[15px] leading-[1.8] text-justify opacity-90 mb-4 first-letter:text-5xl first-letter:font-black first-letter:float-left first-letter:mr-2 first-letter:mt-1 first-letter:leading-[0.8]">
                Family holds a very special place in my heart. Being the only girl and the only grandchild to my nanay on my mother's side, I grew up surrounded by a lot of love! That warmth is probably why I treasure everything so deeply. Even the smallest things hold massive sentimental value to me.
              </p>
              <p className="font-serif text-[15px] leading-[1.8] text-justify opacity-90">
                I absolutely adore things that carry memories. Forget generic items—give me a handwritten letter, a scrapbook, or a little token of an inside joke, and I will cherish it forever. I keep everything important! Even if I receive an expensive gift (which I do love, hahahah!), if the moment is special, you better believe I am keeping the packaging too! It's all about holding onto the feeling and the memory attached to the physical object. I guess that's why my digital spaces feel like a scrapbook, too.
              </p>
            </article>

            {/* GROUPED FOR MOBILE: Currently and Sticky Note */}
            <div className="break-inside-avoid mb-10 w-full grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-10 items-stretch">
              
              {/* 5. Currently Section (Receipt / Classifieds style) */}
              <div className={`w-full h-full p-4 md:p-6 border-2 border-dashed ${border} ${t(dark, 'bg-[#1a1914] text-[#e8e4db]', 'bg-[#fffdf2] text-[#222]')} shadow-sm relative flex flex-col justify-center`}>
                <div className="absolute top-0 left-0 w-full h-2 bg-current opacity-10"></div>
                <h4 className={`font-mono text-sm md:text-2xl uppercase tracking-tighter font-black mb-4 md:mb-6 border-b-4 border-double ${border} pb-2 text-center`}>Currently...</h4>
                <div className="font-serif text-[10px] md:text-[15px] opacity-90 space-y-2 md:space-y-4 font-medium italic">
                  <p className="flex justify-between border-b border-dotted border-current/40 pb-1">
                    <strong className="not-italic uppercase font-mono tracking-widest text-[7px] md:text-[10px] mt-1">Watching</strong>
                    <span className="text-right">Movies in my room</span>
                  </p>
                  <p className="flex justify-between border-b border-dotted border-current/40 pb-1">
                    <strong className="not-italic uppercase font-mono tracking-widest text-[7px] md:text-[10px] mt-1">Craving</strong>
                    <span className="text-right">Strawberry Ice Cream</span>
                  </p>
                  <p className="flex justify-between border-b border-dotted border-current/40 pb-1">
                    <strong className="not-italic uppercase font-mono tracking-widest text-[7px] md:text-[10px] mt-1">Treasuring</strong>
                    <span className="text-right">Handwritten letters</span>
                  </p>
                  <p className="flex justify-between border-b border-dotted border-current/40 pb-1">
                    <strong className="not-italic uppercase font-mono tracking-widest text-[7px] md:text-[10px] mt-1">Avoiding</strong>
                    <span className="text-right">Frogs!</span>
                  </p>
                </div>
              </div>
  
              {/* 6. Conclusion Box (Sticky Note Style) */}
              <div className={`w-full h-full max-w-[260px] mx-auto md:max-w-none ${t(dark, 'bg-[#ffed73] text-[#111111]', 'bg-[#ffea4d] text-[#111111]')} p-4 md:p-8 text-center shadow-[4px_12px_24px_rgba(0,0,0,0.2)] transform rotate-2 relative md:ml-2 flex flex-col justify-center`}>
                {/* Push Pin */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-[2px_4px_6px_rgba(0,0,0,0.4)] border border-black/20 z-20"></div>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1.5 h-4 bg-gray-400 -z-10 translate-y-2 translate-x-1 transform rotate-45"></div>
                
                <h4 className="font-serif font-black uppercase tracking-widest border-b border-black/10 pb-2 md:pb-3 mb-2 md:mb-4 text-[10px] md:text-sm">A Friendly Reminder</h4>
                <p className="font-serif text-[11px] md:text-[16px] leading-[1.4] md:leading-[1.6] opacity-90">
                  &ldquo;A gift isn't just about the item inside; it's about the thought and the memory. Yes, I'm the girl who keeps the pretty packaging!&rdquo;
                </p>
              </div>
              
            </div>

            {/* GROUPED FOR MOBILE: Author Portrait and Field Notes */}
            <div className="break-inside-avoid mb-10 w-full grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-10 items-stretch">
              
              {/* 7. Author Portrait - Scattered Photo Stack */}
              <div className={`w-full h-full max-w-[260px] mx-auto md:max-w-none relative px-2 md:px-6 py-2 md:py-4 group block`}>
                
                {/* Photo behind 1 */}
                <div className={`absolute inset-0 ${t(dark, 'bg-[#222]', 'bg-[#f4f1ea]')} border ${border} shadow-lg transform -rotate-6 translate-x-2 -translate-y-2 p-1 md:p-2 transition-transform duration-700 group-hover:-rotate-12 group-hover:translate-x-6 z-0`}>
                  <div className="w-full h-full border border-dashed border-current opacity-30 flex items-center justify-center p-2 md:p-4">
                    <span className="font-mono text-[8px] md:text-xs uppercase tracking-widest opacity-40 transform -rotate-90">Archive</span>
                  </div>
                </div>
  
                {/* Photo behind 2 */}
                <div className={`absolute inset-0 ${t(dark, 'bg-[#1a1a1a]', 'bg-[#e8e4db]')} border ${border} shadow-md transform rotate-3 translate-x-4 translate-y-4 p-1 md:p-2 transition-transform duration-700 group-hover:rotate-12 group-hover:-translate-y-2 z-10`}></div>
  
                {/* Main Image */}
                <div className={`relative h-full flex flex-col p-2 md:p-3 pb-8 md:pb-10 ${t(dark, 'bg-[#151515]', 'bg-white')} border shadow-2xl transform -rotate-2 transition-transform duration-700 group-hover:rotate-0 z-20 ${border}`}>
                  
                  {/* Tape */}
                  <div className="absolute -top-3 md:-top-4 left-1/3 w-10 md:w-16 h-4 md:h-6 bg-current opacity-[0.1] transform rotate-6 z-30"></div>
                  <div className="absolute -bottom-3 md:-bottom-4 right-1/3 w-8 md:w-12 h-4 md:h-6 bg-current opacity-[0.1] transform -rotate-12 z-30"></div>
  
                  <div className="aspect-square overflow-hidden filter grayscale contrast-125 border border-current/20 flex-1">
                    <img src="/images/me also.webp" alt="Hannah Peralta" className="w-full h-full object-cover object-bottom scale-105 origin-bottom" />
                  </div>
                  
                  <div className="absolute bottom-2 md:bottom-4 left-0 right-0 text-center">
                     <span className="font-mono text-[7px] md:text-[10px] uppercase tracking-[0.3em] font-black opacity-90 bg-current text-white dark:text-black px-2 md:px-3 py-0.5 md:py-1">The Only Granddaughter</span>
                  </div>
                </div>
              </div>
  
              {/* 8. Field Notes / Philosophy */}
              <div className={`w-full h-full p-4 md:p-8 border-t-[6px] md:border-t-8 border-b-2 border-x-2 border-double ${border} relative ${t(dark, 'bg-[#151515]', 'bg-[#fffefb]')} flex flex-col justify-center`}>
                <div className="absolute top-1 md:top-2 left-1 md:left-2 right-1 md:right-2 bottom-1 md:bottom-2 border border-current opacity-10 pointer-events-none"></div>
                
                <div className="text-center mb-4 md:mb-6">
                  <h4 className="font-serif font-black text-xl md:text-4xl uppercase tracking-tighter leading-[0.8]">Field Notes</h4>
                  <p className="font-mono text-[6px] md:text-[9px] uppercase tracking-[0.3em] mt-2 md:mt-4 border-b border-solid border-current pb-2 md:pb-3 font-bold opacity-80">Vol. 01 &mdash; Sentiments</p>
                </div>
                <div className="relative px-1 md:px-2">
                  <span className="font-serif text-5xl md:text-8xl leading-none opacity-10 absolute -top-4 md:-top-8 -left-2 md:-left-4">“</span>
                  <p className="font-serif text-[11px] md:text-[17px] italic leading-[1.6] md:leading-[1.8] text-center opacity-90 relative z-10 py-2 md:py-4 font-light">
                    Little things mean a lot. Sometimes, the smallest items take up the most room in your heart.
                  </p>
                  <span className="font-serif text-5xl md:text-8xl leading-none opacity-10 absolute -bottom-6 md:-bottom-10 -right-2 md:-right-4">”</span>
                </div>
                <div className="text-center mt-4 md:mt-6">
                  <p className="font-mono text-[7px] md:text-[10px] uppercase tracking-widest font-black opacity-80 border border-current inline-block px-2 md:px-3 py-0.5 md:py-1">A Collector of Memories</p>
                </div>
              </div>
              
            </div>

            {/* 9. The Craft Article */}
            <article className={`break-inside-avoid mb-10 inline-block w-full border-t-4 border-double ${border} pt-8`}>
              <h3 className="font-serif text-3xl md:text-4xl font-black uppercase tracking-tighter mb-4">The Craft</h3>
              <div className="flex items-center gap-2 mb-6 opacity-70">
                <span className="w-1.5 h-1.5 bg-current rotate-45"></span>
                <span className="font-mono text-[9px] uppercase tracking-[0.3em] font-bold">Design &amp; Empathy</span>
              </div>
              <p className="font-serif text-[15px] leading-[1.8] text-justify opacity-90 mb-4">
                <span className="float-left text-6xl font-black mr-3 leading-[0.8] mt-1">G</span>ood design is invisible. It isn't just about making things look pretty; it's about fundamentally understanding how people think, feel, and interact with the world around them. When I step away from the keyboard, I'm constantly taking mental notes. How does a street sign guide a lost tourist? How does the texture of a menu affect the dining experience? 
              </p>
              <p className="font-serif text-[15px] leading-[1.8] text-justify opacity-90 relative">
                These analog observations are the secret ingredient to building digital experiences that actually feel human. Technology should feel like a natural extension of ourselves, not a frustrating hurdle. Taking the time to observe the physical world is the ultimate foundation for empathetic digital design.
                <span className="inline-block w-2 h-2 bg-current rotate-45 ml-2 mb-0.5 opacity-60"></span>
              </p>
            </article>

          </div>

          {/* Newspaper Footer */}
          <div className={`w-full border-t border-b-4 border-double ${border} mt-16 py-3 flex justify-between items-center font-mono text-[9px] uppercase tracking-[0.3em] font-bold opacity-60`}>
            <span>&copy; 2026 HanMade</span>
            <span>Fin.</span>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
