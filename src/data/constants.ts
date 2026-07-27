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
  { status: 'COMPLETE', title: 'BaryoConnect', badge: 'Smart Community App', role: 'Project Manager | Frontend Developer | Paper Presenter | Lead Researcher', period: 'Feb. 2025 – May 2025', desc: [
    'A smart community platform connecting residents with municipal staff for real-time announcements, citizen reports, service requests, and community feedback.',
    'Led project planning, team coordination, requirements gathering, and mobile UI development using Flutter and Firebase, ensuring real-time data sync and reliable user authentication.',
    'Presented the research paper at PSITE IRCITE 2025, demonstrating how digital portals empower netizens to track municipal request resolutions and actively participate in local governance.'
  ], tags: ['Flutter', 'Firebase', 'Mobile App'], imgs: ['/images/baryo.webp', '/images/IRCITE-cert.webp', '/images/IRCITE-1.webp', '/images/IRCITE-2.webp', '/images/16.webp', '/images/15.webp'] },
  { status: 'COMPLETE', title: 'DialiEase', badge: 'CAPD Management System', role: 'Full-Stack Web Developer | Software Tester | Co-Researcher', period: 'Nov. 2024 – Jan. 2026', desc: [
    'A specialized healthcare web application for medical staff to remotely monitor Continuous Ambulatory Peritoneal Dialysis (CAPD) patients and daily fluid logs.',
    'Features clinical dashboards to monitor patient peritoneal dialysis exchange logs, fluid balance, ultrafiltration rates, and treatment compliance.',
    'Developed full-stack web features in React.js, Laravel, and MySQL while managing software testing and technical documentation.',
    'IoT Integration: DialiEase also features a custom-built IoT weighing scale device that automatically measures and records patient fluid weight after each CAPD exchange.',
    'The smart scale transmits real-time weight readings directly into the system, eliminating manual data entry errors and enabling accurate automated fluid balance calculations for medical staff.'
  ], tags: ['React.js', 'Laravel', 'MySQL', 'IoT', 'Arduino'], imgs: ['/images/10.webp', '/images/12.webp', '/images/11.webp', '/images/CAPD-IOT-1.webp', '/images/CAPD-IOT-2.webp', '/images/CAPD-IOT-3.webp'] },
  { status: 'COMPLETE', title: 'Interactive 3D Portfolio', badge: 'Creative Portfolio', role: 'Full-Stack Developer', period: '2025', desc: [
    'An immersive 3D web portfolio featuring real-time graphics, dynamic lighting, and custom shaders embedded directly in the browser.',
    'Built with React, Three.js, and WebGL to deliver high-performance 3D scene rendering and interactive camera controls.',
    'Showcases creative web development techniques, custom GLSL shaders, and optimized 3D model asset pipelines.'
  ], tags: ['React', 'Three.js', 'WebGL'], link: 'https://hannahjamilla.vercel.app/', imgs: ['/images/car.webp', '/images/portfolio.webp', '/images/2port.webp', '/images/cover-portfolio.webp'] },
  { status: 'COMPLETE', title: 'Drug Store POS', badge: 'Business System', role: 'Full-Stack Web Developer', period: '2024', desc: [
    'A Point-of-Sale and inventory management system for pharmacies and retail stores to track sales, product stocks, and medicine expiration dates.',
    'Tracks daily store sales, alerts management on low stock thresholds, and monitors medicine expiration dates for safety compliance.',
    'Built with PHP and MySQL to streamline pharmacy operations, checkout workflows, and inventory audit logs.'
  ], tags: ['PHP', 'MySQL', 'POS'], imgs: ['/images/2.webp', '/images/POS2.webp', '/images/5.webp', '/images/3.webp'] },
  { status: 'COMPLETE', title: 'Tutorial Center', badge: 'Learning Platform', role: 'Full-Stack Web Developer', period: '2024', desc: [
    'An EdTech learning platform for tutors to track student progress and manage classes, featuring student study portals and enrollment workflows.',
    'Provides tutors with student performance tracking dashboards, grade tracking, and class management tools.',
    'Offers students a unified portal for self-paced study materials, class schedules, and interactive learning resources.'
  ], tags: ['PHP', 'MySQL', 'EdTech'], imgs: ['/images/7.webp', '/images/tutorial.webp', '/images/8.webp'] },
  { status: 'COMPLETE', title: 'Espasyo', badge: 'Rental Ecosystem', role: 'Co-Developer | Co-Researcher', period: 'Aug. 2024 – Oct. 2024', desc: [
    'An event venue booking and rental ecosystem featuring space availability checks, reservation tracking, payment management, and attendee RSVP tools.',
    'Streamlines venue scheduling, payment tracking, and attendee event RSVP management for property owners and event planners.',
    'Co-developed full-stack features and co-authored research published in the International Journal of Academic Multidisciplinary Research (IJAMR), Vol. 8, Issue 11 (2024).'
  ], tags: ['Billing', 'Payment', 'Inventory'], imgs: ['/images/espasyo-1.webp', '/images/espasyo.webp', '/images/paper.webp'] },
]

export const ACHIEVEMENTS = [
  { icon: Trophy, title: 'IRCITE 2025 Paper Presenter', date: 'Apr 2025', desc: 'Presented research on BaryoConnect community governance platform at PSITE IRCITE 2025.' },
  { icon: Trophy, title: 'TOPCIT Examinee', date: 'Jul 2025', desc: 'Completed TOPCIT exam, validating practical competency in software engineering and IT.' },
  { icon: ShieldCheck, title: 'Microsoft SC-900', date: 'Mar 2025', desc: 'Certified in Microsoft Security, Compliance, and Identity Fundamentals.' },
  { icon: FileBadge, title: 'Alison Diploma in E-Commerce', date: 'Oct 2025', desc: 'Earned diploma in e-commerce, digital marketing, and online business models.' },
  { icon: BookOpen, title: 'Published Researcher (IJAMR)', date: 'Jun 2024', desc: 'Published research in IJAMR Vol. 8 Issue 11 on the Espasyo rental system framework.' },
  { icon: GraduationCap, title: 'ABM with Honors & Loyalty', date: 'May 2022', desc: 'Graduated SHS ABM strand with Honors and Loyalty Award for academic excellence.' },
]

export const XP_LOG = [
  { place: 'Creciendo Philippines', role: 'Backend Developer Intern', period: 'Nov 2025 – Feb 2026 | 400 Hours', desc: ['Developed backend features using Express.js and MongoDB to support system functionality and business requirements.', 'Built, tested, and maintained RESTful APIs, ensuring reliable backend integration and accurate data processing.', 'Assisted in debugging, validating API endpoints, and improving performance with Postman.'] },
  { place: 'Lightweight Solutions', role: 'Full-Stack Web Developer Intern', period: 'Mar 2026 – May 2026 | 400 Hours', desc: ['Developed scalable full-stack features using React.js and Python for SaaS applications.', 'Built responsive user interfaces and collaborated with cross-functional teams to enhance usability.', 'Tested, debugged, and validated application features to improve functionality and reliability.'] },
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
  { title: 'PingMe', role: 'Full-Stack Developer', period: '2024', status: 'COMPLETE', desc: [
    'Interactive minimalist platform built for project inquiries, networking, and professional assistance.',
    'Features sleek UI/UX with smooth transitions, responsive layouts, and highly intuitive contact forms.',
    'Designed to serve as an engaging secondary gateway for potential clients and employers.'
  ], tags: ['React', 'Tailwind', 'Framer Motion'], link: 'https://ping-me-seven-vert.vercel.app/', imgs: ['/images/PingMe.webp'] },

  { title: 'GroundSpot', role: 'Full-Stack Developer', period: '2025 - Present', status: 'BETA', desc: [
    'Modern facility and space booking platform currently in active development.',
    'Features dynamic scheduling calendars, real-time availability checks, and secure user authentication.',
    'Aims to streamline the workflow for property managers and end-users looking for temporary spaces.'
  ], tags: ['React', 'Tailwind', 'Supabase'], link: 'https://ground-spot-frontend-web.vercel.app/', imgs: ['/images/GrooundSpot.webp', '/images/Login-GroundSpot.webp', '/images/GrooundSpot-dashboard.webp'], wip: true },
  { title: 'Tasklet', role: 'Full-Stack Developer', period: '2025', status: 'COMPLETE', desc: [
    'A web app designed to help students beat procrastination and stay productive.',
    'Features a customizable focus timer, study technique guides, and downloadable planning templates.',
    'Includes motivational quotes to keep students inspired throughout their study sessions.'
  ], tags: ['React 19 + TS', 'Vite', 'Tailwind CSS v4'], link: 'https://tasklet-for-you.vercel.app/', imgs: ['/images/4-tasklet.webp', '/images/1-tasklet.webp', '/images/2-tasklet.webp', '/images/3-tasklet.webp', '/images/5-tasklet.webp', '/images/6-tasklet.webp'] },
]
