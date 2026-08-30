import React, { useRef, useMemo, useState, useEffect } from 'react';
import {
  ArrowLeft,
  Moon,
  Sun,
  Heart,
  Sparkles,
  Utensils,
  Dog,
  Camera,
  Bookmark,
  Ban,
  Coffee,
  Smile,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Tv,
  Send,
  CheckCircle2,
  Hand,
  Lightbulb,
  Clock,
  Compass,
  X,
  Maximize2,
  Volume2,
  VolumeX,
  Layers,
  Activity,
  Film,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause
} from 'lucide-react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BeyondTheScreenProps {
  dark: boolean;
  setDark: React.Dispatch<React.SetStateAction<boolean>>;
  onBack: () => void;
}

/* ─── 3D PARTICLE FIELD: Floating Stardust ─── */
function DriftingDots({ dark, count = 240 }: { dark: boolean; count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 32;
      p[i * 3 + 1] = (Math.random() - 0.5) * 32;
      p[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.007;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.005) * 0.05;
    ref.current.position.x = state.pointer.x * 0.3;
    ref.current.position.y = state.pointer.y * 0.2;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color={dark ? '#fca5a5' : '#c2410c'}
        transparent
        opacity={dark ? 0.35 : 0.25}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── DYNAMIC AGE COMPUTATION (Born July 12, 2003 - No Hardcoding) ───
const BIRTH_DATE = new Date(2003, 6, 12); // Month 6 = July (0-indexed)

const calculateExactAge = (birthDate: Date): number => {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const calculateDaysLived = (birthDate: Date): number => {
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
};

const ARCHIVE_PHOTOS = [
  {
    id: '01',
    plate: 'Memory 01',
    tag: 'Family Roots',
    title: 'With My Beloved Nanay',
    subtitle: "Visual Archive &bull; Memory 01 — Nanay's Only Granddaughter",
    imageSrc: '/images/me-nanay.webp',
    edition: 'Family Heritage',
    year: 'Family Keepsake',
    subject: 'Hannah & Nanay',
    location: 'Manila, PH',
    atmosphere: 'Warm & Tender Love',
    quote: "Iba talaga ang alagang Nanay. Her love, gentle smiles, and warm care will always have the most special place in my heart.",
    category: 'Family',
    badgeColor: 'bg-amber-600',
    accentColor: 'text-amber-500',
    rotation: '-rotate-1'
  },
  {
    id: '02',
    plate: 'Memory 02',
    tag: 'Furry Best Friend',
    title: 'Me & Jamjam The Puppy',
    subtitle: 'Visual Archive &bull; Memory 02 — Unconditional Fluff & Joy',
    imageSrc: '/images/me-jamjam.webp',
    edition: 'Pet Companion',
    year: '2024 Archive',
    subject: 'Hannah & Jamjam',
    location: 'Home Sweet Home',
    atmosphere: 'Pure Joy & Cuddles',
    quote: 'Meet Jamjam! My fluffy little mood booster who never fails to turn any tiring day into instant happiness.',
    category: 'Pets & Joy',
    badgeColor: 'bg-blue-600',
    accentColor: 'text-blue-400',
    rotation: 'rotate-1'
  },
  {
    id: '03',
    plate: 'Memory 03',
    tag: 'Filipiniana & Toga',
    title: 'Portraits of Gratitude',
    subtitle: 'Visual Archive &bull; Memory 03 — Filipiniana Studio Series',
    imageSrc: '/images/me-grad-2.webp',
    edition: 'Studio Series',
    year: 'Graduation Archive',
    subject: 'Hannah Peralta',
    location: 'Studio Manila',
    atmosphere: 'Classic & Radiant',
    quote: 'Standing proud, grounded in faith, and forever thankful for the people who believed in me from the very start.',
    category: 'Portrait',
    badgeColor: 'bg-purple-600',
    accentColor: 'text-purple-400',
    rotation: 'rotate-2'
  },
  {
    id: '04',
    plate: 'Memory 04',
    tag: 'Childhood Throwback',
    title: 'Little Hannah (Est. 2003)',
    subtitle: 'Visual Archive &bull; Memory 04 — The Early Days',
    imageSrc: '/images/cute-kid-me-1.webp',
    edition: 'Baby Days',
    year: 'Est. 2003',
    subject: 'Baby Hannah',
    location: 'Childhood Home',
    atmosphere: 'Sweet & Cheerful',
    quote: 'The little girl who loved good food, big laughs, and had big dreams for the future. Some things never change!',
    category: 'Childhood',
    badgeColor: 'bg-rose-600',
    accentColor: 'text-rose-500',
    rotation: '-rotate-1'
  },
  {
    id: '05',
    plate: 'Memory 05',
    tag: 'Scrapbook Fragments',
    title: 'Aesthetic Life Moments',
    subtitle: 'Visual Archive &bull; Memory 05 — Everyday Collages',
    imageSrc: '/images/pic.webp',
    edition: 'Photo Collage',
    year: '2024 Collection',
    subject: 'Daily Life Fragments',
    location: 'Everyday Life',
    atmosphere: 'Cozy & Aesthetic',
    quote: 'Collecting quiet moments—golden hour skies, cozy room corners, green plants, and sweet puppy naps.',
    category: 'Scrapbook',
    badgeColor: 'bg-teal-600',
    accentColor: 'text-teal-400',
    rotation: 'rotate-1'
  },
  {
    id: '06',
    plate: 'Memory 06',
    tag: 'Advocacy & Values',
    title: 'Standing Against Corruption',
    subtitle: 'Visual Archive &bull; Memory 06 — Civic Voice & Principles',
    imageSrc: '/images/I hate corrupt.webp',
    edition: 'Civic Voice',
    year: '2024 Archive',
    subject: 'Hannah Peralta',
    location: 'Philippines',
    atmosphere: 'Principled & Vocal',
    quote: 'Standing firmly for honesty, accountability, and transparency. A better Philippines begins when we speak up against corruption.',
    category: 'Advocacy',
    badgeColor: 'bg-red-600',
    accentColor: 'text-red-500',
    rotation: '-rotate-2'
  },
  {
    id: '07',
    plate: 'Memory 07',
    tag: 'Candid Joy',
    title: 'Making Happy Memories',
    subtitle: 'Visual Archive &bull; Memory 07 — Candid Laughter',
    imageSrc: '/images/meme.webp',
    edition: 'Candid Moments',
    year: '2024 Archive',
    subject: 'Hannah Peralta',
    location: 'Manila, PH',
    atmosphere: 'Pure Laughter',
    quote: 'Capturing spontaneous moments with great people that turn into forever stories.',
    category: 'Candid',
    badgeColor: 'bg-pink-600',
    accentColor: 'text-pink-500',
    rotation: 'rotate-1'
  }
];

export default function BeyondTheScreen({ dark, setDark, onBack }: BeyondTheScreenProps) {
  const t = (isDark: boolean, d: string, l: string) => (isDark ? d : l);

  // Modern Atelier / Editorial Theme
  const bgMain = t(dark, 'bg-[#09080e]', 'bg-[#f8f5ee]');
  const textMain = t(dark, 'text-[#f5f1eb]', 'text-[#1e1715]');
  const cardBg = t(dark, 'bg-[#13111e]/85 backdrop-blur-2xl', 'bg-[#ffffff]/90 backdrop-blur-2xl');
  const cardBorder = t(dark, 'border-white/10', 'border-[#e5dcce]');

  // ─── ACTIVE ATELIER DECK SELECTOR ───
  const [activeDeck, setActiveDeck] = useState<'stories' | 'interactive' | 'gallery' | 'radar'>('stories');

  // ─── GALLERY / LOOKBOOK STATE ───
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const [isAutoPlayingFilmstrip, setIsAutoPlayingFilmstrip] = useState(false);

  const scrollFilmstrip = (direction: 'left' | 'right') => {
    if (filmstripRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      filmstripRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Auto-play filmstrip reel interval
  useEffect(() => {
    if (!isAutoPlayingFilmstrip) return;
    const interval = setInterval(() => {
      setSelectedPhotoIdx((prev) => (prev === ARCHIVE_PHOTOS.length - 1 ? 0 : prev + 1));
      if (filmstripRef.current) {
        if (filmstripRef.current.scrollLeft + filmstripRef.current.clientWidth >= filmstripRef.current.scrollWidth - 20) {
          filmstripRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          filmstripRef.current.scrollBy({ left: 220, behavior: 'smooth' });
        }
      }
    }, 3200);
    return () => clearInterval(interval);
  }, [isAutoPlayingFilmstrip]);

  // ─── HIGH-COMPATIBILITY WEB AUDIO AMBIENT SOUND GENERATOR ───
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioIntervalRef = useRef<number | null>(null);

  const startAmbientAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      let ctx = audioCtxRef.current;
      if (!ctx || ctx.state === 'closed') {
        ctx = new AudioCtx();
        audioCtxRef.current = ctx;
      }

      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.40, ctx.currentTime);

      // Bright, cheerful warm acoustic filter
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2600, ctx.currentTime);

      masterGain.connect(filter);
      filter.connect(ctx.destination);

      // ☀️ Upbeat, Cheerful & Sunny Progression (C -> F -> G -> Am -> F -> G -> C)
      const happyPatterns = [
        {
          bass: 130.81, // C3
          pad: [261.63, 329.63, 392.00], // C4, E4, G4 (C Major)
          melody: [
            { note: 523.25, time: 0.08 }, // C5
            { note: 659.25, time: 0.32 }, // E5
            { note: 783.99, time: 0.58 }, // G5
            { note: 880.00, time: 0.84 }  // A5
          ]
        },
        {
          bass: 174.61, // F3
          pad: [261.63, 349.23, 440.00], // C4, F4, A4 (F Major)
          melody: [
            { note: 880.00, time: 0.08 }, // A5
            { note: 1046.50, time: 0.32 }, // C6
            { note: 1174.66, time: 0.58 }, // D6
            { note: 1046.50, time: 0.84 }  // C6
          ]
        },
        {
          bass: 196.00, // G3
          pad: [293.66, 392.00, 493.88], // D4, G4, B4 (G Major)
          melody: [
            { note: 987.77, time: 0.08 }, // B5
            { note: 1174.66, time: 0.32 }, // D6
            { note: 987.77, time: 0.58 }, // B5
            { note: 783.99, time: 0.84 }  // G5
          ]
        },
        {
          bass: 110.00, // A2
          pad: [261.63, 329.63, 440.00], // C4, E4, A4 (Am)
          melody: [
            { note: 659.25, time: 0.08 }, // E5
            { note: 880.00, time: 0.32 }, // A5
            { note: 783.99, time: 0.58 }, // G5
            { note: 659.25, time: 0.84 }  // E5
          ]
        },
        {
          bass: 174.61, // F3
          pad: [261.63, 349.23, 440.00], // F Major
          melody: [
            { note: 659.25, time: 0.08 }, // E5
            { note: 698.46, time: 0.32 }, // F5
            { note: 783.99, time: 0.58 }, // G5
            { note: 880.00, time: 0.84 }  // A5
          ]
        },
        {
          bass: 130.81, // C3
          pad: [261.63, 329.63, 392.00, 523.25], // C Major Joy Finish!
          melody: [
            { note: 783.99, time: 0.08 }, // G5
            { note: 1046.50, time: 0.32 }, // C6
            { note: 1318.51, time: 0.60 }  // E6 (Sparkle joy!)
          ]
        }
      ];

      let patternIdx = 0;
      const playHappyMelody = () => {
        if (!ctx || ctx.state === 'closed') return;
        if (ctx.state === 'suspended') ctx.resume();

        const cur = happyPatterns[patternIdx % happyPatterns.length];
        patternIdx++;

        // 1. Bouncy Root Bass
        const bassOsc = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bassOsc.type = 'triangle';
        bassOsc.frequency.setValueAtTime(cur.bass, ctx.currentTime);
        bassGain.gain.setValueAtTime(0.001, ctx.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.06);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.6);
        bassOsc.connect(bassGain);
        bassGain.connect(masterGain);
        bassOsc.start(ctx.currentTime);
        bassOsc.stop(ctx.currentTime + 1.6);

        // 2. Playful Staccato Chords
        cur.pad.forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          const start = ctx.currentTime + 0.04 + i * 0.03;
          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.14, start + 0.06);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 1.3);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(start);
          osc.stop(start + 1.3);
        });

        // 3. Cheerful Upbeat Bell Melody
        cur.melody.forEach((item) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(item.note, ctx.currentTime);
          const start = ctx.currentTime + item.time;
          gain.gain.setValueAtTime(0.001, start);
          gain.gain.linearRampToValueAtTime(0.18, start + 0.03);
          gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.65);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(start);
          osc.stop(start + 0.65);
        });
      };

      playHappyMelody();
      const timer = window.setInterval(playHappyMelody, 1750);
      audioIntervalRef.current = timer;
    } catch (e) {
      console.warn('Web Audio error:', e);
    }
  };

  const stopAmbientAudio = () => {
    if (audioIntervalRef.current) {
      clearInterval(audioIntervalRef.current);
      audioIntervalRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
      try {
        audioCtxRef.current.close();
      } catch {}
      audioCtxRef.current = null;
    }
  };

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      stopAmbientAudio();
      setIsPlayingAudio(false);
    } else {
      startAmbientAudio();
      setIsPlayingAudio(true);
    }
  };

  // Cleanup audio when leaving page
  useEffect(() => {
    return () => {
      stopAmbientAudio();
    };
  }, []);

  // ─── MODAL SYSTEM ───
  const [activeModal, setActiveModal] = useState<{
    type: 'story' | 'photo' | 'age-stats' | 'memo' | null;
    title: string;
    subtitle?: string;
    content?: React.ReactNode;
    imageSrc?: string;
  }>({ type: null, title: '' });

  const closeModal = () => setActiveModal({ type: null, title: '' });

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (activeModal.type !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeModal.type]);

  // ─── DYNAMIC AGE GUESSING QUIZ ───
  const actualAge = useMemo(() => calculateExactAge(BIRTH_DATE), []);
  const daysLived = useMemo(() => calculateDaysLived(BIRTH_DATE), []);
  const ageOptions = useMemo(() => [actualAge - 2, actualAge - 1, actualAge, actualAge + 1], [actualAge]);

  const [selectedAgeGuess, setSelectedAgeGuess] = useState<number | null>(null);
  const [guessResult, setGuessResult] = useState<{ isCorrect: boolean; message: string } | null>(null);

  const handleAgeGuess = (guess: number) => {
    setSelectedAgeGuess(guess);
    if (guess === actualAge) {
      setGuessResult({
        isCorrect: true,
        message: `Bingo! You got it right! I am currently ${actualAge} years old (Born July 12, 2003).`
      });
    } else if (guess < actualAge) {
      setGuessResult({
        isCorrect: false,
        message: `Almost! A little bit older than that — I am currently ${actualAge} years old (Born July 12, 2003).`
      });
    } else {
      setGuessResult({
        isCorrect: false,
        message: `Haha thanks for the bonus wisdom! I am currently ${actualAge} years old (Born July 12, 2003).`
      });
    }
  };

  const handleResetGuess = () => {
    setSelectedAgeGuess(null);
    setGuessResult(null);
  };

  // ─── GUESTBOOK GREETINGS ───
  const [visitorGreetingSent, setVisitorGreetingSent] = useState<string | null>(null);
  const [greetingCounts, setGreetingCounts] = useState({
    highFive: 54,
    coffee: 38,
    puppyHug: 72,
    heart: 89
  });

  const handleSendGreeting = (type: 'highFive' | 'coffee' | 'puppyHug' | 'heart', label: string) => {
    setGreetingCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }));
    setVisitorGreetingSent(label);
    setTimeout(() => setVisitorGreetingSent(null), 3500);
  };

  // ─── DOG VS FROG MINI-GAME ───
  const [dogPets, setDogPets] = useState(14);
  const [frogScared, setFrogScared] = useState(false);

  const handlePetDog = () => setDogPets((prev) => prev + 1);
  const handlePokeFrog = () => {
    setFrogScared(true);
    setTimeout(() => setFrogScared(false), 1600);
  };

  // ─── VIBE MATCH TEST ───
  const [vibeAnswers, setVibeAnswers] = useState<{ q1?: string; q2?: string; q3?: string }>({});
  const [vibeScore, setVibeScore] = useState<number | null>(null);

  const handleAnswerVibe = (q: 'q1' | 'q2' | 'q3', ans: string) => {
    const updated = { ...vibeAnswers, [q]: ans };
    setVibeAnswers(updated);
    if (updated.q1 && updated.q2 && updated.q3) {
      setVibeScore(100);
    }
  };

  // ─── COLLAPSIBLE RADAR STATUS ───
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    watching: true,
    craving: true,
    treasuring: false,
    avoiding: false,
    listening: false,
    habit: false
  });

  const toggleItem = (key: string) => setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  const toggleAllItems = () => {
    const allOpen = Object.values(openItems).every(Boolean);
    setOpenItems({
      watching: !allOpen,
      craving: !allOpen,
      treasuring: !allOpen,
      avoiding: !allOpen,
      listening: !allOpen,
      habit: !allOpen
    });
  };

  return (
    <div className={`min-h-screen w-full ${bgMain} ${textMain} font-sans selection:bg-rose-500/30 selection:text-current transition-colors duration-700 overflow-x-hidden relative`}>

      {/* ─── 1. ARCHITECTURAL CROSS-GRID BACKGROUND ─── */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-25 transition-opacity duration-700"
        style={{
          backgroundImage: dark
            ? `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.1) 1px, transparent 0), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`
            : `radial-gradient(circle at 1px 1px, rgba(0, 0, 0, 0.08) 1px, transparent 0), linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px)`,
          backgroundSize: '36px 36px, 144px 144px, 144px 144px',
        }}
      />

      {/* ─── 2. ATMOSPHERIC AMBIENT GLOW ORBS ─── */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className={`absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[140px] transition-all duration-1000 ${dark ? 'bg-rose-600/18' : 'bg-rose-300/30'}`} />
        <div className={`absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full blur-[130px] transition-all duration-1000 ${dark ? 'bg-amber-500/15' : 'bg-amber-200/35'}`} />
        <div className={`absolute top-2/3 -left-28 w-[520px] h-[520px] rounded-full blur-[140px] transition-all duration-1000 ${dark ? 'bg-purple-700/15' : 'bg-orange-200/25'}`} />
      </div>

      {/* ─── 3. WEBGL PARTICLE CANVAS ─── */}
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
          <DriftingDots dark={dark} />
        </Canvas>
      </div>

      {/* ─── 4. MAIN CONTENT CONTAINER ─── */}
      <div className="w-full relative z-10 min-h-screen flex flex-col">

        {/* ─── TOP HEADER ─── */}
        <header
          className={`sticky top-0 z-50 w-full flex items-center justify-between py-2.5 px-4 sm:px-8 lg:px-12 border-b ${cardBorder} ${t(
            dark,
            'bg-[#09080e]/85 border-white/10',
            'bg-[#f8f5ee]/85 border-[#e5dcce]'
          )} backdrop-blur-xl transition-all duration-300 shadow-xs`}
        >
          <button
            onClick={onBack}
            className={`flex items-center gap-2 font-mono uppercase text-[9.5px] sm:text-xs font-bold transition-all px-3.5 py-1.5 border rounded-full group cursor-pointer shadow-xs ${t(
              dark,
              'border-white/20 text-zinc-100 hover:bg-white/10 hover:border-rose-400/50',
              'border-stone-300 text-stone-900 hover:bg-white hover:border-rose-600/40'
            )}`}
          >
            <ArrowLeft size={13} className="group-hover:-translate-x-1 transition-transform text-rose-500" />
            <span>Back to Portfolio</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] font-black px-3.5 py-1 rounded-full border border-current/20 backdrop-blur-md bg-white/5">
            <Compass size={12} className="text-rose-500" />
            <span>Hannah&apos;s Corner &bull; Get To Know Me</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 font-mono text-[9.5px] sm:text-xs font-bold px-3 py-1.5 border rounded-full transition-all cursor-pointer ${isPlayingAudio
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : t(dark, 'border-white/20 text-zinc-300 hover:bg-white/10', 'border-stone-300 text-stone-800 hover:bg-white')
                }`}
            >
              {isPlayingAudio ? <Volume2 size={13} className="animate-pulse" /> : <VolumeX size={13} />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Happy Music: On' : 'Chill & Happy'}</span>
            </button>

            <button
              onClick={() => setDark(!dark)}
              className={`flex items-center gap-1.5 font-mono uppercase text-[9.5px] sm:text-xs font-bold transition-all px-3.5 py-1.5 border rounded-full group cursor-pointer shadow-xs ${t(
                dark,
                'border-white/20 text-zinc-100 hover:bg-white/10 hover:border-amber-400/50',
                'border-stone-300 text-stone-900 hover:bg-white hover:border-amber-600/40'
              )}`}
              aria-label="Toggle theme"
            >
              <span className="hidden sm:inline">{dark ? 'Lights On' : 'Lights Off'}</span>
              {dark ? (
                <Sun size={13} className="text-amber-400 group-hover:rotate-90 transition-transform duration-500" />
              ) : (
                <Moon size={13} className="text-stone-800 group-hover:rotate-90 transition-transform duration-500" />
              )}
            </button>
          </div>
        </header>

        {/* ─── ORIGINAL HERO SECTION (PRESERVED & PINNED) ─── */}
        <section className={`w-full border-b ${cardBorder} relative min-h-[48vh] md:min-h-[58vh] flex items-end overflow-hidden`}>
          <div className="absolute inset-0 z-0">
            <img
              src="/images/Me-more about me.webp"
              alt="Hannah Peralta"
              className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-1000 scale-105 hover:scale-100 origin-center"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#09080e] via-[#09080e]/75 to-[#09080e]/20 mix-blend-multiply" />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#09080e] via-[#09080e]/40 to-transparent" />
          <div className="absolute top-1/4 left-0 w-full overflow-hidden pointer-events-none flex flex-col justify-center gap-12 opacity-10 select-none z-10 text-white mix-blend-overlay">
            <div className="whitespace-nowrap font-black uppercase text-[15vw] leading-none animate-marquee">
              BEYOND THE SCREEN — BEYOND THE SCREEN —{' '}
            </div>
          </div>
          <div className="relative z-20 w-full max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-12 pb-8 text-white">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10">
              <div className="flex-1">
                <div className="inline-flex items-center gap-2.5 mb-3">
                  <span className="h-px w-8 bg-rose-500" />
                  <span className="font-mono text-[9.5px] font-bold uppercase tracking-[0.25em] text-rose-300">
                    Get to know me
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl xl:text-[5.8rem] font-black uppercase tracking-tighter leading-[0.85] mb-0 drop-shadow-2xl">
                  <span className="block mb-1 font-sans font-black">Beyond</span>
                  <span className="block ml-3 sm:ml-9 text-3xl sm:text-5xl xl:text-6xl opacity-85 italic text-white/90 font-light">
                    &amp;
                  </span>
                  <span className="block mt-0.5 italic font-light tracking-tight text-[#ff5f6d] drop-shadow-[0_0_20px_rgba(255,95,109,0.35)]">
                    Behind
                  </span>
                </h1>
              </div>
              <div className="w-full md:w-1/3 flex flex-col items-start md:items-end text-left md:text-right gap-2.5 pt-3 md:pt-0">
                <div className="font-mono text-[8.5px] font-bold uppercase tracking-[0.2em] text-white/90 border border-white/25 px-3 py-1 backdrop-blur-md bg-white/10 rounded-full">
                  Hannah&apos;s World &bull; Beyond The Screen
                </div>
                <div className="font-sans text-xs sm:text-sm text-white/85 leading-relaxed max-w-sm font-normal">
                  <p>When I&apos;m away from my keyboard, this is where I share my favorite comfort food, happy photos, cute dogs, and the simple things that make me smile!</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── ATELIER DECK NAVIGATION (MOBILE-FIRST 4-SEGMENT BAR + DESKTOP TABS) ─── */}
        <section className={`w-full border-b ${cardBorder} py-2.5 sm:py-3.5 px-3 sm:px-8 lg:px-12 ${t(dark, 'bg-[#0f0d19]/95', 'bg-[#f4efe3]/95')} backdrop-blur-md sticky top-[45px] sm:top-[49px] z-40`}>
          <div className="max-w-[1360px] mx-auto">

            {/* 📱 MOBILE NAVIGATION BAR (4-TAB SEGMENTED BAR - PERFECT FIT, ZERO SCROLLBAR) */}
            <div className="sm:hidden grid grid-cols-4 gap-1 w-full bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-current/10">
              <button
                onClick={() => {
                  setActiveDeck('stories');
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl font-mono text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${activeDeck === 'stories'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <Bookmark size={14} className="mb-0.5 text-current" />
                <span>Stories</span>
              </button>

              <button
                onClick={() => {
                  setActiveDeck('interactive');
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl font-mono text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${activeDeck === 'interactive'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <Sparkles size={14} className="mb-0.5 text-current" />
                <span>Fun</span>
              </button>

              <button
                onClick={() => {
                  setActiveDeck('gallery');
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl font-mono text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${activeDeck === 'gallery'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <Camera size={14} className="mb-0.5 text-current" />
                <span>Photos</span>
              </button>

              <button
                onClick={() => {
                  setActiveDeck('radar');
                  window.scrollTo({ top: 320, behavior: 'smooth' });
                }}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl font-mono text-[9px] font-bold uppercase transition-all duration-200 cursor-pointer ${activeDeck === 'radar'
                    ? 'bg-rose-500 text-white shadow-sm'
                    : 'opacity-70 hover:opacity-100'
                  }`}
              >
                <Activity size={14} className="mb-0.5 text-current" />
                <span>Vibes</span>
              </button>
            </div>

            {/* 💻 DESKTOP & TABLET DECK TABS (SPACIOUS PILL BAR) */}
            <div className="hidden sm:flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 font-mono text-[9.5px] uppercase tracking-[0.2em] font-black opacity-80">
                <Layers size={13} className="text-rose-500" />
                <span>Explore More:</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveDeck('stories')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${activeDeck === 'stories'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : t(dark, 'bg-white/5 text-zinc-300 hover:bg-white/10', 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200')
                    }`}
                >
                  <Bookmark size={12} />
                  <span>01. My Stories</span>
                </button>

                <button
                  onClick={() => setActiveDeck('interactive')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${activeDeck === 'interactive'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : t(dark, 'bg-white/5 text-zinc-300 hover:bg-white/10', 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200')
                    }`}
                >
                  <Sparkles size={12} />
                  <span>02. Fun Corner</span>
                </button>

                <button
                  onClick={() => setActiveDeck('gallery')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${activeDeck === 'gallery'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : t(dark, 'bg-white/5 text-zinc-300 hover:bg-white/10', 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200')
                    }`}
                >
                  <Camera size={12} />
                  <span>03. Photo Album</span>
                </button>

                <button
                  onClick={() => setActiveDeck('radar')}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full font-mono text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer ${activeDeck === 'radar'
                      ? 'bg-rose-500 text-white shadow-sm'
                      : t(dark, 'bg-white/5 text-zinc-300 hover:bg-white/10', 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200')
                    }`}
                >
                  <Activity size={12} />
                  <span>04. Daily Vibes</span>
                </button>
              </div>

              <div className="hidden lg:flex items-center gap-2 font-mono text-[9px] uppercase tracking-wider opacity-70">
                <span>Born: July 12, 2003</span>
                <span>&bull;</span>
                <span>Nanay&apos;s Only Granddaughter</span>
              </div>
            </div>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════
            DECK CONTENT PANELS (CLEAN & MODERN)
        ══════════════════════════════════════════════════════════════ */}
        <main className="w-full max-w-[1360px] mx-auto px-4 sm:px-8 lg:px-12 py-8 flex-1">

          {/* ─── DECK 01: PERSONAL STORIES ─── */}
          {activeDeck === 'stories' && (
            <div className="space-y-7 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-stretch">

                {/* Story 01 */}
                <article
                  className={`p-5 sm:p-7 border-2 ${cardBorder} ${cardBg} rounded-2xl shadow-xl flex flex-col justify-between transition-all duration-300 relative`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-double border-current/20 pb-3 mb-4">
                      <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-rose-500 min-w-0">
                        <Heart size={14} className="fill-rose-500/20 shrink-0" />
                        <span className="truncate">Story 01 &bull; Comfort</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 shrink-0">Preview</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 leading-snug">
                      Comfort Zone
                    </h3>

                    <div className="font-sans text-xs sm:text-sm leading-relaxed opacity-90 mb-5">
                      <p>
                        I love traveling with fun friends, but I also cherish quiet rest days at home with comfort food and great movies.
                      </p>
                    </div>

                    {/* Favorites Grid */}
                    <div className="grid grid-cols-2 gap-2 sm:gap-2.5 pt-3 border-t border-dashed border-current/20">
                      <div className={`p-2.5 sm:p-3 border ${cardBorder} ${t(dark, 'bg-white/5', 'bg-[#fbf7ee]')} flex items-center gap-2.5 rounded-xl`}>
                        <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                          <Utensils size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">Bangus Dishes</div>
                          <div className="text-[10px] opacity-70 truncate">Favorite food</div>
                        </div>
                      </div>

                      <div className={`p-2.5 sm:p-3 border ${cardBorder} ${t(dark, 'bg-white/5', 'bg-[#fbf7ee]')} flex items-center gap-2.5 rounded-xl`}>
                        <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
                          <Sparkles size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">Ice Cream</div>
                          <div className="text-[10px] opacity-70 truncate">Sweet treat</div>
                        </div>
                      </div>

                      <div className={`p-2.5 sm:p-3 border ${cardBorder} ${t(dark, 'bg-white/5', 'bg-[#fbf7ee]')} flex items-center gap-2.5 rounded-xl`}>
                        <div className="w-7 h-7 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0">
                          <Dog size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">Cute Dogs</div>
                          <div className="text-[10px] opacity-70 truncate">Mood booster</div>
                        </div>
                      </div>

                      <div className={`p-2.5 sm:p-3 border ${cardBorder} ${t(dark, 'bg-white/5', 'bg-[#fbf7ee]')} flex items-center gap-2.5 rounded-xl`}>
                        <div className="w-7 h-7 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
                          <Ban size={14} />
                        </div>
                        <div className="min-w-0">
                          <div className="text-xs font-bold truncate">No Frogs</div>
                          <div className="text-[10px] opacity-70 truncate">Strictly banned</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-current/10 flex items-center justify-between mt-4">
                    <span className="font-mono text-[9px] opacity-60">Personal Archives</span>
                    <button
                      onClick={() => setActiveModal({
                        type: 'story',
                        title: 'Comfort Zone',
                        subtitle: 'Personal Life &bull; Simple Joys',
                        content: (
                          <div className="space-y-4 font-sans text-xs sm:text-sm leading-relaxed">
                            {/* Reflection Box */}
                            <div className="p-4 sm:p-5 rounded-2xl border border-current/15 bg-current/5">
                              <p className="mb-2">
                                I love traveling and going out when surrounded by fun, positive people who bring good energy. But I equally cherish recharging at home&mdash;curled up in cozy blankets, watching favorite shows, and enjoying complete peace.
                              </p>
                            </div>

                            {/* Food Grid */}
                            <div className="space-y-2">
                              <div className="font-mono text-xs uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                                <Utensils size={14} />
                                <span>Comfort Food Favorites</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2.5">
                                <div className="p-3 border rounded-xl bg-current/5">
                                  <div className="font-bold text-xs">Sinigang &amp; Adobo</div>
                                  <div className="text-[10px] opacity-70">Super sour sinigang &amp; savory classic adobo</div>
                                </div>
                                <div className="p-3 border rounded-xl bg-current/5">
                                  <div className="font-bold text-xs">Lahat ng Bangus</div>
                                  <div className="text-[10px] opacity-70">Prito, inihaw, sinigang &amp; daing</div>
                                </div>
                                <div className="col-span-2 p-3 border rounded-xl bg-current/5 flex items-center justify-between">
                                  <div>
                                    <div className="font-bold text-xs">Strawberry &amp; Vanilla Ice Cream</div>
                                    <div className="text-[10px] opacity-70">My go-to comfort treat after every meal</div>
                                  </div>
                                  <span className="font-mono text-xs font-bold text-rose-500">Favorite</span>
                                </div>
                              </div>
                            </div>

                            {/* Routine Timeline */}
                            <div className="p-3.5 sm:p-4 rounded-xl border border-current/15 bg-current/5 space-y-2">
                              <div className="font-mono text-xs uppercase tracking-wider text-purple-400 font-bold flex items-center gap-1.5">
                                <Clock size={13} />
                                <span>Ideal Rest Day Routine</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
                                <div className="p-2 rounded-lg bg-current/5">
                                  <span className="font-mono font-bold text-rose-500 block">Morning</span>
                                  <span className="opacity-80">Slow wake-up, hot coffee &amp; comfy pajamas</span>
                                </div>
                                <div className="p-2 rounded-lg bg-current/5">
                                  <span className="font-mono font-bold text-amber-500 block">Afternoon</span>
                                  <span className="opacity-80">Favorite drama series &amp; puppy cuddle time</span>
                                </div>
                                <div className="p-2 rounded-lg bg-current/5">
                                  <span className="font-mono font-bold text-emerald-500 block">Evening</span>
                                  <span className="opacity-80">Warm family dinner &amp; sweet ice cream</span>
                                </div>
                              </div>
                            </div>

                            {/* Rule Banner */}
                            <div className="p-3 rounded-xl border border-red-500/30 bg-red-500/10 flex items-center gap-2.5">
                              <Ban size={18} className="text-red-500 shrink-0" />
                              <div className="text-xs">
                                <span className="font-bold block text-red-400">Strict Rule: No Frogs Allowed!</span>
                                <span className="opacity-80">They give me the biggest fright haha! Zero frogs in my world.</span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 font-mono text-[9px] uppercase tracking-wider">
                              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold">Cozy Living</span>
                              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">Good Energy</span>
                              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">Dog Lover</span>
                              <span className="px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-bold">Foodie</span>
                            </div>

                            {/* Quote */}
                            <div className={`p-3.5 sm:p-4 border-l-4 rounded-r-xl font-medium italic ${t(dark, 'border-rose-500 bg-rose-500/10 text-rose-200', 'border-rose-600 bg-rose-50 text-rose-900')}`}>
                              &ldquo;My comfort zone is simple: good food, cute dogs, good people, and lots of genuine laughter.&rdquo;
                            </div>
                          </div>
                        )
                      })}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[9.5px] font-bold uppercase tracking-wider bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-xs"
                    >
                      <Maximize2 size={11} />
                      <span>Read Story</span>
                    </button>
                  </div>
                </article>

                {/* Story 02 */}
                <article
                  className={`p-5 sm:p-7 border-2 ${cardBorder} ${cardBg} rounded-2xl shadow-xl flex flex-col justify-between transition-all duration-300 relative`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-double border-current/20 pb-3 mb-4">
                      <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-500 min-w-0">
                        <Bookmark size={14} className="shrink-0" />
                        <span className="truncate">Story 02 &bull; Memories</span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 shrink-0">Preview</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-3 leading-snug">
                      Cherished Memories
                    </h3>

                    <div className="font-sans text-xs sm:text-sm leading-relaxed opacity-90 mb-5">
                      <p>
                        Growing up as Nanay&apos;s only granddaughter, iba talaga ang alagang Nanay&mdash;filled with gentle smiles, heartfelt letters, and memories I hold close forever.
                      </p>
                    </div>

                    <div className={`p-3.5 border-l-4 border-double rounded-r-xl ${t(dark, 'border-amber-400 bg-amber-500/10 text-amber-100', 'border-amber-600 bg-amber-50 text-amber-950')}`}>
                      <p className="font-sans italic text-xs sm:text-sm leading-relaxed font-medium">
                        &ldquo;Iba talaga ang alagang Nanay. Her unconditional love, sweet smile, and warm care stay in my heart forever.&rdquo;
                      </p>
                      <span className="font-mono text-[8.5px] uppercase tracking-widest font-black block mt-1 opacity-80">
                        Nanay&apos;s Girl &bull; Only Granddaughter
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-current/10 flex items-center justify-between mt-4">
                    <span className="font-mono text-[9px] opacity-60">Family Love</span>
                    <button
                      onClick={() => setActiveModal({
                        type: 'story',
                        title: 'Cherished Memories',
                        subtitle: 'Family Roots &bull; Nanay’s Only Granddaughter',
                        content: (
                          <div className="space-y-4 font-sans text-xs sm:text-sm leading-relaxed">
                            {/* Summary */}
                            <div className="p-4 sm:p-5 rounded-2xl border border-current/15 bg-current/5">
                              <p>
                                Being the only granddaughter to my Nanay on my mother&apos;s side, iba talaga ang alagang Nanay. I grew up surrounded by gentle smiles, unconditional warmth, and special care that shaped who I am today.
                              </p>
                            </div>

                            {/* Keepsake Highlights */}
                            <div className="space-y-2">
                              <div className="font-mono text-xs uppercase tracking-wider text-rose-500 font-bold flex items-center gap-1.5">
                                <Bookmark size={14} />
                                <span>Memory Keepsake Collection</span>
                              </div>
                              <div className="grid grid-cols-2 gap-2.5">
                                <div className="p-3 border rounded-xl bg-current/5 flex items-center gap-2.5">
                                  <Send size={15} className="text-rose-500 shrink-0" />
                                  <div>
                                    <div className="font-bold text-xs">Handwritten Letters</div>
                                    <div className="text-[10px] opacity-70">Heartfelt birthday &amp; milestone cards</div>
                                  </div>
                                </div>
                                <div className="p-3 border rounded-xl bg-current/5 flex items-center gap-2.5">
                                  <Camera size={15} className="text-amber-500 shrink-0" />
                                  <div>
                                    <div className="font-bold text-xs">Vintage Polaroids</div>
                                    <div className="text-[10px] opacity-70">Candid moments with loved ones</div>
                                  </div>
                                </div>
                                <div className="p-3 border rounded-xl bg-current/5 flex items-center gap-2.5">
                                  <Sparkles size={15} className="text-purple-400 shrink-0" />
                                  <div>
                                    <div className="font-bold text-xs">Gift Boxes &amp; Ribbons</div>
                                    <div className="text-[10px] opacity-70">Preserving special moment boxes</div>
                                  </div>
                                </div>
                                <div className="p-3 border rounded-xl bg-current/5 flex items-center gap-2.5">
                                  <Smile size={15} className="text-emerald-500 shrink-0" />
                                  <div>
                                    <div className="font-bold text-xs">Sentimental Tokens</div>
                                    <div className="text-[10px] opacity-70">Little souvenirs with meaningful stories</div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Special Habit Card */}
                            <div className="p-3.5 sm:p-4 rounded-xl border border-current/15 bg-current/5 space-y-1.5">
                              <div className="font-mono text-xs uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                                <Sparkles size={13} />
                                <span>The Gift Packaging Habit</span>
                              </div>
                              <p className="text-[11px] opacity-85 leading-relaxed">
                                Whenever I receive a meaningful gift, I always preserve the packaging and ribbon too. Keeping them preserves the exact feeling of that happy memory in time.
                              </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-1.5 font-mono text-[9px] uppercase tracking-wider">
                              <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20 font-bold">Only Granddaughter</span>
                              <span className="px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold">Letter Collector</span>
                              <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-bold">Family Roots</span>
                              <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">Heartfelt Memories</span>
                            </div>

                            {/* Quote */}
                            <div className={`p-3.5 sm:p-4 border-l-4 rounded-r-xl font-medium italic ${t(dark, 'border-amber-400 bg-amber-500/10 text-amber-200', 'border-amber-600 bg-amber-50 text-amber-900')}`}>
                              &ldquo;Physical items come and go, but the memories, love, and handwritten words attached to them will last forever.&rdquo;
                            </div>
                          </div>
                        )
                      })}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-mono text-[9.5px] font-bold uppercase tracking-wider bg-amber-600 text-white hover:bg-amber-700 cursor-pointer shadow-xs"
                    >
                      <Maximize2 size={11} />
                      <span>Read Story</span>
                    </button>
                  </div>
                </article>

              </div>
            </div>
          )}

          {/* ─── DECK 02: INTERACTIVE LOUNGE ─── */}
          {activeDeck === 'interactive' && (
            <div className="space-y-7 animate-fade-in">
              
              {/* Top Row: Birthday Terminal + Live Guestbook Kiosk */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">

                {/* Left: Birthday & Age Terminal (7 Cols) */}
                <div
                  className={`lg:col-span-7 p-5 sm:p-7 border-2 ${cardBorder} ${cardBg} rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-dashed border-current/20 pb-3 mb-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shrink-0">
                          <Sparkles size={14} />
                        </div>
                        <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-rose-500 truncate">
                          July 12, 2003
                        </span>
                      </div>
                      <span className="font-mono text-[9px] uppercase tracking-widest opacity-60 shrink-0">Quiz</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight mb-2">
                      Can You Guess My Age?
                    </h3>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-85 mb-4">
                      Born on July 12, 2003. Based on today&apos;s date, take a guess below:
                    </p>

                    <div className="grid grid-cols-4 gap-2 sm:gap-2.5 mb-4">
                      {ageOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleAgeGuess(option)}
                          className={`py-2.5 sm:py-3 px-1 sm:px-2 rounded-2xl border text-center font-mono text-base sm:text-lg font-black transition-all cursor-pointer ${selectedAgeGuess === option
                              ? option === actualAge
                                ? 'bg-emerald-500 text-white border-emerald-500 shadow-md scale-105'
                                : 'bg-rose-500 text-white border-rose-500 shadow-md scale-105'
                              : t(
                                dark,
                                'bg-white/5 border-white/10 hover:bg-rose-500/20 hover:border-rose-500/40',
                                'bg-[#fbf7ee] border-stone-300 hover:bg-rose-100 hover:border-rose-300'
                              )
                            }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {guessResult && (
                      <div className={`p-3 rounded-2xl border text-xs leading-relaxed animate-fade-in mb-3 ${guessResult.isCorrect
                          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-400 font-medium'
                          : 'bg-rose-500/15 border-rose-500/40 text-rose-300 font-medium'
                        }`}>
                        <div className="flex items-center gap-1.5 font-bold mb-0.5">
                          {guessResult.isCorrect ? <CheckCircle2 size={15} className="text-emerald-400 shrink-0" /> : <Sparkles size={15} className="text-rose-400 shrink-0" />}
                          <span className="font-mono text-xs uppercase tracking-wider">{guessResult.isCorrect ? 'Correct Guess!' : 'Good Try!'}</span>
                        </div>
                        <div>{guessResult.message}</div>
                      </div>
                    )}
                  </div>

                  <div className="pt-3.5 border-t border-current/10 flex flex-wrap items-center justify-between gap-2 mt-2">
                    <button
                      onClick={() => setActiveModal({
                        type: 'age-stats',
                        title: 'Time Breakdown',
                        subtitle: 'July 12, 2003 &bull; Milestones',
                        content: (
                          <div className="space-y-4 font-sans text-xs sm:text-sm">
                            <div className="p-4 rounded-2xl border border-current/15 bg-current/5">
                              <div className="font-mono text-xs uppercase tracking-wider text-rose-500 font-bold mb-1">
                                July 12, 2003 &bull; Milestone Chronology
                              </div>
                              <p className="opacity-90 leading-relaxed">
                                Dynamic real-time calculation computed live against today&apos;s system date.
                              </p>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                              <div className="p-3 border rounded-xl bg-current/5">
                                <div className="font-mono text-[9px] uppercase tracking-wider opacity-60">Birth Date</div>
                                <div className="font-bold text-sm">July 12, 2003</div>
                              </div>
                              <div className="p-3 border rounded-xl bg-current/5">
                                <div className="font-mono text-[9px] uppercase tracking-wider opacity-60">Calculated Age</div>
                                <div className="font-bold text-sm text-rose-500">{actualAge} Years Old</div>
                              </div>
                              <div className="p-3 border rounded-xl bg-current/5">
                                <div className="font-mono text-[9px] uppercase tracking-wider opacity-60">Days on Earth</div>
                                <div className="font-bold text-sm text-amber-500">~{daysLived.toLocaleString()} Days</div>
                              </div>
                              <div className="p-3 border rounded-xl bg-current/5">
                                <div className="font-mono text-[9px] uppercase tracking-wider opacity-60">Zodiac Sign</div>
                                <div className="font-bold text-sm text-purple-400">Cancer (Crab)</div>
                              </div>
                            </div>

                            {/* Fun Life Milestones */}
                            <div className="p-3.5 sm:p-4 rounded-xl border border-current/15 bg-current/5 space-y-2">
                              <div className="font-mono text-xs uppercase tracking-wider text-amber-500 font-bold flex items-center gap-1.5">
                                <Sparkles size={14} />
                                <span>Fun Life Milestones</span>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-current/5">
                                  <Clock size={14} className="text-rose-500 shrink-0" />
                                  <span>~{(daysLived * 24).toLocaleString()} hours of creative adventures</span>
                                </div>
                                <div className="flex items-center gap-2 p-2 rounded-lg bg-current/5">
                                  <Heart size={14} className="text-amber-500 shrink-0" />
                                  <span>~{(daysLived * 100000).toLocaleString()} heartbeats of memories</span>
                                </div>
                              </div>
                            </div>

                            <div className={`p-3.5 sm:p-4 border-l-4 rounded-r-xl font-medium italic ${t(dark, 'border-rose-500 bg-rose-500/10 text-rose-200', 'border-rose-600 bg-rose-50 text-rose-900')}`}>
                              &ldquo;Every day is a canvas to create something meaningful, laugh with good friends, and cherish life.&rdquo;
                            </div>
                          </div>
                        )
                      })}
                      className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-rose-500 hover:underline cursor-pointer font-bold"
                    >
                      <Maximize2 size={13} />
                      <span>View Breakdown</span>
                    </button>

                    {selectedAgeGuess !== null && (
                      <button
                        onClick={handleResetGuess}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider bg-rose-600 text-white hover:bg-rose-700 cursor-pointer shadow-xs"
                      >
                        <RefreshCw size={12} />
                        <span>Guess Again</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Right: Live Guestbook Reaction Kiosk (5 Cols) */}
                <div
                  className={`lg:col-span-5 p-5 sm:p-7 border-2 ${cardBorder} ${cardBg} rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-dashed border-current/20 pb-3 mb-4">
                      <div className="flex items-center gap-2 min-w-0">
                        <div className="w-7 h-7 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shrink-0">
                          <Send size={14} />
                        </div>
                        <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-rose-500 truncate">
                          Live Guestbook
                        </span>
                      </div>
                      <span className="font-mono text-[9px] opacity-60 uppercase shrink-0">Reactions</span>
                    </div>

                    <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight mb-2">
                      Send A Little Love
                    </h3>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-85 mb-4">
                      Tap any button below to send your greeting in real-time:
                    </p>

                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3 mb-4">
                      <button
                        onClick={() => handleSendGreeting('highFive', 'High Five sent to Hannah!')}
                        className={`p-2.5 sm:p-3 rounded-2xl border ${cardBorder} ${t(dark, 'bg-white/5 hover:bg-rose-500/20', 'bg-[#fbf7ee] hover:bg-rose-100')} transition-all cursor-pointer flex items-center justify-between group/btn`}
                      >
                        <div className="flex items-center gap-2">
                          <Hand size={16} className="text-rose-500 group-hover/btn:scale-110 transition-transform shrink-0" />
                          <span className="text-xs font-bold truncate">High Five</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/10 font-mono text-[10px] font-bold text-rose-500 shrink-0">{greetingCounts.highFive}</span>
                      </button>

                      <button
                        onClick={() => handleSendGreeting('coffee', 'Virtual Coffee sent to Hannah!')}
                        className={`p-2.5 sm:p-3 rounded-2xl border ${cardBorder} ${t(dark, 'bg-white/5 hover:bg-amber-500/20', 'bg-[#fbf7ee] hover:bg-amber-100')} transition-all cursor-pointer flex items-center justify-between group/btn`}
                      >
                        <div className="flex items-center gap-2">
                          <Coffee size={16} className="text-amber-500 group-hover/btn:scale-110 transition-transform shrink-0" />
                          <span className="text-xs font-bold truncate">Coffee</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 font-mono text-[10px] font-bold text-amber-500 shrink-0">{greetingCounts.coffee}</span>
                      </button>

                      <button
                        onClick={() => handleSendGreeting('puppyHug', 'Puppy hug sent to Hannah!')}
                        className={`p-2.5 sm:p-3 rounded-2xl border ${cardBorder} ${t(dark, 'bg-white/5 hover:bg-emerald-500/20', 'bg-[#fbf7ee] hover:bg-emerald-100')} transition-all cursor-pointer flex items-center justify-between group/btn`}
                      >
                        <div className="flex items-center gap-2">
                          <Dog size={16} className="text-emerald-500 group-hover/btn:scale-110 transition-transform shrink-0" />
                          <span className="text-xs font-bold truncate">Puppy Hug</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 font-mono text-[10px] font-bold text-emerald-500 shrink-0">{greetingCounts.puppyHug}</span>
                      </button>

                      <button
                        onClick={() => handleSendGreeting('heart', 'Warm Love sent to Hannah!')}
                        className={`p-2.5 sm:p-3 rounded-2xl border ${cardBorder} ${t(dark, 'bg-white/5 hover:bg-pink-500/20', 'bg-[#fbf7ee] hover:bg-pink-100')} transition-all cursor-pointer flex items-center justify-between group/btn`}
                      >
                        <div className="flex items-center gap-2">
                          <Heart size={16} className="text-pink-500 group-hover/btn:scale-110 transition-transform shrink-0" />
                          <span className="text-xs font-bold truncate">Warm Love</span>
                        </div>
                        <span className="px-2 py-0.5 rounded-full bg-pink-500/10 font-mono text-[10px] font-bold text-pink-500 shrink-0">{greetingCounts.heart}</span>
                      </button>
                    </div>
                  </div>

                  {visitorGreetingSent ? (
                    <div className="p-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-center font-bold text-xs animate-fade-in">
                      {visitorGreetingSent} &mdash; Thank you!
                    </div>
                  ) : (
                    <div className="text-[10.5px] opacity-65 italic text-center font-sans pt-2 border-t border-current/10">
                      Tap any button above to register a reaction.
                    </div>
                  )}
                </div>

              </div>

              {/* Bottom Row: Puppy/Frog Mini-Game + Visitor Vibe Soulmate Test */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

                {/* Left: Puppy vs Frog Arcade */}
                <div
                  className={`p-5 sm:p-7 border-2 ${cardBorder} ${cardBg} rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-dashed border-current/20 pb-3 mb-4">
                      <div className="flex items-center gap-2 font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-amber-500 min-w-0">
                        <Dog size={15} className="shrink-0" />
                        <span className="truncate">Mini-Game</span>
                      </div>
                      <span className="font-mono text-[9px] opacity-60 uppercase shrink-0">Tap to Play</span>
                    </div>

                    <h4 className="text-lg sm:text-2xl font-black uppercase tracking-tight mb-2">
                      Pet Jamjam vs The Frog
                    </h4>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-85 mb-4">
                      Hannah loves dogs and strictly bans frogs. Try interacting with both:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Pet Dog Button */}
                      <div
                        onClick={handlePetDog}
                        className={`p-4 sm:p-5 rounded-2xl border-2 ${t(
                          dark,
                          'bg-emerald-950/30 hover:bg-emerald-900/40 border-emerald-500/40 text-emerald-300',
                          'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900'
                        )} cursor-pointer transition-all duration-200 active:scale-95 text-center flex flex-col items-center justify-center shadow-md group`}
                      >
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Dog size={24} className="text-emerald-500" />
                        </div>
                        <div className="font-black text-xs sm:text-sm uppercase tracking-tight">Pet Cute Jamjam</div>
                        <div className="font-mono text-[11px] text-emerald-600 font-bold mt-1">
                          Pets: {dogPets} (Wagging)
                        </div>
                      </div>

                      {/* Poke Frog Button */}
                      <div
                        onClick={handlePokeFrog}
                        className={`p-4 sm:p-5 rounded-2xl border-2 ${t(
                          dark,
                          'bg-rose-950/30 hover:bg-rose-900/40 border-rose-500/40 text-rose-300',
                          'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900'
                        )} cursor-pointer transition-all duration-200 active:scale-95 text-center flex flex-col items-center justify-center shadow-md group`}
                      >
                        <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-rose-500/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                          <Ban size={24} className={`text-rose-500 ${frogScared ? 'animate-bounce text-red-500' : ''}`} />
                        </div>
                        <div className="font-black text-xs sm:text-sm uppercase tracking-tight">
                          {frogScared ? 'Shoo! Hahaha' : 'Poke The Frog'}
                        </div>
                        <div className="font-mono text-[11px] text-rose-600 font-bold mt-1">
                          {frogScared ? 'Frog jumped away!' : 'Strictly Banned!'}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3.5 border-t border-current/10 font-mono text-[9.5px] opacity-60 text-center mt-3.5">
                    Jamjam loves scratches &bull; Zero frogs allowed!
                  </div>
                </div>

                {/* Right: Visitor Vibe Soulmate Test */}
                <div
                  className={`p-5 sm:p-7 border-2 ${cardBorder} ${cardBg} rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 border-b border-dashed border-current/20 pb-3 mb-4">
                      <div className="flex items-center gap-1.5 font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-rose-500 min-w-0">
                        <Sparkles size={14} className="shrink-0" />
                        <span className="truncate">Vibe Matcher</span>
                      </div>
                      <span className="font-mono text-[9px] opacity-60 uppercase shrink-0">Quiz</span>
                    </div>

                    <h4 className="text-lg sm:text-2xl font-black uppercase tracking-tight mb-2">
                      Are We Vibe Soulmates?
                    </h4>
                    <p className="font-sans text-xs sm:text-sm leading-relaxed opacity-85 mb-4">
                      Pick your honest favorites to see how much we match:
                    </p>

                    <div className="space-y-3 font-sans text-xs">
                      {/* Q1 */}
                      <div>
                        <div className="font-bold mb-1 text-xs">1. Ideal Weekend Vibe?</div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleAnswerVibe('q1', 'stayIn')}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left cursor-pointer transition-all text-xs ${vibeAnswers.q1 === 'stayIn' ? 'bg-rose-500 text-white font-bold shadow-xs' : t(dark, 'bg-white/5 border-white/10 hover:bg-white/10', 'bg-[#fbf7ee] border-stone-300 hover:bg-stone-200')}`}
                          >
                            Staying in &amp; chilling
                          </button>
                          <button
                            onClick={() => handleAnswerVibe('q1', 'goOut')}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left cursor-pointer transition-all text-xs ${vibeAnswers.q1 === 'goOut' ? 'bg-rose-500 text-white font-bold shadow-xs' : t(dark, 'bg-white/5 border-white/10 hover:bg-white/10', 'bg-[#fbf7ee] border-stone-300 hover:bg-stone-200')}`}
                          >
                            Fun road trip
                          </button>
                        </div>
                      </div>

                      {/* Q2 */}
                      <div>
                        <div className="font-bold mb-1 text-xs">2. Comfort Food Pick?</div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleAnswerVibe('q2', 'filipino')}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left cursor-pointer transition-all text-xs ${vibeAnswers.q2 === 'filipino' ? 'bg-amber-500 text-white font-bold shadow-xs' : t(dark, 'bg-white/5 border-white/10 hover:bg-white/10', 'bg-[#fbf7ee] border-stone-300 hover:bg-stone-200')}`}
                          >
                            Sinigang &amp; Adobo
                          </button>
                          <button
                            onClick={() => handleAnswerVibe('q2', 'sweets')}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left cursor-pointer transition-all text-xs ${vibeAnswers.q2 === 'sweets' ? 'bg-amber-500 text-white font-bold shadow-xs' : t(dark, 'bg-white/5 border-white/10 hover:bg-white/10', 'bg-[#fbf7ee] border-stone-300 hover:bg-stone-200')}`}
                          >
                            Ice Cream
                          </button>
                        </div>
                      </div>

                      {/* Q3 */}
                      <div>
                        <div className="font-bold mb-1 text-xs">3. Cute Dogs vs Frogs?</div>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            onClick={() => handleAnswerVibe('q3', 'dogs')}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left cursor-pointer transition-all text-xs ${vibeAnswers.q3 === 'dogs' ? 'bg-emerald-500 text-white font-bold shadow-xs' : t(dark, 'bg-white/5 border-white/10 hover:bg-white/10', 'bg-[#fbf7ee] border-stone-300 hover:bg-stone-200')}`}
                          >
                            Cute Fluffy Dogs
                          </button>
                          <button
                            onClick={() => handleAnswerVibe('q3', 'nofrogs')}
                            className={`p-2 sm:p-2.5 rounded-xl border text-left cursor-pointer transition-all text-xs ${vibeAnswers.q3 === 'nofrogs' ? 'bg-emerald-500 text-white font-bold shadow-xs' : t(dark, 'bg-white/5 border-white/10 hover:bg-white/10', 'bg-[#fbf7ee] border-stone-300 hover:bg-stone-200')}`}
                          >
                            No Frogs Allowed
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {vibeScore !== null ? (
                    <div className="mt-3.5 p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-rose-500/20 to-amber-500/20 border border-rose-500/40 text-center animate-fade-in">
                      <div className="font-bold text-xs text-rose-500 flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={14} />
                        <span>You and Hannah are 100% Vibe Soulmates!</span>
                      </div>
                    </div>
                  ) : (
                    <div className="pt-3 border-t border-current/10 font-mono text-[9px] opacity-60 text-center mt-3">
                      Select all 3 choices above to calculate compatibility!
                    </div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* ─── DECK 03: VISUAL ARCHIVES (OPEN SCRAPBOOK ALBUM & FILMSTRIP LOOKBOOK) ─── */}
          {activeDeck === 'gallery' && (
            <div className="space-y-8 animate-fade-in">
              
              {/* Top Editorial Album Header (Single-Row Capsule Layout) */}
              <div className="flex items-center justify-between gap-3 border-b border-current/15 pb-3.5">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shadow-xs shrink-0">
                    <Camera size={15} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider truncate">
                      Memory Lookbook
                    </h3>
                    <span className="font-mono text-[9px] opacity-60 uppercase tracking-widest block truncate">
                      Vol. 01 &bull; {ARCHIVE_PHOTOS.length} Memories
                    </span>
                  </div>
                </div>

                {/* Compact Pagination Capsule */}
                <div className="flex items-center gap-1 border border-current/20 rounded-full p-1 bg-current/5 font-mono text-xs shrink-0">
                  <button
                    onClick={() => setSelectedPhotoIdx((prev) => (prev === 0 ? ARCHIVE_PHOTOS.length - 1 : prev - 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Previous Page"
                  >
                    <ChevronLeft size={14} />
                  </button>
                  <span className="px-2 font-bold text-[10.5px] whitespace-nowrap">
                    0{selectedPhotoIdx + 1}&thinsp;/&thinsp;0{ARCHIVE_PHOTOS.length}
                  </span>
                  <button
                    onClick={() => setSelectedPhotoIdx((prev) => (prev === ARCHIVE_PHOTOS.length - 1 ? 0 : prev + 1))}
                    className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                    aria-label="Next Page"
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>

              {/* 📖 THE OPEN PHOTO ALBUM SPREAD (TWO-PAGE BOOK FORMAT) */}
              <div className={`p-5 sm:p-8 lg:p-10 border-2 ${cardBorder} ${cardBg} rounded-3xl shadow-2xl relative overflow-hidden`}>
                
                {/* Center Book Spine Line (Desktop) */}
                <div className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-current/15 to-transparent pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-center">
                  
                  {/* LEFT PAGE: The Mounted Polaroid Plate (6 Cols) */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center">
                    
                    {/* Polaroid Scrapbook Mount */}
                    <div
                      onClick={() => setActiveModal({
                        type: 'photo',
                        title: ARCHIVE_PHOTOS[selectedPhotoIdx].title,
                        subtitle: ARCHIVE_PHOTOS[selectedPhotoIdx].subtitle,
                        imageSrc: ARCHIVE_PHOTOS[selectedPhotoIdx].imageSrc,
                        content: (
                          <div className="mt-4 space-y-3 font-sans text-xs sm:text-sm">
                            <div className="grid grid-cols-2 gap-2 font-mono text-[9.5px]">
                              <div className="p-2.5 rounded-xl border border-current/15 bg-current/5">
                                <div className="opacity-60 uppercase">Year</div>
                                <div className="font-bold text-xs">{ARCHIVE_PHOTOS[selectedPhotoIdx].year}</div>
                              </div>
                              <div className="p-2.5 rounded-xl border border-current/15 bg-current/5">
                                <div className="opacity-60 uppercase">Subject</div>
                                <div className="font-bold text-xs">{ARCHIVE_PHOTOS[selectedPhotoIdx].subject}</div>
                              </div>
                            </div>
                            <div className={`p-3.5 border-l-4 rounded-r-xl font-bold italic ${t(dark, 'border-rose-500 bg-rose-500/10 text-rose-200', 'border-rose-600 bg-rose-50 text-rose-900')}`}>
                              &ldquo;{ARCHIVE_PHOTOS[selectedPhotoIdx].quote}&rdquo;
                            </div>
                          </div>
                        )
                      })}
                      className={`w-full max-w-md p-5 pb-7 ${t(dark, 'bg-[#1a1727] text-white', 'bg-[#ffffff] text-stone-900')} rounded-2xl shadow-2xl border border-current/20 cursor-pointer relative group transition-transform duration-300 hover:scale-[1.02]`}
                    >
                      {/* Top Washi Tape Corner */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-400/40 backdrop-blur-xs border border-amber-500/30 rounded-xs shadow-xs transform -rotate-1 pointer-events-none flex items-center justify-center font-mono text-[8px] uppercase tracking-widest font-black text-stone-800">
                        ✦ {ARCHIVE_PHOTOS[selectedPhotoIdx].tag} ✦
                      </div>

                      {/* Image Frame */}
                      <div className="w-full bg-black/70 rounded-xl mb-4 p-2.5 flex items-center justify-center min-h-[260px] sm:min-h-[320px]">
                        <img
                          src={ARCHIVE_PHOTOS[selectedPhotoIdx].imageSrc}
                          alt={ARCHIVE_PHOTOS[selectedPhotoIdx].title}
                          className="max-w-full max-h-[320px] w-auto h-auto object-contain rounded-lg transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      </div>

                      {/* Handwritten-Style Bottom Stamp */}
                      <div className="flex items-center justify-between pt-2 border-t border-dashed border-current/20 font-mono text-[10px]">
                        <span className="font-black tracking-wider uppercase text-rose-500">
                          {ARCHIVE_PHOTOS[selectedPhotoIdx].plate}
                        </span>
                        <span className="opacity-70 italic font-sans text-xs">
                          {ARCHIVE_PHOTOS[selectedPhotoIdx].category}
                        </span>
                      </div>

                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center gap-2 text-white font-mono text-xs uppercase tracking-wider backdrop-blur-xs">
                        <Maximize2 size={16} />
                        <span>Click to Enlarge</span>
                      </div>
                    </div>
                  </div>

                  {/* RIGHT PAGE: The Journal Entry & Story (6 Cols) */}
                  <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                    
                    {/* Header */}
                    <div>
                      <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-rose-500 font-bold mb-1.5">
                        <Sparkles size={14} />
                        <span>Memory Journal &bull; Entry 0{selectedPhotoIdx + 1} of 0{ARCHIVE_PHOTOS.length}</span>
                      </div>

                      <h4 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-1.5">
                        {ARCHIVE_PHOTOS[selectedPhotoIdx].title}
                      </h4>

                      <p className="font-mono text-xs opacity-70">
                        {ARCHIVE_PHOTOS[selectedPhotoIdx].category} &bull; {ARCHIVE_PHOTOS[selectedPhotoIdx].year}
                      </p>
                    </div>

                    {/* Memory Quote Plaque */}
                    <div className={`p-4 sm:p-5 rounded-2xl border-l-4 ${t(dark, 'bg-white/5 border-rose-500 text-rose-100', 'bg-black/5 border-rose-600 text-stone-900')}`}>
                      <p className="font-sans text-sm sm:text-base italic leading-relaxed mb-2">
                        &ldquo;{ARCHIVE_PHOTOS[selectedPhotoIdx].quote}&rdquo;
                      </p>
                      <div className="font-mono text-[9px] uppercase tracking-widest opacity-60">
                        &bull; Hannah Peralta &bull; Visual Archives
                      </div>
                    </div>

                    {/* Album Chapter Navigation Tabs (8 items in 4 columns) */}
                    <div>
                      <div className="font-mono text-[9.5px] uppercase tracking-wider opacity-60 mb-2">
                        Jump to memory:
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                        {ARCHIVE_PHOTOS.map((photo, idx) => {
                          const isCurrent = selectedPhotoIdx === idx;
                          return (
                            <button
                              key={photo.id}
                              onClick={() => setSelectedPhotoIdx(idx)}
                              className={`p-1.5 sm:p-2 rounded-xl border font-mono text-[9.5px] font-bold text-center transition-all cursor-pointer ${isCurrent ? 'bg-rose-600 text-white border-rose-600 shadow-md scale-105' : 'border-current/20 bg-current/5 hover:border-rose-500/50'}`}
                            >
                              <div>Memory {photo.id}</div>
                              <div className="text-[8px] font-normal truncate opacity-80">{photo.category}</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

              {/* 🎞️ INTERACTIVE 35MM FILM REEL CAROUSEL */}
              <div className={`p-4 sm:p-6 border-2 ${cardBorder} ${cardBg} rounded-3xl shadow-xl space-y-4`}>
                
                {/* Carousel Header with Single-Row Controls */}
                <div className="flex items-center justify-between gap-3 border-b border-dashed border-current/20 pb-3">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center border border-rose-500/20 shadow-xs shrink-0">
                      <Film size={15} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider truncate">
                        35mm Film Reel
                      </h4>
                      <span className="font-mono text-[9px] opacity-60 uppercase tracking-widest block truncate">
                        Memory Negatives
                      </span>
                    </div>
                  </div>

                  {/* Compact Action Buttons Capsule */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => setIsAutoPlayingFilmstrip((prev) => !prev)}
                      className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full font-mono text-[9.5px] font-bold uppercase tracking-wider transition-all cursor-pointer ${isAutoPlayingFilmstrip ? 'bg-emerald-600 text-white shadow-xs' : 'border border-current/20 bg-current/5 hover:bg-current/10'}`}
                      title={isAutoPlayingFilmstrip ? "Pause Reel" : "Auto-Play Reel"}
                    >
                      {isAutoPlayingFilmstrip ? <Pause size={11} /> : <Play size={11} />}
                      <span className="hidden sm:inline">{isAutoPlayingFilmstrip ? "Pause" : "Play"}</span>
                    </button>

                    <div className="flex items-center gap-0.5 border border-current/20 rounded-full p-1 bg-current/5">
                      <button
                        onClick={() => scrollFilmstrip('left')}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                        aria-label="Scroll Carousel Left"
                      >
                        <ChevronLeft size={13} />
                      </button>
                      <button
                        onClick={() => scrollFilmstrip('right')}
                        className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors cursor-pointer"
                        aria-label="Scroll Carousel Right"
                      >
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Perforated Film Strip Carousel Track */}
                <div className="relative">
                  
                  {/* Top Sprocket Perforations */}
                  <div className="flex items-center justify-between gap-2 px-3 py-1 border-y border-dashed border-current/20 bg-current/5 mb-2 overflow-hidden select-none pointer-events-none">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div key={i} className="w-2.5 h-1.5 rounded-xs bg-current/25 shrink-0" />
                    ))}
                  </div>

                  {/* Scrollable Filmstrip Container */}
                  <div
                    ref={filmstripRef}
                    className="flex gap-3.5 overflow-x-auto scroll-smooth snap-x snap-mandatory py-2 px-1 scrollbar-none"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                  >
                    {ARCHIVE_PHOTOS.map((photo, idx) => {
                      const isSelected = selectedPhotoIdx === idx;
                      return (
                        <div
                          key={photo.id}
                          onClick={() => setSelectedPhotoIdx(idx)}
                          className={`min-w-[170px] sm:min-w-[210px] max-w-[210px] snap-start p-3 rounded-2xl border-2 transition-all duration-300 cursor-pointer flex flex-col justify-between shrink-0 group/card ${isSelected ? 'border-rose-500 bg-rose-500/10 shadow-xl scale-[1.03] ring-2 ring-rose-500/30' : `${cardBorder} ${t(dark, 'bg-[#151322]', 'bg-[#faf8f4]')} opacity-80 hover:opacity-100 hover:border-current/30`}`}
                        >
                          <div className="w-full h-28 sm:h-32 rounded-xl bg-black/60 mb-2 flex items-center justify-center p-1.5 relative overflow-hidden">
                            <img
                              src={photo.imageSrc}
                              alt={photo.title}
                              className="max-w-full max-h-full w-auto h-auto object-contain transition-all duration-300"
                            />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-rose-600 text-white font-mono text-[7.5px] font-black uppercase tracking-widest shadow-xs">
                                Active
                              </div>
                            )}
                          </div>

                          <div className="w-full space-y-1">
                            <div className="flex items-center justify-between font-mono text-[8.5px]">
                              <span className={`font-black uppercase ${isSelected ? 'text-rose-500' : 'opacity-70'}`}>
                                Memory {photo.id}
                              </span>
                              <span className="opacity-55 uppercase tracking-wider truncate max-w-[90px]">
                                {photo.category}
                              </span>
                            </div>
                            <div className="text-xs font-black truncate">
                              {photo.title}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom Sprocket Perforations */}
                  <div className="flex items-center justify-between gap-2 px-3 py-1 border-y border-dashed border-current/20 bg-current/5 mt-2 overflow-hidden select-none pointer-events-none">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div key={i} className="w-2.5 h-1.5 rounded-xs bg-current/25 shrink-0" />
                    ))}
                  </div>

                </div>

              </div>

              {/* 📸 NEW SECTION: LIFE BEHIND THE LENS / MEMORY SNAPSHOT REELS */}
              <div className={`p-6 sm:p-7 border-2 ${cardBorder} ${cardBg} rounded-2xl shadow-xl`}>
                <div className="flex items-center justify-between border-b border-dashed border-current/20 pb-3 mb-4">
                  <div className="flex items-center gap-2">
                    <Sparkles size={15} className="text-rose-500" />
                    <h3 className="font-mono text-xs uppercase tracking-wider font-black">
                      Life Behind The Lens &bull; Memory Reels
                    </h3>
                  </div>
                  <span className="font-mono text-[9px] uppercase tracking-widest opacity-60">Visual Journal</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
                  <div className="p-4 rounded-xl border border-current/15 bg-current/5 hover:border-rose-500/40 transition-all">
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-xs mb-1.5">
                      <Heart size={14} />
                      <span>Family &amp; Nanay Moments</span>
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      Sunday family lunches, warm conversations, and keeping childhood memories alive forever.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-current/15 bg-current/5 hover:border-amber-500/40 transition-all">
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mb-1.5">
                      <Utensils size={14} />
                      <span>Food Trips &amp; Sweet Treats</span>
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      Enjoying sour sinigang, tasty bangus, and strawberry &amp; vanilla ice cream with favorite people!
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-current/15 bg-current/5 hover:border-emerald-500/40 transition-all">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1.5">
                      <Compass size={14} />
                      <span>Outdoor Biking &amp; Sun</span>
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      Sunny park bike rides, fresh breeze, and spontaneous road trips with people who bring good vibes.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-current/15 bg-current/5 hover:border-blue-400/40 transition-all">
                    <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1.5">
                      <Dog size={14} />
                      <span>Every Dog Encounter</span>
                    </div>
                    <p className="text-[11px] opacity-80 leading-relaxed">
                      Stopping to pet every friendly dog along the street—the ultimate guaranteed mood booster!
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-current/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                  <span className="font-sans italic opacity-85">
                    &ldquo;I don&apos;t just keep memories in my head; I keep them in pictures, letters, and feelings.&rdquo;
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-wider font-bold text-rose-500 shrink-0">
                    ✦ Curated Memory Archive
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* ─── DECK 04: DAILY RADAR ─── */}
          {activeDeck === 'radar' && (
            <div className="space-y-7 animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">

                {/* Collapsible Radar */}
                <div
                  className={`p-5 sm:p-7 border-2 border-dashed ${cardBorder} ${cardBg} rounded-2xl shadow-xl relative`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-double border-current/20 pb-3 mb-3.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <Clock size={14} className="text-emerald-500 shrink-0" />
                      <h4 className="font-mono text-xs uppercase tracking-wider font-black truncate">
                        Daily Radar
                      </h4>
                    </div>
                    <button
                      onClick={toggleAllItems}
                      className="font-mono text-[9px] uppercase tracking-wider opacity-80 hover:text-rose-500 font-bold cursor-pointer shrink-0"
                    >
                      Toggle All
                    </button>
                  </div>

                  <div className="space-y-2 font-sans text-xs sm:text-sm">
                    {/* Watching */}
                    <div className="border border-current/10 rounded-xl overflow-hidden">
                      <button onClick={() => toggleItem('watching')} className={`w-full p-2.5 flex items-center justify-between gap-2 font-bold text-left cursor-pointer ${openItems.watching ? t(dark, 'bg-rose-500/10', 'bg-rose-50') : ''}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Tv size={13} className="text-rose-500 shrink-0" />
                          <span className="font-mono text-[9px] uppercase opacity-75 shrink-0">Watching:</span>
                          <span className="text-xs font-semibold truncate">Cozy Shows &amp; Dramas</span>
                        </div>
                        {openItems.watching ? <ChevronUp size={13} className="shrink-0" /> : <ChevronDown size={13} className="shrink-0" />}
                      </button>
                      {openItems.watching && <div className="p-2.5 pt-0.5 text-xs opacity-85 leading-relaxed bg-current/5 border-t border-current/10">Heartwarming dramas and relaxing YouTube documentaries.</div>}
                    </div>

                    {/* Craving */}
                    <div className="border border-current/10 rounded-xl overflow-hidden">
                      <button onClick={() => toggleItem('craving')} className={`w-full p-2.5 flex items-center justify-between gap-2 font-bold text-left cursor-pointer ${openItems.craving ? t(dark, 'bg-pink-500/10', 'bg-pink-50') : ''}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Sparkles size={13} className="text-pink-500 shrink-0" />
                          <span className="font-mono text-[9px] uppercase opacity-75 shrink-0">Craving:</span>
                          <span className="text-xs font-semibold text-rose-500 truncate">Ice Cream &amp; Sinigang</span>
                        </div>
                        {openItems.craving ? <ChevronUp size={13} className="shrink-0" /> : <ChevronDown size={13} className="shrink-0" />}
                      </button>
                      {openItems.craving && <div className="p-2.5 pt-0.5 text-xs opacity-85 leading-relaxed bg-current/5 border-t border-current/10">Strawberry &amp; vanilla ice cream, plus sour sinigang or fresh bangus!</div>}
                    </div>

                    {/* Treasuring */}
                    <div className="border border-current/10 rounded-xl overflow-hidden">
                      <button onClick={() => toggleItem('treasuring')} className={`w-full p-2.5 flex items-center justify-between gap-2 font-bold text-left cursor-pointer ${openItems.treasuring ? t(dark, 'bg-amber-500/10', 'bg-amber-50') : ''}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Bookmark size={13} className="text-amber-500 shrink-0" />
                          <span className="font-mono text-[9px] uppercase opacity-75 shrink-0">Treasuring:</span>
                          <span className="text-xs font-semibold truncate">Handwritten Letters</span>
                        </div>
                        {openItems.treasuring ? <ChevronUp size={13} className="shrink-0" /> : <ChevronDown size={13} className="shrink-0" />}
                      </button>
                      {openItems.treasuring && <div className="p-2.5 pt-0.5 text-xs opacity-85 leading-relaxed bg-current/5 border-t border-current/10">Cherishing notes, polaroids, and memory keepsakes in my box.</div>}
                    </div>

                    {/* Avoiding */}
                    <div className="border border-current/10 rounded-xl overflow-hidden">
                      <button onClick={() => toggleItem('avoiding')} className={`w-full p-2.5 flex items-center justify-between gap-2 font-bold text-left cursor-pointer ${openItems.avoiding ? t(dark, 'bg-red-500/10', 'bg-red-50') : ''}`}>
                        <div className="flex items-center gap-2 min-w-0">
                          <Ban size={13} className="text-red-500 shrink-0" />
                          <span className="font-mono text-[9px] uppercase opacity-75 shrink-0">Avoiding:</span>
                          <span className="text-xs font-semibold text-red-500 truncate">Frogs! (Strictly No)</span>
                        </div>
                        {openItems.avoiding ? <ChevronUp size={13} className="shrink-0" /> : <ChevronDown size={13} className="shrink-0" />}
                      </button>
                      {openItems.avoiding && <div className="p-2.5 pt-0.5 text-xs opacity-85 leading-relaxed bg-current/5 border-t border-current/10">Zero frogs allowed! They give me the biggest fright haha.</div>}
                    </div>
                  </div>
                </div>

                {/* Design Philosophy */}
                <article
                  className={`p-5 sm:p-7 border-2 border-double ${cardBorder} ${cardBg} rounded-2xl shadow-xl relative transition-all duration-300`}
                >
                  <div className="flex items-center justify-between gap-2 border-b border-dashed border-current/20 pb-2.5 mb-4">
                    <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-black min-w-0">
                      <Lightbulb size={14} className="text-purple-400 shrink-0" />
                      <span className="truncate">Manifesto</span>
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-widest opacity-65 font-bold shrink-0">Philosophy</span>
                  </div>

                  <h3 className="text-lg sm:text-2xl font-black uppercase tracking-tight mb-3 leading-snug">
                    How Life Inspires My Work
                  </h3>

                  <div className="space-y-3 font-sans text-xs sm:text-sm leading-relaxed opacity-90 text-justify">
                    <p>
                      Good design comes from understanding real people. Simple everyday details inspire websites that feel welcoming, human, and effortless.
                    </p>
                    <p>
                      Technology should not feel overwhelming; it should feel like a helpful friend.
                    </p>
                  </div>

                  <div className="mt-4 p-3 border rounded-xl bg-current/5 flex items-center gap-2.5 text-xs">
                    <Smile size={16} className="text-rose-500 shrink-0" />
                    <span className="italic opacity-85">Empathy and warmth make the best design tools.</span>
                  </div>
                </article>

              </div>
            </div>
          )}

        </main>

        {/* ─── FOOTER ─── */}
        <footer
          className={`w-full border-t border-double ${cardBorder} py-5 px-4 sm:px-8 flex flex-col sm:flex-row justify-between items-center gap-2 font-mono text-[9.5px] uppercase tracking-widest opacity-75 ${t(
            dark,
            'bg-[#09080e]',
            'bg-[#f8f5ee]'
          )} mt-auto`}
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
            <span>&copy; {new Date().getFullYear()} HanMade &bull; Beyond the Screen Atelier</span>
          </span>
          <span className="font-bold text-rose-500">✦ Thank you for stopping by! ✦</span>
        </footer>

      </div>

      {/* ══════════════════════════════════════════════════════════════
          PORTFOLIO-MATCHED INTERACTIVE MODAL (IDENTICAL SIZING & STYLE)
      ══════════════════════════════════════════════════════════════ */}
      {activeModal.type !== null && (
        <div
          className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-0 sm:p-6 md:p-8 cursor-pointer"
          onClick={closeModal}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 backdrop-blur-md bg-black/40 sm:bg-black/55 transition-opacity" />

          {/* Centered Modal (Desktop) / Bottom Sheet (Mobile) Container */}
          <div
            className={`relative z-10 w-full sm:w-[92vw] md:w-[85vw] max-w-[1100px] rounded-t-3xl sm:rounded-2xl overflow-hidden h-[70vh] sm:h-[82vh] max-h-[820px] flex flex-col justify-between transition-transform animate-slide-bottom sm:animate-fade-in cursor-default ${t(
              dark,
              'bg-[#141414] text-[#e0e0e0] border-t sm:border border-white/15 shadow-2xl shadow-black/80',
              'bg-[#faf9f6] text-[#1c1813] border-t sm:border border-[#d0c9b8] shadow-2xl'
            )}`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Drag Pill */}
            <div className="sm:hidden flex justify-center py-2 bg-black/5 dark:bg-white/5 border-b border-current/10 shrink-0">
              <div className="w-10 h-1 rounded-full bg-current opacity-25" />
            </div>

            {/* Modal Header */}
            <div
              className={`border-b-2 border-double shrink-0 ${t(
                dark,
                'border-white/20 bg-[#191919]',
                'border-[#d0c9b8] bg-[#F2EBD9]'
              )}`}
            >
              <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="w-2 h-2 bg-current rotate-45 shrink-0 opacity-80" />
                  <span
                    className={`font-mono text-[9px] sm:text-[10.5px] font-black uppercase tracking-widest truncate ${t(
                      dark,
                      'text-[#ff6b6b]',
                      'text-[#a11d1d]'
                    )}`}
                  >
                    {activeModal.title}
                  </span>
                  {activeModal.subtitle && (
                    <span className="hidden sm:inline font-mono text-[9px] opacity-70 truncate border-l border-current/20 pl-2">
                      {activeModal.subtitle}
                    </span>
                  )}
                </div>

                {/* ONE Close Button Only */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={closeModal}
                    className={`flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border transition-all shrink-0 cursor-pointer ${t(
                      dark,
                      'border-red-500/40 text-red-400 hover:bg-red-950/40',
                      'border-red-300 text-red-700 hover:bg-red-50'
                    )}`}
                    title="Close modal (Esc)"
                    aria-label="Close modal"
                  >
                    <X size={14} />
                    <span className="hidden sm:inline">CLOSE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
              {activeModal.imageSrc && (
                <div className="flex items-center justify-center bg-black/30 rounded-xl p-3 sm:p-4 mb-4">
                  <img
                    src={activeModal.imageSrc}
                    alt={activeModal.title}
                    className="w-full h-auto max-h-[50vh] object-contain rounded-lg shadow-md"
                  />
                </div>
              )}
              {activeModal.content && (
                <div className="text-xs sm:text-sm leading-relaxed max-w-3xl mx-auto">
                  {activeModal.content}
                </div>
              )}
            </div>

            {/* Modal Footer (Identical to Portfolio Lightbox) */}
            <div
              className={`px-4 sm:px-5 py-2.5 border-t border-double shrink-0 flex items-center justify-between font-mono text-[9px] uppercase tracking-wider ${t(
                dark,
                'border-white/15 bg-[#191919] text-zinc-400',
                'border-[#d0c9b8] bg-[#F2EBD9] text-stone-600'
              )}`}
            >
              <span className="truncate">HanMade Portfolio &bull; Beyond The Screen</span>
              <span className="shrink-0 opacity-80">Version 1.0 &bull; Est. 2024</span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  );
}
