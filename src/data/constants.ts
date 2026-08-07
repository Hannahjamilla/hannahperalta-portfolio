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
  {
    status: 'COMPLETE',
    title: 'BaryoConnect',
    badge: 'Smart Community App',
    role: 'Project Manager | Frontend Developer | Paper Presenter | Lead Researcher',
    period: 'Feb. 2025 – May 2025',
    summary: 'A mobile community app for barangay residents to report local issues, receive instant emergency alerts, and seamlessly track community concerns.',
    desc: [
      'BaryoConnect is a mobile app that helps residents stay connected with their barangay. Think of it as a community bulletin board on your phone — residents can report problems, receive urgent alerts, and check if their requests have been acted on.',
      'I led the team from planning all the way to launch, and we even presented the project at a national academic conference, where it was recognized for helping communities become more organized and digitally empowered.',
      '• Instant Alerts: Residents receive real-time notifications for emergencies, announcements, and weather updates directly on their phones.',
      '• Report Problems Easily: Anyone can take a photo of a broken streetlight, flooded road, or community concern and submit it right from the app.',
      '• Track Your Request: Instead of wondering what happened to a complaint, residents can see exactly where their report stands — like tracking a package.',
      '• Recognized Research: Our study on BaryoConnect was presented at the PSITE IRCITE 2025 academic conference, earning recognition for its impact on community governance.'
    ],
    tags: ['Flutter', 'Firebase', 'Mobile App', 'Dart', 'Research'],
    imgs: ['/images/baryo.webp', '/images/IRCITE-cert.webp', '/images/IRCITE-1.webp', '/images/IRCITE-2.webp', '/images/16.webp', '/images/15.webp']
  },
  {
    status: 'COMPLETE',
    title: 'DialiEase',
    badge: 'CAPD Management System',
    role: 'Full-Stack Web Developer | Software Tester | Co-Researcher',
    period: 'Nov. 2024 – Jan. 2026',
    summary: 'A web system and smart weighing scale designed to help medical staff monitor CAPD kidney patients at home, eliminating manual data entry.',
    desc: [
      'DialiEase is a web system built to help doctors and nurses monitor kidney patients who do daily treatment at home. Instead of patients manually writing their readings in a notebook, everything is recorded digitally and the medical team can check it anytime.',
      'I built the website, tested it to make sure it worked properly, and also helped write the research paper behind it. The project also includes a smart weighing scale that automatically records patient data.',
      '• Monitor Patients from Anywhere: The medical team can log in and see how each patient is doing without requiring an in-person visit.',
      '• Smart Weighing Scale: We built a physical device that automatically measures and records the patient\'s treatment results — no manual writing needed.',
      '• Fewer Mistakes: Because the scale logs data automatically, there\'s no risk of writing down the wrong number, making care more accurate and safe.',
      '• Early Warning System: If a patient\'s readings look unusual, the system flags it so the doctor can respond before it becomes a serious issue.'
    ],
    tags: ['React.js', 'Laravel', 'MySQL', 'IoT', 'Arduino'],
    imgs: ['/images/10.webp', '/images/12.webp', '/images/11.webp', '/images/CAPD-IOT-1.webp', '/images/CAPD-IOT-2.webp', '/images/CAPD-IOT-3.webp']
  },
  {
    status: 'COMPLETE',
    title: 'Interactive 3D Portfolio',
    badge: 'Creative Portfolio',
    role: 'Full-Stack Developer',
    period: '2025',
    summary: 'An immersive 3D world built into a web-browser that acts as an interactive portfolio experience.',
    desc: [
      'This is a creative online portfolio that looks and feels like a 3D world you can explore right inside your browser — no downloads or apps needed. It was built to show off web skills in a visually striking way.',
      'Everything you see moves and reacts in real time, from the lighting to the camera angles, creating an experience that feels more like a game than a typical website.',
      '• 3D Environment in the Browser: Visitors can interact with a fully three-dimensional scene directly on the webpage — no special software required.',
      '• Dynamic Lighting & Effects: The scene uses realistic lighting and animated visuals to create an immersive, cinematic atmosphere.',
      '• Optimized for Speed: Despite looking complex, the site loads quickly and runs smoothly even on regular computers and mobile devices.'
    ],
    tags: ['React', 'Three.js', 'WebGL', 'Tailwind CSS'],
    link: 'https://hannahjamilla.vercel.app/',
    imgs: ['/images/car.webp', '/images/portfolio.webp', '/images/2port.webp', '/images/cover-portfolio.webp']
  },
  {
    status: 'COMPLETE',
    title: 'Drug Store POS',
    badge: 'Business System',
    role: 'Full-Stack Web Developer',
    period: '2024',
    summary: 'A responsive sales and inventory management POS system designed specifically to streamline drugstore operations.',
    desc: [
      'This is a sales and inventory system built for pharmacies. It replaces manual receipts and handwritten stock lists with a clean digital system that makes running a drugstore much easier and more organized.',
      'Cashiers can ring up purchases quickly, owners can check their stock anytime, and the system even reminds staff when medicines are about to expire.',
      '• Quick and Easy Checkout: Staff can scan items and process payments in seconds, with automatic receipts generated for every transaction.',
      '• Never Run Out of Stock: The system alerts staff when a product is running low so they can restock before it\'s gone.',
      '• Medicine Expiry Reminders: Products nearing their expiration date are flagged automatically, helping the store stay safe and compliant.',
      '• Clear Sales Reports: Owners can see how much was sold each day, week, or month — all in one easy-to-read summary.'
    ],
    tags: ['PHP', 'MySQL', 'POS', 'JavaScript'],
    imgs: ['/images/2.webp', '/images/POS2.webp', '/images/5.webp', '/images/3.webp']
  },
  {
    status: 'COMPLETE',
    title: 'Tutorial Center',
    badge: 'Learning Platform',
    role: 'Full-Stack Web Developer',
    period: '2024',
    summary: 'An online educational hub for tutorial centers to smoothly transition to managing students, classes, and schedules digitally.',
    desc: [
      'This is an online platform built for tutorial centers to manage their students, classes, and tutors all in one place. No more paperwork, printed schedules, or lost enrollment forms.',
      'Both tutors and students get their own personal dashboard — tutors can track how their students are doing, and students can access their lessons and schedules anytime.',
      '• Student Dashboard: Students log in to see their class schedule, review lesson materials, and check their progress all in one place.',
      '• Tutor Tools: Tutors can record attendance, update grades, and monitor each student\'s performance with ease.',
      '• Easy Enrollment: Students can register and enroll in classes online, and the system keeps track of fees and payment status automatically.'
    ],
    tags: ['PHP', 'MySQL', 'EdTech', 'HTML/CSS'],
    imgs: ['/images/7.webp', '/images/tutorial.webp', '/images/8.webp']
  },
  {
    status: 'COMPLETE',
    title: 'Espasyo',
    badge: 'Rental Ecosystem',
    role: 'Co-Developer | Co-Researcher',
    period: 'Aug. 2024 – Oct. 2024',
    summary: 'An online rental booking platform for event venues and function halls with automated booking checks and receipts.',
    desc: [
      'Espasyo is an online platform that makes it easy to book event venues and rental spaces. Think of it like an Airbnb for function halls and event spaces — renters can check availability, make a reservation, and pay all in one place.',
      'I helped build the system and also co-wrote a research paper about it, which was accepted and published in an international academic journal.',
      '• Check Availability Instantly: Renters can see which dates are free and book a space without needing to call or visit in person.',
      '• No Double Bookings: The system automatically prevents two people from reserving the same venue at the same time.',
      '• Online Payments & Receipts: Renters can pay deposits and receive official digital receipts straight from the platform.',
      '• Published Research: Our study on Espasyo was published in the International Journal of Academic Multidisciplinary Research (IJAMR), Vol. 8, Issue 11 (2024).'
    ],
    tags: ['Billing', 'Payment', 'Inventory', 'PHP', 'Research'],
    imgs: ['/images/espasyo-1.webp', '/images/espasyo.webp', '/images/paper.webp']
  },
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
  { place: 'Creciendo Philippines', role: 'Backend Developer Intern', period: 'Nov 2025 – Feb 2026', desc: ['Developed robust backend features using Express.js and MongoDB.', 'Maintained resilient RESTful APIs for seamless integrations.'] },
  { place: 'Lightweight Solutions', role: 'Full-Stack Web Developer Intern', period: 'Mar 2026 – May 2026', desc: ['Built scalable full-stack features via React.js and Python.', 'Designed responsive UIs and optimized overall technical usability.'] },
  { place: 'AWS Cloud Clubs | NU Baliwag', role: 'Skill Development Office', period: 'Mar 2025 – June 2026', desc: ['Organized and taught interactive student cloud learning sessions.', 'Coordinated hands-on foundational AWS workshops.'] },
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


export const PERSONAL: { title: string, summary: string, desc: string[], tags: string[], link?: string, imgs: string[], wip?: boolean, role?: string, period?: string, status?: string }[] = [
  {
    title: 'PingMe',
    role: 'Full-Stack Developer',
    period: '2024',
    status: 'COMPLETE',
    summary: 'A minimalist contact page for professionals offering a seamless message-sending experience without friction.',
    desc: [
      'PingMe is a simple and stylish contact page built for professionals who want people to reach them easily. Instead of a boring email address, it gives visitors a clean and engaging way to send a message or start a conversation.',
      '• Easy to Use: Visitors just fill out a short form and hit send — no sign-ups, no complications.',
      '• Looks Great on Any Device: The design adjusts perfectly whether you open it on a phone, tablet, or computer.',
      '• Fast & Reliable: Messages are delivered instantly with no delays or errors.'
    ],
    tags: ['React', 'Tailwind', 'Framer Motion'],
    link: 'https://ping-me-seven-vert.vercel.app/',
    imgs: ['/images/PingMe.webp']
  },
  {
    title: 'GroundSpot',
    role: 'Full-Stack Developer',
    period: '2025 - Present',
    status: 'BETA',
    summary: 'A booking platform making it easy to seamlessly rent out and reserve sports courts and event venues.',
    desc: [
      'GroundSpot is an online booking platform for sports courts, gyms, and event spaces — currently being built and improved. It\'s designed to make reserving a venue as easy as ordering food online.',
      '• See What\'s Available: Users can check open time slots in real time and reserve a space with just a few clicks.',
      '• For Owners Too: Facility managers get their own dashboard to set prices, view bookings, and manage their space effortlessly.',
      '• Still Growing: New features are actively being added — this project is currently in its testing phase.'
    ],
    tags: ['React', 'Tailwind', 'Supabase'],
    link: 'https://ground-spot-frontend-web.vercel.app/',
    imgs: ['/images/GrooundSpot.webp', '/images/Login-GroundSpot.webp', '/images/GrooundSpot-dashboard.webp'],
    wip: true
  },
  {
    title: 'Tasklet',
    role: 'Full-Stack Developer',
    period: '2025 - Present',
    status: 'COMPLETE',
    wip: true,
    summary: 'A study assistant application featuring focus timers and planners to help students stay productive and on-track.',
    desc: [
      'Tasklet is a study helper app designed for students who struggle to stay focused or keep putting off their work. It gives them the right tools and gentle nudges to actually get things done.',
      '• Focus Timer: A built-in timer helps students work in short, focused bursts — a proven method to beat distraction and study more effectively.',
      '• Planning Templates: Students can download ready-made daily and weekly study planners to stay organized.',
      '• Daily Motivation: The app shows a fresh motivational quote every day to keep students encouraged and on track.'
    ],
    tags: ['React 19 + TS', 'Vite', 'Tailwind CSS v4'],
    link: 'https://tasklet-for-you.vercel.app/',
    imgs: ['/images/4-tasklet.webp', '/images/1-tasklet.webp', '/images/2-tasklet.webp', '/images/3-tasklet.webp', '/images/5-tasklet.webp', '/images/6-tasklet.webp']
  },
]
