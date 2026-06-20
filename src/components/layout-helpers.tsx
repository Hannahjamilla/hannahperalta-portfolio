import { memo, useEffect, useState } from 'react'
import { ArrowUp, Code2, PenTool, Rocket, Cpu, Send, GitBranch, Globe, FileText } from 'lucide-react'
import { t } from '../context/theme-context'
import { FRONTEND, BACKEND, CLOUD_TOOLS } from '../data/constants'

export const TechnicalSkills = memo(({ dark, card }: any) => (
  <section id="stats" className="py-5 px-4 sm:px-6">
    <div className={`max-w-6xl mx-auto rounded-2xl border p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-cyan-900/40 shadow-sm hover:shadow-md', 'bg-white border-indigo-200 shadow-sm')}`}>
      <div className={`absolute -top-3 left-6 px-3 font-bold tracking-widest text-[10px] sm:text-xs uppercase ${t(dark, 'bg-[#0d0d18] text-cyan-400', 'bg-white text-indigo-600')}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
        TECHNICAL SKILLS
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {[
          { title: 'FRONTEND', items: FRONTEND, accent: 'text-cyan-400', bg: 'bg-cyan-400' },
          { title: 'BACKEND', items: BACKEND, accent: 'text-purple-400', bg: 'bg-purple-400' },
          { title: 'DATABASES & TOOLS', items: CLOUD_TOOLS, accent: 'text-orange-400', bg: 'bg-orange-400' }
        ].map(cat => (
          <div key={cat.title} className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-1.5 h-1.5 rounded-full ${cat.bg} animate-pulse`} />
              <p className={`font-semibold tracking-wide text-xs ${cat.accent} tracking-wider uppercase`}>{cat.title}</p>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-1 gap-2 sm:gap-3">
              {cat.items.map(s => (
                <div key={s.name} className={`p-2.5 xl:p-4 rounded-xl xl:rounded-2xl border flex flex-col xl:flex-row items-center xl:gap-3 text-center xl:text-left ${card}`}>
                  <div style={{width:28,height:28,flexShrink:0}} className={`rounded-lg flex items-center justify-center mb-1.5 xl:mb-0 overflow-hidden ${t(dark, 'bg-white/5', 'bg-gray-50')}`}>
                    <s.icon size={16} className={cat.accent} />
                  </div>
                  <div className="xl:hidden w-full min-w-0">
                    <span className="text-[11px] font-bold tracking-tight leading-snug block w-full" style={{wordBreak:'break-word'}}>{s.name}</span>
                    <span className="text-[9px] font-mono opacity-60 mt-0.5 block">{s.label.split(' / ')[1]}</span>
                  </div>
                  <div className="hidden xl:flex min-w-0 w-full flex-row items-center justify-between">
                    <span className="text-xs font-bold tracking-tight truncate">{s.name}</span>
                    <span className="text-[10px] font-mono opacity-60 ml-2 shrink-0">{s.label.split(' / ')[1]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className={`mt-8 pt-5 border-t ${t(dark, 'border-cyan-900/30', 'border-indigo-100')}`}>
        <p className={`text-[10px] sm:text-xs mb-3 font-bold text-center uppercase tracking-widest ${t(dark, 'text-cyan-400', 'text-indigo-600')}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>TOOLS & PRODUCTIVITY</p>
        <div className="flex flex-wrap justify-center gap-2">
          {[
            { name: 'VS Code', icon: Code2 }, { name: 'Cursor', icon: PenTool }, { name: 'Antigravity', icon: Rocket }, 
            { name: 'Claude', icon: Cpu }, { name: 'Postman', icon: Send }, { name: 'GitHub', icon: GitBranch }, 
            { name: 'Figma', icon: PenTool }, { name: 'Vercel', icon: Globe }, { name: 'ChatGPT', icon: FileText }
          ].map(tool => (
            <span key={tool.name} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${t(dark, 'bg-cyan-950/20 border border-cyan-800/30 text-cyan-300 hover:bg-cyan-900/40', 'bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100')}`}>
              <tool.icon size={12} />
              {tool.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  </section>
))

export const Navigation = memo(({ dark, setMenuOpen, toggle }: any) => {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg border-b transition-all duration-500 ${t(dark, 'bg-[#0a0a0f]/80 border-cyan-900/40 shadow-[0_4px_30px_rgba(34,211,238,0.03)]', 'bg-white/80 border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]')}`} role="navigation" aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="w-9 h-9 flex items-center justify-center overflow-hidden shrink-0">
            <img
              src="/images/HanMade.webp"
              alt="HanMade logo"
              className={`w-full h-full object-contain transition-all duration-300 group-hover:scale-110 drop-shadow-md ${dark ? 'invert brightness-[1.8]' : ''}`}
            />
          </div>
        </div>

        <div className="hidden xl:flex items-center gap-7 text-[10px] sm:text-[11px] font-bold">
          {[{ id: 'profile', label: 'profile' }, { id: 'stats', label: 'skills' }, { id: 'quests', label: 'projects' }, { id: 'experience', label: 'experience' }].map(s => (
            <a key={s.id} href={`#${s.id}`} className={`group relative px-2 py-1.5 transition-colors duration-300 flex items-center gap-[4px] ${t(dark, 'text-gray-400 hover:text-cyan-400', 'text-gray-500 hover:text-indigo-600')}`} style={{ fontFamily: "'Orbitron', sans-serif" }}>
              <span className={`text-[10px] transition-colors duration-300 ${t(dark, 'text-cyan-900 group-hover:text-cyan-500', 'text-indigo-200 group-hover:text-indigo-400')}`}>[</span>
              <span className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-[1px] tracking-widest uppercase">{s.label}</span>
              <span className={`text-[10px] transition-colors duration-300 ${t(dark, 'text-cyan-900 group-hover:text-cyan-500', 'text-indigo-200 group-hover:text-indigo-400')}`}>]</span>
              <span className={`absolute bottom-0 left-1/2 w-0 h-[2px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[70%] rounded-full opacity-0 group-hover:opacity-100 ${t(dark, 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]', 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]')}`} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sliding pill toggle */}
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`relative w-10 h-5 rounded-full border transition-all duration-500 cursor-pointer shrink-0 focus:outline-none
              ${dark
                ? 'bg-[#0d1a2e] border-cyan-500/40 shadow-[0_0_8px_rgba(34,211,238,0.15)]'
                : 'bg-gradient-to-r from-indigo-100 to-violet-100 border-indigo-300/60 shadow-sm'
              }`}
          >
            {/* Track icons */}
            <span className={`absolute left-1 top-1/2 -translate-y-1/2 transition-all duration-500 ${dark ? 'opacity-30' : 'opacity-100'}`}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke={dark ? '#94a3b8' : '#6366f1'} strokeWidth="2.5" strokeLinecap="round">
                <circle cx="12" cy="12" r="4"/><line x1="12" y1="2" x2="12" y2="5"/><line x1="12" y1="19" x2="12" y2="22"/>
                <line x1="4.22" y1="4.22" x2="6.34" y2="6.34"/><line x1="17.66" y1="17.66" x2="19.78" y2="19.78"/>
                <line x1="2" y1="12" x2="5" y2="12"/><line x1="19" y1="12" x2="22" y2="12"/>
                <line x1="4.22" y1="19.78" x2="6.34" y2="17.66"/><line x1="17.66" y1="6.34" x2="19.78" y2="4.22"/>
              </svg>
            </span>
            <span className={`absolute right-1 top-1/2 -translate-y-1/2 transition-all duration-500 ${dark ? 'opacity-100' : 'opacity-30'}`}>
              <svg width="8" height="8" viewBox="0 0 24 24" fill={dark ? '#22d3ee' : 'none'} stroke={dark ? '#22d3ee' : '#a5b4fc'} strokeWidth="2.5" strokeLinecap="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            </span>
            {/* Sliding thumb */}
            <span
              className={`absolute top-0.5 w-4 h-4 rounded-full shadow-md transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                ${dark
                  ? 'left-[calc(100%-1.125rem)] bg-gradient-to-br from-cyan-400 to-blue-500 shadow-cyan-400/30'
                  : 'left-0.5 bg-white shadow-indigo-200/60'
                }`}
            />
          </button>
          <button onClick={() => setMenuOpen(true)} className={`xl:hidden p-2.5 rounded-xl font-mono text-sm font-bold transition-all duration-300 border border-transparent flex items-center justify-center ${t(dark, 'text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-900/50', 'text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200')}`}>[=]</button>
        </div>
      </div>
    </nav>
  )
})

export const BackToTopButton = memo(({ dark }: { dark: boolean }) => {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-6 right-6 z-50 p-2 min-w-[44px] border transition-all duration-500 transform flex flex-col items-center justify-center
        ${scrollY > 400 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'} 
        ${t(dark, 'bg-[#0a0a0f] border-cyan-500 text-cyan-400 hover:bg-cyan-400 hover:text-black ', 'bg-white border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none')}`}
    >
      <ArrowUp size={16} strokeWidth={3} />
      <span className="font-semibold tracking-wide text-xs mt-1 tracking-tighter">TOP</span>
    </button>
  )
})
