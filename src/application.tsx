import { useEffect, useState } from 'react'
import {
  GitBranch, Code2, Rocket, Cpu, Send, PenTool, FileText, Globe, ArrowUp, Heart, Volume2
} from 'lucide-react'
import type { DetailData } from './types'
import { ThemeCtx, t } from './context/theme-context'
import { Lightbox } from './components/ui/lightbox'
import { DetailModal } from './components/ui/detail-modal'
import { MobileMenu } from './components/ui/mobile-menu'
import { FRONTEND, BACKEND, CLOUD_TOOLS, QUESTS, ACHIEVEMENTS, XP_LOG, PERSONAL } from './data/constants'

/* ── App ── */
export default function App() {
  const [dark, setDark] = useState(false)
  const [tab, setTab] = useState<'projects' | 'skills' | 'awards'>('projects')
  const [menu, setMenu] = useState(false)
  const [lightbox, setLightbox] = useState<{ imgs: string[]; alt: string; wip?: boolean } | null>(null)
  const [detailModal, setDetailModal] = useState<DetailData | null>(null)
  const [isReading, setIsReading] = useState(false)

  const toggleReadBio = () => {
    if (!('speechSynthesis' in window)) return;

    if (isReading) {
      window.speechSynthesis.cancel();
      setIsReading(false);
    } else {
      window.speechSynthesis.cancel();
      const text = "Hi there! I'm an IT graduate who crafts practical and impactful digital solutions. I thrive on diving deep into the technical details to refine and elevate user experiences, ensuring every project is both functional and visually engaging. Beyond writing code, I absolutely love collaborating with awesome teams to bring great ideas to life. I am always eager to embrace new challenges, learn emerging technologies, and build products that truly make a difference!";
      const msg = new SpeechSynthesisUtterance(text);
      msg.rate = 0.95;
      
      const voices = window.speechSynthesis.getVoices();
      // Try specifically for female voices, otherwise fallback to any voice that isn't a known male voice
      const femaleVoice = voices.find(v => 
        /zira|susan|hazel|heather|female|samantha|victoria|google us english/i.test(v.name)
      ) || voices.find(v => !/david|mark|male|boy|guy/i.test(v.name));
      
      if (femaleVoice) {
        msg.voice = femaleVoice;
      }

      msg.onend = () => setIsReading(false);
      msg.onerror = () => setIsReading(false);

      window.speechSynthesis.speak(msg);
      setIsReading(true);
    }
  };

  const openProfileModal = () => {
    setDetailModal({
      profileMode: true,
      title: 'Hannah Jamilla DR. Peralta',
      subtitle: 'IT Graduate & Web Developer',
      period: 'Tabon Pulilan, Bulacan | +63 922 250 0165',
      badge: 'ACTIVE',
      desc: 'Detail-oriented Information Technology individual with hands-on experience in full-stack and backend development through academic projects and internships. Skilled in research, workflow analysis, quality assurance testing, system documentation, and AI-assisted tools. Recognized for strong analytical thinking, attention to detail, and the ability to translate requirements into practical solutions that improve efficiency, user experience, and overall business outcomes.',
      tags: ['SDLC', 'System Documentation', 'QA Testing', 'Process Improvement', 'Workflow Analysis', 'Research & Operations'],
      imgs: ['/images/Hannah-casual.png', '/images/Hannah-casual1.png', '/images/Jamilla.png', '/images/Hannah-casual4.png']
    })
  }

  const toggle = () => setDark(p => !p)


  const bg = t(dark, 'bg-[#0a0a0f] text-gray-100', 'bg-[#f8f7f4] text-gray-900')
  const gridBg = t(dark, '', '')
  const card = t(dark, 'bg-white/[0.03] border-white/5', 'bg-white border-gray-200 shadow-sm')
  const muted = t(dark, 'text-gray-500', 'text-gray-600')
  const accent = t(dark, 'text-cyan-400', 'text-indigo-600')
  const accentBg = t(dark, 'bg-cyan-950/30 border-cyan-800/40', 'bg-indigo-50 border-indigo-200')
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    // Specifically preload TTS voices so they are ready before the user clicks
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dotColor = t(dark, 'bg-cyan-400', 'bg-indigo-500')

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div className={`min-h-screen w-full ${bg} overflow-x-hidden ${gridBg}  relative transition-colors duration-300`}>
        <MobileMenu open={menu} onClose={() => setMenu(false)} />

        {/* ── NAV ── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-500 ${t(dark, 'bg-[#0a0a0f]/80 border-cyan-900/40 shadow-[0_4px_30px_rgba(34,211,238,0.03)]', 'bg-white/80 border-gray-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.03)]')}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3 group cursor-pointer hover:opacity-90 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <div className="relative flex items-center justify-center w-4 h-4">
                <Heart size={14} className={`transform group-hover:scale-125 transition-transform duration-300 ${t(dark, 'text-cyan-400 fill-cyan-400 drop-shadow-[0_0_6px_rgba(34,211,238,0.6)]', 'text-indigo-500 fill-indigo-500 drop-shadow-[0_0_6px_rgba(99,102,241,0.6)]')}`} />
              </div>
              <span className={`font-black uppercase text-xs sm:text-[13px] tracking-[0.2em] transition-all duration-300 ${t(dark, 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:to-cyan-300', 'text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:to-indigo-500')}`}>
                <span className="hidden xl:inline">HANNAH JAMILLA</span>
                <span className="xl:hidden">Hannah</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden xl:flex items-center gap-7 text-[13px] font-mono font-bold">
              {[{ id: 'profile', label: 'profile' }, { id: 'stats', label: 'skills' }, { id: 'quests', label: 'projects' }, { id: 'experience', label: 'experience' }].map(s => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className={`group relative px-2 py-1.5 transition-colors duration-300 flex items-center gap-[4px] ${t(dark, 'text-gray-400 hover:text-cyan-400', 'text-gray-500 hover:text-indigo-600')}`}
                >
                  <span className={`text-[11px] sm:text-xs transition-colors duration-300 ${t(dark, 'text-cyan-900 group-hover:text-cyan-500', 'text-indigo-200 group-hover:text-indigo-400')}`}>[</span>
                  <span className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-[1px] tracking-wide">
                    {s.label.toUpperCase()}
                  </span>
                  <span className={`text-[11px] sm:text-xs transition-colors duration-300 ${t(dark, 'text-cyan-900 group-hover:text-cyan-500', 'text-indigo-200 group-hover:text-indigo-400')}`}>]</span>

                  {/* Underline glow */}
                  <span className={`absolute bottom-0 left-1/2 w-0 h-[2px] -translate-x-1/2 transition-all duration-300 ease-out group-hover:w-[70%] rounded-full opacity-0 group-hover:opacity-100 ${t(dark, 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]', 'bg-indigo-600 shadow-[0_0_8px_rgba(79,70,229,0.5)]')}`} />
                </a>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Theme toggle */}
              <button
                onClick={toggle}
                className={`relative p-2.5 rounded-xl transition-all duration-300 flex items-center justify-center overflow-hidden group border border-transparent ${t(dark, 'hover:border-white/10 hover:bg-white/5', 'hover:border-gray-200 hover:bg-gray-50')} shadow-sm hover:shadow-md cursor-pointer`}
              >
                <span className={`relative z-10 text-sm sm:text-base transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 drop-shadow-sm`}>
                  {dark ? '☀️' : '🌙'}
                </span>
              </button>

              {/* Mobile hamburger */}
              <button
                onClick={() => setMenu(true)}
                className={`xl:hidden p-2.5 rounded-xl font-mono text-sm font-bold transition-all duration-300 border border-transparent flex items-center justify-center ${t(dark, 'text-cyan-400 hover:bg-cyan-950/30 hover:border-cyan-900/50', 'text-indigo-600 hover:bg-indigo-50 hover:border-indigo-200')}`}
              >
                [=]
              </button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="profile" className="relative pt-16 sm:pt-20 pb-10 sm:pb-12">

          <div className="xl:hidden">
            {/* Cover Banner */}
            <div 
              className={`relative w-full overflow-hidden cursor-pointer group ${t(dark, 'bg-[#0f0f1a]', 'bg-gray-100')}`}
              onClick={() => setLightbox({ imgs: ['/images/cover photo-Hannah.png'], alt: 'Cover Photo' })}
            >
              {/* Cover Photo - No forced height so it doesn't crop horizontally */}
              <img
                src="/images/cover photo-Hannah.png"
                alt="Cover"
                className="w-full h-auto block transition-transform duration-500 group-hover:scale-105"
              />
              {/* Subtle overlay for contrast */}
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <circle cx="11" cy="11" r="7" />
                  <line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Profile Card Body */}
            <div className={`relative mx-4 sm:mx-6 -mt-10 sm:-mt-12 rounded-[1.5rem] border ${t(dark, 'bg-[#0f0f1a] border-white/8 shadow-[0_8px_30px_rgb(0,0,0,0.3)]', 'bg-white border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.06)]')}`}>
              {/* Avatar + Name row */}
              <div className="flex flex-col items-center pt-0 pb-4 px-6 text-center">
                <div
                  className={`-mt-12 mb-3 relative w-[6.5rem] h-[6.5rem] sm:w-[7.5rem] sm:h-[7.5rem] rounded-full border-[5px] overflow-hidden shrink-0 cursor-pointer group flex items-center justify-center ${t(dark, 'border-[#0f0f1a] bg-[#0f0f1a] shadow-xl', 'border-white bg-white shadow-[0_8px_20px_rgb(0,0,0,0.08)]')}`}
                  onClick={openProfileModal}
                >
                  <img src="/images/Hannah-casual4.png" alt="Hannah" className="w-full h-full object-cover object-[50%_15%]" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex flex-col items-center">
                  <h1 className={`font-black tracking-tight leading-[1.1] text-[1.5rem] sm:text-2xl whitespace-nowrap ${t(dark, 'text-white', 'text-[#0f172a]')}`}>
                    Hannah Jamilla <span className="text-[#5B4DFF]">Peralta</span>
                  </h1>
                  <p className={`text-[11px] sm:text-xs mt-1.5 font-medium ${t(dark, 'text-gray-400', 'text-gray-500')}`}>Builder of Things · Fresh Graduate</p>

                  {/* Availability badge under the title */}
                  <div className={`mt-3 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] sm:text-xs font-bold tracking-wide ${t(dark, 'bg-amber-950/30 border border-amber-500/30 text-amber-400', 'bg-amber-50 border border-amber-200 text-amber-600')}`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    Open to Opportunities
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className={`h-[1px] mx-6 ${t(dark, 'bg-white/10', 'bg-gray-100')}`} />

              {/* Stats row */}
              <div className={`grid grid-cols-3 divide-x px-0 my-1 ${t(dark, 'divide-white/10', 'divide-gray-100')}`}>
                {[{ l: 'Projects', v: '9+', c: 'text-[#ef4444]' }, { l: 'Internship', v: '6M', c: 'text-[#5B4DFF]' }, { l: 'Passion', v: '99', c: 'text-[#f59e0b]' }].map((s, idx) => (
                  <div key={idx} className="text-center py-3">
                    <p className={`font-black text-xl sm:text-2xl ${s.c}`}>{s.v}</p>
                    <p className={`text-[10px] font-semibold mt-1 ${t(dark, 'text-gray-400', 'text-gray-500')}`}>{s.l}</p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div className={`h-[1px] mx-6 ${t(dark, 'bg-white/10', 'bg-gray-100')}`} />

              {/* Bio */}
              <div className="px-6 py-4 text-center">
                <p className={`text-[12px] leading-relaxed max-w-sm mx-auto ${t(dark, 'text-gray-400', 'text-gray-600')}`}>
                  <button
                    onClick={toggleReadBio}
                    className={`inline-flex items-center justify-center w-5 h-5 rounded hover:bg-black/5 dark:hover:bg-white/10 mr-1.5 align-middle transition-colors cursor-pointer ${isReading ? t(dark, 'text-amber-400 animate-pulse', 'text-amber-600 animate-pulse') : t(dark, 'text-cyan-400', 'text-indigo-600')}`}
                    title={isReading ? "Stop reading" : "Read aloud"}
                  >
                    <Volume2 size={14} />
                  </button>
                  Hi there! I'm an IT graduate who crafts practical and impactful digital solutions. I thrive on diving deep into the technical details to refine and elevate user experiences, ensuring every project is both functional and visually engaging. Beyond writing code, I absolutely love collaborating with awesome teams to bring great ideas to life. I am always eager to embrace new challenges, learn emerging technologies, and build products that truly make a difference!
                </p>
              </div>

              {/* Tags */}
              <div className="px-6 pb-5 flex flex-wrap justify-center gap-2">
                {[
                  { label: 'Fresh Graduate', c: t(dark, 'text-rose-400 border-rose-900/40 bg-rose-950/20', 'text-[#e11d48] border-[#ffe4e6] bg-[#fff1f2]') },
                  { label: 'Creative Builder', c: t(dark, 'text-indigo-300 border-indigo-900/40 bg-indigo-950/20', 'text-[#4f46e5] border-[#e0e7ff] bg-[#eef2ff]') },
                  { label: 'Bulacan, PH', c: t(dark, 'text-emerald-400 border-emerald-900/40 bg-emerald-950/20', 'text-[#059669] border-[#d1fae5] bg-[#ecfdf5]') },
                  { label: 'National University', c: t(dark, 'text-purple-400 border-purple-900/40 bg-purple-950/20', 'text-[#7c3aed] border-[#ede9fe] bg-[#f5f3ff]') },
                ].map(b => (
                  <span key={b.label} className={`px-3 py-1.5 rounded-full border text-[10px] font-semibold ${b.c}`}>{b.label}</span>
                ))}
              </div>

              {/* Divider */}
              <div className={`h-[1px] mx-6 ${t(dark, 'bg-white/10', 'bg-gray-100')}`} />

              {/* Contact */}
              <div className={`px-6 py-4 space-y-2 font-mono text-[11px] sm:text-xs ${t(dark, 'text-gray-400', 'text-gray-600')}`}>
                <p><span className={accent}>{'>'}</span> <span>email</span>{' '}<a href="mailto:hannahjamillap@gmail.com" className={`${t(dark, 'text-green-400', 'text-[#059669] font-semibold')} hover:underline`}>hannahjamillap@gmail.com</a></p>
                <p><span className={accent}>{'>'}</span> <span>github</span>{' '}<a href="https://github.com/Hannahjamilla" target="_blank" rel="noopener noreferrer" className={`${t(dark, 'text-green-400', 'text-[#059669] font-semibold')} hover:underline`}>github.com/Hannahjamilla</a></p>
                <p><span className={accent}>{'>'}</span> <span>ping</span>{' '}<a href="https://ping-me-seven-vert.vercel.app/" target="_blank" rel="noopener noreferrer" className={`${t(dark, 'text-amber-400', 'text-[#d97706] font-semibold')} hover:underline`}>Reach me out here</a><span className={`animate-blink ${accent}`}>_</span></p>
              </div>
            </div>
          </div>

          {/* ══ DESKTOP VIEW — original layout ══ */}
          <div className="hidden xl:block px-6 max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Character Card */}
              <div className="col-span-4 flex flex-col items-start">
                <div
                  className={`relative w-64 h-72 rounded-2xl border p-1 group cursor-pointer ${t(dark, 'border-cyan-800/40 shadow-sm hover:shadow-md', 'border-indigo-200 shadow-lg')} ${t(dark, 'bg-gradient-to-b from-cyan-950/30 to-transparent', 'bg-gradient-to-b from-indigo-50 to-transparent')}`}
                  onClick={openProfileModal}
                >
                  <div className={`w-full h-full rounded-2xl overflow-hidden flex items-center justify-center relative ${t(dark, 'bg-[#0d0d18]', 'bg-gray-50')}`}>
                    <img src="/images/Hannah-casual4.png" alt="Hannah" className="w-full h-full object-cover opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
                    <img src="/images/Hannah-casual2.jpg" alt="Hannah casual" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 p-4 pointer-events-none ${t(dark, 'bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent', 'bg-gradient-to-t from-white via-white/90 to-transparent')}`}>
                      <p className={`font-semibold tracking-wide text-sm ${accent} leading-relaxed`}>
                        <span className="inline group-hover:hidden">Hannah</span>
                        <span className="hidden group-hover:inline">Jaja</span>
                      </p>
                      <p className={`font-semibold tracking-wide text-xs ${muted} mt-1`}>Builder of Things</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 w-64">
                  {[{ l: 'PRJ', v: '9+', c: 'text-rose-400' }, { l: 'EXP', v: '6M', c: 'text-cyan-400' }, { l: 'PAS', v: '99', c: 'text-amber-400' }].map((s, idx) => (
                    <div key={idx} className={`text-center p-2 rounded-2xl border ${card}`}>
                      <p className="font-semibold tracking-wide text-xs text-gray-500 mb-1">{s.l}</p>
                      <p className={`font-semibold tracking-wide text-sm ${s.c}`}>{s.v}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 w-64">
                  <div className={`relative px-4 py-2.5 rounded-2xl border flex items-center justify-center gap-3 transition-all duration-300 ${t(dark, 'border-amber-500/20 bg-amber-950/40 shadow-sm hover:shadow-md', 'border-amber-200 bg-amber-50 shadow-sm')}`}>
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>
                    <span className={`font-semibold tracking-wide text-xs ${t(dark, 'text-amber-400', 'text-amber-600')}`}>Open to Opportunities</span>
                    <div className={`absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 ${t(dark, 'border-amber-400/60', 'border-amber-500/60')}`} />
                    <div className={`absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 ${t(dark, 'border-amber-400/60', 'border-amber-500/60')}`} />
                  </div>
                </div>
              </div>

              {/* Character Info */}
              <div className="col-span-8 space-y-5 text-left">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05] whitespace-nowrap">
                  <span className={t(dark, 'text-white', 'text-[#0f172a]')}>Hannah Jamilla</span>{' '}
                  <span className={t(dark, 'text-[#5B4DFF]', 'text-[#5B4DFF]')}>Peralta</span>
                </h1>
                <p className={`${muted} text-xs sm:text-sm md:text-base leading-relaxed mt-4`}>
                  <button
                    onClick={toggleReadBio}
                    className={`inline-flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 dark:hover:bg-white/10 mr-1.5 align-middle transition-colors cursor-pointer ${isReading ? t(dark, 'text-amber-400 animate-pulse', 'text-amber-600 animate-pulse') : t(dark, 'text-cyan-400', 'text-indigo-600')}`}
                    title={isReading ? "Stop reading" : "Read aloud"}
                  >
                    <Volume2 size={16} />
                  </button>
                  Hi there! I'm an IT graduate who crafts practical and impactful digital solutions. I thrive on diving deep into the technical details to refine and elevate user experiences, ensuring every project is both functional and visually engaging. Beyond writing code, I absolutely love collaborating with awesome teams to bring great ideas to life. I am always eager to embrace new challenges, learn emerging technologies, and build products that truly make a difference!
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {[
                    { label: 'Fresh Graduate', c: t(dark, 'border-rose-800/40 text-rose-400 bg-rose-950/20', 'border-rose-200 text-rose-700 bg-rose-50') },
                    { label: 'Creative Builder', c: t(dark, 'border-cyan-800/40 text-cyan-400 bg-cyan-950/20', 'border-indigo-200 text-indigo-700 bg-indigo-50') },
                    { label: 'Bulacan, Philippines', c: t(dark, 'border-green-800/40 text-green-400 bg-green-950/20', 'border-emerald-200 text-emerald-700 bg-emerald-50') },
                    { label: 'National University', c: t(dark, 'border-purple-800/40 text-purple-400 bg-purple-950/20', 'border-violet-200 text-violet-700 bg-violet-50') },
                  ].map(b => (
                    <span key={b.label} className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border text-xs font-mono font-semibold ${b.c}`}>{b.label}</span>
                  ))}
                </div>
                <div className={`p-4 sm:p-5 rounded-2xl border font-mono text-xs sm:text-sm space-y-1.5 text-left ${card}`}>
                  <p><span className={muted}>{'>'}</span> <span className={muted}>email</span> <a href="mailto:hannahjamillap@gmail.com" className={`${t(dark, 'text-green-400', 'text-green-700')} hover:underline`}>hannahjamillap@gmail.com</a></p>
                  <p><span className={muted}>{'>'}</span> <span className={muted}>github</span> <a href="https://github.com/Hannahjamilla" target="_blank" rel="noopener noreferrer" className={`${t(dark, 'text-green-400', 'text-green-700')} hover:underline`}>github.com/Hannahjamilla</a></p>
                  <p><span className={muted}>{'>'}</span> <span className={muted}>ping</span> <a href="https://ping-me-seven-vert.vercel.app/" target="_blank" rel="noopener noreferrer" className={`${t(dark, 'text-amber-400', 'text-amber-700')} hover:underline`}>Reach me out here</a><span className={`animate-blink ${accent}`}>_</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* ── XP LOG (Work Experience) ── */}
        <section id="experience" className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-2xl border p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-green-900/40 shadow-sm hover:shadow-md', 'bg-white border-emerald-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-semibold tracking-wide text-xs sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-green-400', 'bg-white text-emerald-600')}`}>
              WORK EXPERIENCE
            </div>
            <div className={`relative pl-6 sm:pl-8 border-l-2 mt-6 space-y-6 sm:space-y-8 ${t(dark, 'border-green-900/40', 'border-emerald-100')}`}>
              {XP_LOG.map((x, i) => (
                <div key={i} onClick={() => window.innerWidth < 1280 && setDetailModal({ title: x.place, subtitle: x.role, period: x.period, desc: x.desc })}
                  className="relative group">

                  {/* Timeline Dot */}
                  <div className={`absolute -left-[31px] sm:-left-[41px] top-6 w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border-[3px] ${t(dark, 'bg-green-400 border-green-500 shadow-[0_0_10px_rgba(74,222,128,0.3)]', 'bg-emerald-400 border-emerald-500 shadow-sm')}`} />

                  {/* Card Content */}
                  <div className={`w-full p-5 sm:p-6 rounded-2xl border transition-all duration-300 ${card}`}>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
                      <div>
                        <h3 className={`text-sm sm:text-base font-black leading-tight ${t(dark, 'text-white', 'text-gray-900')}`}>{x.place}</h3>
                        <p className={`text-[11px] sm:text-xs font-bold mt-0.5 ${t(dark, 'text-green-400', 'text-emerald-600')}`}>{x.role}</p>
                      </div>
                      <div className="flex flex-col items-start sm:items-end shrink-0">
                        <span className={`text-[10px] sm:text-xs font-mono font-bold tracking-widest uppercase ${muted}`}>{x.period}</span>
                      </div>
                    </div>

                    <div className={`hidden sm:flex flex-col gap-2.5 text-xs xl:text-xs ${t(dark, 'text-gray-400', 'text-gray-600')} leading-relaxed`}>
                      {x.desc.map((d, di) => (
                        <div key={di} className="flex flex-row items-start gap-3">
                          <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 shadow-[0_0_8px_rgba(0,0,0,0.5)] ${t(dark, 'bg-green-400 shadow-green-400/50', 'bg-emerald-500 shadow-emerald-400/30')}`} />
                          <span>{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ── STATS ── */}
        <section id="stats" className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-2xl border p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-cyan-900/40 shadow-sm hover:shadow-md', 'bg-white border-indigo-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-semibold tracking-wide text-xs sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-cyan-400', 'bg-white text-indigo-600')}`}>
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
                  <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-1 gap-2 sm:gap-3">
                    {cat.items.map(s => (
                      <div key={s.name} className={`p-2.5 xl:p-4 rounded-xl xl:rounded-2xl border flex flex-col xl:flex-row items-center xl:gap-3 transition-all hover:scale-[1.02] text-center xl:text-left ${card}`}>
                        <div className={`w-7 h-7 xl:w-8 xl:h-8 rounded-lg flex items-center justify-center shrink-0 mb-1.5 xl:mb-0 ${t(dark, 'bg-white/5', 'bg-gray-50')}`}>
                          <s.icon className={`w-4 h-4 xl:w-5 xl:h-5 ${cat.accent}`} />
                        </div>
                        {/* Mobile/Tablet: stacked, no truncate */}
                        <div className="xl:hidden w-full">
                          <span className="text-[11px] font-bold tracking-tight leading-snug break-words block">{s.name}</span>
                          <span className="text-[9px] font-mono opacity-60 mt-0.5 block">{s.label.split(' / ')[1]}</span>
                        </div>
                        {/* Desktop: original row layout */}
                        <div className="hidden xl:flex min-w-0 w-full flex-row items-center justify-between">
                          <span className="text-xs font-bold tracking-tight truncate">{s.name}</span>
                          <span className="text-[10px] font-mono opacity-80 xl:opacity-60 ml-2 shrink-0">{s.label.split(' / ')[1]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-8 pt-5 border-t ${t(dark, 'border-cyan-900/30', 'border-indigo-100')}`}>
              <p className={`font-mono text-xs mb-3 font-bold text-center ${t(dark, 'text-cyan-400', 'text-indigo-600')}`}>TOOLS & PRODUCTIVITY</p>
              <div className="flex flex-wrap justify-center gap-2">
                {[
                  { name: 'VS Code', icon: Code2 },
                  { name: 'Cursor', icon: PenTool },
                  { name: 'Antigravity', icon: Rocket },
                  { name: 'Claude', icon: Cpu },
                  { name: 'Postman', icon: Send },
                  { name: 'GitHub', icon: GitBranch },
                  { name: 'Figma', icon: PenTool },
                  { name: 'Vercel', icon: Globe },
                  { name: 'ChatGPT', icon: FileText }
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

        {/* ── TABS ── */}
        <section id="quests" className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-2xl border p-6 sm:p-8 ${t(dark, 'bg-[#0d0d18] border-white/10', 'bg-white border-gray-200 shadow-sm')}`}>
            <div className="grid grid-cols-2 sm:flex sm:justify-start gap-2 mb-6">
              {(['projects', 'awards'] as const).map(tb => (
                <button key={tb} onClick={() => setTab(tb)}
                  className={`px-2 sm:px-4 py-2 sm:py-2 text-xs sm:text-xs font-mono font-bold uppercase tracking-wider transition-all border whitespace-nowrap text-center text-[10px] sm:text-xs ${tab === tb ? `${accentBg} ${accent} border-transparent` : `${card} ${muted} hover:${accent} ${t(dark, 'border-white/10', 'border-gray-200')}`}`}>
                  [{tb}]
                </button>
              ))}
            </div>

            <div>
              {tab === 'projects' && (
                <div className="grid grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4">
                  {QUESTS.map((q, i) => (
                    <div key={i} className={`w-full rounded-xl sm:rounded-2xl border transition-all group flex flex-col xl:flex-row overflow-hidden ${card}`}>
                      <div
                        className={`aspect-square xl:aspect-auto xl:h-auto xl:w-36 shrink-0 overflow-hidden relative cursor-pointer group/img p-0 sm:p-4 flex items-center justify-center ${t(dark, 'bg-[#0f0f1a] sm:bg-black/40', 'bg-gray-50 sm:bg-gray-100')}`}
                        onClick={() => window.innerWidth < 1280
                          ? setDetailModal({ title: q.title, subtitle: q.role, badge: q.status, period: q.period, desc: q.desc, tags: q.tags, link: q.link, imgs: q.imgs })
                          : setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip })
                        }
                      >
                        <img src={q.imgs[0]} alt={q.title} className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-105" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex flex-col items-center gap-1 sm:gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <circle cx="11" cy="11" r="7" />
                              <line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
                            </svg>
                            {q.imgs.length > 1 && <span className="hidden sm:block text-white/90 text-xs font-mono bg-black/60 px-2 py-1 rounded-md">{q.imgs.length} Photos</span>}
                          </div>
                        </div>
                      </div>
                      <div className="p-2.5 sm:p-4 flex flex-col flex-grow text-center xl:text-left justify-center xl:justify-start">
                        {/* Mobile: highly abbreviated title */}
                        <h3 className="text-[11px] sm:text-sm font-bold truncate w-full sm:mb-0.5">{q.title}</h3>

                        {/* Desktop: Concise Details only */}
                        <div className="hidden xl:flex flex-col flex-grow mt-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold ${t(dark, 'bg-green-950/30 border border-green-800/30 text-green-400', 'bg-green-50 border border-green-200 text-green-700')}`}>{q.status}</span>
                            <span className={`text-xs font-mono ${muted}`}>{q.period}</span>
                          </div>
                          <p className={`text-xs font-semibold ${t(dark, 'text-indigo-400', 'text-violet-600')}`}>{q.role}</p>
                          <p className={`text-xs ${muted} leading-snug mt-1`}>{q.desc.split('. ')[0]}.</p>
                          {q.link && (
                            <a href={q.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1 text-xs font-mono font-bold mt-2 ${t(dark, 'text-amber-400 hover:text-amber-300', 'text-amber-700 hover:text-amber-600')} transition-colors`}>
                              OPEN LIVE <span>↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'awards' && (
                <div className="flex flex-col sm:grid sm:grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} onClick={() => window.innerWidth < 1280 && setDetailModal({ title: a.title, date: a.date })} className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-5 rounded-2xl border transition-all cursor-pointer sm:cursor-default active:scale-[0.98] sm:active:scale-100 ${card}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${t(dark, 'bg-orange-950/30 border border-orange-800/30 text-orange-400', 'bg-amber-50 border border-amber-200 text-amber-700')}`}>
                        <a.icon size={24} />
                      </div>
                      <div className="min-w-0">
                        <h4 className={`font-bold text-sm sm:text-base leading-tight ${t(dark, 'text-[#e2e8f0]', 'text-[#8B5CF6]')}`}>{a.title}</h4>
                        <p className={`text-xs font-mono mt-0.5 ${muted}`}>Unlocked: {a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>


        {/* ── SIDE QUESTS (Personal Projects) ── */}
        <section className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-2xl border p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-amber-900/40 shadow-sm hover:shadow-md', 'bg-white border-amber-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-semibold tracking-wide text-xs sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-amber-400', 'bg-white text-amber-600')}`}>
              PERSONAL PROJECTS
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 mt-2">
              {PERSONAL.map((p, i) => (
                <div key={i} className={`w-full rounded-xl sm:rounded-2xl border overflow-hidden transition-all group hover:scale-[1.01] flex flex-col xl:flex-row ${card}`}>
                  <div
                    className={`aspect-square xl:aspect-auto xl:h-auto xl:w-36 shrink-0 relative cursor-pointer flex items-center justify-center overflow-hidden group/img p-0 sm:p-4 ${t(dark, 'bg-[#0f0f1a] sm:bg-black/40', 'bg-gray-50 sm:bg-gray-100')}`}
                    onClick={() => window.innerWidth < 1280
                      ? setDetailModal({ title: p.title, desc: p.desc, tags: p.tags, link: p.link, imgs: p.imgs, wip: p.wip })
                      : setLightbox({ imgs: p.imgs, alt: p.title, wip: p.wip })
                    }
                  >
                    <img src={p.imgs[0]} alt={p.title} className="w-full h-full object-contain transition-transform duration-500 group-hover/img:scale-105" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex flex-col items-center gap-1 sm:gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 sm:w-7 sm:h-7 text-white drop-shadow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <circle cx="11" cy="11" r="7" />
                          <line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
                        </svg>
                        {p.imgs.length > 1 && <span className="hidden sm:block text-white/90 text-xs font-mono bg-black/60 px-2 py-1 rounded-md">{p.imgs.length} Photos</span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-2.5 sm:p-4 flex flex-col flex-grow text-center xl:text-left justify-center xl:justify-start">
                    {/* Mobile: highly abbreviated title */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center sm:justify-between gap-1 sm:gap-2 mb-0.5">
                      <h3 className="text-[11px] sm:text-sm font-bold truncate w-full">{p.title}</h3>
                      {p.wip && <span className={`inline-block px-1.5 py-0.5 sm:px-2 rounded text-[8px] sm:text-xs font-mono whitespace-nowrap mt-0.5 sm:mt-0 ${t(dark, 'bg-amber-900/40 text-amber-400 border border-amber-800/50', 'bg-amber-100 text-amber-700 border border-amber-300')}`}>Work in Progress</span>}
                    </div>

                    {/* Desktop Details */}
                    <div className="hidden xl:flex flex-col flex-grow mt-1">
                      <div className={`flex flex-col gap-1 text-xs xl:text-xs ${muted} leading-snug mb-2`}>
                        {p.desc.map((d, di) => (
                          <div key={di} className="flex flex-row items-start gap-1.5">
                            <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${t(dark, 'bg-amber-400/50', 'bg-amber-400')}`} />
                            <span>{d}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 mb-2 mt-auto">
                        {p.tags.map(tg => <span key={tg} className={`px-2 py-0.5 rounded-md text-xs font-mono ${t(dark, 'bg-white/5 text-gray-400', 'bg-gray-100 text-gray-600')}`}>{tg}</span>)}
                      </div>
                      {p.link && (
                        <a href={p.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${t(dark, 'text-amber-400 hover:text-amber-300', 'text-amber-700 hover:text-amber-600')} transition-colors mt-1`}>
                          OPEN LIVE <span>↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-2xl border p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-purple-900/40 shadow-sm hover:shadow-md', 'bg-white border-violet-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-semibold tracking-wide text-xs sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-purple-400', 'bg-white text-violet-600')}`}>
              EDUCATIONAL BACKGROUND
            </div>
            <div className="flex flex-col gap-3 sm:gap-4 mt-2">
              <div onClick={() => window.innerWidth < 1280 && setDetailModal({ title: 'National University - Baliwag', subtitle: 'BS Information Technology', period: 'Expected: July 2026', desc: 'Specialization in Mobile and Web Application' })} className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border cursor-pointer sm:cursor-default active:scale-[0.98] sm:active:scale-100 transition-all ${card}`}>
                <p className={`text-[9px] sm:text-xs font-mono mb-1.5 sm:mb-2 ${t(dark, 'text-purple-400', 'text-violet-500')}`}>COLLEGE DEGREE</p>
                <h3 className="text-[12px] sm:text-lg font-bold mb-0.5 sm:mb-1 leading-tight">National University - Baliwag</h3>
                <p className={`text-[10px] sm:text-sm ${muted}`}>BS Information Technology</p>
                <p className={`hidden sm:block text-xs ${muted} mt-1`}>Specialization in Mobile and Web Application</p>
                <p className={`text-[9px] sm:text-xs font-mono ${muted} mt-2`}>Expected: July 2026</p>
              </div>
              <div onClick={() => window.innerWidth < 1280 && setDetailModal({ title: 'St. Dominic Academy of Pulilan', subtitle: 'Accountancy, Business, and Management', period: 'Graduated: May 2022', desc: 'Awarded With Honors & Loyalty Awardee - May 2022' })} className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border cursor-pointer sm:cursor-default active:scale-[0.98] sm:active:scale-100 transition-all ${card}`}>
                <p className={`text-[9px] sm:text-xs font-mono mb-1.5 sm:mb-2 ${t(dark, 'text-purple-400', 'text-violet-500')}`}>HIGH SCHOOL</p>
                <h3 className="text-[12px] sm:text-lg font-bold mb-0.5 sm:mb-1 leading-tight">St. Dominic Academy of Pulilan</h3>
                <p className={`text-[10px] sm:text-sm ${muted}`}>Accountancy, Business, and Management</p>
                <p className={`text-[9px] sm:text-xs mt-2 leading-tight ${t(dark, 'text-amber-400', 'text-amber-700')}`}>Honors & Loyalty Awardee - May 2022</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className={`border-t py-8 sm:py-10 px-4 sm:px-6 ${t(dark, 'border-white/5', 'border-gray-200')}`}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-sm ${dotColor}`} />
              <span className={`font-semibold tracking-wide text-xs ${muted}`}>HANNAH JAMILLA</span>
            </div>
            <div className="flex gap-6">
              <a href="https://github.com/Hannahjamilla" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${muted} hover:${accent} transition-colors`}>GitHub</a>
              <a href="https://www.linkedin.com/in/hannah-jamilla-peralta-9277a5337/" target="_blank" rel="noopener noreferrer" className={`text-xs font-mono ${muted} hover:${accent} transition-colors`}>LinkedIn</a>
            </div>
            <p className={`text-xs font-mono ${muted}`}>GAME SAVE // 2025</p>
          </div>
        </footer>

        {/* ── BACK TO TOP ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`fixed bottom-6 right-6 z-50 p-2 min-w-[44px] border transition-all duration-500 transform flex flex-col items-center justify-center
            ${scrollY > 400 ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-50 pointer-events-none'} 
            ${t(dark, 'bg-[#0a0a0f] border-cyan-500 text-cyan-400 hover:bg-cyan-400 hover:text-black ', 'bg-white border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none')}`}
        >
          <ArrowUp size={16} strokeWidth={3} />
          <span className="font-semibold tracking-wide text-xs mt-1 tracking-tighter">TOP</span>
        </button>

        {lightbox && <Lightbox imgs={lightbox.imgs} alt={lightbox.alt} wip={lightbox.wip} onClose={() => setLightbox(null)} />}
        {detailModal && <DetailModal data={detailModal} onClose={() => setDetailModal(null)} />}
      </div>
    </ThemeCtx.Provider>
  )
}
