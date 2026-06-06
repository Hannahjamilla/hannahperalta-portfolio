import { useEffect, useState, createContext, useContext } from 'react'
import {
  Atom, FileCode2, Box, Wind,
  Server, Terminal, Zap, Database,
  Leaf, Layers, Cloud, GitBranch,
  Code2, Rocket, Cpu, Send, PenTool, FileText, Globe, ArrowUp,
  Trophy, ShieldCheck, FileBadge, BookOpen, GraduationCap
} from 'lucide-react'
export type Section = 'profile' | 'stats' | 'quests' | 'xp' | 'home' | 'experience' | 'academic' | 'personal' | 'skills'

/* ── Theme Context ── */
const ThemeCtx = createContext({ dark: false, toggle: () => { } })
const useTheme = () => useContext(ThemeCtx)

/* ── Data ── */
const FRONTEND = [
  { name: 'React.js / Next.js', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-cyan-400', icon: Atom },
  { name: 'JavaScript / HTML / CSS', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-amber-400', icon: FileCode2 },
  { name: 'Three.js', level: 15, label: 'Lvl. 3 / Foundation', color: 'bg-indigo-500', icon: Box },
  { name: 'Tailwind CSS', level: 45, label: 'Lvl. 9 / Exploring', color: 'bg-sky-400', icon: Wind },
]
const BACKEND = [
  { name: 'Laravel / PHP', level: 55, label: 'Lvl. 11 / Learner', color: 'bg-purple-400', icon: Server },
  { name: 'Node.js / Express', level: 45, label: 'Lvl. 9 / Exploring', color: 'bg-green-400', icon: Terminal },
  { name: 'Python / FastAPI', level: 30, label: 'Lvl. 6 / Foundation', color: 'bg-blue-500', icon: Zap },
  { name: 'MySQL / Cloud SQL', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-rose-400', icon: Database },
]
const CLOUD_TOOLS = [
  { name: 'MongoDB / Firebase', level: 40, label: 'Lvl. 8 / Foundation', color: 'bg-indigo-400', icon: Leaf },
  { name: 'PostgreSQL', level: 35, label: 'Lvl. 7 / Exploring', color: 'bg-emerald-400', icon: Layers },
  { name: 'Google Cloud', level: 35, label: 'Lvl. 7 / Exploring', color: 'bg-blue-400', icon: Cloud },
  { name: 'GitHub', level: 55, label: 'Lvl. 11 / Learner', color: 'bg-orange-400', icon: GitBranch },
]
const QUESTS = [
  { status: 'COMPLETE', title: 'BaryoConnect', role: 'Project Manager & Paper Presenter', period: 'IRCITE 2025', desc: 'Presented at IRCITE 2025 International Research Conference. Focused on community engagement and local governance.', tags: ['Flutter', 'Firebase'], xp: 950, imgs: ['/images/15.webp', '/images/Ircite.webp', '/images/IRCITE-1.jpg', '/images/IRCITE-2.jpg', '/images/16.webp'] },
  { status: 'COMPLETE', title: 'DialiEase', role: 'Capstone Project', period: 'Nov 2024 – Jan 2026', desc: 'Digital monitoring system for home-based dialysis. Built with React.js, Laravel, and Google Cloud.', tags: ['React.js', 'Laravel', 'Google Cloud'], xp: 900, imgs: ['/images/12.webp', '/images/11.webp', '/images/10.webp'] },
  { status: 'COMPLETE', title: 'Espasyo - Event place reservation system', role: 'Published Research', period: 'Aug 2024 – Oct 2024', desc: 'Unified venue rental system with billing and payments. Officially published academic research in IJAMR.', tags: ['Billing', 'Inventory'], xp: 800, imgs: ['/images/espasyo-1.png', '/images/espasyo.png', '/images/paper.webp'] },
  { status: 'COMPLETE', title: 'Drug Store POS', role: 'Business App', period: '2024', desc: 'Business system for pharmacies to track sales and manage medicine stock.', tags: ['PHP', 'MySQL'], xp: 600, imgs: ['/images/POS2.webp', '/images/2.webp', '/images/5.webp', '/images/3.webp'] },
  { status: 'COMPLETE', title: 'Tutorial Center', role: 'Learning Tool', period: '2024', desc: 'Online school platform where students can track their learning progress.', tags: ['PHP', 'MySQL'], xp: 550, imgs: ['/images/tutorial.webp', '/images/7.webp', '/images/8.webp'] },
  { status: 'COMPLETE', title: 'Interactive 3D Portfolio', role: 'Creative Developer', period: '2025', desc: 'An interactive, immersive 3D portfolio experience built with React and Three.js.', tags: ['React', 'Three.js'], xp: 1000, link: 'https://hannahjamilla.vercel.app/', imgs: ['/images/cover-portfolio.png', '/images/portfolio.png', '/images/2port.png'] },
]
const ACHIEVEMENTS = [
  { icon: Trophy, title: 'IRCITE 2025 Paper Presenter', date: 'Apr 2025' },
  { icon: Trophy, title: 'TOPCIT Examinee', date: 'Jul 2025' },
  { icon: ShieldCheck, title: 'Microsoft SC-900', date: 'Mar 2025' },
  { icon: FileBadge, title: 'Alison Diploma in E-Commerce', date: 'Oct 2025' },
  { icon: BookOpen, title: 'Published Researcher (IJAMR)', date: 'Jun 2024' },
  { icon: GraduationCap, title: 'ABM with Honors & Loyalty', date: 'May 2022' },
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

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % imgs.length) }
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + imgs.length) % imgs.length) }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className={`absolute inset-0 ${t(dark, 'bg-[#0a0a0f]/95', 'bg-[#f8f7f4]/95')} backdrop-blur-md `} />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center" onClick={e => e.stopPropagation()}>

        {/* Game UI Header */}
        <div className={`w-full flex justify-between items-end mb-4 border-b-2 pb-2 ${t(dark, 'border-cyan-900', 'border-indigo-200')}`}>
          <div className="flex flex-col">
            <span className={`font-semibold tracking-wide text-xs sm:text-xs uppercase ${t(dark, 'text-cyan-400', 'text-indigo-600')}`}>
              // VIEWING_DATA
            </span>
            <span className={`font-mono text-xs sm:text-sm mt-1.5 ${t(dark, 'text-gray-400', 'text-gray-600')}`}>
              {alt}
            </span>
          </div>
          <button
            onClick={onClose}
            className={`font-semibold tracking-wide text-xs sm:text-xs px-3 py-2 border transition-all ${t(dark, 'border-red-900/50 text-red-400 hover:bg-red-950/50 hover:border-red-500', 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400')}`}
          >
            [X] CLOSE
          </button>
        </div>

        {/* Main Image Frame */}
        <div className={`relative w-full border p-2 sm:p-4 ${t(dark, 'border-cyan-800/50 bg-black/50 shadow-sm hover:shadow-md', 'border-indigo-300 bg-white/50 shadow-xl')}`}>
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
              className={`font-semibold tracking-wide text-xs sm:text-xs px-4 py-3 border transition-all ${t(dark, 'border-cyan-900 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500', 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400')}`}
            >
              {'< PREV'}
            </button>

            <div className={`font-mono text-sm sm:text-base px-4 py-2 border ${t(dark, 'border-white/10 text-white/50 bg-black/30', 'border-gray-200 text-gray-500 bg-white/50')}`}>
              FILE {idx + 1}/{imgs.length}
            </div>

            <button
              onClick={next}
              className={`font-semibold tracking-wide text-xs sm:text-xs px-4 py-3 border transition-all ${t(dark, 'border-cyan-900 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500', 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400')}`}
            >
              {'NEXT >'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Detail Modal (mobile info popup) ── */
type DetailData = {
  title: string
  subtitle?: string
  badge?: string
  xp?: number
  period?: string
  desc?: string
  tags?: string[]
  link?: string
  imgs?: string[]
  date?: string
  wip?: boolean
  accentColor?: string
}
function DetailModal({ data, onClose }: { data: DetailData; onClose: () => void }) {
  const { dark } = useTheme()
  const [imgIdx, setImgIdx] = useState(0)
  const imgs = data.imgs || []

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])
  const ac = data.accentColor || (dark ? 'text-indigo-400' : 'text-indigo-600')
  const acBorder = data.accentColor || (dark ? 'border-indigo-800/40' : 'border-indigo-200')
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className={`absolute inset-0 ${t(dark, 'bg-black/80', 'bg-black/40')} backdrop-blur-sm`} />
      <div
        className={`relative z-10 w-full sm:max-w-lg md:max-w-2xl lg:max-w-3xl rounded-t-3xl sm:rounded-3xl overflow-hidden max-h-[90vh] flex flex-col ${t(dark, 'bg-[#0f0f1a] border border-white/10', 'bg-white border border-gray-200 shadow-2xl')}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${t(dark, 'border-white/10', 'border-gray-100')}`}>
          <div className="flex items-center gap-2">
            {data.badge && <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${t(dark, 'bg-green-950/50 border border-green-800/40 text-green-400', 'bg-green-50 border border-green-200 text-green-700')}`}>{data.badge}</span>}
            {data.wip && <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${t(dark, 'bg-amber-950/40 border border-amber-800/50 text-amber-400', 'bg-amber-100 border border-amber-300 text-amber-700')}`}>WIP</span>}
            {data.xp && <span className={`text-[10px] font-mono ${t(dark, 'text-amber-400', 'text-amber-700')}`}>+{data.xp} XP</span>}
          </div>
          <button onClick={onClose} className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border transition-all ${t(dark, 'border-red-900/50 text-red-400 hover:bg-red-950/40', 'border-red-200 text-red-500 hover:bg-red-50')}`}>[X] CLOSE</button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1">
          {/* Image Viewer */}
          {imgs.length > 0 && (
            <div className={`relative w-full h-44 sm:h-56 md:h-72 lg:h-96 flex items-center justify-center overflow-hidden ${t(dark, 'bg-black/40', 'bg-gray-50')}`}>
              <img src={imgs[imgIdx]} alt={data.title} className="max-w-full max-h-full object-contain" />
              {imgs.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + imgs.length) % imgs.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-bold">‹</button>
                  <button onClick={() => setImgIdx(i => (i + 1) % imgs.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-bold">›</button>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {imgs.map((_, i) => <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />)}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Info */}
          <div className="px-5 pt-4 pb-6 space-y-3">
            <div>
              <h2 className={`text-xl md:text-2xl lg:text-3xl font-black tracking-tight ${t(dark, 'text-white', 'text-gray-900')}`}>{data.title}</h2>
              {data.subtitle && <p className={`text-sm md:text-base font-medium mt-0.5 md:mt-1 ${t(dark, 'text-gray-400', 'text-gray-500')}`}>{data.subtitle}</p>}
              {data.period && <p className={`text-xs font-mono mt-1 ${t(dark, 'text-gray-500', 'text-gray-400')}`}>{data.period}</p>}
              {data.date && <p className={`text-xs font-mono mt-1 ${t(dark, 'text-gray-500', 'text-gray-400')}`}>Unlocked: {data.date}</p>}
            </div>

            {data.desc && (
              <p className={`text-sm md:text-base leading-relaxed ${t(dark, 'text-gray-400', 'text-gray-600')}`}>{data.desc}</p>
            )}

            {data.tags && data.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {data.tags.map(tg => (
                  <span key={tg} className={`px-2.5 py-1 rounded-lg text-xs font-mono ${t(dark, 'bg-white/5 border border-white/10 text-gray-400', 'bg-gray-100 border border-gray-200 text-gray-600')}`}>{tg}</span>
                ))}
              </div>
            )}

            {data.link && (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 text-sm md:text-base font-mono font-bold border px-4 md:px-6 py-2.5 md:py-3 rounded-xl w-full justify-center transition-all active:scale-95 ${t(dark, 'border-indigo-700/50 text-indigo-400 bg-indigo-950/30 hover:bg-indigo-950/60', 'border-indigo-200 text-indigo-700 bg-indigo-50 hover:bg-indigo-100')}`}
              >
                OPEN LIVE <span>↗</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── App ── */
export default function App() {
  const [dark, setDark] = useState(false)
  const [tab, setTab] = useState<'projects' | 'skills' | 'awards'>('projects')
  const [menu, setMenu] = useState(false)
  const [lightbox, setLightbox] = useState<{ imgs: string[]; alt: string } | null>(null)
  const [detailModal, setDetailModal] = useState<DetailData | null>(null)
  
  const toggle = () => setDark(p => !p)

  const totalXP = [...QUESTS, ...XP_LOG].reduce((s, q) => s + q.xp, 0)
  const lvl = Math.floor(totalXP / 1000) + 1

  const bg = t(dark, 'bg-[#0a0a0f] text-gray-100', 'bg-[#f8f7f4] text-gray-900')
  const gridBg = t(dark, '', '')
  const card = t(dark, 'bg-white/[0.03] border-white/5', 'bg-white border-gray-200 shadow-sm')
  const muted = t(dark, 'text-gray-500', 'text-gray-600')
  const accent = t(dark, 'text-cyan-400', 'text-indigo-600')
  const accentBg = t(dark, 'bg-cyan-950/30 border-cyan-800/40', 'bg-indigo-50 border-indigo-200')
  const pixelColor = t(dark, 'text-cyan-400/60', 'text-indigo-400/60')
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const dotColor = t(dark, 'bg-cyan-400', 'bg-indigo-500')

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div className={`min-h-screen w-full ${bg} overflow-x-hidden ${gridBg}  relative transition-colors duration-300`}>
        <MobileMenu open={menu} onClose={() => setMenu(false)} />

        {/* ── NAV ── */}
        <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b transition-colors duration-300 ${t(dark, 'bg-[#0a0a0f]/90 border-cyan-900/30', 'bg-white/80 border-gray-200')}`}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-sm ${dotColor} animate-pulse`} />
              <span className={`font-semibold tracking-wide text-xs sm:text-xs ${accent} tracking-wider`}>
                <span className="hidden xl:inline">HANNAH JAMILLA</span>
                <span className="xl:hidden">Hannah</span>
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-6 text-xs font-mono font-medium">
              {[{ id: 'profile', label: 'profile' }, { id: 'stats', label: 'skills' }, { id: 'quests', label: 'projects' }, { id: 'xp', label: 'experience' }].map(s => (
                <a key={s.id} href={`#${s.id}`} className={`${muted} hover:${accent} transition-colors`}>[{s.label.toUpperCase()}]</a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              {/* Level badge */}
              <div className="hidden xl:flex items-center gap-2 text-xs font-mono">
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
              <button onClick={() => setMenu(true)} className="xl:hidden p-2 font-mono text-sm">[=]</button>
            </div>
          </div>
        </nav>

        {/* ── HERO ── */}
        <section id="profile" className="relative pt-16 sm:pt-20 pb-10 sm:pb-12">

          <div className="xl:hidden">
            {/* Cover Banner */}
            <div className={`relative w-full overflow-hidden ${t(dark, 'bg-[#0f0f1a]', 'bg-gray-100')}`}>
              {/* Cover Photo - No forced height so it doesn't crop horizontally */}
              <img
                src="/images/cover photo-Hannah.png"
                alt="Cover"
                className="w-full h-auto block"
              />
              {/* Subtle overlay for contrast */}
              <div className="absolute inset-0 bg-black/10" />
            </div>

            {/* Profile Card Body */}
            <div className={`relative mx-4 sm:mx-6 -mt-10 sm:-mt-12 rounded-[1.5rem] border ${t(dark, 'bg-[#0f0f1a] border-white/8 shadow-[0_8px_30px_rgb(0,0,0,0.3)]', 'bg-white border-gray-100 shadow-[0_12px_40px_rgb(0,0,0,0.06)]')}`}>
              {/* Avatar + Name row */}
              <div className="flex flex-col items-center pt-0 pb-4 px-6 text-center">
                <div
                  className={`-mt-12 mb-3 relative w-[6.5rem] h-[6.5rem] sm:w-[7.5rem] sm:h-[7.5rem] rounded-full border-[5px] overflow-hidden shrink-0 cursor-pointer group flex items-center justify-center ${t(dark, 'border-[#0f0f1a] bg-[#0f0f1a] shadow-xl', 'border-white bg-white shadow-[0_8px_20px_rgb(0,0,0,0.08)]')}`}
                  onClick={() => setLightbox({ imgs: ['/images/Hannah-casual4.png', '/images/Hannah-casual.png', '/images/Hannah-casual1.png', '/images/Hannah-casual2.jpg'], alt: 'Hannah Jamilla Peralta' })}
                >
                  <img src="/images/Hannah-casual4.png" alt="Hannah" className="w-full h-full object-cover object-[50%_15%]" />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <circle cx="11" cy="11" r="7"/><line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round"/>
                    </svg>
                  </div>
                </div>
                <div className="min-w-0 flex flex-col items-center">
                  <h1 className={`font-black tracking-tight leading-[1.1] text-[1.5rem] sm:text-2xl ${t(dark, 'text-white', 'text-[#0f172a]')}`}>
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
                <p className={`text-[13px] leading-relaxed max-w-sm mx-auto ${t(dark, 'text-gray-400', 'text-gray-600')}`}>
                  Hi there! I'm a fresh graduate who builds fun and useful things. I love analyzing details to make things easier for users and enjoy creating with awesome people!
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
            <p className={`font-semibold tracking-wide text-xs ${pixelColor} tracking-[0.3em] mb-3 text-left`}>// ABOUT ME</p>
            <div className="grid grid-cols-12 gap-6 items-start">
              {/* Character Card */}
              <div className="col-span-4 flex flex-col items-start">
                <div
                  className={`relative w-64 h-72 rounded-2xl border p-1 group cursor-pointer ${t(dark, 'border-cyan-800/40 shadow-sm hover:shadow-md', 'border-indigo-200 shadow-lg')} ${t(dark, 'bg-gradient-to-b from-cyan-950/30 to-transparent', 'bg-gradient-to-b from-indigo-50 to-transparent')}`}
                  onClick={() => setLightbox({ imgs: ['/images/Hannah-casual4.png', '/images/Hannah-casual.png', '/images/Hannah-casual1.png', '/images/Hannah-casual2.jpg'], alt: 'Hannah Jamilla Peralta' })}
                >
                  <div className={`w-full h-full rounded-2xl overflow-hidden flex items-center justify-center relative ${t(dark, 'bg-[#0d0d18]', 'bg-gray-50')}`}>
                    <img src="/images/Hannah-casual4.png" alt="Hannah" className="w-full h-full object-cover opacity-100 transition-opacity duration-500 group-hover:opacity-0" />
                    <img src="/images/Hannah-casual.png" alt="Hannah casual" className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-300 flex items-center justify-center rounded-2xl">
                      <svg xmlns="http://www.w3.org/2000/svg" className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 text-white drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" strokeLinecap="round" />
                      </svg>
                    </div>
                    <div className={`absolute bottom-0 left-0 right-0 p-4 pointer-events-none ${t(dark, 'bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/80 to-transparent', 'bg-gradient-to-t from-white via-white/90 to-transparent')}`}>
                      <p className={`font-semibold tracking-wide text-sm ${accent} leading-relaxed`}>Hannah</p>
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
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight leading-[1.05]">
                  <span className={t(dark, 'text-[#0f172a]', 'text-[#0f172a]')}>Hannah Jamilla</span>
                  <br />
                  <span className={t(dark, 'text-[#5B4DFF]', 'text-[#5B4DFF]')}>Peralta</span>
                </h1>
                <p className={`${muted} text-sm sm:text-base md:text-lg leading-relaxed mt-4`}>
                  Hi there! I'm a fresh graduate who builds fun and useful things.
                  I love analyzing details to make things easier for users and enjoy creating with awesome people!
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
                      <div key={s.name} className={`p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border flex flex-col sm:flex-row items-center sm:gap-3 transition-all hover:scale-[1.02] text-center sm:text-left ${card}`}>
                        <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shrink-0 mb-1 sm:mb-0 ${t(dark, 'bg-white/5', 'bg-gray-50')}`}>
                          <s.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${cat.accent}`} />
                        </div>
                        <div className="min-w-0 w-full flex flex-col sm:flex-row sm:items-center sm:justify-between">
                          <span className="text-[11px] sm:text-sm font-bold tracking-tight truncate">{s.name}</span>
                          <span className={`text-[9px] sm:text-xs font-mono opacity-60 mt-0.5 sm:mt-0 sm:ml-2`}>{s.label.split(' / ')[1]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className={`mt-8 pt-5 border-t ${t(dark, 'border-cyan-900/30', 'border-indigo-100')}`}>
              <p className={`font-mono text-xs mb-3 font-bold ${t(dark, 'text-cyan-400', 'text-indigo-600')}`}>TOOLS & PRODUCTIVITY</p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'VS Code', icon: Code2 },
                  { name: 'Antigravity', icon: Rocket },
                  { name: 'Kiro', icon: Cpu },
                  { name: 'Postman', icon: Send },
                  { name: 'Bitbucket', icon: GitBranch },
                  { name: 'GitHub', icon: GitBranch },
                  { name: 'Figma', icon: PenTool },
                  { name: 'MS Office', icon: FileText },
                  { name: 'Google Workspace', icon: Globe }
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
                          ? setDetailModal({ title: q.title, subtitle: q.role, badge: q.status, xp: q.xp, period: q.period, desc: q.desc, tags: q.tags, link: q.link, imgs: q.imgs })
                          : setLightbox({ imgs: q.imgs, alt: q.title })
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
                        
                        {/* Desktop: Full Details */}
                        <div className="hidden xl:flex flex-col flex-grow mt-1">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={`px-2 py-0.5 rounded-md text-xs font-mono font-bold ${t(dark, 'bg-green-950/30 border border-green-800/30 text-green-400', 'bg-green-50 border border-green-200 text-green-700')}`}>{q.status}</span>
                            <span className={`text-xs font-mono ${muted}`}>{q.period}</span>
                          </div>
                          <span className={`text-xs font-mono mb-1 ${t(dark, 'text-amber-400', 'text-amber-700')}`}>+{q.xp} XP</span>
                          <p className={`text-xs ${muted} font-medium mb-1`}>{q.role}</p>
                          <p className={`text-sm ${muted} leading-snug mb-2 flex-grow`}>{q.desc}</p>
                          <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
                            <div className="flex flex-wrap gap-1.5">
                              {q.tags.map(tg => <span key={tg} className={`px-2 py-0.5 rounded-md text-xs font-mono ${t(dark, 'bg-white/5 text-gray-400', 'bg-gray-100 text-gray-600')}`}>{tg}</span>)}
                            </div>
                            {q.link && (
                              <a href={q.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 text-xs font-mono font-bold ${t(dark, 'text-amber-400 hover:text-amber-300', 'text-amber-700 hover:text-amber-600')} transition-colors`}>
                                OPEN LIVE <span>↗</span>
                              </a>
                            )}
                          </div>
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

        {/* ── XP LOG ── */}
        <section id="xp" className="py-8 px-4 sm:px-6">
          <div className={`max-w-6xl mx-auto rounded-2xl border p-6 sm:p-8 relative ${t(dark, 'bg-[#0d0d18] border-green-900/40 shadow-sm hover:shadow-md', 'bg-white border-emerald-200 shadow-sm')}`}>
            <div className={`absolute -top-3 left-6 px-3 font-semibold tracking-wide text-xs sm:text-xs tracking-widest ${t(dark, 'bg-[#0d0d18] text-green-400', 'bg-white text-emerald-600')}`}>
              WORK EXPERIENCE
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-2 gap-3 sm:gap-4 mt-2">
              {XP_LOG.map((x, i) => (
                <div key={i} onClick={() => window.innerWidth < 1280 && setDetailModal({ title: x.place, subtitle: x.role, xp: x.xp, period: x.period, desc: x.desc })} className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border transition-all flex flex-col cursor-pointer sm:cursor-default active:scale-[0.98] sm:active:scale-100 ${card}`}>
                  <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                    <span className={`text-[9px] sm:text-xs font-mono ${muted}`}>{x.period}</span>
                  </div>
                  <span className={`text-[9px] sm:text-xs font-mono mb-1.5 sm:mb-3 ${t(dark, 'text-green-400', 'text-green-700')}`}>+{x.xp} XP</span>
                  <h3 className={`text-[12px] sm:text-base font-bold mb-0.5 sm:mb-1 leading-tight ${t(dark, 'text-green-300', 'text-gray-900')}`}>{x.place}</h3>
                  <p className={`text-[10px] sm:text-xs font-medium ${muted} mb-1 sm:mb-2 leading-tight`}>{x.role}</p>
                  <p className={`hidden sm:block text-sm ${muted} leading-relaxed flex-grow`}>{x.desc}</p>
                </div>
              ))}
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
                      : setLightbox({ imgs: p.imgs, alt: p.title })
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
                      {p.wip && <span className={`inline-block px-1.5 py-0.5 sm:px-2 rounded text-[8px] sm:text-xs font-mono whitespace-nowrap mt-0.5 sm:mt-0 ${t(dark, 'bg-amber-900/40 text-amber-400 border border-amber-800/50', 'bg-amber-100 text-amber-700 border border-amber-300')}`}>WIP</span>}
                    </div>

                    {/* Desktop Details */}
                    <div className="hidden xl:flex flex-col flex-grow mt-1">
                      <p className={`text-sm ${muted} leading-snug mb-2`}>{p.desc}</p>
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
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 sm:gap-4 mt-2">
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

        {lightbox && <Lightbox imgs={lightbox.imgs} alt={lightbox.alt} onClose={() => setLightbox(null)} />}
        {detailModal && <DetailModal data={detailModal} onClose={() => setDetailModal(null)} />}
      </div>
    </ThemeCtx.Provider>
  )
}
