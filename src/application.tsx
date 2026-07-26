import { useEffect, useState, Suspense } from 'react'
import { ArrowUpRight, ArrowUp } from 'lucide-react'
import type { DetailData } from './types'
import { ThemeCtx, t } from './context/theme-context'
import { DetailModal, Lightbox } from './components/lazy-components'
import { QUESTS, ACHIEVEMENTS, XP_LOG, PERSONAL } from './data/constants'
import { TechnicalSkills } from './components/layout-helpers'

// Custom hook to get current time for newspaper header
const useDateString = () => {
  const [date, setDate] = useState('')
  useEffect(() => {
    const d = new Date();
    setDate(d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }))
  }, [])
  return date
}



export default function App() {
  const [dark, setDark] = useState(false)
  const [lightbox, setLightbox] = useState<any>(null)
  const [detailModal, setDetailModal] = useState<DetailData | null>(null)
  const [colorProfile, setColorProfile] = useState(false)
  const dateString = useDateString()

  const toggle = () => setDark(p => !p)

  // Authentic Newspaper Palette
  const bg = t(dark, 'bg-scrapbook-dark text-[#e0e0e0]', 'bg-scrapbook-light text-[#1c1813]')
  const border = t(dark, 'border-white/15', 'border-[#d0c9b8]')
  const borderDarker = t(dark, 'border-white/30', 'border-[#1c1813]')
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
  const accentIndigo = singleAccent
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

  return (
    <ThemeCtx.Provider value={{ dark, toggle }}>
      <div className={`min-h-screen w-full ${bg} transition-colors duration-700 flex flex-col items-center selection:bg-red-600/30 selection:text-current font-serif`}>

        <main role="main" className={`w-full max-w-[1120px] border-x-0 lg:border-x-[1px] border-b-[1px] ${borderDarker} mt-0 flex flex-col shadow-2xl ${t(dark, 'shadow-black/50 bg-[#161616]', 'shadow-black/5 bg-[#faf9f6]')}`}>

          {/* ── THE MASTHEAD ── */}
          <section id="profile" className={`flex flex-col border-b pointer-events-none ${border}`}>

            {/* Header Strip */}
            <div className={`flex items-center justify-between gap-3 sm:gap-4 md:gap-6 py-2 md:py-2.5 px-3 sm:px-6 md:px-10 border-b ${border} text-[9px] sm:text-[11px] md:text-xs font-mono uppercase tracking-wider md:tracking-widest font-black ${t(dark, 'bg-white/5 text-slate-350', 'bg-[#F2EBD9] text-[#5c5643]')}`}>
              <span className="whitespace-nowrap shrink-0">HanMade | Digital Archive</span>
              <span className="hidden lg:block whitespace-nowrap text-center truncate">Ideas, Code & Creations</span>
              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                <span className="hidden sm:inline whitespace-nowrap">{dateString}</span>
                <button 
                  onClick={toggle} 
                  className="pointer-events-auto border border-current px-2 py-0.5 text-[8px] sm:text-[10px] hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shrink-0 whitespace-nowrap font-bold"
                  title="Toggle Theme"
                >
                  {dark ? 'Day' : 'Night'} Edition
                </button>
              </div>
            </div>

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
              <h2 className="text-sm md:text-xl font-mono font-bold uppercase tracking-widest mb-3 opacity-90">Web Developer | Systems Analysis | AI & Process Improvement</h2>
              <p className={`text-sm md:text-lg font-serif italic max-w-2xl ${muted} leading-relaxed`}>
                Web developer with hands-on experience building modern applications. Passionate about crafting user-centered interfaces and developing practical features that help everyday users.
              </p>
            </div>
          </section>

          {/* ── FRONT PAGE — NEW LAYOUT ── */}
          <section className={`border-b ${border}`}>
            <div className="p-5 md:p-10">

              {/* Left Col: Photo */}
              {/* Photo component (floated on tablet/desktop) */}
              <div className="md:float-left md:w-[35%] md:mr-8 md:mb-4">
                {/* Mobile: newspaper side-by-side photo + caption */}
                <div className="flex gap-4 md:block">
                  <div className={`w-[40%] md:w-full aspect-[3/4] md:aspect-[4/5] relative border p-1 md:p-3 ${t(dark, 'bg-[#151722]/80 border-white/10', 'bg-[#F6EFE2] border-[#E2D8BF]')} shadow-sm md:shadow-lg rounded md:rounded-xl overflow-hidden flex-shrink-0`}>
                    <picture onClick={() => setColorProfile(p => !p)} className="cursor-pointer block relative z-10">
                      <source media="(max-width: 768px)" srcSet="/images/Hannah-casual4-small.webp" />
                      <img src="/images/Hannah-casual4.webp" className={`w-full h-full object-cover transition-all duration-[1s] hover:scale-[1.02] ${colorProfile ? 'grayscale-0 scale-[1.02]' : 'grayscale hover:grayscale-0'}`} alt="Hannah Jamilla Del Rosario Peralta" loading="lazy" />
                    </picture>
                  </div>
                  {/* Mobile-only bio blurb next to photo */}
                  <div className="flex-1 md:hidden flex flex-col justify-center">
                    <p className={`text-[10px] font-mono font-black uppercase tracking-widest mb-1.5 ${accentBurgundy}`}>About Me</p>
                    <h2 className="text-2xl font-serif font-black uppercase tracking-tight leading-none mb-2">Hello!</h2>
                    <p className="text-sm font-serif leading-relaxed opacity-95">
                      I'm Hannah. I build web applications that solve problems and improve user workflows.
                    </p>
                  </div>
                </div>
                <p className="text-[9px] font-serif italic mt-2 text-center opacity-60 hidden md:block">A recent photo of me at my desk.</p>
              </div>

              {/* Biography content wrapping around photo */}
              <div className="hidden md:block">
                  <h2 className={`text-3xl md:text-4xl font-serif font-black uppercase tracking-tight mb-4 ${accentBurgundy}`}>About Me</h2>
                  <div className={`font-serif text-base md:text-lg leading-relaxed space-y-4 ${t(dark, 'text-zinc-300', 'text-[#2b271d]')}`}>
                    <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:text-inherit">
                      I'm a Web Developer with experience building modern, responsive applications through internships and academic projects. I specialize in creating user-focused interfaces and developing practical features using React.js, Node.js, Laravel, and database systems.
                    </p>
                    <p>
                      My approach centers on building technology that serves real-world needs. I focus on designing intuitive user experiences and developing reliable backend systems that address practical business requirements.
                    </p>
                    <p>
                      I value clean, user-centered solutions and aim to continuously expand my technical skills while contributing effectively to development teams.
                    </p>
                  </div>
                  <a
                    href="https://ping-me-seven-vert.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest border px-4 py-2.5 w-fit transition-all hover:gap-3 ${t(dark, 'border-white/30 text-zinc-200 hover:bg-white hover:text-black', 'border-[#1c1813]/40 text-[#1c1813] hover:bg-[#1c1813] hover:text-[#F4F1EA]')}`}
                  >
                    Contact Me or Send an Inquiry ↗
                  </a>
                </div>

              {/* Clear floats so subsequent rows render underneath */}
              <div className="clear-both" />

              {/* Mobile-only additional biography blurb */}
              <div className={`md:hidden p-4 border-t ${border} -mx-5 -mb-5 mt-6 bg-black/[0.01] dark:bg-white/[0.01]`}>
                <p className={`font-serif text-sm leading-relaxed mb-4 ${t(dark, 'text-zinc-300', 'text-[#2b271d]')}`}>
                  Below you'll find my work and projects. I develop web applications focused on usability and practical solutions.
                </p>
                <a
                  href="https://ping-me-seven-vert.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest border px-3 py-2 transition-all ${t(dark, 'border-white/30 text-zinc-200 hover:bg-white hover:text-black', 'border-[#1c1813]/40 text-[#1c1813] hover:bg-[#1c1813] hover:text-[#F4F1EA]')}`}
                >
                  Contact Me ↗
                </a>
              </div>

            </div>

            {/* Links row */}
            <div className={`grid grid-cols-2 border-t ${border}`}>
              <a href="https://github.com/Hannahjamilla" target="_blank" className={`p-4 md:p-8 border-b-0 border-r ${border} ${t(dark, 'hover:bg-white/5 text-zinc-100', 'hover:bg-black/5 text-[#1c1813]')} transition-all group flex flex-col justify-center`}>
                <h3 className="font-serif font-black uppercase text-sm md:text-lg tracking-wide flex items-center gap-1">My GitHub <span className="transition-transform group-hover:translate-x-1">↗</span></h3>
                <p className="font-serif italic text-[10px] md:text-xs mt-1 opacity-80 group-hover:opacity-100">See all my code and side projects.</p>
              </a>
              <a href="mailto:hannahjamillap@gmail.com" className={`p-4 md:p-8 ${t(dark, 'hover:bg-white/5 text-zinc-100', 'hover:bg-black/5 text-[#1c1813]')} transition-all group flex flex-col justify-center`}>
                <h3 className="font-serif font-black uppercase text-sm md:text-lg tracking-wide flex items-center gap-1">Email Me <span className="transition-transform group-hover:translate-x-1">↗</span></h3>
                <p className="font-serif italic text-[10px] md:text-xs mt-1 opacity-80 group-hover:opacity-100">Get in touch for work or just to say hi.</p>
              </a>
            </div>

          </section>

          {/* ── PROFESSIONAL CHRONICLE (EXPERIENCE) ── */}
          <section id="experience" className={`border-b ${border}`}>
            <div className={`px-5 py-4 border-b ${border} ${bgTeal}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-wide flex items-center gap-3">
                <span className="inline-block w-3 h-3 bg-current rotate-45" /> Work Experience
              </h2>
            </div>

            {/* 1-col on mobile, 3-col on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-3">
              {XP_LOG.map((exp, i) => (
                <div key={i} className={`p-5 md:p-8 border-b md:border-b-0 md:border-r last:border-b-0 last:md:border-r-0 ${border} flex flex-col justify-between h-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors group`}>
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`w-2 h-2 ${accentTeal} bg-current rotate-45`} />
                        <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${accentTeal}`}>{exp.period}</span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-serif font-black uppercase tracking-wide mb-2 leading-tight transition-colors">{exp.place}</h3>
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

          {/* ── FEATURED STORIES (PROJECTS) ── */}
          <section id="projects" className={`border-b ${border}`}>
            <div className={`px-5 py-4 border-b ${border} ${bgBurgundy} flex flex-col md:flex-row items-baseline justify-between`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-wide flex items-center gap-3">
                <span className="inline-block w-3 h-3 bg-current rotate-45" /> Featured Projects
              </h2>
              <span className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-2 md:mt-0">Some things I've built</span>
            </div>

            {/* Lead Story — First project gets full-width hero treatment */}
            <div className={`border-b ${border} group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-all`}>
              {/* Mobile: text on top, image stacked below */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div 
                  onClick={() => setLightbox({ imgs: QUESTS[0].imgs, alt: QUESTS[0].title, wip: (QUESTS[0] as any).wip, desc: QUESTS[0].desc, tags: QUESTS[0].tags, link: QUESTS[0].link, role: QUESTS[0].role, status: QUESTS[0].status, period: QUESTS[0].period })} 
                  className={`p-4 md:p-10 lg:p-12 flex flex-col justify-center border-b lg:border-b-0 lg:border-r ${border} cursor-pointer`}
                >
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-[10px] font-mono uppercase tracking-widest font-black opacity-80">
                    {QUESTS[0].badge && (
                      <span className={`inline-block px-2 py-1 text-[9px] border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{QUESTS[0].badge}</span>
                    )}
                    <span className={accentBurgundy}>{QUESTS[0].role}</span>
                    <span>&bull;</span>
                    <span>{QUESTS[0].period}</span>
                  </div>
                  <h3 className="text-xl md:text-4xl lg:text-[44px] font-serif font-black uppercase tracking-wide mb-3 md:mb-5 group-hover:underline underline-offset-4 decoration-2 decoration-rose-455 leading-tight">{QUESTS[0].title}</h3>
                  <div className="font-serif text-sm md:text-base leading-relaxed opacity-95 space-y-4 text-inherit">
                    <p className="first-letter:text-5xl first-letter:font-black first-letter:mr-2 first-letter:float-left first-letter:text-inherit">
                      {QUESTS[0].desc[0]}
                    </p>
                    {QUESTS[0].desc.slice(1).map((d, j) => (
                      <p key={j}>{d}</p>
                    ))}
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mt-6">
                    {QUESTS[0].tags.map(tg => (
                      <span key={tg} className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${t(dark, 'bg-zinc-800 text-zinc-350 border border-zinc-700', 'bg-white text-zinc-700 border border-[#e2dcb6]')}`}>{tg}</span>
                    ))}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className={`flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest ${accentBurgundy} group-hover:translate-x-1 duration-300 transition-transform origin-left`}>
                      <ArrowUpRight size={14} /> See Details
                    </div>
                    {QUESTS[0].link && (
                      <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${accentBurgundy}`}>● Live</span>
                    )}
                  </div>
                </div>
                <div className="p-3 md:p-8 flex flex-col justify-center gap-6">
                  <div 
                    className="w-full flex justify-center cursor-pointer"
                    onClick={() => setLightbox({ imgs: QUESTS[0].imgs, alt: QUESTS[0].title, wip: (QUESTS[0] as any).wip, desc: QUESTS[0].desc, tags: QUESTS[0].tags, link: QUESTS[0].link, role: QUESTS[0].role, status: QUESTS[0].status, period: QUESTS[0].period })}
                  >
                    <img src={QUESTS[0].imgs[0]} className="max-w-full h-auto max-h-[320px] object-contain grayscale transition-transform duration-[2s] group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 rounded-md" loading="lazy" />
                  </div>
                  {QUESTS[0].imgs[1] && (
                    <div 
                      className="w-full flex justify-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightbox({ imgs: [QUESTS[0].imgs[1]], alt: `${QUESTS[0].title} - Certificate`, wip: false, desc: undefined, tags: undefined, link: undefined, role: undefined, status: undefined, period: undefined });
                      }}
                    >
                      <img src={QUESTS[0].imgs[1]} className="max-w-full h-auto max-h-[320px] object-contain grayscale transition-transform duration-[2s] group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 rounded-md" loading="lazy" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── MOBILE: Mixed Newspaper Hierarchy (hidden on md+) ── */}
            <div className="md:hidden">
              {/* Sub-headline: 2nd project gets prominent treatment */}
              <div 
                onClick={() => setLightbox({ imgs: QUESTS[1].imgs, alt: QUESTS[1].title, wip: (QUESTS[1] as any).wip, desc: QUESTS[1].desc, tags: QUESTS[1].tags, link: QUESTS[1].link, role: QUESTS[1].role, status: QUESTS[1].status, period: QUESTS[1].period })} 
                className={`flex gap-3 p-3 border-b ${border} group cursor-pointer ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors`}
              >
                <div className="w-[45%] shrink-0 aspect-[4/3] overflow-hidden rounded">
                  <img src={QUESTS[1].imgs[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 transition-all duration-500" loading="lazy" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    {QUESTS[1].badge && (
                      <div className="mb-2">
                         <span className={`inline-block px-1.5 py-0.5 text-[7px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{QUESTS[1].badge}</span>
                      </div>
                    )}
                    <span className={`text-[8px] font-mono font-black uppercase tracking-widest ${accentBurgundy}`}>{QUESTS[1].role} • {QUESTS[1].period}</span>
                    <h3 className="text-base font-serif font-black uppercase tracking-wide leading-tight mt-1 group-hover:underline">{QUESTS[1].title}</h3>
                    <p className="font-serif text-xs leading-relaxed opacity-80 mt-1 line-clamp-2">{QUESTS[1].desc[0]}</p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-2">
                    {QUESTS[1].tags.slice(0, 2).map(tg => (
                      <span key={tg} className={`px-1.5 py-0.5 rounded text-[7px] font-mono font-bold ${t(dark, 'bg-zinc-800 text-zinc-300', 'bg-white text-zinc-600 border border-zinc-200')}`}>{tg}</span>
                    ))}
                    {QUESTS[1].link && <span className={`ml-auto text-[8px] font-mono font-black ${accentBurgundy}`}>● Live</span>}
                  </div>
                </div>
              </div>

              {/* Compact 2-col briefs for remaining projects */}
              <div className="grid grid-cols-2">
                {QUESTS.slice(2).map((q, i) => (
                  <div 
                    key={i} 
                    onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })} 
                    className={`p-3 border-b border-r [&:nth-child(2n)]:border-r-0 ${border} group cursor-pointer ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors`}
                  >
                    <div className="aspect-[16/10] w-full overflow-hidden rounded mb-2">
                      <img src={q.imgs[0]} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 transition-all duration-500" loading="lazy" />
                    </div>
                    {q.badge && (
                      <div className="mb-1.5 mt-2">
                        <span className={`inline-block px-1.5 py-0.5 text-[6px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{q.badge}</span>
                      </div>
                    )}
                    <span className={`text-[7px] font-mono font-black uppercase tracking-widest opacity-60`}>{q.period}</span>
                    <h3 className="text-xs font-serif font-black uppercase tracking-wide leading-tight mt-0.5 group-hover:underline">{q.title}</h3>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-[8px] font-mono font-bold uppercase tracking-widest ${accentGold}`}>
                        <ArrowUpRight size={10} className="inline" /> Details
                      </span>
                      {q.link && <span className={`text-[8px] font-mono font-black ${accentBurgundy}`}>● Live</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── DESKTOP: Standard newspaper grids (hidden on mobile) ── */}
            {/* Secondary: 2-col */}
            <div className="hidden md:grid grid-cols-2 border-b border-inherit">
              {QUESTS.slice(1, 3).map((q, i) => (
                <div 
                  key={i} 
                  onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })} 
                  className={`p-8 border-r last:border-r-0 ${border} group cursor-pointer ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]') } transition-colors flex flex-col justify-between`}
                >
                  <div>
                    <div className={`aspect-[16/10] w-full relative overflow-hidden mb-6 p-2`}>
                      <img src={q.imgs[0]} className="w-full h-full object-contain grayscale transition-all duration-[2s] group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 rounded" loading="lazy" />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3 text-[9px] font-mono uppercase tracking-widest font-black opacity-80">
                      {q.badge && (
                        <span className={`inline-block px-2 py-1 text-[8px] font-mono font-black uppercase tracking-widest border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{q.badge}</span>
                      )}
                      <span className={accentIndigo}>{q.role}</span>
                      <span>&bull;</span>
                      <span>{q.period}</span>
                    </div>
                    <h3 className="text-2xl font-serif font-black uppercase tracking-wide mb-3 group-hover:underline underline-offset-4 decoration-2 leading-tight">{q.title}</h3>
                    <p className="font-serif text-sm leading-relaxed opacity-95">{q.desc[0]}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {q.tags.map(tg => (
                        <span key={tg} className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${t(dark, 'bg-zinc-805 text-zinc-300', 'bg-white text-zinc-650 border border-zinc-200')}`}>{tg}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`mt-6 pt-4 border-t ${border} flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest`}>
                    <div className={`flex items-center gap-2 ${accentIndigo} group-hover:translate-x-1 duration-300 transition-transform`}>
                      <ArrowUpRight size={12} /> Details
                    </div>
                    {q.link && <span className={`inline-flex items-center gap-1 ${accentBurgundy}`}>● Live</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Tertiary: 3-col on desktop */}
            <div className="hidden md:grid lg:grid-cols-3">
              {QUESTS.slice(3).map((q, i) => (
                <div 
                  key={i} 
                  onClick={() => setLightbox({ imgs: q.imgs, alt: q.title, wip: (q as any).wip, desc: q.desc, tags: q.tags, link: q.link, role: q.role, status: q.status, period: q.period })} 
                  className={`p-8 border-b lg:border-b-0 border-r lg:border-r last:lg:border-r-0 ${border} group cursor-pointer ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]') } transition-colors flex flex-col justify-between`}
                >
                  <div>
                    <div className={`aspect-[16/10] w-full relative overflow-hidden mb-6 p-1.5`}>
                      <img src={q.imgs[0]} className="w-full h-full object-contain grayscale transition-all duration-[2s] group-hover:scale-[1.03] group-hover:grayscale-0 group-active:grayscale-0 active:grayscale-0 rounded" loading="lazy" />
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3 text-[9px] font-mono uppercase tracking-widest font-black opacity-80">
                      {q.badge && (
                        <span className={`inline-block px-2 py-1 text-[8px] border border-current ${t(dark, 'bg-zinc-100 text-zinc-900', 'bg-[#1c1813] text-[#F4F1EA]')} leading-none`}>{q.badge}</span>
                      )}
                      <span className={accentGold}>{q.role}</span>
                      <span>&bull;</span>
                      <span>{q.period}</span>
                    </div>
                    <h3 className="text-xl font-serif font-black uppercase tracking-wide mb-3 group-hover:underline underline-offset-4 decoration-2 leading-tight">{q.title}</h3>
                    <p className="font-serif text-sm leading-relaxed opacity-95">{q.desc[0]}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {q.tags.map(tg => (
                        <span key={tg} className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${t(dark, 'bg-zinc-800 text-zinc-300', 'bg-white text-zinc-650 border border-zinc-200')}`}>{tg}</span>
                      ))}
                    </div>
                  </div>
                  <div className={`mt-6 pt-4 border-t ${border} flex justify-between items-center text-[10px] font-mono font-bold uppercase tracking-widest`}>
                    <div className={`flex items-center gap-2 ${accentGold} group-hover:translate-x-1 duration-300 transition-transform`}>
                      <ArrowUpRight size={12} /> Details
                    </div>
                    {q.link && <span className={`inline-flex items-center gap-1 ${accentBurgundy}`}>● Live</span>}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── CLASSIFIEDS & RECOGNITIONS — Stacked Full Width ── */}
          <section className={`border-b ${border}`}>

            {/* Personal Projects / Classifieds */}
            <div>
              <div className={`px-5 py-4 border-b ${border} ${bgIndigo}`}>
                <h2 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-wide flex items-center gap-3">
                  <span className="inline-block w-3 h-3 bg-current rotate-45" /> Other Projects
                </h2>
                <p className="text-[10px] font-mono font-black uppercase tracking-widest opacity-80 mt-1">Fun Side Projects & Sandbox Experiments</p>
              </div>
              {/* 2-col on mobile, 6-col sub-grid on desktop → 3 per row, last 2 centered */}
              <div className="grid grid-cols-2 lg:grid-cols-6">
                {PERSONAL.map((p, i) => (
                  <div 
                    key={i} 
                    className={`p-3 md:p-6 border-b border-r [&:nth-child(2n)]:border-r-0 lg:col-span-2 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0 last:border-r-0 [&:last-child:nth-child(odd)]:col-span-2 ${i === 3 ? 'lg:col-start-2' : ''} ${border} flex flex-col justify-between cursor-pointer group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors`} 
                    onClick={() => setLightbox({ imgs: p.imgs, alt: p.title, wip: p.wip, desc: p.desc, tags: p.tags, link: p.link, role: p.role, period: p.period, status: p.status })}
                  >
                    <div>
                      <div className={`w-full h-[110px] lg:h-auto lg:aspect-[16/10] p-1.5 mb-4 overflow-hidden relative flex items-center justify-center`}>
                        <img src={p.imgs[0]} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 rounded" loading="lazy" />
                      </div>
                      
                      <div className="flex items-center gap-3 mb-2 text-[9px] font-mono font-bold uppercase tracking-widest opacity-70">
                        <span className={accentIndigo}>{p.role}</span>
                        {p.period && <><span>&bull;</span><span>{p.period}</span></>}
                      </div>
                      
                      <h3 className="text-sm md:text-lg font-serif font-black uppercase tracking-wide mb-1.5 md:mb-2 leading-tight group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors">{p.title}</h3>
                      
                      <p className={`text-xs md:text-sm font-serif leading-relaxed flex-1 ${muted}`}>{p.desc[0]}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-dashed border-inherit">
                      <div className="flex flex-wrap gap-1">
                        {p.tags.slice(0, 2).map(t => (
                          <span key={t} className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-bold ${dark ? 'bg-zinc-800 text-zinc-350' : 'bg-white text-zinc-650'}`}>{t}</span>
                        ))}
                      </div>
                      {p.wip ? (
                        <span className={`inline-flex items-center gap-1 text-[9px] font-mono font-black uppercase tracking-widest ${accentTeal}`}>● WIP</span>
                      ) : p.link ? (
                        <a
                          href={p.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={e => e.stopPropagation()}
                          className={`inline-flex items-center gap-1 text-[9px] font-mono font-black uppercase tracking-widest hover:underline underline-offset-2 ${accentBurgundy}`}
                        >● Live</a>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Certifications */}
            <div className={`border-t ${border}`}>
              <div className={`px-5 py-4 border-b ${border} ${bgGold}`}>
                <h2 className="text-3xl md:text-4xl font-serif font-black uppercase tracking-wide flex items-center gap-3">
                  <span className="inline-block w-3 h-3 bg-current rotate-45" /> Awards & Certifications
                </h2>
                <p className="text-[10px] font-mono font-bold uppercase tracking-widest opacity-80 mt-1">My achievements and certificates</p>
              </div>
              {/* 2-col on mobile (newspaper recognitions), 3-col on desktop */}
              <div className="grid grid-cols-2 lg:grid-cols-3">
                {ACHIEVEMENTS.map((a, i) => (
                  <div 
                    key={i} 
                    className={`p-3 md:p-6 border-b border-r [&:last-child:nth-child(odd)]:col-span-2 [&:last-child:nth-child(odd)]:border-r-0 [&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:last-child:nth-child(odd)]:col-span-1 lg:border-b-0 lg:border-r [&:nth-child(3n)]:lg:border-r-0 ${border} flex items-start gap-2 md:gap-4 cursor-pointer group ${t(dark, 'hover:bg-[#202020]', 'hover:bg-[#ebe5d5]')} transition-colors`} 
                    onClick={() => setDetailModal({ title: a.title, date: a.date, desc: a.desc })}
                  >
                    <div className={`mt-0.5 p-1.5 md:p-2 rounded-lg ${t(dark, 'bg-zinc-800/80 text-[#ff6b6b] border border-red-500/20', 'bg-white text-[#a11d1d] border border-red-200')} shrink-0 group-hover:scale-[1.05] transition-transform hidden sm:block`}>
                      <a.icon size={22} strokeWidth={1.5} />
                    </div>
                    
                    <div className="flex flex-col justify-center min-w-0">
                      <span className="text-[9px] font-mono font-black uppercase tracking-widest mb-1 opacity-70">{a.date}</span>
                      <h3 className="text-sm md:text-[17px] font-serif font-black uppercase tracking-wide leading-tight group-hover:text-[#a11d1d] dark:group-hover:text-[#ff6b6b] transition-colors">{a.title}</h3>
                      <p className={`text-xs md:text-xs font-serif mt-1.5 md:mt-2 leading-relaxed ${muted} line-clamp-2 md:line-clamp-3`}>{a.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── SKILLS & INFO ── */}
          <section id="skills" className={`border-b-0`}>
            <div className={`px-5 py-4 border-b ${border} bg-black/5 dark:bg-white/5`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-black uppercase tracking-wide flex items-center gap-3">
                <span className="inline-block w-3 h-3 bg-current rotate-45" /> Skills
              </h2>
            </div>
            <div className="p-6 md:p-8 xl:p-10 relative overflow-hidden bg-black/5 dark:bg-white/5">
              <TechnicalSkills dark={dark} border={border} />
            </div>
          </section>

          {/* FOOTER */}
          <footer className={`w-full py-6 px-6 sm:px-10 border-t ${border} flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] uppercase tracking-widest`}>
            <p className="flex items-center gap-3 opacity-60">
              <span className="w-2 h-2 bg-current rotate-45" />
              Printed Locally. Copyright © {new Date().getFullYear()}
            </p>

            <div className="flex items-center gap-3">
              <p className="font-bold opacity-60">Built by Hannah Peralta</p>
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
