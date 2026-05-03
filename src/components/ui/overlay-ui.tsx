import { useEffect } from 'react'
import type { Section } from '../../application'

interface OverlayProps {
  section: Section
  setSection: (s: Section) => void
  isDarkMode: boolean
  setIsDarkMode: (v: boolean) => void
}

const SECTIONS: Section[] = ['home', 'experience', 'academic', 'personal', 'skills']

export default function OverlayUi({ section, setSection, isDarkMode, setIsDarkMode }: OverlayProps) {
  
  const textColor = isDarkMode ? '#f0f0f0' : '#1a1a1a'

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-area')
    if (!scrollContainer) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSection(entry.target.id as Section)
          }
        })
      },
      { root: scrollContainer, threshold: 0.5 }
    )

    SECTIONS.forEach((s) => {
      const el = document.getElementById(s)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [setSection])

  return (
    <div className="w-full flex flex-col md:flex-row font-poppins pointer-events-none transition-colors duration-1000" style={{ color: textColor }}>
      
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:flex w-1/4 h-screen p-16 flex-col justify-between pointer-events-auto border-r border-white/5 fixed left-0">
        <div className="animate-in fade-in slide-in-from-top-8 duration-1000">
          <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-2">Hannah Peralta.</h1>
          <p className="text-[9px] tracking-[0.4em] uppercase opacity-30 font-bold">Project Hub // 2026</p>
        </div>

        <nav className="flex flex-col gap-8">
          {SECTIONS.map((s, i) => (
            <button 
              key={s} 
              onClick={() => scrollTo(s)}
              className={`group flex items-center gap-6 text-[10px] text-left tracking-[0.5em] uppercase transition-all duration-300 hover:opacity-100 ${section === s ? 'opacity-100 font-black' : 'opacity-20'}`}
            >
              <span className="text-[8px] font-black opacity-20">0{i + 1}</span>
              <span className={`${section === s ? 'font-black translate-x-4' : 'group-hover:translate-x-2'} transition-transform`}>{s}</span>
            </button>
          ))}
        </nav>

        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="flex items-center gap-4 group w-fit"
        >
          <div className={`w-8 h-4 rounded-full relative transition-colors duration-500 border ${isDarkMode ? 'bg-white/10 border-white/10' : 'bg-black/5 border-black/10'}`}>
            <div className={`absolute top-1 w-2 h-2 rounded-full transition-all duration-500 ${isDarkMode ? 'left-5 bg-white' : 'left-1 bg-black'}`} />
          </div>
          <span className="text-[8px] font-bold uppercase tracking-widest opacity-20">Mode</span>
        </button>
      </aside>

      {/* Right Column Content - Becomes TikTok Full-Screen Snap on Mobile */}
      <main className="w-full md:w-3/4 md:ml-[25%] min-h-screen">
        
        {/* Mobile HUD Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none flex flex-col justify-between p-6 md:hidden">
           <div className="flex justify-between items-start pt-4">
              <div className="bg-current/5 p-2 rounded-lg backdrop-blur-sm">
                <h1 className="text-[10px] font-black uppercase tracking-widest">H. Peralta</h1>
                <p className="text-[7px] opacity-40 uppercase font-black tracking-[0.3em]">Work Archive</p>
              </div>
              <button onClick={() => setIsDarkMode(!isDarkMode)} className="pointer-events-auto opacity-50 bg-current/5 px-4 py-2 rounded-full backdrop-blur-sm text-[8px] font-black uppercase">
                {isDarkMode ? 'Lunar' : 'Solar'}
              </button>
           </div>

           <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-6 pointer-events-auto">
              {SECTIONS.map((s, i) => (
                <button 
                  key={s} 
                  onClick={() => scrollTo(s)}
                  className="flex flex-col items-center gap-1"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${section === s ? 'bg-white/20 border-white/40' : 'bg-black/20 border-white/10'}`}>
                    <span className="text-[8px] font-black opacity-60">{i + 1}</span>
                  </div>
                </button>
              ))}
           </div>
        </div>

        {/* Sections */}
        <div className="flex flex-col w-full">
          {SECTIONS.map((s) => (
            <section 
              key={s} 
              id={s} 
              className="h-screen w-full snap-start snap-always relative flex flex-col justify-center p-8 pr-16 md:p-24 overflow-hidden"
            >
              <div className="relative z-10 w-full max-w-2xl pointer-events-auto pt-20 md:pt-0 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                {s === 'home' && (
                  <>
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-lg">
                       <img src="/images/hannah-formal.webp" alt="P" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8] mb-8">Creative <br /> Developer.</h2>
                    <p className="text-[10px] md:text-sm uppercase tracking-[0.4em] opacity-30 leading-relaxed max-w-sm mb-6">
                      I build clean, modern digital tools for mobile and web. Simple. Clean. Minimal.
                    </p>
                    <p className="text-[10px] md:text-xs uppercase tracking-tight opacity-20 max-w-md">
                      I help businesses make apps that are easy to use. I focus on making things look good and work fast.
                    </p>
                  </>
                )}

                {s === 'experience' && (
                  <div className="space-y-8 md:space-y-12">
                    <span className="text-[10px] font-black uppercase tracking-[1em] opacity-20 block mb-4">Work History</span>
                    <ExperienceItem 
                      title="Lightweight Solutions" 
                      role="Full-Stack Developer | Internship 2" 
                      date="March – May 2026" 
                      text="Working on a modern SaaS project using React and Python. Building scalable full-stack features and high-performance digital solutions."
                    />
                    <ExperienceItem 
                      title="Creciendo Philippines" 
                      role="Web Developer | Internship 1" 
                      date="Nov 2025 – Feb 2026" 
                      text="Developed backend systems with Express.js and MongoDB. Optimized APIs for 400+ hours of performance-focused development."
                    />
                    <ExperienceItem 
                      title="AWS Cloud Clubs" 
                      role="Skill Development Office" 
                      date="Mar 2025 – Present" 
                      text="Facilitating cloud-focused workshops and learning sessions for IT students at National University."
                    />
                    <ExperienceItem 
                      title="Executive Secretary's Office" 
                      role="Core Team Member" 
                      date="2023–2024" 
                      text="Managed student group communications and organized key campus events."
                    />
                  </div>
                )}

                {s === 'academic' && (
                  <div className="space-y-8 md:space-y-12 h-full overflow-y-auto scrollbar-hide">
                    <span className="text-[10px] font-black uppercase tracking-[1em] opacity-20 block mb-4">Academic Archives</span>
                    <div className="grid grid-cols-2 gap-4 md:gap-8">
                       <ProjectItem 
                        title="BaryoConnect" 
                        sub="IRCITE 2025" 
                        img="/images/16.webp" 
                        text="Project Manager & Paper Presenter at IRCITE 2025. Focused on community engagement and local governance."
                        tags={['Flutter', 'Firebase']}
                       />
                       <ProjectItem 
                        title="DialiEase" 
                        sub="Capstone Project" 
                        img="/images/11.webp" 
                        text="Digital monitoring for home-based dialysis. Specialization in mobile and web app development."
                        tags={['React.js', 'Laravel', 'Google Cloud']}
                       />
                       <ProjectItem 
                        title="Event Ecosystem" 
                        sub="Published Research" 
                        img="/images/paper.webp" 
                        text="Unified venue rental system with billing and payments. Officially published academic research."
                        tags={['Billing', 'Inventory']}
                       />
                       <ProjectItem 
                        title="Drug Store POS" 
                        sub="Business App" 
                        img="/images/POS2.webp" 
                        text="Business system for pharmacies to track sales and manage medicine stock."
                        tags={['PHP', 'MySQL']}
                       />
                       <ProjectItem 
                        title="Tutorial Center" 
                        sub="Learning Tool" 
                        img="/images/tutorial.webp" 
                        text="Online school platform where students can track their learning progress."
                        tags={['PHP', 'MySQL']}
                       />
                       <ProjectItem 
                        title="IRCITE Certificate" 
                        sub="Certification" 
                        img="/images/Ircite.webp" 
                        text="Certificate for participation and paper presentation at the IRCITE 2025 International Research Conference."
                        tags={['Research', 'Presentation']}
                       />
                    </div>
                  </div>
                )}

                {s === 'personal' && (
                  <div className="space-y-8">
                    <span className="text-[10px] font-black uppercase tracking-[1em] opacity-20 block mb-8">Personal Works</span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <LinkItem title="PingMe" link="https://ping-me-seven-vert.vercel.app/" text="A simple chat app for friends." img="/images/PingMe.webp" />
                      <LinkItem title="Goosebumps" link="https://hello-world-gamma-plum.vercel.app/" text="A cool text experience." img="/images/Hello word - goosebumps.webp" />
                      <LinkItem title="Star Alert!" link="https://happy-b-day-murex.vercel.app/" text="A digital gift for birthdays." img="/images/Birthday - Star Alert!.webp" />
                    </div>
                  </div>
                )}

                {s === 'skills' && (
                  <div className="grid grid-cols-2 gap-12 md:gap-24">
                    <SkillBlock title="Tools" items={['React', 'Node.js', 'Python', 'AWS', 'Database', 'Git']} />
                    <SkillBlock title="Extras" items={['App Design', 'Problem Solving', 'Team Work', 'Clean Code']} />
                  </div>
                )}
              </div>
            </section>
          ))}
        </div>

      </main>
    </div>
  )
}

function ExperienceItem({ title, role, date, text }: { title: string, role: string, date: string, text: string }) {
  return (
    <div className="group border-l border-white/10 pl-6">
      <h3 className="text-xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-2">{title}</h3>
      <p className="text-[9px] md:text-xs uppercase tracking-widest opacity-50 font-black mb-2">{role} // {date}</p>
      <p className="text-[9px] md:text-xs uppercase tracking-tight opacity-30 max-w-sm">{text}</p>
    </div>
  )
}

function ProjectItem({ title, sub, img, text, tags }: { title: string, sub: string, img: string, text: string, tags?: string[] }) {
  return (
    <div className="group space-y-2">
      <div className="w-full aspect-video rounded-xl overflow-hidden border border-white/10 shadow-md">
        <img src={img} alt={title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
      </div>
      <div>
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-xs md:text-xl font-black uppercase tracking-tighter leading-none">{title}</h3>
        </div>
        <p className="text-[7px] md:text-[10px] uppercase tracking-widest opacity-40 font-black mb-1">{sub}</p>
        <p className="text-[7px] md:text-[10px] uppercase tracking-tight opacity-20 leading-tight mb-2">{text}</p>
        {tags && (
          <div className="flex flex-wrap gap-1">
            {tags.map(t => <span key={t} className="px-1.5 py-0.5 border border-white/5 rounded-full text-[6px] font-black uppercase opacity-30">{t}</span>)}
          </div>
        )}
      </div>
    </div>
  )
}

function LinkItem({ title, link, text, img }: { title: string, link: string, text: string, img: string }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className="p-4 md:p-8 border border-white/5 rounded-2xl hover:bg-white/[0.02] transition-all group block shadow-sm relative overflow-hidden">
      <div className="flex gap-4 items-center mb-4">
        <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-white/5">
           <img src={img} alt={title} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className="text-lg md:text-2xl font-black uppercase tracking-tighter">{title}</h4>
          <p className="text-[8px] md:text-[10px] uppercase tracking-widest opacity-30">{text}</p>
        </div>
      </div>
      <div className="w-full h-[1px] bg-current opacity-10" />
    </a>
  )
}

function SkillBlock({ title, items }: { title: string, items: string[] }) {
  return (
    <div>
      <h4 className="text-[9px] md:text-[10px] tracking-[0.4em] opacity-30 uppercase font-black mb-6">{title}</h4>
      <div className="space-y-3">
        {items.map(i => <p key={i} className="text-[10px] md:text-sm font-black uppercase tracking-tight opacity-50">{i}</p>)}
      </div>
    </div>
  )
}
