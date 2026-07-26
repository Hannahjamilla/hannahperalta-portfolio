// Import only the icons we need to reduce bundle size
import {
  Atom, FileCode2, Box, Wind,
  Server, Terminal, Zap, Database,
  Leaf, Layers, ShieldCheck, Cpu,
  Trophy, FileBadge, BookOpen, GraduationCap
} from 'lucide-react'

// Simplified data structures for better performance
export const FRONTEND = [
  { name: 'React.js', level: 50, label: 'Lvl. 10', color: 'bg-cyan-400', icon: Atom },
  { name: 'JavaScript / HTML / CSS', level: 50, label: 'Lvl. 10', color: 'bg-amber-400', icon: FileCode2 },
  { name: 'Flutter / Tailwind CSS', level: 45, label: 'Lvl. 9', color: 'bg-sky-400', icon: Wind },
  { name: 'Responsive Web Design', level: 40, label: 'Lvl. 8', color: 'bg-pink-400', icon: Box },
]

export const BACKEND = [
  { name: 'Laravel / PHP', level: 55, label: 'Lvl. 11', color: 'bg-purple-400', icon: Server },
  { name: 'Node.js / Express.js', level: 45, label: 'Lvl. 9', color: 'bg-green-400', icon: Terminal },
  { name: 'Python / RESTful APIs', level: 30, label: 'Lvl. 6', color: 'bg-blue-500', icon: Zap },
  { name: 'MySQL / PostgreSQL', level: 50, label: 'Lvl. 10', color: 'bg-rose-400', icon: Database },
]

export const CLOUD_TOOLS = [
  { name: 'MongoDB / Supabase / Firebase', level: 40, label: 'Lvl. 8', color: 'bg-indigo-400', icon: Leaf },
  { name: 'Git / GitHub / Vercel', level: 50, label: 'Lvl. 10', color: 'bg-emerald-400', icon: Layers },
  { name: 'Software Testing / QA', level: 45, label: 'Lvl. 9', color: 'bg-blue-400', icon: ShieldCheck },
  { name: 'AI-Assisted Development', level: 55, label: 'Lvl. 11', color: 'bg-orange-400', icon: Cpu },
]

export const QUESTS = [
  { status: 'COMPLETE', title: 'BaryoConnect', badge: 'Community App', role: 'Project Manager & Lead Researcher', period: 'Feb 2025 – May 2025', desc: [
    'Led project planning and coordinated development activities, collaborating with team members throughout the application lifecycle.',
    'Developed responsive frontend features using Flutter and Firebase, translating stakeholder requirements into user-centered interfaces.',
    'Represented National University at PSITE IRCITE 2025, presenting a community-based governance application.'
  ], tags: ['Flutter', 'Firebase', 'Mobile App'], imgs: ['/images/baryo.webp', '/images/IRCITE-cert.webp', '/images/IRCITE-1.webp', '/images/IRCITE-2.webp', '/images/16.webp', '/images/15.webp'] },
  { status: 'COMPLETE', title: 'DialiEase', badge: 'Capstone Project', role: 'Web Developer', period: 'Nov 2024 – Jan 2026', desc: [
    'Developed a healthcare monitoring system using React.js, Laravel 12, MySQL, and RESTful APIs.',
    'Implemented frontend and backend features, integrated APIs, and optimized database operations to improve system performance.',
    'Performed testing, debugging, and feature validation to ensure application reliability and usability.'
  ], tags: ['React.js', 'Laravel', 'MySQL'], imgs: ['/images/10.webp', '/images/12.webp', '/images/11.webp'] },
  { status: 'COMPLETE', title: 'Interactive 3D Portfolio', badge: 'Creative Portfolio', role: 'Creative Developer', period: '2025', desc: [
    'Immersive web experience integrated with Three.js and custom shaders.',
    'Delivers high-performance, interactive 3D models seamlessly within the browser.',
    'Showcases advanced creative development skills and performance optimization.'
  ], tags: ['React', 'Three.js', 'WebGL'], link: 'https://hannahjamilla.vercel.app/', imgs: ['/images/car.webp', '/images/portfolio.webp', '/images/2port.webp', '/images/cover-portfolio.webp'] },
  { status: 'COMPLETE', title: 'Drug Store POS', badge: 'Business System', role: 'Business App', period: '2024', desc: [
    'Comprehensive Point-of-Sale and inventory management system designed specifically for pharmacies.',
    'Monitors daily transactions, alerts on low stock thresholds, and tracks medicine expiration dates.',
    'Ensures pharmacy compliance and efficient stock rotation.'
  ], tags: ['PHP', 'MySQL', 'POS'], imgs: ['/images/2.webp', '/images/POS2.webp', '/images/5.webp', '/images/3.webp'] },
  { status: 'COMPLETE', title: 'Tutorial Center', badge: 'Learning Platform', role: 'Learning Tool', period: '2024', desc: [
    'Online school platform featuring secure student portals and course enrollment workflows.',
    'Provides teachers and students with progress tracking dashboards and unified access to resources.',
    'Modernizes the learning experience for tutorial and review centers.'
  ], tags: ['PHP', 'MySQL', 'EdTech'], imgs: ['/images/7.webp', '/images/tutorial.webp', '/images/8.webp'] },
  { status: 'COMPLETE', title: 'Espasyo', badge: 'Management System', role: 'Co-Developer & Co-Researcher', period: 'Aug 2024 – Oct 2024', desc: [
    'Collaborated in the design, development, and testing of an integrated event and venue rental management system.',
    'Contributed to system research, technical documentation, software testing, and feature validation.',
    'Co-authored research published in the International Journal of Academic Multidisciplinary Research (IJAMR), Vol. 8, Issue 11.'
  ], tags: ['Billing', 'Inventory', 'Web Platform'], imgs: ['/images/espasyo-1.webp', '/images/espasyo.webp', '/images/paper.webp'] },
]

export const ACHIEVEMENTS = [
  { icon: Trophy, title: 'IRCITE 2025 Paper Presenter', date: 'Apr 2025', desc: 'Presented a research paper on BaryoConnect at the International Research Conference on Information Technology Education (IRCITE) 2025. Contributed to discussions on bridging citizen-local authority communication through innovative digital platforms.' },
  { icon: Trophy, title: 'TOPCIT Examinee', date: 'Jul 2025', desc: 'Successfully completed the Test of Practical Competency in IT (TOPCIT), demonstrating foundational and practical capabilities in computer science, software engineering, and information security.' },
  { icon: ShieldCheck, title: 'Microsoft SC-900', date: 'Mar 2025', desc: 'Achieved the Microsoft Security, Compliance, and Identity Fundamentals (SC-900) certification, proving a strong foundational understanding of cloud security principles and Microsoft security solutions.' },
  { icon: FileBadge, title: 'Alison Diploma in E-Commerce', date: 'Oct 2025', desc: 'Earned a comprehensive diploma in E-Commerce, mastering concepts related to digital marketing, online business models, and secure payment gateway integrations.' },
  { icon: BookOpen, title: 'Published Researcher (IJAMR)', date: 'Jun 2024', desc: 'Published an academic research paper in the International Journal of Advanced Multidisciplinary Research (IJAMR), detailing the technical and business framework of the Espasyo event place reservation system.' },
  { icon: GraduationCap, title: 'ABM with Honors & Loyalty', date: 'May 2022', desc: 'Graduated with Honors from the Accountancy, Business, and Management (ABM) academic strand. Recognized with a Loyalty Award for consistent academic excellence and dedication to the institution.' },
]

export const XP_LOG = [
  { place: 'Creciendo Philippines', role: 'Backend Developer Intern', period: 'Nov 2025 – Feb 2026 | 400 Hours', desc: ['Developed backend features using Express.js and MongoDB to support system functionality and business requirements.', 'Built, tested, and maintained RESTful APIs, ensuring reliable backend integration and accurate data processing.', 'Assisted in debugging, validating API endpoints, and improving performance with Postman.'] },
  { place: 'Lightweight Solutions', role: 'Web Developer Intern', period: 'Mar 2026 – May 2026 | 400 Hours', desc: ['Developed scalable full-stack features using React.js and Python for SaaS applications.', 'Built responsive user interfaces and collaborated with cross-functional teams to enhance usability.', 'Tested, debugged, and validated application features to improve functionality and reliability.'] },
  { place: 'AWS Cloud Clubs | NU Baliwag', role: 'Skill Development Office', period: 'Mar 2025 – June 2026', desc: ['Organized and facilitated cloud learning sessions to help students develop core IT and cloud capabilities.', 'Coordinated hands-on workshops covering AWS fundamentals and cloud computing concepts.', 'Collaborated with club officers to design educational resources and host learning events.'] },
]

export const EDUCATION = [
  {
    school: 'National University',
    location: 'Baliwag, Bulacan',
    degree: 'Bachelor of Science in Information Technology',
    specialization: 'Specialization in Web and Mobile Application Development',
    period: 'July 2026',
    badge: 'Higher Education'
  },
  {
    school: 'St. Dominic Academy',
    location: 'Pulilan, Bulacan',
    degree: 'Accountancy, Business, and Management (ABM)',
    period: 'May 2022',
    badge: 'Senior High School'
  }
]


export const PERSONAL: { title: string, desc: string[], tags: string[], link?: string, imgs: string[], wip?: boolean, role?: string, period?: string, status?: string }[] = [
  { title: 'PingMe', role: 'Frontend Developer', period: '2024', status: 'COMPLETE', desc: [
    'Interactive minimalist platform built for project inquiries, networking, and professional assistance.',
    'Features sleek UI/UX with smooth transitions, responsive layouts, and highly intuitive contact forms.',
    'Designed to serve as an engaging secondary gateway for potential clients and employers.'
  ], tags: ['React', 'Tailwind', 'Framer Motion'], link: 'https://ping-me-seven-vert.vercel.app/', imgs: ['/images/PingMe.webp'] },

  { title: 'GroundSpot', role: 'Web Developer', period: '2025 - Present', status: 'BETA', desc: [
    'Modern facility and space booking platform currently in active development.',
    'Features dynamic scheduling calendars, real-time availability checks, and secure user authentication.',
    'Aims to streamline the workflow for property managers and end-users looking for temporary spaces.'
  ], tags: ['React', 'Tailwind', 'Supabase'], link: 'https://ground-spot-frontend-web.vercel.app/', imgs: ['/images/GrooundSpot.webp', '/images/Login-GroundSpot.webp', '/images/GrooundSpot-dashboard.webp'], wip: true },
  { title: 'Tasklet', role: 'Frontend Developer', period: '2025', status: 'COMPLETE', desc: [
    'A web app designed to help students beat procrastination and stay productive.',
    'Features a customizable focus timer, study technique guides, and downloadable planning templates.',
    'Includes motivational quotes to keep students inspired throughout their study sessions.'
  ], tags: ['React 19 + TS', 'Vite', 'Tailwind CSS v4'], link: 'https://tasklet-for-you.vercel.app/', imgs: ['/images/4-tasklet.webp', '/images/1-tasklet.webp', '/images/2-tasklet.webp', '/images/3-tasklet.webp', '/images/5-tasklet.webp', '/images/6-tasklet.webp'] },
]
