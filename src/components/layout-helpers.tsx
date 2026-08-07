import React from 'react'
import { Code2, Database, FileCheck, Briefcase, Sparkles } from 'lucide-react'

// Layout Helpers for Newspaper Theme

/* ── Tiny inline SVG icons for individual skills ── */
const S = 10 // icon size
const sv = { width: S, height: S, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, className: 'shrink-0 opacity-70', style: { minWidth: S } }

const skillIcons: Record<string, React.ReactElement> = {
  // ── Programming ──
  'HTML5':          <svg {...sv}><path d="M4 2l1.6 18L12 22l6.4-2L20 2z"/><path d="M8 7h8l-.5 5H9.5"/></svg>,
  'CSS3':           <svg {...sv}><path d="M4 2l1.6 18L12 22l6.4-2L20 2z"/><path d="M8 9h8M8.5 13h7"/></svg>,
  'JavaScript':     <svg {...sv}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V9m6 0c-2 0-3 1-3 2.5S13 14 15 14s3 1.5 3 2.5S17 19 15 19"/></svg>,
  'React.js':       <svg {...sv}><circle cx="12" cy="12" r="2"/><ellipse cx="12" cy="12" rx="9" ry="4"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="9" ry="4" transform="rotate(120 12 12)"/></svg>,
  'Flutter (Dart)': <svg {...sv}><path d="M14 2l-8 8 4 4 12-12z"/><path d="M14 12l-4 4 4 4 8-8z"/></svg>,
  'Node.js':        <svg {...sv}><path d="M12 2L3 7v10l9 5 9-5V7z"/><path d="M12 12V2m0 10l9-5m-9 5l-9-5"/></svg>,
  'Express.js':     <svg {...sv}><path d="M4 17l4-4-4-4"/><path d="M12 19h8"/></svg>,
  'PHP':            <svg {...sv}><ellipse cx="12" cy="12" rx="10" ry="7"/><path d="M7 12h3l1-4m3 4h3l1-4"/></svg>,
  'Laravel':        <svg {...sv}><path d="M3 7l4-3 5 3 5-3 4 3v10l-4 3-5-3-5 3-3-3z"/></svg>,
  'Python':         <svg {...sv}><path d="M12 2C8 2 7 4 7 5v3h5v1H5c-2 0-3 2-3 4s1 4 3 4h2v-3c0-1 1-2 2-2h6c1 0 2-1 2-2V5c0-1-1-3-5-3z"/><path d="M12 22c4 0 5-2 5-3v-3h-5v-1h7c2 0 3-2 3-4s-1-4-3-4h-2v3c0 1-1 2-2 2H9c-1 0-2 1-2 2v5c0 1 1 3 5 3z"/><circle cx="9.5" cy="5.5" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="18.5" r="1" fill="currentColor" stroke="none"/></svg>,

  // ── Databases & Tools ──
  'MongoDB':        <svg {...sv}><path d="M12 2v20"/><path d="M12 2c-3 4-6 6-6 10a6 6 0 0012 0c0-4-3-6-6-10z"/></svg>,
  'MySQL':          <svg {...sv}><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/></svg>,
  'PostgreSQL':     <svg {...sv}><ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6"/><path d="M20 12c0 1.7-3.6 3-8 3s-8-1.3-8-3"/></svg>,
  'Firebase':       <svg {...sv}><path d="M4 20L8 4l4 8-4 4z"/><path d="M8 16l4-4 8 8H4z"/></svg>,
  'Git':            <svg {...sv}><circle cx="12" cy="12" r="3"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><path d="M14.5 9.5l2.5-2.5m-10 10l2.5-2.5"/></svg>,
  'GitHub':         <svg {...sv}><path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.7C6.7 20 6.1 18 6.1 18c-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.8.8.1-.7.3-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 015 0c2-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0022 12c0-5.5-4.5-10-10-10z" fill="currentColor" stroke="none"/></svg>,
  'VS Code':        <svg {...sv}><path d="M17 2l4 3v14l-4 3-9-7L4 18l-2-1.5v-9L4 6l4 3z"/></svg>,
  'Jira':           <svg {...sv}><path d="M12 2l10 10-10 10L2 12z"/><circle cx="12" cy="12" r="2"/></svg>,
  'Figma':          <svg {...sv}><rect x="8" y="2" width="8" height="6" rx="3"/><rect x="8" y="8" width="8" height="6" rx="3"/><rect x="8" y="14" width="4" height="6" rx="3"/><circle cx="16" cy="11" r="3"/></svg>,
  'Vercel':         <svg {...sv}><path d="M12 3l10 18H2z" fill="currentColor" stroke="none"/></svg>,

  // ── Testing & Documentation ──
  'Manual Testing':           <svg {...sv}><path d="M9 11l3 3 5-5"/><rect x="3" y="3" width="18" height="18" rx="2"/></svg>,
  'API Testing':              <svg {...sv}><path d="M4 6h16M4 12h16M4 18h10"/><circle cx="20" cy="18" r="2"/></svg>,
  'Functional Testing':       <svg {...sv}><path d="M4 4h16v16H4z"/><path d="M9 9l3 3 3-3"/></svg>,
  'RESTful APIs':             <svg {...sv}><path d="M4 12h16"/><circle cx="4" cy="12" r="2"/><circle cx="20" cy="12" r="2"/><path d="M12 4v16"/></svg>,
  'Postman':                  <svg {...sv}><path d="M4 4l7 7m2 2l7 7"/><circle cx="12" cy="12" r="9"/></svg>,
  'UAT':                      <svg {...sv}><path d="M16 4l4 4-10 10-4-4z"/><path d="M4 20l2-6"/></svg>,
  'Technical Documentation':  <svg {...sv}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M8 6h8M8 10h8M8 14h4"/></svg>,

  // ── Professional ──
  'SDLC':                     <svg {...sv}><circle cx="12" cy="12" r="9"/><path d="M12 3v4m0 10v4M3 12h4m10 0h4"/></svg>,
  'Requirements Gathering':   <svg {...sv}><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 8h8M8 12h5M8 16h8"/></svg>,
  'Project Coordination':     <svg {...sv}><circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><path d="M12 8v3m-5 5l3-4m7 4l-3-4"/></svg>,
  'Problem Solving':          <svg {...sv}><circle cx="11" cy="11" r="7"/><path d="M17 17l4 4"/></svg>,
  'Communication':            <svg {...sv}><path d="M21 12c0 4.4-4 8-9 8-1.6 0-3-.3-4.3-.9L3 21l1.9-4.7C3.7 15 3 13.1 3 11c0-4.4 4-8 9-8s9 3.6 9 8z"/></svg>,
  'Collaboration':            <svg {...sv}><circle cx="8" cy="8" r="4"/><circle cx="16" cy="8" r="4"/><path d="M4 20c0-3 2-5 5-5h6c3 0 5 2 5 5"/></svg>,

  // ── AI Tools ──
  'ChatGPT':        <svg {...sv}><path d="M12 2a10 10 0 100 20 10 10 0 000-20z"/><path d="M8 12h8M12 8v8"/></svg>,
  'Claude':         <svg {...sv}><path d="M12 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z"/><path d="M9 9l3 6 3-6"/></svg>,
  'Cursor':         <svg {...sv}><path d="M5 3l14 9-6 2-3 7z"/></svg>,
  'Gemini':         <svg {...sv}><path d="M12 2c-3 5-5 7-10 10 5 3 7 5 10 10 3-5 5-7 10-10-5-3-7-5-10-10z"/></svg>,
  'Perplexity AI':  <svg {...sv}><circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/><path d="M5.6 5.6l12.8 12.8M5.6 18.4L18.4 5.6"/></svg>,
}

export function ThemeToggle({ dark, toggle }: { dark: boolean, toggle: () => void }) {
  return (
    <div className="shrink-0 ml-1 sm:ml-2 mt-[3px]">
      <style>{`
        .theme-switch {
          font-size: 11px;
          position: relative;
          display: inline-block;
          width: 4em;
          height: 2.2em;
          border-radius: 30px;
          box-shadow: 0 0 8px rgba(28, 24, 19, 0.15);
        }
        @media (min-width: 640px) {
          .theme-switch {
            font-size: 14px;
          }
        }
        .theme-switch input {
          opacity: 0;
          width: 0;
          height: 0;
          position: absolute;
        }

        .theme-slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #1c1813;
          transition: 0.4s;
          border-radius: 30px;
          overflow: hidden;
        }

        .theme-slider:before {
          position: absolute;
          content: "";
          height: 1.2em;
          width: 1.2em;
          border-radius: 50%;
          left: 0.5em;
          bottom: 0.5em;
          transition: 0.4s;
          transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
          box-shadow: inset 8px -4px 0px 0px #F4F1EA;
        }

        .theme-switch input:checked + .theme-slider {
          background-color: #d4c5a9;
        }

        .theme-switch input:checked + .theme-slider:before {
          transform: translateX(1.8em);
          box-shadow: inset 15px -4px 0px 15px #c0841d;
        }

        .theme-star {
          background-color: #F4F1EA;
          border-radius: 50%;
          position: absolute;
          width: 3px;
          height: 3px;
          transition: all 0.4s;
        }
        @media (min-width: 640px) {
          .theme-star { width: 4px; height: 4px; }
        }

        .theme-star_1 {
          left: 2.5em;
          top: 0.5em;
        }

        .theme-star_2 {
          left: 2.2em;
          top: 1.2em;
        }

        .theme-star_3 {
          left: 3em;
          top: 0.9em;
        }

        .theme-switch input:checked ~ .theme-slider .theme-star {
          opacity: 0;
        }

        .theme-cloud {
          width: 3.5em;
          position: absolute;
          bottom: -1.2em;
          left: -1.1em;
          opacity: 0;
          transition: all 0.4s;
        }

        .theme-switch input:checked ~ .theme-slider .theme-cloud {
          opacity: 1;
        }
      `}</style>
      <label className="theme-switch" title="Toggle Theme">
        <input checked={!dark} onChange={toggle} type="checkbox" />
        <span className="theme-slider">
          <div className="theme-star theme-star_1" />
          <div className="theme-star theme-star_2" />
          <div className="theme-star theme-star_3" />
          <svg viewBox="0 0 16 16" className="theme-cloud_1 theme-cloud">
            <path transform="matrix(.77976 0 0 .78395-299.99-418.63)" fill="#fff" d="m391.84 540.91c-.421-.329-.949-.524-1.523-.524-1.351 0-2.451 1.084-2.485 2.435-1.395.526-2.388 1.88-2.388 3.466 0 1.874 1.385 3.423 3.182 3.667v.034h12.73v-.006c1.775-.104 3.182-1.584 3.182-3.395 0-1.747-1.309-3.186-2.994-3.379.007-.106.011-.214.011-.322 0-2.707-2.271-4.901-5.072-4.901-2.073 0-3.856 1.202-4.643 2.925" />
          </svg>
        </span>
      </label>
    </div>
  )
}

export function TopNav({ dark, toggle, border }: { dark: boolean, toggle: () => void, border: string }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-4 sm:px-6 py-4 md:px-12 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b ${border}`}>
      <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6 text-[8px] sm:text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest">
        <a href="#profile" className="hover:underline underline-offset-4 decoration-2 cursor-pointer">Home</a>
        <a href="#experience" className="hover:underline underline-offset-4 decoration-2 cursor-pointer">Work</a>
        <a href="#education" className="hover:underline underline-offset-4 decoration-2 cursor-pointer">Education</a>
        <a href="#projects" className="hover:underline underline-offset-4 decoration-2 cursor-pointer">Projects</a>
        <ThemeToggle dark={dark} toggle={toggle} />
      </div>
    </nav>
  )
}

const skillsData = [
  {
    group: "Programming",
    icon: Code2,
    items: ["HTML5", "CSS3", "JavaScript", "React.js", "Flutter (Dart)", "Node.js", "Express.js", "PHP", "Laravel", "Python"]
  },
  {
    group: "Databases & Tools",
    icon: Database,
    items: ["MongoDB", "MySQL", "PostgreSQL", "Firebase", "Git", "GitHub", "VS Code", "Jira", "Figma", "Vercel"]
  },
  {
    group: "Testing & Docs",
    icon: FileCheck,
    items: ["Manual Testing", "API Testing", "Functional Testing", "RESTful APIs", "Postman", "UAT", "Technical Documentation"]
  },
  {
    group: "Professional",
    icon: Briefcase,
    items: ["SDLC", "Requirements Gathering", "Project Coordination", "Problem Solving", "Communication", "Collaboration"]
  },
  {
    group: "AI Tools",
    icon: Sparkles,
    items: ["ChatGPT", "Claude", "Cursor", "Gemini", "Perplexity AI"]
  },
]

export function TechnicalSkills({ dark, border = 'border-[#d0c9b8] dark:border-zinc-800' }: { border?: string, dark: boolean }) {
  const hoverCls = dark ? 'hover:bg-[#202020] text-zinc-200' : 'hover:bg-[#ebe5d5] text-[#1c1813]'
  const cardBase = `p-3 sm:p-4 md:p-6 flex flex-col sm:flex-row items-start gap-1.5 sm:gap-3 md:gap-4 group transition-colors h-full ${hoverCls}`

  const cardContent = (s: typeof skillsData[0]) => (
    <>
      <div className={`hidden md:block p-1 sm:p-2 rounded-md ${dark
          ? 'bg-zinc-800/80 text-[#ff6b6b] border border-red-500/20'
          : 'bg-white text-[#a11d1d] border border-red-200'
        } shrink-0 group-hover:scale-[1.05] transition-transform mt-0.5`}>
        <s.icon size={14} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col min-w-0 flex-1 w-full">
        <h3 className={`text-[10.5px] sm:text-[13px] lg:text-[15px] font-serif font-black uppercase tracking-wide group-hover:text-[#a11d1d] dark:group-hover:text-[#ff6b6b] transition-colors leading-tight pb-1.5 sm:pb-2 mb-2 sm:mb-2.5 border-b border-dashed ${dark ? 'border-white/20' : 'border-[#1c1813]/25'}`}>
          {s.group}
        </h3>
        <div className="flex flex-wrap gap-1 sm:gap-1.5">
          {s.items.map((item, idx) => (
            <span key={idx} className={`inline-flex items-center gap-1 px-1.5 sm:px-2 py-[2px] sm:py-0.5 rounded-[3px] text-[7.5px] sm:text-[9px] font-mono border transition-all duration-200 shadow-sm hover:shadow-md ${dark
                ? 'border-zinc-700/50 bg-[#1c1c1c] text-zinc-300 group-hover:border-[#ff6b6b]/40'
                : 'border-[#d0c9b8] bg-[#FAF6EC] text-[#2b271d] group-hover:border-[#a11d1d]/40'
              }`}>
              {skillIcons[item] && skillIcons[item]}
              {item}
            </span>
          ))}
        </div>
      </div>
    </>
  )

  return (
    <div>
      {/* Mobile & Small screens (< md): 2-column newspaper grid layout */}
      <div className="md:hidden grid grid-cols-2">
        {skillsData.map((s, i) => (
          <div
            key={i}
            className={`${cardBase} ${border} border-b ${i % 2 === 0 ? 'border-r' : ''} ${
              i === skillsData.length - 1 && skillsData.length % 2 !== 0 ? 'col-span-2 border-r-0' : ''
            }`}
          >
            {cardContent(s)}
          </div>
        ))}
      </div>

      {/* Desktop & Medium screens (md+): 3 cards per row + remaining centered */}
      <div className="hidden md:block">
        {/* Row 1: 3 cards */}
        <div className="grid grid-cols-3">
          {skillsData.slice(0, 3).map((s, colIdx) => (
            <div key={colIdx} className={`${cardBase} ${border} border-b ${colIdx < 2 ? 'border-r' : ''}`}>
              {cardContent(s)}
            </div>
          ))}
        </div>

        {/* Row 2: 2 cards centered under the 3-col row above */}
        <div className="flex justify-center">
          <div className={`grid grid-cols-2 border-l border-r ${border}`} style={{ width: '66.666%' }}>
            {skillsData.slice(3).map((s, colIdx) => (
              <div
                key={colIdx}
                className={`${cardBase} ${border} ${colIdx < skillsData.slice(3).length - 1 ? 'border-r' : ''}`}
              >
                {cardContent(s)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



