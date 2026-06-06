import {
  Atom, FileCode2, Box, Wind,
  Server, Terminal, Zap, Database,
  Leaf, Layers, ShieldCheck, Cpu,
  Trophy, FileBadge, BookOpen, GraduationCap
} from 'lucide-react'

export const FRONTEND = [
  { name: 'React.js / Next.js', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-cyan-400', icon: Atom },
  { name: 'JavaScript / HTML / CSS', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-amber-400', icon: FileCode2 },
  { name: 'Tailwind CSS / Vite', level: 45, label: 'Lvl. 9 / Exploring', color: 'bg-sky-400', icon: Wind },
  { name: 'Responsive Design', level: 40, label: 'Lvl. 8 / Foundation', color: 'bg-pink-400', icon: Box },
]

export const BACKEND = [
  { name: 'Laravel / PHP', level: 55, label: 'Lvl. 11 / Learner', color: 'bg-purple-400', icon: Server },
  { name: 'Node.js / Express.js', level: 45, label: 'Lvl. 9 / Exploring', color: 'bg-green-400', icon: Terminal },
  { name: 'Python / RESTful APIs', level: 30, label: 'Lvl. 6 / Foundation', color: 'bg-blue-500', icon: Zap },
  { name: 'MySQL / PostgreSQL', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-rose-400', icon: Database },
]

export const CLOUD_TOOLS = [
  { name: 'MongoDB / Supabase', level: 40, label: 'Lvl. 8 / Foundation', color: 'bg-indigo-400', icon: Leaf },
  { name: 'Vercel / GitHub', level: 50, label: 'Lvl. 10 / Capable', color: 'bg-emerald-400', icon: Layers },
  { name: 'System Analysis & QA', level: 45, label: 'Lvl. 9 / Exploring', color: 'bg-blue-400', icon: ShieldCheck },
  { name: 'AI Assisted Tools', level: 55, label: 'Lvl. 11 / Learner', color: 'bg-orange-400', icon: Cpu },
]

export const QUESTS = [
  { status: 'COMPLETE', title: 'BaryoConnect', role: 'Project Manager & Paper Presenter', period: 'IRCITE 2025', desc: 'An innovative community-focused platform designed to streamline local governance and public engagement. Presented as a research paper at the IRCITE 2025 International Conference, the project emphasizes bridging the communication gap between citizens and local authorities through accessible digital tools.', tags: ['Flutter', 'Firebase'], imgs: ['/images/15.webp', '/images/Ircite.webp', '/images/IRCITE-1.jpg', '/images/IRCITE-2.jpg', '/images/16.webp'] },
  { status: 'COMPLETE', title: 'DialiEase', role: 'Capstone Project', period: 'Nov 2024 – Jan 2026', desc: 'A comprehensive digital monitoring system engineered specifically for patients undergoing home-based dialysis. It features real-time health metric tracking, automated alerts, and seamless data visualization to assist medical staff in providing remote care efficiently.', tags: ['React.js', 'Laravel', 'Google Cloud'], imgs: ['/images/12.webp', '/images/11.webp', '/images/10.webp'] },
  { status: 'COMPLETE', title: 'Espasyo - Event place reservation system', role: 'Published Research', period: 'Aug 2024 – Oct 2024', desc: 'A highly unified venue rental platform that centralizes online reservations, dynamic billing, and inventory tracking. Its technical and business framework was officially published as an academic research paper in the International Journal of Advanced Multidisciplinary Research (IJAMR).', tags: ['Billing', 'Inventory'], imgs: ['/images/espasyo-1.png', '/images/espasyo.png', '/images/paper.webp'] },
  { status: 'COMPLETE', title: 'Drug Store POS', role: 'Business App', period: '2024', desc: 'A robust point-of-sale and inventory management system tailored for pharmaceutical businesses. It enables pharmacists to accurately monitor daily transactions, manage low-stock thresholds, and track critical medicine expiration dates in a fast-paced environment.', tags: ['PHP', 'MySQL'], imgs: ['/images/POS2.webp', '/images/2.webp', '/images/5.webp', '/images/3.webp'] },
  { status: 'COMPLETE', title: 'Tutorial Center', role: 'Learning Tool', period: '2024', desc: 'An interactive online school platform designed to enhance the e-learning experience. It provides secure student portals, course enrollment workflows, and visual dashboards where students and instructors can easily track academic progress and upcoming schedules.', tags: ['PHP', 'MySQL'], imgs: ['/images/tutorial.webp', '/images/7.webp', '/images/8.webp'] },
  { status: 'COMPLETE', title: 'Interactive 3D Portfolio', role: 'Creative Developer', period: '2025', desc: 'A cutting-edge, immersive web experience built to showcase creative work in three dimensions. By leveraging Three.js and custom shaders, it delivers high-performance 3D models and interactive environments directly in the browser without compromising rendering speed.', tags: ['React', 'Three.js'], link: 'https://hannahjamilla.vercel.app/', imgs: ['/images/cover-portfolio.png', '/images/portfolio.png', '/images/2port.png'] },
]

export const ACHIEVEMENTS = [
  { icon: Trophy, title: 'IRCITE 2025 Paper Presenter', date: 'Apr 2025' },
  { icon: Trophy, title: 'TOPCIT Examinee', date: 'Jul 2025' },
  { icon: ShieldCheck, title: 'Microsoft SC-900', date: 'Mar 2025' },
  { icon: FileBadge, title: 'Alison Diploma in E-Commerce', date: 'Oct 2025' },
  { icon: BookOpen, title: 'Published Researcher (IJAMR)', date: 'Jun 2024' },
  { icon: GraduationCap, title: 'ABM with Honors & Loyalty', date: 'May 2022' },
]

export const XP_LOG = [
  { place: 'Creciendo Philippines', role: 'Backend Developer Intern', period: 'Nov 2025 – Feb 2026 | 400 Hours', desc: ['Developed backend systems using Express.js and MongoDB to support application requirements and improve system functionality.', 'Built and tested RESTful APIs using Postman to ensure reliable backend integration and accurate data processing.'] },
  { place: 'Lightweight Solutions', role: 'Full Stack Developer Intern', period: 'Mar 2026 – May 2026 | 400 Hours', desc: ['Developed scalable SaaS features using React and Python to support business application workflows.', 'Collaborated with developers to improve responsive UI design, application usability, and overall user experience.'] },
  { place: 'AWS Cloud Clubs | NU Baliwag', role: 'Skill Development Office', period: 'Mar 2025 – June 2026', desc: ['Facilitated cloud learning sessions and training activities to promote IT skill development and effective collaboration for students.'] },
]

export const PERSONAL: { title: string, desc: string[], tags: string[], link: string, imgs: string[], wip?: boolean }[] = [
  { title: 'PingMe', desc: ['A beautifully styled interactive platform designed to facilitate project inquiries and professional assistance requests.', 'Focuses on delivering a sleek, user-centric UI/UX design with smooth transitions and highly intuitive inquiry forms.'], tags: ['React', 'Tailwind'], link: 'https://ping-me-seven-vert.vercel.app/', imgs: ['/images/PingMe.webp'] },
  { title: 'Hello World - Goosebumps', desc: ['An atmospheric, immersive digital experience exploring spooky, dynamic typography.', 'Showcases creative web design aesthetics to deliver a highly thematic narrative.'], tags: ['React', 'Tailwind'], link: 'https://hello-world-gamma-plum.vercel.app/', imgs: ['/images/Hello word - goosebumps.webp'] },
  { title: 'Birthday - Star Alert!', desc: ['A highly engaging and interactive celebratory greeting card.', 'Utilizes complex floating particle animations and precise custom CSS timeline effects to deliver a joyous user experience.'], tags: ['React', 'Tailwind'], link: 'https://happy-b-day-murex.vercel.app/', imgs: ['/images/Birthday - Star Alert!.webp'] },
  { title: 'GroundSpot', desc: ['A modern, full-scale facility and space booking platform currently in active development.', 'Features dynamic scheduling interfaces, real-time availability checks, and a clean visual hierarchy for streamlined reservations.'], tags: ['React', 'Tailwind'], link: 'https://ground-spot-frontend-web.vercel.app/', imgs: ['/images/GrooundSpot.png', '/images/Login-GroundSpot.png', '/images/GrooundSpot-dashboard.png'], wip: true },
]
