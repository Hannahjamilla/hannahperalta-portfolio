import { useEffect, useState, Suspense } from 'react'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import type { DetailData } from './types'
import { ThemeCtx, t } from './context/theme-context'
import { DetailModal, Lightbox } from './components/lazy-components'
import { QUESTS, ACHIEVEMENTS, XP_LOG, PERSONAL, EDUCATION } from './data/constants'
import { TechnicalSkills, ThemeToggle } from './components/layout-helpers'

// Custom hook to get current time for newspaper header
const useDateString = () => {
  const [dates, setDates] = useState({ full: '', short: '' })
  useEffect(() => {
    const d = new Date();
    setDates({
      full: d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      short: d.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    })
  }, [])
  return dates
}

const renderRoleChips = (roleStr?: string, dark: boolean = false) => {
  if (!roleStr) return null
  const roles = roleStr.split('|').map(r => r.trim()).filter(Boolean)
  return (
    <div className="flex flex-wrap items-center gap-1">
      {roles.map((r, idx) => (
        <span
          key={idx}
          className={`inline-block px-1.5 py-0.5 rounded text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider border ${t(dark, 'bg-[#2a241e] text-[#f5d089] border-[#665435]', 'bg-[#f4efe4] text-[#7a591e] border-[#d4c5a9]')
            }`}
        >
          {r}
        </span>
      ))}
    </div>
  )
}

const renderStatusChip = (_status?: string, wip?: boolean, dark: boolean = false) => {
  if (!wip) return null
  return (
    <span className={`inline-block ml-2 sm:ml-2.5 text-[0.45em] font-mono font-bold tracking-wider uppercase align-middle ${t(dark, 'text-amber-400', 'text-amber-700')}`}>
      - WORK IN PROGRESS
    </span>
  )
}



export default function App() {
  const [dark, setDark] = useState(false)
  const [lightbox, setLightbox] = useState<any>(null)
  const [detailModal, setDetailModal] = useState<DetailData | null>(null)
  const [colorProfile, setColorProfile] = useState(false)
  const dates = useDateString()

  const toggle = () => setDark(p => !p)

  // Authentic Newspaper Palette
  const bg = t(dark, 'bg-scrapbook-dark text-[#e0e0e0]', 'bg-scrapbook-light text-[#1c1813]')
  const border = t(dark, 'border-white/15', 'border-[#d0c9b8]')
  const borderDarker = t(dark, 'border-white/30', 'border-[#c4b99a]')
  const muted = t(dark, 'text-[#737373]', 'text-[#5d5a55]')

  // Signature Newspaper Accent Color (Editorial Crimson)
  const singleAccent = t(dark, 'text-[#ff6b6b] font-bold', 'text-[#a11d1d] font-bold')
  const singleBgAccent = t(dark, 'border-b-4 border-double border-[#ff6b6b] text-[#ff6b6b]', 'border-b-4 border-double border-[#a11d1d] text-[#a11d1d]')

  const accentBurgundy = singleAccent
  const bgBurgundy = singleBgAccent
  const accentTeal = singleAccent
  const bgTeal = singleBgAccent
  const accentGold = singleAccent
  const bgGold = singleBgAccent
  const bgIndigo = singleBgAccent


  const preloadImages = (urls: string[]) => {
    urls.forEach(url => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    setTimeout(() => { preloadImages(['/images/Hannah-casual4.webp']); }, 1000);
  }, [])

  // Scroll reveal observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible')
          entry.target.classList.remove('reveal-hidden')
        }
      })
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' })

    const targets = document.querySelectorAll('.reveal-on-scroll')
    targets.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div className={`min-h-screen w-full ${bg} transition-colors duration-700 flex flex-col items-center selection:bg-red-600/30 selection:text-current font-serif px-3 sm:px-6 md:px-8 lg:px-10 pb-3 sm:pb-6 md:pb-8 lg:pb-10 pt-0`}>

        {/* ── Super Subtle Loading Screen ── */}
        <div className={`loader-screen ${t(dark, 'bg-[#0E0F14]', 'bg-[#faf9f6]')}`}>
          <span className={`loader-text ${t(dark, 'text-zinc-200', 'text-[#1c1813]')}`}>HanMade</span>
          <div className={`loader-line ${t(dark, 'bg-[#ff6b6b]', 'bg-[#a11d1d]')}`} />
          <span className={`loader-sub ${t(dark, 'text-zinc-500', 'text-[#5d5a55]')}`}>Ideas & Creations</span>
        </div>

        <main role="main" className={`portfolio-content w-full max-w-[1120px] border-t-0 border-x border-b ${borderDarker} flex flex-col shadow-2xl ${t(dark, 'shadow-black/50 bg-[#161616]', 'shadow-black/5 bg-[#faf9f6]')}`}>

          {/* Enhanced Sticky Header - Premium Editorial Design */}
          <div className={`sticky top-0 z-50 flex items-center justify-between py-2.5 md:py-3.5 px-4 sm:px-6 md:px-10 border-b-4 border-double ${borderDarker} ${t(dark, 'bg-[#121212]/95', 'bg-[#F2EBD9]/95')} backdrop-blur-md shadow-sm transition-all duration-500`}>
            
            {/* Left Brand */}
            <div className="flex items-center gap-3 md:gap-4 shrink-0">
              <span className={`font-serif font-black italic tracking-tight text-[18px] md:text-2xl leading-none ${t(dark, 'text-zinc-100', 'text-[#1c1813]')}`}>
                Han<span className={t(dark, 'text-[#ff6b6b]', 'text-[#a11d1d]')}>Made♡</span>
              </span>
              <div className={`hidden sm:block w-px h-4 md:h-6 ${dark ? 'bg-white/15' : 'bg-[#1c1813]/15'}`}></div>
              <span className={`hidden sm:block text-[9.5px] md:text-[10.5px] font-mono font-bold uppercase tracking-[0.2em] mt-0.5 ${t(dark, 'text-zinc-400', 'text-[#7a725b]')}`}>
                Ideas &amp; Creations
              </span>
            </div>

            {/* Middle (Desktop Only) - Elegant Line */}
            <div className="hidden lg:flex flex-1 items-center justify-center px-10 opacity-30 mt-1">
               <div className={`w-full h-px ${dark ? 'bg-white/60' : 'bg-[#1c1813]/60'}`}></div>
               <span className="w-1.5 h-1.5 border border-current rotate-45 shrink-0 mx-4"></span>
               <div className={`w-full h-px ${dark ? 'bg-white/60' : 'bg-[#1c1813]/60'}`}></div>
            </div>

            {/* Right Tools & Date */}
            <div className="flex items-center gap-2.5 sm:gap-4 md:gap-5 shrink-0">
              <div className={`text-[8.5px] sm:text-[10px] md:text-[11px] font-mono font-bold uppercase tracking-widest mt-0.5 ${t(dark, 'text-zinc-400', 'text-[#7a725b]')}`}>
                <span className="hidden sm:inline whitespace-nowrap">{dates.full}</span>
                <span className="sm:hidden whitespace-nowrap tracking-wider">{dates.short}</span>
              </div>
              <div className={`w-px h-4 sm:h-5 md:h-6 ${dark ? 'bg-white/15' : 'bg-[#1c1813]/15'}`}></div>
              <div className="pointer-events-auto">
                 <ThemeToggle dark={dark} toggle={toggle} />
              </div>
            </div>

          </div>

          {/* ── THE MASTHEAD ── */}
          <section id="profile" className={`flex flex-col border-b pointer-events-none ${border}`}>

            {/* Newspaper masthead rule */}
            <div className="flex items-center px-4 md:px-10 py-0.5">
              <div className={`flex-1 h-px ${dark ? 'bg-white/20' : 'bg-[#1c1813]/30'}`} />
              <span className={`mx-3 text-[8px] font-mono uppercase tracking-[0.3em] opacity-50`}>Est. 2024</span>
              <div className={`flex-1 h-px ${dark ? 'bg-white/20' : 'bg-[#1c1813]/30'}`} />
            </div>

            <div className={`py-5 md:py-12 px-4 md:px-6 text-center flex flex-col items-center pointer-events-auto bg-[#faf9f6]/30 dark:bg-black/10`}>
              <h1 className={`text-[7vw] md:text-[5.5vw] lg:text-[60px] xl:text-[68px] font-serif font-black tracking-tighter leading-none mb-2 ${t(dark, 'text-zinc-200', 'text-[#1c1813]')}`}>
                Hannah Jamilla Del Rosario Peralta
              </h1>
              {/* Thick rule under name — classic newspaper */}
              <div className={`w-full max-w-sm h-[3px] mb-3 ${dark ? 'bg-white/20' : 'bg-[#1c1813]/25'}`} />
              <ul className="flex flex-wrap justify-center items-center gap-x-3 md:gap-x-4 gap-y-2 mb-4 text-[9.5px] md:text-[13px] font-mono font-bold uppercase tracking-widest opacity-90 px-2">
                <li className="flex items-center gap-3 md:gap-4">
                  <span className="whitespace-nowrap">Web Developer</span>
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-current rotate-45 opacity-40"></span>
                </li>
                <li className="flex items-center gap-3 md:gap-4">
                  <span className="whitespace-nowrap">Systems Analysis</span>
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-current rotate-45 opacity-40"></span>
                </li>
                <li className="flex items-center">
                  <span className="whitespace-nowrap">AI & Process Improvement</span>
                </li>
              </ul>
              {/* Vintage Newspaper Banner Strip for Editor's Note */}
              <div className={`my-2 py-1 px-6 border-y-2 border-double ${t(dark, 'border-zinc-700 text-[#ff6b6b]', 'border-[#d0c9b8] text-[#a11d1d]')} flex items-center justify-center gap-3 text-[10.5px] font-mono font-black uppercase tracking-[0.3em]`}>
                <span className="w-1.5 h-1.5 bg-current rotate-45" />
                <span>EDITOR'S NOTE</span>
                <span className="w-1.5 h-1.5 bg-current rotate-45" />
              </div>
              <p className={`text-sm md:text-lg font-serif italic max-w-2xl ${t(dark, 'text-[#f2ebd9]', 'text-[#1c1813]')} leading-relaxed font-medium`}>
                Every project starts with a simple question: How can this be easier for people to use? That's the idea behind everything you'll find here—from clean interfaces to thoughtful features.
              </p>
            </div>
          </section>

          {/* ── FRONT PAGE — NEW LAYOUT ── */}
          <section className={`border-b ${border}`}>
            <div className={`p-4 md:p-7 lg:p-8 group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors`}>

              {/* Left Col: Photo */}
              {/* Photo component (floated on tablet/desktop) */}
              <div className="md:float-left md:w-[26%] md:max-w-[250px] md:mr-8 md:mb-2">
                {/* Mobile: newspaper side-by-side photo + caption */}
                <div className="flex gap-4 items-start md:block">
                  <div className="w-[40%] flex-shrink-0 md:w-full flex flex-col mt-1.5 md:mt-0">
                    <div className={`w-full aspect-[3/4] md:aspect-[4/5] relative border p-1 md:p-2 ${t(dark, 'bg-[#151722]/80 border-white/10', 'bg-[#F6EFE2] border-[#E2D8BF]')} shadow-sm md:shadow-md rounded md:rounded-lg overflow-hidden`}>
                      <div onClick={() => setColorProfile(p => !p)} className="cursor-pointer block relative z-10 w-full h-full">
                        <img src="/images/Hannah-casual4.webp" className={`w-full h-full object-cover transition-all duration-[2s] cursor-pointer ${colorProfile ? 'grayscale-0 scale-[1.03]' : 'grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0'}`} alt="Hannah Jamilla Del Rosario Peralta" loading="lazy" />
                      </div>
                    </div>
                    <div className="mt-2.5 flex items-center justify-center gap-1.5 opacity-40 md:opacity-30">
                      <div className="w-5 h-[1px] bg-current"></div>
                      <div className="w-1 h-1 rotate-45 border border-current"></div>
                      <div className="w-5 h-[1px] bg-current"></div>
                    </div>
                  </div>
                  {/* Mobile-only bio blurb next to photo */}
                  <div className="flex-1 md:hidden flex flex-col justify-center">
                    <p className={`text-[10px] font-mono font-black uppercase tracking-widest mb-1.5 ${accentBurgundy}`}>About Me</p>
                    <h2 className="text-2xl font-serif font-black uppercase tracking-tight leading-none mb-2 group-hover:underline underline-offset-4 decoration-2">Hello World!</h2>
                    <p className="text-sm font-serif leading-relaxed opacity-95">
                      That's my approach — I build for humans, not just screens. The kind of apps that just make sense the moment you open them.
                    </p>
                  </div>
                </div>
              </div>

              {/* Biography content wrapping around photo */}
              <div className="hidden md:block">
                <h2 className={`text-2xl md:text-3xl font-serif font-black uppercase tracking-tight mb-1.5 ${accentBurgundy} group-hover:underline underline-offset-4 decoration-2`}>About Me</h2>
                <div className="flex items-center gap-3 mb-3.5">
                  <div className={`flex-1 h-px ${t(dark, 'bg-white/20', 'bg-[#1c1813]/20')}`} />
                  <span className={`text-[9px] font-mono font-black uppercase tracking-[0.3em] px-2.5 py-1 border border-current ${accentBurgundy}`}>✦ Hello World ✦</span>
                  <div className={`flex-1 h-px ${t(dark, 'bg-white/20', 'bg-[#1c1813]/20')}`} />
                </div>
                <div className={`font-serif text-sm md:text-[15px] leading-relaxed space-y-3 ${t(dark, 'text-zinc-300', 'text-[#2b271d]')}`}>
                  <p className="first-letter:text-4xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:text-inherit">
                    I'm a Web Developer with experience building modern, responsive applications through internships and academic projects. I specialize in creating user-focused interfaces and developing practical features using React.js, Node.js, Laravel, and database systems.
                  </p>
                  <p>
                    My approach centers on building technology that serves real-world needs. I focus on designing intuitive user experiences and developing reliable backend systems that address practical business requirements.
                  </p>
                  <p>
                    I value clean, user-centered solutions and aim to continuously expand my technical skills while contributing effectively to development teams.
                  </p>
                </div>

              </div>

              {/* Clear floats so subsequent rows render underneath */}
              <div className="clear-both" />

              {/* Biography closing blurb */}
              <div className={`p-4 border-t ${border} -mx-5 -mb-5 mt-6 bg-black/[0.01] dark:bg-white/[0.01]`}>
                <p className={`font-serif text-sm leading-relaxed ${t(dark, 'text-zinc-300', 'text-[#2b271d]')}`}>
                  Here's a look at what I've been building. Each project reflects my passion for creating web applications that are intuitive, practical, and designed with real users in mind.
                </p>
              </div>

            </div>

            {/* Links row */}
            <div className={`grid grid-cols-2 border-t ${border}`}>
              <a href="https://ping-me-seven-vert.vercel.app/" target="_blank" rel="noopener noreferrer" className={`p-4 md:p-6 border-r ${border} ${t(dark, 'hover:bg-white/5 text-zinc-100', 'hover:bg-black/5 text-[#1c1813]')} transition-all group flex flex-col justify-center`}>
                <h3 className="font-serif font-black uppercase text-sm md:text-lg tracking-wide flex items-center gap-1">Say Hello & Collaborate <span className="transition-transform group-hover:translate-x-1">↗</span></h3>
                <p className="font-serif italic text-[10px] md:text-xs mt-1 opacity-80 group-hover:opacity-100">Got a project idea? Let's talk.</p>
              </a>
              <a href="mailto:hannahjamillap@gmail.com" className={`p-4 md:p-6 ${t(dark, 'hover:bg-white/5 text-zinc-100', 'hover:bg-black/5 text-[#1c1813]')} transition-all group flex flex-col justify-center`}>
                <h3 className="font-serif font-black uppercase text-sm md:text-lg tracking-wide flex items-center gap-1">Email Me <span className="transition-transform group-hover:translate-x-1">↗</span></h3>
                <p className="font-serif italic text-[10px] md:text-xs mt-1 opacity-80 group-hover:opacity-100">Get in touch for work or just to say hi.</p>
              </a>
            </div>

          </section>

          {/* ── WORK EXPERIENCE ── */}
          <section id="experience" className={`border-b ${border} reveal-on-scroll reveal-hidden`}>
            <div className={`px-5 py-4 border-b ${border} ${bgTeal}`}>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3 leading-tight">
                <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-current rotate-45 shrink-0" /> Work Experience
              </h2>
              <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">Professional Roles & Internships</p>
            </div>

            {/* 1-col on mobile, 3-col on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {XP_LOG.map((exp, i) => (
                <div key={i} className={`p-5 md:p-8 border-b md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0 ${border} flex flex-col justify-between h-full ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors group reveal-on-scroll reveal-hidden`}>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-2 h-2 ${accentTeal} bg-current rotate-45 transition-transform group-hover:scale-125 group-hover:rotate-90 duration-300`} />
                        <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${accentTeal}`}>{exp.period}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-black uppercase tracking-wide mb-2 leading-tight group-hover:underline underline-offset-4 decoration-2 transition-colors">{exp.place}</h3>
                      <h4 className={`text-sm italic font-serif mb-5 pb-3 border-b ${border} ${muted}`}>{exp.role}</h4>

                      <div className="space-y-3 font-serif text-sm leading-relaxed opacity-95 text-inherit">
                        {exp.desc.map((d, di) => (
                          <p key={di} className="flex gap-2 items-start">
                            <span className={`text-[10px] opacity-60 mt-1`}>■</span>
                            <span>{d}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── FEATURED PROJECTS ── */}
          <section id="projects" className={`border-b ${border} reveal-on-scroll reveal-hidden`}>
            <div className={`px-5 py-4 border-b ${border} ${bgBurgundy}`}>
              <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3 leading-tight">
                <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-current rotate-45 shrink-0" /> Featured Projects
              </h2>
              <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">Some things I've built</p>
            </div>

            {/* Lead Story — First project gets full-width hero treatment */}
            <div className={`border-b ${border} group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-all`}>
              {/* Mobile: text on top, image stacked below */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`p-4 md:p-10 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r ${border}`}>
                  <h3 className="text-xl md:text-4xl lg:text-[44px] font-serif font-black uppercase tracking-wide mb-1 group-hover:underline underline-offset-4 decoration-2 decoration-rose-455 leading-tight">
                    {QUESTS[0].title}
                    {renderStatusChip(QUESTS[0].status, (QUESTS[0] as any).wip, dark)}
                  </h3>
                  {QUESTS[0].period && <div className="text-[10px] font-mono uppercase tracking-widest font-black opacity-75 mb-3">{QUESTS[0].period}</div>}
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-4">
                    {QUESTS[0].badge && (
                      <span className={`inline-block px-2 py-0.5 text-[9px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{QUESTS[0].badge}</span>
                    )}
                    {renderRoleChips(QUESTS[0].role, dark)}
                  </div>
                  <div className="font-serif text-sm md:text-base leading-relaxed opacity-95 space-y-3 text-inherit">
                    <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:text-inherit">
                      {QUESTS[0].summary}
                    </p>
                  </div>

                  <div className="mt-5">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {QUESTS[0].tags.map(tg => (
                        <span key={tg} className={`px-1.5 py-0.5 rounded-none text-[8.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider border transition-colors duration-150 ${t(dark, 'text-[#c6bfb0] border-[#555047] hover:border-[#8e8574]', 'text-[#54442e] border-[#d2cab4] hover:border-[#b1a78e]')}`}>{tg}</span>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-dashed border-current/25 flex items-center gap-2">
                      <button
                        onClick={() => setLightbox({ imgs: QUESTS[0].imgs, alt: QUESTS[0].title, wip: (QUESTS[0] as any).wip, desc: QUESTS[0].desc, tags: QUESTS[0].tags, link: QUESTS[0].link, role: QUESTS[0].role, status: QUESTS[0].status, period: QUESTS[0].period })}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-zinc-300 hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                      >
                        <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> SEE DETAILS
                      </button>
                      {QUESTS[0].link && (
                        <a
                          href={QUESTS[0].link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1 rounded-none text-[9.5px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <span className="sm:hidden">VISIT ↗</span>
                          <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-8 flex flex-col justify-center gap-6">
                  <div className="w-full flex justify-center h-full items-center">
                    <div className="relative">
                      <img
                        src={QUESTS[0].imgs[0]}
                        onClick={() => setLightbox({ imgs: QUESTS[0].imgs, alt: QUESTS[0].title, wip: (QUESTS[0] as any).wip, desc: QUESTS[0].desc, tags: QUESTS[0].tags, link: QUESTS[0].link, role: QUESTS[0].role, status: QUESTS[0].status, period: QUESTS[0].period })}
                        className="max-w-full h-auto max-h-[450px] object-contain cursor-pointer transition-all duration-[2s] rounded-md grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── MOBILE: Mixed Newspaper Hierarchy (hidden on md+) ── */}
            <div className="md:hidden">
              {/* Sub-heading: 2nd project gets prominent treatment */}
              <div className={`p-4 border-b ${border} group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors flex flex-col justify-between`}>
                <div>
                  {/* Capstone Project title before image */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 bg-current rotate-45 opacity-80 shrink-0" />
                    <span className={`text-[11px] font-mono font-black uppercase tracking-[0.22em] ${accentBurgundy}`}>Capstone Project</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="aspect-[4/3] overflow-hidden rounded flex items-center justify-center relative">
                      <img
                        src={QUESTS[1].imgs[0]}
                        onClick={() => setLightbox({ imgs: QUESTS[1].imgs, alt: QUESTS[1].title, wip: (QUESTS[1] as any).wip, desc: QUESTS[1].desc, tags: QUESTS[1].tags, link: QUESTS[1].link, role: QUESTS[1].role, status: QUESTS[1].status, period: QUESTS[1].period })}
                        className="max-w-full max-h-full object-contain cursor-pointer transition-all duration-500 rounded grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                        loading="lazy"
                      />
                    </div>
                    {QUESTS[1].imgs[1] && (
                      <div className="aspect-[4/3] overflow-hidden rounded flex items-center justify-center">
                        <img
                          src={QUESTS[1].imgs[1]}
                          onClick={() => setLightbox({ imgs: QUESTS[1].imgs, alt: QUESTS[1].title, wip: (QUESTS[1] as any).wip, desc: QUESTS[1].desc, tags: QUESTS[1].tags, link: QUESTS[1].link, role: QUESTS[1].role, status: QUESTS[1].status, period: QUESTS[1].period })}
                          className="max-w-full max-h-full object-contain cursor-pointer transition-all duration-500 rounded grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Text content */}
                  <div>
                    <h3 className="text-xl font-serif font-black uppercase tracking-wide leading-tight mb-1 group-hover:underline underline-offset-4 decoration-2">
                      {QUESTS[1].title}
                      {renderStatusChip(QUESTS[1].status, (QUESTS[1] as any).wip, dark)}
                    </h3>
                    {QUESTS[1].period && <div className="text-[8px] font-mono uppercase tracking-widest font-black opacity-75 mb-2">{QUESTS[1].period}</div>}
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">
                      {QUESTS[1].badge && (
                        <span className={`inline-block px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{QUESTS[1].badge}</span>
                      )}
                      {renderRoleChips(QUESTS[1].role, dark)}
                    </div>
                    <p className="font-serif text-sm leading-relaxed opacity-85">{QUESTS[1].summary}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {QUESTS[1].tags.map(tg => (
                      <span key={tg} className={`px-1.5 py-0.5 rounded-none text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider border transition-colors duration-150 ${t(dark, 'text-[#c6bfb0] border-[#555047] hover:border-[#8e8574]', 'text-[#54442e] border-[#d2cab4] hover:border-[#b1a78e]')}`}>{tg}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-dashed border-current/25 flex items-center gap-2">
                    <button
                      onClick={() => setLightbox({ imgs: QUESTS[1].imgs, alt: QUESTS[1].title, wip: (QUESTS[1] as any).wip, desc: QUESTS[1].desc, tags: QUESTS[1].tags, link: QUESTS[1].link, role: QUESTS[1].role, status: QUESTS[1].status, period: QUESTS[1].period })}
                      className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-none text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-zinc-300 hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                    >
                      <ArrowUpRight size={11} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> DETAILS
                    </button>
                    {QUESTS[1].link && (
                      <a
                        href={QUESTS[1].link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-none text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                        <span className="sm:hidden">VISIT ↗</span>
                        <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Compact 2-col briefs for remaining projects */}
              {/* Single label before the grid */}
              <div className={`flex items-center gap-1.5 px-3 pt-3 pb-1`}>
                <span className="w-1 h-1 bg-current rotate-45 opacity-70" />
                <span className={`text-[9px] font-mono font-black uppercase tracking-[0.2em] ${accentBurgundy}`}>Here's What Else I've Built</span>
              </div>
              <div className="grid grid-cols-2">
                {QUESTS.slice(2).map((q, i) => (
                  <div
                    key={i}
                    className={`p-3 border-b border-r [&:nth-child(2n)]:border-r-0 ${border} group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors flex flex-col justify-between h-full`}
                  >
                    <div>
                      <div className="aspect-[16/10] w-full overflow-hidden rounded mb-2 relative">
                        <img
                          src={q.imgs[0]}
                          onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                          className="w-full h-full object-cover cursor-pointer transition-all duration-500 grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-xs font-serif font-black uppercase tracking-wide leading-tight mt-0.5 mb-0.5 group-hover:underline">
                        {q.title}
                        {renderStatusChip(q.status, (q as any).wip, dark)}
                      </h3>
                      {q.period && <div className="text-[7px] font-mono uppercase tracking-widest font-black opacity-75 mb-1">{q.period}</div>}
                      <div className="flex flex-wrap items-center gap-1 mb-1">
                        {q.badge && (
                          <span className={`inline-block px-1.5 py-0.5 text-[6.5px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{q.badge}</span>
                        )}
                        {renderRoleChips(q.role, dark)}
                      </div>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-dashed border-current/25 flex items-center justify-between gap-1 text-[8.5px] font-mono font-bold uppercase tracking-widest">
                      <button
                        onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                        className={`cursor-pointer inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none text-[7.5px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-[#c6bfb0] hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                      >
                        <ArrowUpRight size={10} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> DETAILS
                      </button>
                      {q.link && (
                        <a
                          href={q.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`cursor-pointer inline-flex items-center gap-1 px-1.5 py-0.5 rounded-none text-[7.5px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                        >
                          <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <span className="sm:hidden">VISIT ↗</span>
                          <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary: 2-col */}
            <div className="hidden md:grid grid-cols-2 border-b border-inherit">
              {QUESTS.slice(1, 3).map((q, i) => (
                <div
                  key={i}
                  className={`p-8 border-r last:border-r-0 ${border} group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors flex flex-col justify-between h-full reveal-on-scroll reveal-hidden`}
                >
                  <div className="flex-1 flex flex-col">
                    <div className={`aspect-[16/10] w-full relative overflow-hidden mb-6 p-2`}>
                      <img
                        src={q.imgs[0]}
                        onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                        className="w-full h-full object-contain cursor-pointer transition-all duration-[2s] rounded grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-2xl font-serif font-black uppercase tracking-wide mb-1 group-hover:underline underline-offset-4 decoration-2 leading-tight">
                      {q.title}
                      {renderStatusChip(q.status, (q as any).wip, dark)}
                    </h3>
                    {q.period && <div className="text-[9px] font-mono uppercase tracking-widest font-black opacity-75 mb-2.5">{q.period}</div>}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {q.badge && (
                        <span className={`inline-block px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{q.badge}</span>
                      )}
                      {renderRoleChips(q.role, dark)}
                    </div>
                    <p className="font-serif text-sm leading-relaxed opacity-95 flex-1">{q.summary}</p>
                  </div>
                  <div className="mt-5">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {q.tags.map(tg => (
                        <span key={tg} className={`px-1.5 py-0.5 rounded-none text-[8.5px] sm:text-[9px] font-mono font-bold uppercase tracking-wider border transition-colors duration-150 ${t(dark, 'text-[#c6bfb0] border-[#555047] hover:border-[#8e8574]', 'text-[#54442e] border-[#d2cab4] hover:border-[#b1a78e]')}`}>{tg}</span>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-dashed border-current/25 flex items-center gap-1.5">
                      <button
                        onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                        className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-none text-[9px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-zinc-300 hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                      >
                        <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> DETAILS
                      </button>
                      {q.link && (
                        <a
                          href={q.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-none text-[9px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                          <span className="sm:hidden">VISIT ↗</span>
                          <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Tertiary: 2-col grid on tablet (md), 3-col grid on desktop (lg) */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3">
              {QUESTS.slice(3).map((q, i) => (
                <div
                  key={i}
                  className={`p-6 lg:p-8 border-b lg:border-b-0 border-r md:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:border-r last:lg:border-r-0 ${i === 2 ? 'md:col-span-2 lg:col-span-1 md:w-full md:border-t md:border-b lg:border-t-0 lg:border-b-0 md:border-r-0 lg:border-r' : 'border-b md:border-b'} ${border} group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors flex flex-col justify-between h-full reveal-on-scroll reveal-hidden`}
                >
                  {i === 2 ? (
                    <div className="flex flex-col justify-between h-full">
                      {/* Split layout on tablet: left image, right details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 items-center flex-1">
                        <div className="aspect-[16/10] w-full relative overflow-hidden p-1.5">
                          <img
                            src={q.imgs[0]}
                            onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                            className="w-full h-full object-contain cursor-pointer transition-all duration-[2s] rounded grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex flex-col h-full justify-between">
                          <div>
                            <h3 className="text-xl font-serif font-black uppercase tracking-wide mb-1 group-hover:underline underline-offset-4 decoration-2 leading-tight">
                              {q.title}
                              {renderStatusChip(q.status, (q as any).wip, dark)}
                            </h3>
                            {q.period && <div className="text-[9px] font-mono uppercase tracking-widest font-black opacity-75 mb-2.5">{q.period}</div>}
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                              {q.badge && (
                                <span className={`inline-block px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{q.badge}</span>
                              )}
                              {renderRoleChips(q.role, dark)}
                            </div>
                            <p className="font-serif text-sm leading-relaxed opacity-95">{q.summary}</p>
                          </div>

                          <div className="mt-4">
                            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                              {q.tags.map(tg => (
                                <span key={tg} className={`px-1.5 py-0.5 rounded-none text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider border transition-colors duration-150 ${t(dark, 'text-[#c6bfb0] border-[#555047] hover:border-[#8e8574]', 'text-[#54442e] border-[#d2cab4] hover:border-[#b1a78e]')}`}>{tg}</span>
                              ))}
                            </div>
                            <div className="pt-2 border-t border-dashed border-current/25 flex items-center gap-1.5">
                              <button
                                onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                                className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-none text-[9px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-zinc-300 hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                              >
                                <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> DETAILS
                              </button>
                              {q.link && (
                                <a
                                  href={q.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-none text-[9px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                  <span className="sm:hidden">VISIT ↗</span>
                                  <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex-1 flex flex-col">
                        <div className={`aspect-[16/10] w-full relative overflow-hidden mb-6 p-1.5`}>
                          <img
                            src={q.imgs[0]}
                            onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                            className="w-full h-full object-contain cursor-pointer transition-all duration-[2s] rounded grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="text-xl font-serif font-black uppercase tracking-wide mb-1 group-hover:underline underline-offset-4 decoration-2 leading-tight">
                          {q.title}
                          {renderStatusChip(q.status, (q as any).wip, dark)}
                        </h3>
                        {q.period && <div className="text-[9px] font-mono uppercase tracking-widest font-black opacity-75 mb-2.5">{q.period}</div>}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {q.badge && (
                            <span className={`inline-block px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{q.badge}</span>
                          )}
                          {renderRoleChips(q.role, dark)}
                        </div>
                        <p className="font-serif text-sm leading-relaxed opacity-95 flex-1">{q.summary}</p>
                      </div>
                      <div className="mt-5">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          {q.tags.map(tg => (
                            <span key={tg} className={`px-1.5 py-0.5 rounded-none text-[8px] sm:text-[8.5px] font-mono font-bold uppercase tracking-wider border transition-colors duration-150 ${t(dark, 'text-[#c6bfb0] border-[#555047] hover:border-[#8e8574]', 'text-[#54442e] border-[#d2cab4] hover:border-[#b1a78e]')}`}>{tg}</span>
                          ))}
                        </div>
                        <div className="pt-3 border-t border-dashed border-current/25 flex items-center gap-1.5">
                          <button
                            onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })}
                            className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-none text-[9px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-zinc-300 hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                          >
                            <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> DETAILS
                          </button>
                          {q.link && (
                            <a
                              href={q.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={e => e.stopPropagation()}
                              className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1 rounded-none text-[9px] sm:text-[10.5px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                              <span className="sm:hidden">VISIT ↗</span>
                              <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* ── OTHER PROJECTS & RECOGNITIONS — Stacked Full Width ── */}
          <section className={`border-b ${border} reveal-on-scroll reveal-hidden`}>

            {/* Personal Projects */}
            <div>
              <div className={`px-5 py-4 border-b ${border} ${bgIndigo}`}>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3 leading-tight">
                  <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-current rotate-45 shrink-0" /> Other Projects
                </h2>
                <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">Fun Side Projects & Sandbox Experiments</p>
              </div>
              {/* 2-col on mobile, 6-col sub-grid on desktop → 3 per row, last 2 centered */}
              <div className="grid grid-cols-2 lg:grid-cols-6">
                {PERSONAL.map((p, i) => {
                  const isTasklet = p.title === 'Tasklet';
                  return (
                    <div
                      key={i}
                      className={`p-3 md:p-6 border-b border-r ${isTasklet ? 'col-span-2 border-r-0' : '[&:nth-child(2n)]:border-r-0'} lg:col-span-2 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 last:border-r-0 ${!isTasklet ? '[&:last-child:nth-child(odd)]:col-span-2' : ''} ${i === 3 ? 'lg:col-start-2' : ''} ${border} flex flex-col justify-between group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors reveal-on-scroll reveal-hidden`}
                    >
                      {/* Tasklet: side-by-side on tablet (md), stacked on mobile & desktop (lg) */}
                      {isTasklet ? (
                        <>
                          <div className="flex gap-3 md:grid md:grid-cols-2 lg:block items-center">
                            <div className="w-[38%] shrink-0 md:w-full h-auto aspect-[4/3] md:aspect-[16/10] p-1 md:p-1.5 mb-0 md:mb-4 overflow-hidden relative flex items-center justify-center">
                              <img
                                src={p.imgs[0]}
                                onClick={() => setLightbox({ imgs: p.imgs, alt: p.title, wip: p.wip, desc: p.desc, tags: p.tags, link: p.link, role: p.role, period: p.period, status: p.status })}
                                className="max-w-full max-h-full object-contain cursor-pointer transition-all duration-500 rounded grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                                loading="lazy"
                              />
                            </div>
                            <div className="flex-1 flex flex-col justify-center md:block">
                              <h3 className="text-sm md:text-lg font-serif font-black uppercase tracking-wide mb-0.5 leading-tight group-hover:underline underline-offset-4 decoration-2 transition-colors">
                                {p.title}
                                {renderStatusChip(p.status, p.wip, dark)}
                              </h3>
                              {p.period && <div className="text-[7.5px] font-mono uppercase tracking-widest font-black opacity-75 mb-1.5 md:mb-2">{p.period}</div>}
                              <div className="flex flex-wrap items-center gap-2 mb-1.5 md:mb-2.5">
                                {renderRoleChips(p.role, dark)}
                              </div>
                              <p className={`text-xs md:text-sm font-serif leading-relaxed ${muted} line-clamp-2 md:line-clamp-none`}>{p.summary}</p>
                            </div>
                          </div>
                          <div className="mt-4">
                            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                              {p.tags.slice(0, 3).map(tg => (
                                <span key={tg} className={`px-1.5 py-0.5 rounded-none text-[7.5px] font-mono font-bold uppercase tracking-wider border transition-colors duration-150 ${t(dark, 'text-[#c6bfb0] border-[#555047] hover:border-[#8e8574]', 'text-[#54442e] border-[#d2cab4] hover:border-[#b1a78e]')}`}>{tg}</span>
                              ))}
                            </div>
                            <div className="pt-2.5 border-t border-dashed border-current/25 flex items-center gap-1.5">
                              <button
                                onClick={() => setLightbox({ imgs: p.imgs, alt: p.title, wip: p.wip, desc: p.desc, tags: p.tags, link: p.link, role: p.role, period: p.period, status: p.status })}
                                className={`cursor-pointer inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-zinc-300 hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                              >
                                <ArrowUpRight size={11} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> DETAILS
                              </button>
                              {p.link && (
                                <a
                                  href={p.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className={`cursor-pointer inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                  <span className="sm:hidden">VISIT ↗</span>
                                  <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </>
                      ) : (
                        /* All other projects: original stacked layout */
                        <>
                          <div>
                            <div className={`w-full h-[110px] lg:h-auto lg:aspect-[16/10] p-1.5 mb-4 overflow-hidden relative flex items-center justify-center`}>
                              <img
                                src={p.imgs[0]}
                                onClick={() => setLightbox({ imgs: p.imgs, alt: p.title, wip: p.wip, desc: p.desc, tags: p.tags, link: p.link, role: p.role, period: p.period, status: p.status })}
                                className="max-w-full max-h-full object-contain cursor-pointer transition-all duration-500 rounded grayscale group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0"
                                loading="lazy"
                              />
                            </div>

                            <h3 className="text-sm md:text-lg font-serif font-black uppercase tracking-wide mb-0.5 leading-tight group-hover:underline underline-offset-4 decoration-2 transition-colors">
                              {p.title}
                              {renderStatusChip(p.status, p.wip, dark)}
                            </h3>

                            {p.period && <div className="text-[7.5px] font-mono uppercase tracking-widest font-black opacity-75 mb-1.5 md:mb-2">{p.period}</div>}

                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              {renderRoleChips(p.role, dark)}
                            </div>

                            <p className={`text-xs md:text-sm font-serif leading-relaxed ${muted}`}>{p.summary}</p>
                          </div>

                          <div className="mt-4">
                            <div className="flex flex-wrap items-center gap-1.5 mb-2.5">
                              {p.tags.slice(0, 3).map(tg => (
                                <span key={tg} className={`px-1.5 py-0.5 rounded-none text-[7.5px] font-mono font-bold uppercase tracking-wider border transition-colors duration-150 ${t(dark, 'text-[#c6bfb0] border-[#555047] hover:border-[#8e8574]', 'text-[#54442e] border-[#d2cab4] hover:border-[#b1a78e]')}`}>{tg}</span>
                              ))}
                            </div>
                            <div className="pt-2.5 border-t border-dashed border-current/25 flex items-center gap-1.5">
                              <button
                                onClick={() => setLightbox({ imgs: p.imgs, alt: p.title, wip: p.wip, desc: p.desc, tags: p.tags, link: p.link, role: p.role, period: p.period, status: p.status })}
                                className={`cursor-pointer inline-flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 group/btn ${t(dark, 'border-[#555047] text-zinc-300 hover:bg-[#c6bfb0] hover:text-[#1c1813]', 'border-[#d4c5a9] text-[#7a591e] hover:bg-[#7a591e] hover:text-white')}`}
                              >
                                <ArrowUpRight size={11} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" /> DETAILS
                              </button>
                              {p.link && (
                                <a
                                  href={p.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={e => e.stopPropagation()}
                                  className={`cursor-pointer inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:px-2.5 sm:py-1 rounded-none text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border whitespace-nowrap shrink-0 transition-all duration-150 ${t(dark, 'border-[#7d373f] text-[#ff9999] hover:bg-[#7d373f] hover:text-[#1c1813]', 'border-[#e8b5b5] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')}`}
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
                                  <span className="sm:hidden">VISIT ↗</span>
                                  <span className="hidden sm:inline">TAKE A LOOK ↗</span>
                                </a>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Awards & Certifications */}
            <div className={`border-t ${border}`}>
              <div className={`px-5 py-4 border-b ${border} ${bgGold}`}>
                <h2 className="text-lg sm:text-3xl md:text-4xl font-serif font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3 leading-tight">
                  <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-current rotate-45 shrink-0" /> Awards & Certifications
                </h2>
                <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">My achievements and certificates</p>
              </div>
              {/* 2-col on mobile (newspaper recognitions), 3-col on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-3">
                {ACHIEVEMENTS.map((a, i) => (
                  <div
                    key={i}
                    className={`p-3 md:p-6 border-b border-r [&:last-child:nth-child(odd)]:col-span-2 [&:last-child:nth-child(odd)]:border-r-0 [&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:last-child:nth-child(odd)]:col-span-1 lg:[&:nth-child(-n+3)]:border-b lg:[&:nth-child(n+4)]:border-b-0 lg:border-r [&:nth-child(3n)]:lg:border-r-0 ${border} flex items-start gap-2 md:gap-4 ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors reveal-on-scroll reveal-hidden`}
                  >
                    <div className={`mt-0.5 p-1.5 md:p-2 rounded-lg ${t(dark, 'bg-zinc-800/80 text-[#ff6b6b] border border-red-500/20', 'bg-white text-[#a11d1d] border border-red-200')} shrink-0 hidden sm:block`}>
                      <a.icon size={22} strokeWidth={1.5} />
                    </div>

                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[9px] font-mono font-black uppercase tracking-widest mb-1 opacity-70">{a.date}</span>
                      <h3 className="text-sm md:text-[17px] font-serif font-black uppercase tracking-wide leading-tight">{a.title}</h3>
                      <p className={`text-xs md:text-xs font-serif mt-1.5 md:mt-2 leading-relaxed ${muted}`}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div id="education" className={`border-t ${border}`}>
              <div className={`px-5 py-4 border-b ${border} ${bgGold}`}>
                <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3 leading-tight">
                  <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-current rotate-45 shrink-0" /> Education
                </h2>
                <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">Academic Background</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {EDUCATION.map((edu, i) => (
                  <div key={i} className={`p-5 md:p-8 border-b md:border-b-0 border-r last:border-r-0 last:border-b-0 ${border} flex flex-col justify-between ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors group reveal-on-scroll reveal-hidden`}>
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${accentGold}`}>{edu.period}</span>
                        <span className={`px-2 py-0.5 text-[9px] font-mono font-bold border border-current opacity-70`}>{edu.badge}</span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-serif font-black uppercase tracking-wide mb-1 leading-tight group-hover:underline underline-offset-4 decoration-2 transition-colors">{edu.school}</h3>

                      <p className={`text-xs font-serif italic mb-3 ${muted}`}>{edu.location}</p>

                      <h4 className={`text-sm md:text-base font-serif font-bold ${edu.specialization ? 'pb-3 border-b ' + border : ''}`}>{edu.degree}</h4>
                    </div>

                    {edu.specialization && (
                      <p className="text-xs md:text-sm font-serif leading-relaxed mt-3 opacity-90">
                        <span className="font-bold">Specialization:</span> {edu.specialization}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SKILLS & INFO ── */}
          <section id="skills" className={`border-b ${border} reveal-on-scroll reveal-hidden`}>
            <div className={`px-5 py-4 border-b ${border} ${bgGold}`}>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3 leading-tight">
                <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-current rotate-45 shrink-0" /> Technical Skills
              </h2>
              <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">My core technologies and tools</p>
            </div>
            <TechnicalSkills dark={dark} border={border} />
          </section>

          {/* ── GITHUB CONTRIBUTIONS ── */}
          <section id="github" className={`border-b ${border} reveal-on-scroll reveal-hidden`}>
            <div className={`px-5 py-4 border-b ${border} ${bgGold}`}>
              <h2 className="text-xl sm:text-3xl md:text-4xl font-serif font-black uppercase tracking-wide flex items-center gap-2 sm:gap-3 leading-tight">
                <span className="inline-block w-2 h-2 sm:w-2.5 sm:h-2.5 bg-current rotate-45 shrink-0" /> GitHub Contributions
              </h2>
              <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">A look at my daily coding activity and projects over the past year</p>
            </div>

            <div className="p-4 md:p-6">
              <div
                className={`p-4 sm:p-6 border ${border} transition-all group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')}`}
              >
                <div className={`flex items-center justify-between gap-2 mb-3 pb-3 border-b border-dashed ${border}`}>
                  <span className="text-xs font-mono font-bold uppercase tracking-wider">@Hannahjamilla</span>
                  <a
                    href="https://github.com/Hannahjamilla"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`cursor-pointer inline-flex items-center gap-1 px-2.5 py-1 sm:px-3 sm:py-1 rounded text-[9.5px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border transition-all duration-200 shadow-xs hover:-translate-y-0.5 active:translate-y-0 group/btn ${t(dark, 'bg-[#2a241e] text-[#f5d089] border-[#665435] hover:bg-[#3d3329] hover:border-[#f5d089]', 'bg-[#f4efe4] text-[#7a591e] border-[#d4c5a9] hover:bg-[#eae2d0] hover:border-[#7a591e]')}`}
                  >
                    View Profile <ArrowUpRight size={12} className="transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>

                <div className="w-full flex justify-center py-2 overflow-hidden">
                  <img
                    src={`https://ghchart.rshah.org/${dark ? 'ff6b6b' : 'a11d1d'}/Hannahjamilla`}
                    alt="Hannah Jamilla's GitHub Contributions"
                    className={`w-full max-w-full h-auto object-contain ${dark ? 'opacity-90' : 'mix-blend-multiply opacity-95'} transition-opacity`}
                    loading="lazy"
                  />
                </div>

                <p className="font-serif italic text-xs mt-3 opacity-70 text-center">
                  A snapshot of my daily commits and contribution activity on GitHub.
                </p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className={`w-full py-6 px-6 sm:px-10 border-t ${border} flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest`}>
            <p className="flex items-center gap-3 opacity-60">
              <span className="w-2 h-2 bg-current rotate-45" />
              Thoughtfully designed. © {new Date().getFullYear()}
            </p>

            <div className="flex items-center gap-3">
              <p className="font-bold opacity-60">Built by Jaja Peralta</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="p-1.5 border border-current hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer group opacity-80 hover:opacity-100 flex items-center justify-center"
                title="Back to start"
                aria-label="Back to start"
              >
                <ArrowUp size={14} className="transition-transform group-hover:-translate-y-0.5" />
              </button>
            </div>
          </footer>
        </main>

        {lightbox && <Suspense fallback={<div />}><Lightbox {...lightbox} onClose={() => setLightbox(null)} /></Suspense>}
        {detailModal && <Suspense fallback={<div />}><DetailModal data={detailModal} onClose={() => setDetailModal(null)} /></Suspense>}
      </div>
    </ThemeCtx.Provider>
  )
}
