import { Code2, Database, FileCheck, Briefcase, Sparkles } from 'lucide-react'

// Layout Helpers for Newspaper Theme

export function TopNav({ dark, toggle, border }: { dark: boolean, toggle: () => void, border: string }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-4 sm:px-6 py-4 md:px-12 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b ${border}`}>
      <div className="flex items-center gap-2.5 sm:gap-4 md:gap-6 text-[8px] sm:text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest">
        <a href="#profile" className="hover:underline underline-offset-4 decoration-2">Home</a>
        <a href="#experience" className="hover:underline underline-offset-4 decoration-2">Work</a>
        <a href="#education" className="hover:underline underline-offset-4 decoration-2">Education</a>
        <a href="#projects" className="hover:underline underline-offset-4 decoration-2">Projects</a>
        <button onClick={toggle} className="border border-current px-2 py-1 md:px-3 md:py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shrink-0 ml-1">
          {dark ? 'Day' : 'Night'}<span className="hidden md:inline"> Edition</span>
        </button>
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
    group: "Testing & Documentation",
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
  const cardBase = `p-2.5 sm:p-4 md:p-6 flex flex-col sm:flex-row items-start gap-1.5 sm:gap-3 md:gap-4 group transition-colors ${hoverCls}`

  const cardContent = (s: typeof skillsData[0]) => (
    <>
      <div className={`p-1 sm:p-2 rounded-md ${dark
          ? 'bg-zinc-800/80 text-[#ff6b6b] border border-red-500/20'
          : 'bg-white text-[#a11d1d] border border-red-200'
        } shrink-0 group-hover:scale-[1.05] transition-transform mt-0.5`}>
        <s.icon size={14} className="sm:w-[18px] sm:h-[18px]" strokeWidth={1.5} />
      </div>

      <div className="flex flex-col min-w-0 flex-1 w-full">
        <h3 className="text-[11px] sm:text-sm lg:text-[15px] font-serif font-black uppercase tracking-wide group-hover:text-[#a11d1d] dark:group-hover:text-[#ff6b6b] transition-colors leading-tight mb-1 sm:mb-2">
          {s.group}
        </h3>
        <div className="flex flex-wrap gap-1">
          {s.items.map((item, idx) => (
            <span key={idx} className={`px-1 sm:px-1.5 py-0.5 rounded-sm text-[7.5px] sm:text-[9px] font-mono border transition-all duration-200 ${dark
                ? 'border-zinc-800 bg-[#212124] text-zinc-300 group-hover:border-[#ff6b6b]/40'
                : 'border-[#e0d6bc] bg-[#FAF6EC] text-[#2b271d] group-hover:border-[#a11d1d]/40'
              }`}>{item}</span>
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

        {/* Row 2: remaining cards centered with framing borders */}
        <div className="flex w-full">
          <div className="flex-1" />
          {skillsData.slice(3).map((s, colIdx) => (
            <div
              key={colIdx}
              className={`${cardBase} ${border} border-r ${colIdx === 0 ? 'border-l' : ''}`}
              style={{ width: '33.333%' }}
            >
              {cardContent(s)}
            </div>
          ))}
          <div className="flex-1" />
        </div>
      </div>
    </div>
  )
}



