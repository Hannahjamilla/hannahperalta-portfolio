import { useEffect, useRef, useState, createContext, useContext } from 'react'
export type Section = 'profile' | 'stats' | 'quests' | 'xp' | 'home' | 'experience' | 'academic' | 'personal' | 'skills'

/* ── Theme Context ── */
const ThemeCtx = createContext({ dark: true, toggle: () => { } })
const useTheme = () => useContext(ThemeCtx)

/* ── Data ── */
const STATS = [
  { name: 'React.js / Next.js', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-cyan-400' },
  { name: 'Laravel / PHP', level: 55, label: 'Lvl. 11 / Learner', color: 'bg-purple-400' },
  { name: 'Node.js / Express', level: 45, label: 'Lvl. 9 / Exploring', color: 'bg-green-400' },
  { name: 'JavaScript / HTML / CSS', level: 60, label: 'Lvl. 12 / Growing', color: 'bg-amber-400' },
  { name: 'MySQL / Cloud SQL', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-rose-400' },
  { name: 'MongoDB / Firebase', level: 40, label: 'Lvl. 8 / Foundation', color: 'bg-indigo-400' },
  { name: 'Google Cloud / RBAC', level: 35, label: 'Lvl. 7 / Exploring', color: 'bg-blue-400' },
  { name: 'GitHub', level: 55, label: 'Lvl. 11 / Learner', color: 'bg-orange-400' },
  { name: 'Figma', level: 25, label: 'Lvl. 5 / Exploring', color: 'bg-pink-400' },
  { name: 'Three.js', level: 15, label: 'Lvl. 3 / Foundation', color: 'bg-indigo-500' },
]
const QUESTS = [
  { status: 'COMPLETE', title: 'BaryoConnect', role: 'Project Manager & Paper Presenter', period: 'IRCITE 2025', desc: 'Presented at IRCITE 2025 International Research Conference. Focused on community engagement and local governance.', tags: ['Flutter', 'Firebase'], xp: 950, imgs: ['/images/15.webp', '/images/16.webp'] },
  { status: 'COMPLETE', title: 'DialiEase', role: 'Capstone Project', period: 'Nov 2024 – Jan 2026', desc: 'Digital monitoring system for home-based dialysis. Built with React.js, Laravel, and Google Cloud.', tags: ['React.js', 'Laravel', 'Google Cloud'], xp: 900, imgs: ['/images/12.webp', '/images/11.webp', '/images/10.webp'] },
  { status: 'COMPLETE', title: 'Event Ecosystem', role: 'Published Research', period: 'Aug 2024 – Oct 2024', desc: 'Unified venue rental system with billing and payments. Officially published academic research in IJAMR.', tags: ['Billing', 'Inventory'], xp: 800, imgs: ['/images/paper.webp'] },
  { status: 'COMPLETE', title: 'Drug Store POS', role: 'Business App', period: '2024', desc: 'Business system for pharmacies to track sales and manage medicine stock.', tags: ['PHP', 'MySQL'], xp: 600, imgs: ['/images/POS2.webp'] },
  { status: 'COMPLETE', title: 'Tutorial Center', role: 'Learning Tool', period: '2024', desc: 'Online school platform where students can track their learning progress.', tags: ['PHP', 'MySQL'], xp: 550, imgs: ['/images/tutorial.webp'] },
  { status: 'COMPLETE', title: 'Interactive 3D Portfolio', role: 'Creative Developer', period: '2025', desc: 'An interactive, immersive 3D portfolio experience built with React and Three.js.', tags: ['React', 'Three.js'], xp: 1000, link: 'https://hannahjamilla.vercel.app/', imgs: ['/images/cover-portfolio.png', '/images/portfolio.png', '/images/2port.png'] },
]
const INVENTORY = [
  { cat: 'Languages', items: ['HTML', 'CSS', 'JavaScript', 'PHP', 'Python'] },
  { cat: 'Frameworks', items: ['React.js', 'Next.js', 'Laravel', 'Node.js', 'Express.js', 'Three.js'] },
  { cat: 'Databases', items: ['MySQL', 'PostgreSQL', 'MongoDB', 'Cloud SQL'] },
  { cat: 'Cloud & Security', items: ['AWS S3', 'Google Cloud', 'RBAC'] },
  { cat: 'Tools & Productivity', items: ['VS Code', 'Antigravity', 'Kiro', 'Postman', 'Bitbucket', 'GitHub', 'Figma', 'Microsoft Office', 'Google Workspace'] },
]
const ACHIEVEMENTS = [
  { icon: '🏆', title: 'IRCITE 2025 Paper Presenter', date: 'Apr 2025' },
  { icon: '🏆', title: 'TOPCIT Examinee', date: 'Jul 2025' },
  { icon: '🛡️', title: 'Microsoft SC-900', date: 'Mar 2025' },
  { icon: '📜', title: 'Alison Diploma in E-Commerce', date: 'Oct 2025' },
  { icon: '📝', title: 'Published Researcher (IJAMR)', date: 'Jun 2024' },
  { icon: '🎓', title: 'ABM with Honors & Loyalty', date: 'May 2022' },
]
const XP_LOG = [
  { place: 'Lightweight Solutions', role: 'Full-Stack Software Intern', period: 'Mar – May 2026', desc: 'Completed 400 hours working on a modern SaaS project using React and Python. Building scalable features and high-performance digital solutions.', xp: 400 },
  { place: 'Creciendo Philippines', role: 'Web Software Intern', period: 'Nov 2025 – Feb 2026', desc: 'Developed backend systems with Express.js and MongoDB. Optimized APIs for 400+ hours of performance-focused work.', xp: 400 },
  { place: 'AWS Cloud Clubs | NU Baliwag', role: 'Skill Development Office', period: 'Mar 2025 – Present', desc: 'Facilitating cloud-focused workshops and learning sessions for IT students at National University.', xp: 200 },
  { place: "Executive Secretary's Office", role: 'Core Team Member', period: '2023 – 2024', desc: 'Managed student group communications and organized key campus events.', xp: 150 },
]
const PERSONAL: { title: string, desc: string, tags: string[], link: string, imgs: string[], wip?: boolean }[] = [
  { title: 'PingMe', desc: 'An interactive platform for project inquiries and professional assistance with a sleek UI/UX.', tags: ['React', 'Tailwind'], link: 'https://ping-me-seven-vert.vercel.app/', imgs: ['/images/PingMe.webp'] },
  { title: 'Hello World - Goosebumps', desc: 'An immersive digital experience exploring spooky typography.', tags: ['React', 'Tailwind'], link: 'https://hello-world-gamma-plum.vercel.app/', imgs: ['/images/Hello word - goosebumps.webp'] },
  { title: 'Birthday - Star Alert!', desc: 'A celebratory interactive card with floating particle effects.', tags: ['React', 'Tailwind'], link: 'https://happy-b-day-murex.vercel.app/', imgs: ['/images/Birthday - Star Alert!.webp'] },
  { title: 'GroundSpot', desc: 'A modern facility and space booking platform. (Still in progress)', tags: ['React', 'Tailwind'], link: 'https://ground-spot-frontend-web.vercel.app/', imgs: ['/images/GrooundSpot.png', '/images/Login-GroundSpot.png', '/images/GrooundSpot-dashboard.png'], wip: true },
]

/* ── Theme helpers ── */
function t(dark: boolean, d: string, l: string) { return dark ? d : l }

/* ── Skill Bar ── */
function SkillBar({ name, level, label, color }: { name: string; level: number; label?: string; color: string }) {
  const { dark } = useTheme()
  const [vis, setVis] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true) }, { threshold: 0.5 })
    ref.current && o.observe(ref.current)
    return () => o.disconnect()
  }, [])
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end text-[11px] sm:text-sm gap-1">
        <span className="font-mono font-medium leading-tight">{name}</span>
        <span className={`font-mono text-[9px] sm:text-xs ${t(dark, 'text-gray-500', 'text-gray-400')} sm:text-right shrink-0 whitespace-nowrap`}>
          {label || `${level}/100`}
        </span>
      </div>
      <div className={`h-3 rounded-full overflow-hidden ${t(dark, 'bg-white/5 border border-white/10', 'bg-gray-100 border border-gray-200')}`}>
        <div className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`} style={{ width: vis ? `${level}%` : '0%' }} />
      </div>
    </div>
  )
}

/* ── Mobile Menu ── */
function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dark } = useTheme()
  if (!open) return null
  return (
    <div className={`fixed inset-0 z-[60] ${t(dark, 'bg-[#0a0a0f]', 'bg-white')} flex flex-col items-center justify-center gap-8`}>
      <button onClick={onClose} className="absolute top-5 right-6 text-2xl font-mono">X</button>
      {['profile', 'stats', 'quests', 'xp'].map(s => (
        <a key={s} href={`#${s}`} onClick={onClose} className="font-mono text-lg uppercase tracking-widest hover:text-cyan-400 transition-colors">[{s}]</a>
      ))}
    </div>
  )
}

/* ── Lightbox Modal ── */
function Lightbox({ imgs, alt, onClose }: { imgs: string[]; alt: string; onClose: () => void }) {
  const { dark } = useTheme()
  const [idx, setIdx] = useState(0)

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % imgs.length) }
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + imgs.length) % imgs.length) }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className={`absolute inset-0 ${t(dark, 'bg-[#0a0a0f]/95', 'bg-[#f8f7f4]/95')} backdrop-blur-md scanlines`} />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center" onClick={e => e.stopPropagation()}>

        {/* Game UI Header */}
        <div className={`w-full flex justify-between items-end mb-4 border-b-2 pb-2 ${t(dark, 'border-cyan-900', 'border-indigo-200')}`}>
          <div className="flex flex-col">
            <span className={`font-['Press_Start_2P'] text-[10px] sm:text-xs uppercase ${t(dark, 'text-cyan-400', 'text-indigo-600')}`}>
              // VIEWING_DATA
            </span>
            <span className={`font-mono text-xs sm:text-sm mt-1.5 ${t(dark, 'text-gray-400', 'text-gray-600')}`}>
              {alt}
            </span>
          </div>
          <button
            onClick={onClose}
            className={`font-['Press_Start_2P'] text-[10px] sm:text-xs px-3 py-2 border-2 transition-all ${t(dark, 'border-red-900/50 text-red-400 hover:bg-red-950/50 hover:border-red-500', 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400')}`}
          >
            [X] CLOSE
          </button>
        </div>

        {/* Main Image Frame */}
        <div className={`relative w-full border-2 p-2 sm:p-4 ${t(dark, 'border-cyan-800/50 bg-black/50 glow-box-cyan', 'border-indigo-300 bg-white/50 shadow-xl')}`}>
          <div className="relative w-full h-[50vh] sm:h-[65vh] flex items-center justify-center overflow-hidden bg-black/10">
            <img
              key={imgs[idx]}
              src={imgs[idx]}
              alt={alt}
              className="max-w-full max-h-full object-contain animate-fade-in drop-shadow-lg"
            />
          </div>
        </div>

        {/* Navigation Controls */}
        {imgs.length > 1 && (
          <div className="w-full flex justify-between items-center mt-6">
            <button
              onClick={prev}
              className={`font-['Press_Start_2P'] text-[10px] sm:text-xs px-4 py-3 border-2 transition-all ${t(dark, 'border-cyan-900 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500', 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400')}`}
            >
              {'< PREV'}
            </button>

            <div className={`font-mono text-sm sm:text-base px-4 py-2 border-2 ${t(dark, 'border-white/10 text-white/50 bg-black/30', 'border-gray-200 text-gray-500 bg-white/50')}`}>
              FILE {idx + 1}/{imgs.length}
            </div>

            <button
              onClick={next}
              className={`font-['Press_Start_2P'] text-[10px] sm:text-xs px-4 py-3 border-2 transition-all ${t(dark, 'border-cyan-900 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500', 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400')}`}
            >
              {'NEXT >'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── App ── */
export default function App() {
  const [dark, setDark] = useState(true)
  const [tab, setTab] = useState<'projects' | 'skills' | 'awards'>('projects')
  const [menu, setMenu] = useState(false)
  const [lightbox, setLightbox] = useState<{ imgs: string[]; alt: string } | null>(null)
  const toggle = () => setDark(p => !p)

  const totalXP = [...QUESTS, ...XP_LOG].reduce((s, q) => s + q.xp, 0)
  const lvl = Math.floor(totalXP / 1000) + 1

  const bg = t(dark, 'bg-[#0a0a0f] text-gray-100', 'bg-[#f8f7f4] text-gray-900')
  const gridBg = t(dark, 'grid-bg-dark', 'grid-bg-light')
  const card = t(dark, 'bg-white/[0.03] border-white/5', 'bg-white border-gray-200 shadow-sm')
  const muted = t(dark, 'text-gray-500', 'text-gray-600')
  const accent = t(dark, 'text-cyan-400', 'text-indigo-600')
  const accentBg = t(dark, 'bg-cyan-950/30 border-cyan-800/40', 'bg-indigo-50 border-indigo-200')
  const pixelColor = t(dark, 'text-cyan-400/60', 'text-indigo-400/60')
  const dotColor = t(dark, 'bg-cyan-400', 'bg-indigo-500')

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div className={`min-h-screen w-full ${bg} overflow-x-hidden ${gridBg} scanlines relative transition-colors duration-300`}>
        <MobileMenu open={menu} onClose={() => setMenu(false)} />

        {/* ── NAV ── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${t(dark, 'bg-[#0a0a0f]/90 border-cyan-900/30', 'bg-white/80 border-gray-200')}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${dotColor} animate-pulse`} />
              <span className={`font-['Press_Start_2P'] text-[9px] sm:text-[10px] ${accent} tracking-wider`}>HANNAH JAMILLA</span>
            </div>
            <div className="hidden md:flex items-center gap-6 text-xs font-mono font-medium">
              {[{ id: 'profile', label: 'profile' }, { id: 'stats', label: 'skills' }, { id: 'quests', label: 'projects' }, { id: 'xp', label: 'experience' }].map(s => (
                <a key={s.id} href={`#${s.id}`} className={`${muted} hover:${accent} transition-colors`}>[{s.label.toUpperCase()}]</a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {/* Level badge */}
              <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
                <span className="text-amber-400">LVL {lvl}</span>
                <div className={`w-16 sm:w-24 h-2 rounded-full overflow-hidden ${t(dark, 'bg-white/5 border border-amber-900/30', 'bg-gray-100 border border-amber-200')}`}>
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: `${(totalXP % 1000) / 10}%` }} />
                </div>
              </div>
              {/* Theme toggle */}
              <button onClick={toggle} className={`p-2 rounded-lg transition-colors text-sm ${t(dark, 'hover:bg-white/10', 'hover:bg-gray-100')}`}>
                {dark ? '☀️' : '🌙'}
              </button>
              {/* Mobile hamburger */}
              <button onClick={() => setMenu(true)} className="md:hidden p-2 font-mono text-sm">[=]</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="profile" className="relative pt-20 sm:pt-24 pb-10 sm:pb-12 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className={`font-['Press_Start_2P'] text-[8px] sm:text-[10px] ${pixelColor} tracking-[0.3em] mb-3 text-center lg:text-left`}>// ABOUT ME</p>
            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 items-start">
              {/* Character Card */}
              <div className="lg:col-span-4 flex flex-col items-center mx-auto lg:mx-0">
                <div className={`relative w-52 sm:w-64 h-60 sm:h-72 rounded-2xl border-2 p-1 group ${t(dark, 'border-cyan-800/40 glow-box-cyan', 'border-indigo-200 shadow-lg')} ${t(dark, 'bg-gradient-to-b from-cyan-950/30 to-transparent', 'bg-gradient-to-b from-indigo-50 to-transparent')}`}>
                  <div className={`w-full h-full rounded-xl overflow-hidden flex items-center justify-center relative ${t(dark, 'bg-[#0d0d18]', 'bg-gray-50')}`}>
                    <img src="/images/hannah-formal.webp" alt="Hannah" className="w-full h-full object-cover opacity-90 transition-opacity duration-500 group-hover:opacity-0" />
                    <img src="/images/Jamilla.png" alt="Jamilla pixel art" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className={`absolute bottom-0 left-0 right-0 p-4 pointer-events-none ${t(dark, 'bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent', 'bg-gradient-to-t from-white via-white/90 to-transparent')}`}>
                      <p className={`font-['Press_Start_2P'] text-[11px] ${accent} leading-relaxed`}>Hannah</p>
                      <p className={`font-['Press_Start_2P'] text-[8px] ${muted} mt-1`}>Builder of Things</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3 w-52 sm:w-64">
                  {[{ l: 'PRJ', v: '9+', c: 'text-rose-400' }, { id: 'EXP', l: 'EXP', v: '2Y+', c: 'text-cyan-400' }, { l: 'PAS', v: '99', c: 'text-amber-400' }].map(s => (
                    <div key={s.l} className={`text-center p-2 sm:p-3 rounded-xl border ${card}`}>
                      <p className="font-['Press_Start_2P'] text-[7px] sm:text-[8px] text-gray-500 mb-1">{s.l}</p>
                      <p className={`font-['Press_Start_2P'] text-xs sm:text-sm ${s.c}`}>{s.v}</p>
                    </div>
                  ))}
                </div>
                {/* Status Banner */}
                <div className="mt-3 w-52 sm:w-64">
                  <div className={`relative px-4 py-2.5 rounded-xl border-2 flex items-center justify-center gap-3 transition-all duration-300 ${t(dark, 'border-amber-500/20 bg-amber-950/40 glow-box-amber', 'border-amber-200 bg-amber-50 shadow-sm')}`}>
                    {/* Pulsing Dot */}
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                    </span>

                    <span className={`font-['Press_Start_2P'] text-[7px] tracking-tighter ${t(dark, 'text-amber-400', 'text-amber-600')}`}>
                      Open to Opportunities
                    </span>

                    {/* Decorative Corners */}
                    <div className={`absolute -top-1 -right-1 w-2 h-2 border-r-2 border-t-2 ${t(dark, 'border-amber-400/60', 'border-amber-500/60')}`} />
                    <div className={`absolute -bottom-1 -left-1 w-2 h-2 border-l-2 border-b-2 ${t(dark, 'border-amber-400/60', 'border-amber-500/60')}`} />
                  </div>
                </div>
              </div>

              {/* Character Info */}
              <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                  Hannah Jamilla<br /><span className={`${accent} ${dark ? 'glow-cyan' : ''}`}>Peralta</span>
                </h1>
                <p className={`${muted} text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0`}>
                  Hi there! I’m a fresh graduate who builds fun and useful things.
                  I love analyzing details to make things easier for users and enjoy creating with awesome people!
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-3">
                  {[
                    { label: 'Fresh Graduate', c: t(dark, 'border-rose-800/40 text-rose-400 bg-rose-950/20', 'border-rose-200 text-rose-700 bg-rose-50') },
                    { label: 'Creative Builder', c: t(dark, 'border-cyan-800/40 text-cyan-400 bg-cyan-950/20', 'border-indigo-200 text-indigo-700 bg-indigo-50') },
                    { label: 'Bulacan, Philippines', c: t(dark, 'border-green-800/40 text-green-400 bg-green-950/20', 'border-emerald-200 text-emerald-700 bg-emerald-50') },
                    { label: 'National University', c: t(dark, 'border-purple-800/40 text-purple-400 bg-purple-950/20', 'border-violet-200 text-violet-700 bg-violet-50') },
                  ].map(b => (
                    <span key={b.label} className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg border text-[10px] sm:text-xs font-mono font-semibold ${b.c}`}>{b.label}</span>
                  ))}
                </div>
                {/* Terminal contact */}
                <div className={`p-4 sm:p-5 rounded-xl border font-mono text-xs sm:text-sm space-y-1.5 text-left ${card}`}>
                  <p><span className={muted}>{'>'}</span> <span className={muted}>email</span> <a href="mailto:hannahjamillap@gmail.com" className={`${t(dark, 'text-green-400', 'text-green-700')} hover:underline`}>hannahjamillap@gmail.com</a></p>
                  <p><span className={muted}>{'>'}</span> <span className={muted}>github</span> <a href="https://github.com/Hannahjamilla" target="_blank" rel="noopener noreferrer" className={`${t(dark, 'text-green-400', 'text-green-700')} hover:underline`}>github.com/Hannahjamilla</a></p>
                  <p><span className={muted}>{'>'}</span> <span className={muted}>ping</span> <a href="https://ping-me-seven-vert.vercel.app/" target="_blank" rel="noopener noreferrer" className={`${t(dark, 'text-amber-400', 'text-amber-700')} hover:underline`}>Reach me out here</a><span className={`animate-blink ${accent}`}>_</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section id="stats" className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-xl border-2 p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-cyan-900/40 glow-box-cyan', 'bg-white border-indigo-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-['Press_Start_2P'] text-[10px] sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-cyan-400', 'bg-white text-indigo-600')}`}>
              TECHNICAL SKILLS
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {STATS.map(s => <SkillBar key={s.name} {...s} />)}
            </div>
            <div className={`mt-8 pt-5 border-t ${t(dark, 'border-cyan-900/30', 'border-indigo-100')}`}>
              <p className={`font-mono text-xs mb-3 font-bold ${t(dark, 'text-cyan-400', 'text-indigo-600')}`}>TOOLS & PRODUCTIVITY</p>
              <div className="flex flex-wrap gap-2">
                {['VS Code', 'Three.js', 'Antigravity', 'Kiro', 'Postman', 'Bitbucket', 'GitHub', 'Figma', 'Microsoft Office', 'Google Workspace'].map(tool => (
                  <span key={tool} className={`px-2.5 py-1 rounded-md text-[10px] font-mono ${t(dark, 'bg-cyan-950/20 border border-cyan-800/30 text-cyan-300', 'bg-indigo-50 border border-indigo-200 text-indigo-700')}`}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── TABS ── */}
        <section id="quests" className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-xl border-2 p-6 sm:p-8 ${t(dark, 'bg-[#0d0d18] border-white/10', 'bg-white border-gray-200 shadow-sm')}`}>
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 hide-scrollbar">
              {(['projects', 'skills', 'awards'] as const).map(tb => (
                <button key={tb} onClick={() => setTab(tb)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all border whitespace-nowrap
                    ${tab === tb ? `${accentBg} ${accent} border-transparent` : `${card} ${muted} hover:${accent} ${t(dark, 'border-white/10', 'border-gray-200')}`}`}>
                  [{tb}]
                </button>
              ))}
            </div>

            <div>
              {tab === 'projects' && (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  {QUESTS.map((q, i) => (
                    <div key={i} className={`w-full rounded-2xl border transition-all group flex flex-col md:flex-row overflow-hidden ${card}`}>
                      <div
                        className={`h-32 md:h-auto md:w-36 shrink-0 overflow-hidden relative cursor-pointer group/img p-4 flex items-center justify-center ${t(dark, 'bg-black/40', 'bg-gray-100')}`}
                        onClick={() => setLightbox({ imgs: q.imgs, alt: q.title })}
                      >
                        <img src={q.imgs[0]} alt={q.title} className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="flex flex-col items-center">
                            <span className="text-white text-3xl font-mono mb-2">🔍</span>
                            {q.imgs.length > 1 && <span className="text-white/90 text-[10px] font-mono bg-black/60 px-2 py-1 rounded-md">{q.imgs.length} Images</span>}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-5 flex flex-col flex-grow">
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-mono font-bold ${t(dark, 'bg-green-950/30 border border-green-800/30 text-green-400', 'bg-green-50 border border-green-200 text-green-700')}`}>{q.status}</span>
                          <span className={`text-[9px] font-mono ${muted}`}>{q.period}</span>
                        </div>
                        <span className={`text-[10px] font-mono mb-2 ${t(dark, 'text-amber-400', 'text-amber-700')}`}>+{q.xp} XP</span>
                        <h3 className="text-base font-bold mb-1">{q.title}</h3>
                        <p className={`text-[11px] ${muted} font-medium mb-1.5`}>{q.role}</p>
                        <p className={`text-xs ${muted} leading-relaxed mb-3 flex-grow`}>{q.desc}</p>
                        <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                          <div className="flex flex-wrap gap-2">
                            {q.tags.map(tg => <span key={tg} className={`px-2.5 py-1 rounded-md text-[10px] font-mono ${t(dark, 'bg-white/5 text-gray-400', 'bg-gray-100 text-gray-600')}`}>{tg}</span>)}
                          </div>
                          {q.link && (
                            <a href={q.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold ${t(dark, 'text-amber-400 hover:text-amber-300', 'text-amber-700 hover:text-amber-600')} transition-colors`}>
                              OPEN LIVE <span>↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'skills' && (
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                  {INVENTORY.map((c, i) => (
                    <div key={i} className={`w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-md p-5 sm:p-6 rounded-2xl border flex flex-col ${card}`}>
                      <p className={`font-['Press_Start_2P'] text-[8px] sm:text-[9px] mb-4 ${t(dark, 'text-purple-400', 'text-violet-500')}`}>{c.cat.toUpperCase()}</p>
                      <div className="flex flex-wrap gap-2">
                        {c.items.map(it => (
                          <span key={it} className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-mono cursor-default transition-colors ${t(dark, 'bg-purple-950/20 border border-purple-800/20 text-purple-300 hover:bg-purple-900/30', 'bg-violet-50 border border-violet-200 text-violet-600 hover:bg-violet-100')}`}>{it}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {tab === 'awards' && (
                <div className="flex flex-wrap justify-center gap-4">
                  {ACHIEVEMENTS.map((a, i) => (
                    <div key={i} className={`w-full sm:w-[calc(50%-0.5rem)] max-w-md flex items-center gap-4 p-4 sm:p-5 rounded-2xl border transition-all ${card}`}>
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${t(dark, 'bg-amber-950/30 border border-amber-800/30', 'bg-amber-50 border border-amber-200')}`}>{a.icon}</div>
                      <div>
                        <h4 className={`font-bold ${t(dark, 'text-amber-300', 'text-amber-700')}`}>{a.title}</h4>
                        <p className={`text-xs font-mono mt-1 ${muted}`}>Unlocked: {a.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── XP LOG ── */}
        <section id="xp" className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-xl border-2 p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-green-900/40 glow-box-green', 'bg-white border-emerald-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-['Press_Start_2P'] text-[10px] sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-green-400', 'bg-white text-emerald-600')}`}>
              WORK EXPERIENCE
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-2">
              {XP_LOG.map((x, i) => (
                <div key={i} className={`p-5 rounded-2xl border transition-all flex flex-col ${card}`}>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`text-[10px] font-mono ${muted}`}>{x.period}</span>
                  </div>
                  <span className={`text-xs font-mono mb-3 ${t(dark, 'text-green-400', 'text-green-700')}`}>+{x.xp} XP</span>
                  <h3 className={`text-base font-bold mb-1 ${t(dark, 'text-green-300', 'text-gray-900')}`}>{x.place}</h3>
                  <p className={`text-xs font-medium ${muted} mb-2`}>{x.role}</p>
                  <p className={`text-sm ${muted} leading-relaxed flex-grow`}>{x.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SIDE QUESTS (Personal Projects) ── */}
        <section className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-xl border-2 p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-amber-900/40 glow-box-amber', 'bg-white border-amber-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-['Press_Start_2P'] text-[10px] sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-amber-400', 'bg-white text-amber-600')}`}>
              PERSONAL PROJECTS
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mt-2">
              {PERSONAL.map((p, i) => (
                <div key={i} className={`w-full rounded-2xl border overflow-hidden transition-all hover:scale-[1.01] flex flex-col md:flex-row ${card}`}>
                  <div
                    className={`h-32 md:h-auto md:w-36 shrink-0 relative cursor-pointer flex items-center justify-center overflow-hidden group/img p-4 ${t(dark, 'bg-black/40', 'bg-gray-100')}`}
                    onClick={() => setLightbox({ imgs: p.imgs, alt: p.title })}
                  >
                    <img src={p.imgs[0]} alt={p.title} className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex flex-col items-center">
                        <span className="text-white text-3xl font-mono mb-2">🔍</span>
                        {p.imgs.length > 1 && <span className="text-white/90 text-[10px] font-mono bg-black/60 px-2 py-1 rounded-md">{p.imgs.length} Images</span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-grow">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-bold text-base">{p.title}</h3>
                      {p.wip && <span className={`px-2 py-0.5 rounded text-[8px] font-mono whitespace-nowrap mt-0.5 ${t(dark, 'bg-amber-900/40 text-amber-400 border border-amber-800/50', 'bg-amber-100 text-amber-700 border border-amber-300')}`}>WORK IN PROGRESS</span>}
                    </div>
                    <p className={`text-xs ${muted} leading-relaxed mb-3`}>{p.desc}</p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.tags.map(tg => <span key={tg} className={`px-2 py-1 rounded-md text-[10px] font-mono ${t(dark, 'bg-white/5 text-gray-400', 'bg-gray-100 text-gray-600')}`}>{tg}</span>)}
                    </div>
                    <a href={p.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${t(dark, 'text-amber-400 hover:text-amber-300', 'text-amber-700 hover:text-amber-600')} transition-colors`}>
                      OPEN LIVE <span>↗</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDUCATION ── */}
        <section className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-xl border-2 p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-purple-900/40 glow-box-purple', 'bg-white border-violet-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-['Press_Start_2P'] text-[10px] sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-purple-400', 'bg-white text-violet-600')}`}>
              EDUCATIONAL BACKGROUND
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-2">
              <div className={`p-5 sm:p-6 rounded-2xl border ${card}`}>
                <p className={`text-xs font-mono mb-2 ${t(dark, 'text-purple-400', 'text-violet-500')}`}>COLLEGE DEGREE</p>
                <h3 className="text-base sm:text-lg font-bold mb-1">National University - Baliwag</h3>
                <p className={`text-sm ${muted}`}>BS Information Technology</p>
                <p className={`text-xs ${muted} mt-1`}>Specialization in Mobile and Web Application</p>
                <p className={`text-xs font-mono ${muted} mt-2`}>Expected: July 2026</p>
              </div>
              <div className={`p-5 sm:p-6 rounded-2xl border ${card}`}>
                <p className={`text-xs font-mono mb-2 ${t(dark, 'text-purple-400', 'text-violet-500')}`}>HIGH SCHOOL</p>
                <h3 className="text-base sm:text-lg font-bold mb-1">St. Dominic Academy of Pulilan</h3>
                <p className={`text-sm ${muted}`}>Accountancy, Business, and Management</p>
                <p className={`text-xs mt-2 ${t(dark, 'text-amber-400', 'text-amber-700')}`}>Awarded With Honors & Loyalty Awardee - May 2022</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className={`border-t py-8 sm:py-10 px-4 sm:px-6 ${t(dark, 'border-white/5', 'border-gray-200')}`}>
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-sm ${dotColor}`} />
              <span className={`font-['Press_Start_2P'] text-[8px] ${muted}`}>HANNAH JAMILLA</span>
            </div>
            <div className="flex gap-6">
              {['GitHub', 'LinkedIn'].map(l => (
                <a key={l} href="#" className={`text-xs font-mono ${muted} hover:${accent} transition-colors`}>{l}</a>
              ))}
            </div>
            <p className={`text-[10px] font-mono ${muted}`}>GAME SAVE // 2025</p>
          </div>
        </footer>
        {lightbox && <Lightbox imgs={lightbox.imgs} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
      </div>
    </ThemeCtx.Provider>
  )
}
