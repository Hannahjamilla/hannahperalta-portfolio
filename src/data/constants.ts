// Import only the icons we need to reduce bundle size
import {
  Atom, FileCode2, Box, Wind,
  Server, Terminal, Zap, Database,
  Leaf, Layers, ShieldCheck, Cpu,
  Trophy, FileBadge, BookOpen, GraduationCap
} from 'lucide-react'

// Simplified data structures for better performance
export const FRONTEND = [
  { name: 'React.js / Next.js', level: 50, label: 'Lvl. 10', color: 'bg-cyan-400', icon: Atom },
  { name: 'JavaScript / HTML / CSS', level: 50, label: 'Lvl. 10', color: 'bg-amber-400', icon: FileCode2 },
  { name: 'Tailwind CSS / Vite', level: 45, label: 'Lvl. 9', color: 'bg-sky-400', icon: Wind },
  { name: 'Responsive Design', level: 40, label: 'Lvl. 8', color: 'bg-pink-400', icon: Box },
]

export const BACKEND = [
  { name: 'Laravel / PHP', level: 55, label: 'Lvl. 11', color: 'bg-purple-400', icon: Server },
  { name: 'Node.js / Express.js', level: 45, label: 'Lvl. 9', color: 'bg-green-400', icon: Terminal },
  { name: 'Python / RESTful APIs', level: 30, label: 'Lvl. 6', color: 'bg-blue-500', icon: Zap },
  { name: 'MySQL / PostgreSQL', level: 50, label: 'Lvl. 10', color: 'bg-rose-400', icon: Database },
]

export const CLOUD_TOOLS = [
  { name: 'MongoDB / Supabase', level: 40, label: 'Lvl. 8', color: 'bg-indigo-400', icon: Leaf },
  { name: 'Vercel / GitHub', level: 50, label: 'Lvl. 10', color: 'bg-emerald-400', icon: Layers },
  { name: 'System Analysis & QA', level: 45, label: 'Lvl. 9', color: 'bg-blue-400', icon: ShieldCheck },
  { name: 'AI Assisted Tools', level: 55, label: 'Lvl. 11', color: 'bg-orange-400', icon: Cpu },
]

export const QUESTS = [
  { status: 'COMPLETE', title: 'BaryoConnect', role: 'Project Manager & Paper Presenter', period: 'IRCITE 2025', desc: [
    'Community-focused platform designed to streamline local barangay governance and enhance public engagement.',
    'Features incident reporting, seamless announcement bulletins, and a mobile-friendly interface for residents.',
    'Successfully presented as an official research paper at the IRCITE 2025 International Conference.'
  ], tags: ['Flutter', 'Firebase', 'Mobile App'], imgs: ['/images/15.webp', '/images/Ircite.webp', '/images/IRCITE-1.webp', '/images/IRCITE-2.webp', '/images/16.webp'] },
  { status: 'COMPLETE', title: 'DialiEase', role: 'Capstone Project', period: 'Nov 2024 – Jan 2026', desc: [
    'Digital monitoring system tailored for home-based dialysis patients and healthcare providers.',
    'Includes real-time health tracking metrics, automated risk alerts, and data visualization tools for remote care.',
    'Aims to reduce readmission rates by ensuring continuous, data-driven patient supervision.'
  ], tags: ['React.js', 'Laravel', 'Google Cloud'], imgs: ['/images/12.webp', '/images/11.webp', '/images/10.webp'] },
  { status: 'COMPLETE', title: 'Espasyo - Event place reservation system', role: 'Published Research', period: 'Aug 2024 – Oct 2024', desc: [
    'Unified venue rental platform equipped with online reservations, dynamic billing, and inventory tracking.',
    'Eliminates booking overlaps and streamlines scheduling for venue managers and event organizers.',
    'Technical and business framework successfully published in the IJAMR journal.'
  ], tags: ['Billing', 'Inventory', 'Web Platform'], imgs: ['/images/espasyo-1.webp', '/images/espasyo.webp', '/images/paper.webp'] },
  { status: 'COMPLETE', title: 'Drug Store POS', role: 'Business App', period: '2024', desc: [
    'Comprehensive Point-of-Sale and inventory management system designed specifically for pharmacies.',
    'Monitors daily transactions, alerts on low stock thresholds, and tracks medicine expiration dates.',
    'Ensures pharmacy compliance and efficient stock rotation.'
  ], tags: ['PHP', 'MySQL', 'POS'], imgs: ['/images/POS2.webp', '/images/2.webp', '/images/5.webp', '/images/3.webp'] },
  { status: 'COMPLETE', title: 'Tutorial Center', role: 'Learning Tool', period: '2024', desc: [
    'Online school platform featuring secure student portals and course enrollment workflows.',
    'Provides teachers and students with progress tracking dashboards and unified access to resources.',
    'Modernizes the learning experience for tutorial and review centers.'
  ], tags: ['PHP', 'MySQL', 'EdTech'], imgs: ['/images/tutorial.webp', '/images/7.webp', '/images/8.webp'] },
  { status: 'COMPLETE', title: 'Interactive 3D Portfolio', role: 'Creative Developer', period: '2025', desc: [
    'Immersive web experience integrated with Three.js and custom shaders.',
    'Delivers high-performance, interactive 3D models seamlessly within the browser.',
    'Showcases advanced creative development skills and performance optimization.'
  ], tags: ['React', 'Three.js', 'WebGL'], link: 'https://hannahjamilla.vercel.app/', imgs: ['/images/cover-portfolio.webp', '/images/portfolio.webp', '/images/2port.webp'] },
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
  { place: 'Creciendo Philippines', role: 'Backend Developer Intern', period: 'Nov 2025 – Feb 2026 | 400 Hours', desc: ['Developed backend systems using Express.js and MongoDB for improved functionality.', 'Built and tested RESTful APIs with Postman for reliable data processing.'] },
  { place: 'Lightweight Solutions', role: 'Full Stack Developer Intern', period: 'Mar 2026 – May 2026 | 400 Hours', desc: ['Developed scalable SaaS features using React and Python for business workflows.', 'Collaborated to improve responsive UI design and user experience.'] },
  { place: 'AWS Cloud Clubs | NU Baliwag', role: 'Skill Development Office', period: 'Mar 2025 – June 2026', desc: ['Facilitated cloud learning sessions and training for IT skill development.'] },
]

export const PERSONAL: { title: string, desc: string[], tags: string[], link?: string, imgs: string[], wip?: boolean, role?: string, period?: string, status?: string }[] = [
  { title: 'PingMe', role: 'Frontend Developer', period: '2024', status: 'COMPLETE', desc: [
    'Interactive minimalist platform built for project inquiries, networking, and professional assistance.',
    'Features sleek UI/UX with smooth transitions, responsive layouts, and highly intuitive contact forms.',
    'Designed to serve as an engaging secondary gateway for potential clients and employers.'
  ], tags: ['React', 'Tailwind', 'Framer Motion'], link: 'https://ping-me-seven-vert.vercel.app/', imgs: ['/images/PingMe.webp'] },
  { title: 'Hello World - Goosebumps', role: 'UI/UX Designer', period: 'Oct 2024', status: 'COMPLETE', desc: [
    'Atmospheric digital web experience featuring spooky typography and thematic color palettes.',
    'Combines creative web design principles with unique narrative elements to deliver an interactive story.',
    'Optimized for both desktop and mobile viewports with accessibility in mind.'
  ], tags: ['React', 'Tailwind', 'CSS Animation'], link: 'https://hello-world-gamma-plum.vercel.app/', imgs: ['/images/Hello word - goosebumps.webp'] },
  { title: 'Birthday - Star Alert!', role: 'Creative Developer', period: '2024', status: 'COMPLETE', desc: [
    'Interactive celebratory greeting card experience created for special occasions.',
    'Implements complex web animations using custom CSS timelines and keyframe effects.',
    'Provides a charming, personalized storytelling loop without relying on heavy frontend frameworks.'
  ], tags: ['React', 'Tailwind', 'UI/UX'], link: 'https://happy-b-day-murex.vercel.app/', imgs: ['/images/Birthday - Star Alert!.webp'] },
  { title: 'GroundSpot', role: 'Full Stack Developer', period: '2025 - Present', status: 'BETA', desc: [
    'Modern facility and space booking platform currently in active development.',
    'Features dynamic scheduling calendars, real-time availability checks, and secure user authentication.',
    'Aims to streamline the workflow for property managers and end-users looking for temporary spaces.'
  ], tags: ['React', 'Tailwind', 'Supabase'], link: 'https://ground-spot-frontend-web.vercel.app/', imgs: ['/images/GrooundSpot.webp', '/images/Login-GroundSpot.webp', '/images/GrooundSpot-dashboard.webp'], wip: true },
]
