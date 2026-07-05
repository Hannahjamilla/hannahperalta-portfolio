import { Terminal, Database, LayoutTemplate, Globe } from 'lucide-react'

// Layout Helpers for Newspaper Theme

export function TopNav({ dark, toggle, border }: { dark: boolean, toggle: () => void, border: string }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 backdrop-blur-xl bg-white/70 dark:bg-black/70 border-b ${border}`}>
      <div className="font-serif font-normal tracking-wide uppercase text-xl sm:text-2xl pt-1">
        H.J. Peralta
      </div>
      <div className="flex items-center gap-2.5 md:gap-6 text-[8px] sm:text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest">
        <a href="#profile" className="hover:underline underline-offset-4 decoration-2 hidden sm:block">Home</a>
        <a href="#experience" className="hover:underline underline-offset-4 decoration-2">Work</a>
        <a href="#projects" className="hover:underline underline-offset-4 decoration-2">Projects</a>
        <button onClick={toggle} className="border border-current px-2 py-1 md:px-3 md:py-1.5 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors shrink-0 ml-1">
          {dark ? 'Day' : 'Night'}<span className="hidden md:inline"> Edition</span>
        </button>
      </div>
    </nav>
  )
}

const skillsData = [
  { group: "Frontend", icon: LayoutTemplate, items: "HTML, CSS, JavaScript, React.js, Flutter, Tailwind CSS, Vite" },
  { group: "Backend", icon: Terminal, items: "Node.js, Express.js, PHP, Laravel, Python, RESTful APIs" },
  { group: "Databases", icon: Database, items: "MySQL, MongoDB, PostgreSQL, Supabase, Firebase" },
  { group: "Tools & Platforms", icon: Globe, items: "Git, GitHub, Postman, VS Code, Figma, Vercel" },
]

export function TechnicalSkills({ dark }: { border: string, dark: boolean }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
      {skillsData.map((s, i) => (
        <div key={i} className={`flex flex-col justify-between group p-4 md:p-6 rounded-xl md:rounded-2xl border transition-all duration-500 hover:-translate-y-1 shadow-md hover:shadow-2xl ${
          dark 
            ? 'bg-[#12131C] border-[#2A2D40] text-zinc-200 hover:bg-white hover:text-black hover:border-black' 
            : 'bg-white border-[#dcd3b8] text-[#1c1813] hover:bg-black hover:text-white hover:border-black'
        }`}>
          <div>
            <div className="mb-3 md:mb-5 transition-transform duration-300 group-hover:scale-[1.1] origin-left text-current">
              <s.icon size={28} strokeWidth={1.5} className="md:scale-[1.28]" />
            </div>
            <h3 className="font-serif font-black uppercase tracking-wide text-base md:text-xl mb-2 md:mb-4 border-b border-inherit pb-2">{s.group}</h3>
            <p className="font-serif text-xs md:text-[15px] leading-relaxed opacity-85">{s.items}</p>
          </div>
        </div>
      ))}
    </div>
  )
}


