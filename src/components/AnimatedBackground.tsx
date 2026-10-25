import { useEffect, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════════════
   ANIMATED PORTFOLIO BACKGROUND — "Ghibli Meadow & Rolling Hills"
   ═══════════════════════════════════════════════════════════════════════
   A tranquil, nature-focused ambient scene inspired by Studio Ghibli:

   • SKY:         Clear blue summer sky (light) / Starlit midnight indigo (dark),
                  plump painterly cumulus clouds, gentle sun/moon
   • MIDGROUND:   Rolling green hills, distant turning windmill, cozy wooden
                  hillside cottage with puffing chimney smoke & warm windows
   • FOREGROUND:  Lush undulating wildflower meadow, framing elements on sides:
     - Left:      Gentle swaying oak tree, hanging lantern, sleepy calico cat
     - Right:     Rustic wooden "HANMADE 🌿" signpost, wildflowers & fluttering butterfly
   • PARTICLES:   Floating dandelion seeds (light) / Glowing fireflies (dark)
   • BEHAVIOR:    100% purely ambient, no hover effects, pointer-events-none
   ═══════════════════════════════════════════════════════════════════════ */

interface AnimatedBackgroundProps {
  dark: boolean;
}

export default function AnimatedBackground({ dark }: AnimatedBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 150);
    return () => clearTimeout(timer);
  }, []);

  // ── Ghibli Nature Palette ──
  const strokeColor = dark ? '#0a101f' : '#1f2e1a';
  const strokeW = '1.8';

  const c = dark
    ? {
        skyGrad: 'linear-gradient(180deg, #070d1e 0%, #0f1a36 45%, #18284d 100%)',
        sunMoon: '#fef08a',
        sunMoonGlow: 'rgba(254, 240, 138, 0.22)',
        cloudFar: '#131e3a',
        cloudNear: '#1c2b50',
        mountainFar: '#0e1830',
        hillFar: '#122533',
        hillMid: '#163336',
        hillNear: '#193f35',
        grassForeground: '#1e4b3e',
        grassRidge: '#265d4d',
        treeTrunk: '#3e2c1e',
        treeFoliageDark: '#13392a',
        treeFoliageLight: '#1f533d',
        treeFoliageHighlight: '#2a6d50',
        cabinWood: '#422a1d',
        cabinRoof: '#2e1c14',
        cabinWindow: '#fde047',
        smokeColor: 'rgba(203, 213, 225, 0.45)',
        windmillBlades: '#cbd5e1',
        catBody: '#f8fafc',
        catPatch: '#ea580c',
        catBlush: '#fb7185',
        signWood: '#4a3324',
        lanternLight: '#fde047',
        lanternGlass: '#fef08a',
        lanternGlow: 'rgba(253, 224, 71, 0.4)',
        flowerYellow: '#fde047',
        flowerPink: '#f472b6',
        flowerRed: '#f87171',
        flowerWhite: '#f1f5f9',
        fireflyColor: '#bef264',
      }
    : {
        skyGrad: 'linear-gradient(180deg, #bfe3f7 0%, #d8edf8 45%, #fef3d6 100%)',
        sunMoon: '#f59e0b',
        sunMoonGlow: 'rgba(245, 158, 11, 0.3)',
        cloudFar: '#ffffff',
        cloudNear: '#ffffff',
        mountainFar: '#93b4d4',
        hillFar: '#82b887',
        hillMid: '#68a86f',
        hillNear: '#52965b',
        grassForeground: '#46854f',
        grassRidge: '#5ba366',
        treeTrunk: '#6d4c33',
        treeFoliageDark: '#2f6d3a',
        treeFoliageLight: '#43904e',
        treeFoliageHighlight: '#68bb74',
        cabinWood: '#805333',
        cabinRoof: '#a34839',
        cabinWindow: '#fef08a',
        smokeColor: 'rgba(255, 255, 255, 0.65)',
        windmillBlades: '#f8fafc',
        catBody: '#fffbf5',
        catPatch: '#ea580c',
        catBlush: '#fb7185',
        signWood: '#8a5836',
        lanternLight: '#facc15',
        lanternGlass: '#fef08a',
        lanternGlow: 'rgba(250, 204, 21, 0.35)',
        flowerYellow: '#fbbf24',
        flowerPink: '#f472b6',
        flowerRed: '#ef4444',
        flowerWhite: '#ffffff',
        fireflyColor: '#84cc16',
      };

  return (
    <div
      className="animated-bg-layer overflow-hidden pointer-events-none select-none z-0"
      style={{
        opacity: mounted ? (dark ? 0.58 : 0.48) : 0,
        transition: 'opacity 0.8s ease-out',
      }}
      aria-hidden="true"
    >
      {/* ═════════════════════════════════════════════════════
          1. SKY & CELESTIAL LAYER (Sun/Moon, Drifting Clouds)
          ═════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Dynamic Sky Gradient */}
        <div
          className="absolute inset-0"
          style={{ background: c.skyGrad, transition: 'background 0.8s ease' }}
        />

        {/* Night Stars (Dark Mode Only) */}
        {dark && (
          <svg className="absolute inset-0 w-full h-full opacity-70 pointer-events-none" aria-hidden="true">
            {[
              { cx: '12%', cy: '14%', r: 1.2 },
              { cx: '24%', cy: '8%', r: 1.8 },
              { cx: '35%', cy: '18%', r: 1.1 },
              { cx: '48%', cy: '10%', r: 1.5 },
              { cx: '62%', cy: '15%', r: 1.3 },
              { cx: '75%', cy: '9%', r: 1.7 },
              { cx: '88%', cy: '16%', r: 1.2 },
              { cx: '18%', cy: '26%', r: 1 },
              { cx: '42%', cy: '24%', r: 1.4 },
              { cx: '68%', cy: '28%', r: 1.2 },
              { cx: '82%', cy: '25%', r: 1.6 },
              { cx: '92%', cy: '32%', r: 1.1 },
            ].map((star, i) => (
              <circle
                key={i}
                cx={star.cx}
                cy={star.cy}
                r={star.r}
                fill="#ffffff"
                className="animated-bg-pulse"
                style={{ animationDelay: `${(i * 0.4) % 3}s` }}
              />
            ))}
          </svg>
        )}

        {/* Celestial Body: Sun (Light) / Moon (Dark) */}
        <div className="absolute top-5 sm:top-8 left-8 sm:left-16 pointer-events-none">
          <svg width="74" height="74" viewBox="0 0 74 74">
            {dark ? (
              /* Serene Anime Moon with soft glow */
              <g>
                <circle cx="37" cy="37" r="28" fill={c.sunMoonGlow} />
                <circle cx="37" cy="37" r="22" fill={c.sunMoon} stroke={strokeColor} strokeWidth={strokeW} />
                <circle cx="30" cy="31" r="3.5" fill="#facc15" opacity="0.5" />
                <circle cx="43" cy="40" r="4.5" fill="#facc15" opacity="0.5" />
                <circle cx="44" cy="29" r="2.5" fill="#facc15" opacity="0.5" />
                {/* Sleeping expression */}
                <path d="M31 37 Q34 40 37 37" stroke={strokeColor} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                <ellipse cx="29" cy="41" rx="2" ry="1.2" fill={c.catBlush} opacity="0.7" />
              </g>
            ) : (
              /* Radiant Countryside Sun */
              <g>
                <circle cx="37" cy="37" r="28" fill={c.sunMoonGlow} />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                  <line
                    key={deg}
                    x1="37"
                    y1="10"
                    x2="37"
                    y2="3"
                    stroke={c.sunMoon}
                    strokeWidth="3"
                    strokeLinecap="round"
                    transform={`rotate(${deg} 37 37)`}
                  />
                ))}
                <circle cx="37" cy="37" r="21" fill={c.sunMoon} stroke={strokeColor} strokeWidth={strokeW} />
                {/* Cheerful Anime Sun Face */}
                <ellipse cx="30" cy="34" rx="2.2" ry="3" fill={strokeColor} />
                <ellipse cx="44" cy="34" rx="2.2" ry="3" fill={strokeColor} />
                <circle cx="31" cy="33" r="0.8" fill="#ffffff" />
                <circle cx="45" cy="33" r="0.8" fill="#ffffff" />
                <path d="M34 40 Q37 44 40 40" stroke={strokeColor} strokeWidth="1.6" fill="none" strokeLinecap="round" />
                <ellipse cx="26" cy="39" rx="2.5" ry="1.4" fill={c.catBlush} opacity="0.75" />
                <ellipse cx="48" cy="39" rx="2.5" ry="1.4" fill={c.catBlush} opacity="0.75" />
              </g>
            )}
          </svg>
        </div>

        {/* Fluffy Ghibli Cumulus Clouds */}
        <div className="absolute top-10 right-10 sm:right-28 animated-bg-drift-right opacity-90 pointer-events-none">
          <svg width="170" height="70" viewBox="0 0 170 70">
            <ellipse cx="60" cy="48" rx="50" ry="20" fill={c.cloudNear} opacity={dark ? '0.25' : '0.85'} />
            <circle cx="65" cy="32" r="25" fill={c.cloudNear} opacity={dark ? '0.3' : '0.9'} />
            <circle cx="105" cy="38" r="20" fill={c.cloudNear} opacity={dark ? '0.3' : '0.9'} />
            <circle cx="35" cy="40" r="16" fill={c.cloudNear} opacity={dark ? '0.3' : '0.9'} />
          </svg>
        </div>

        <div className="absolute top-24 left-1/3 animated-bg-drift-left opacity-75 pointer-events-none">
          <svg width="130" height="55" viewBox="0 0 130 55">
            <ellipse cx="50" cy="38" rx="42" ry="16" fill={c.cloudFar} opacity={dark ? '0.2' : '0.8'} />
            <circle cx="52" cy="25" r="20" fill={c.cloudFar} opacity={dark ? '0.25' : '0.85'} />
            <circle cx="85" cy="30" r="16" fill={c.cloudFar} opacity={dark ? '0.25' : '0.85'} />
          </svg>
        </div>

        {/* Distant Flying Bird Silhouettes */}
        <div className="absolute top-16 left-2/3 animated-bg-float opacity-50 pointer-events-none">
          <svg width="60" height="25" viewBox="0 0 60 25" fill="none" stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 14 Q10 6 16 14 Q22 6 28 14" />
            <path d="M34 10 Q38 4 43 10 Q48 4 52 10" transform="scale(0.8) translate(10, 4)" />
          </svg>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════
          2. MIDGROUND LAYER (Rolling Hills, Windmill & Cabin)
          ═════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-[65vh] min-h-[420px] pointer-events-none"
          viewBox="0 0 1440 600"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Far Distant Mountain Silhouettes */}
          <path
            d="M0 320 Q240 220 480 300 Q720 210 980 290 Q1220 230 1440 310 L1440 600 L0 600 Z"
            fill={c.mountainFar}
            opacity="0.55"
          />

          {/* Far Rolling Meadow Hill */}
          <path
            d="M0 360 Q360 280 720 370 Q1080 290 1440 350 L1440 600 L0 600 Z"
            fill={c.hillFar}
          />

          {/* Distant Windmill on the Left Hilltop */}
          <g transform="translate(280, 260)">
            {/* Windmill Base Tower */}
            <polygon points="18,55 30,55 27,15 21,15" fill={c.cabinWood} stroke={strokeColor} strokeWidth="1.2" />
            <polygon points="19,15 29,15 24,8" fill={c.cabinRoof} stroke={strokeColor} strokeWidth="1.2" />
            <circle cx="24" cy="18" r="2.5" fill="#334155" />
            {/* Spinning Blades */}
            <g
              className="animated-bg-windmill pointer-events-none"
              style={{ transformOrigin: '24px 18px' }}
            >
              <line x1="24" y1="18" x2="24" y2="0" stroke={c.windmillBlades} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="24" y1="18" x2="24" y2="36" stroke={c.windmillBlades} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="24" y1="18" x2="6" y2="18" stroke={c.windmillBlades} strokeWidth="2.2" strokeLinecap="round" />
              <line x1="24" y1="18" x2="42" y2="18" stroke={c.windmillBlades} strokeWidth="2.2" strokeLinecap="round" />
              {/* Vane Cloth */}
              <polygon points="24,2 29,2 29,14 24,14" fill={c.windmillBlades} opacity="0.85" />
              <polygon points="24,34 19,34 19,22 24,22" fill={c.windmillBlades} opacity="0.85" />
              <polygon points="8,18 8,23 20,23 20,18" fill={c.windmillBlades} opacity="0.85" />
              <polygon points="40,18 40,13 28,13 28,18" fill={c.windmillBlades} opacity="0.85" />
            </g>
          </g>

          {/* Mid Rolling Hill */}
          <path
            d="M0 420 Q320 350 680 430 Q1040 340 1440 410 L1440 600 L0 600 Z"
            fill={c.hillMid}
          />

          {/* Distant Cozy Cottage / Cabin on Mid-Right Hill */}
          <g transform="translate(1020, 310)" className="pointer-events-none">
            {/* Chimney */}
            <rect x="52" y="16" width="9" height="20" rx="1.5" fill="#57534e" stroke={strokeColor} strokeWidth="1.2" />
            {/* Puffs of Chimney Smoke */}
            <circle cx="56" cy="12" r="4.5" fill={c.smokeColor} className="animated-bg-smoke-1" />
            <circle cx="58" cy="4" r="6" fill={c.smokeColor} className="animated-bg-smoke-2" />
            <circle cx="62" cy="-6" r="8" fill={c.smokeColor} className="animated-bg-smoke-3" />

            {/* Cabin Body */}
            <rect x="14" y="38" width="60" height="34" rx="2" fill={c.cabinWood} stroke={strokeColor} strokeWidth="1.5" />
            {/* Wood Planks */}
            <line x1="14" y1="48" x2="74" y2="48" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
            <line x1="14" y1="58" x2="74" y2="58" stroke={strokeColor} strokeWidth="0.8" opacity="0.5" />
            {/* Cozy Gable Roof */}
            <polygon points="8,39 44,14 80,39" fill={c.cabinRoof} stroke={strokeColor} strokeWidth="1.5" />
            {/* Warm Glowing Windows */}
            <rect x="22" y="44" width="14" height="15" rx="1.5" fill={c.cabinWindow} stroke={strokeColor} strokeWidth="1.2" />
            <line x1="29" y1="44" x2="29" y2="59" stroke={strokeColor} strokeWidth="0.8" />
            <line x1="22" y1="51" x2="36" y2="51" stroke={strokeColor} strokeWidth="0.8" />

            {/* Rustic Door */}
            <rect x="46" y="48" width="12" height="24" rx="1" fill="#451a03" stroke={strokeColor} strokeWidth="1" />
            <circle cx="49" cy="60" r="1.2" fill="#fde047" />

            {/* Garden Picket Fence */}
            <path
              d="M2 62 L2 72 M8 60 L8 72 M78 62 L78 72 M84 64 L84 72 M2 66 L12 66 M76 66 L86 66"
              stroke={c.signWood}
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>

          {/* Near Rolling Meadow Layer */}
          <path
            d="M0 480 Q420 410 820 490 Q1180 430 1440 470 L1440 600 L0 600 Z"
            fill={c.hillNear}
          />
        </svg>
      </div>

      {/* ═════════════════════════════════════════════════════
          3. FOREGROUND LAYER (Lush Meadow, Tree, Cat, Signpost)
          ═════════════════════════════════════════════════════ */}
      <div className="absolute inset-0 pointer-events-none">
        <svg
          className="absolute bottom-0 w-full h-[48vh] min-h-[340px] pointer-events-none"
          viewBox="0 0 1440 460"
          preserveAspectRatio="none"
          fill="none"
        >
          {/* Rich Undulating Foreground Meadow */}
          <path
            d="M0 240 Q260 160 620 230 Q980 180 1440 220 L1440 460 L0 460 Z"
            fill={c.grassForeground}
          />
          <path
            d="M0 290 Q340 240 760 295 Q1140 250 1440 280 L1440 460 L0 460 Z"
            fill={c.grassRidge}
            opacity="0.8"
          />

          {/* Gentle Grass Tuft Accents */}
          {[120, 240, 480, 680, 920, 1140, 1340].map((gx, i) => (
            <path
              key={i}
              d={`M${gx} 265 Q${gx - 6} 248 ${gx - 10} 244 M${gx} 265 Q${gx} 244 ${gx + 2} 240 M${gx} 265 Q${gx + 8} 250 ${gx + 12} 246`}
              stroke={c.treeFoliageHighlight}
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.6"
            />
          ))}

          {/* Wildflowers along the meadow slopes */}
          {[
            { x: 380, y: 255, col: c.flowerYellow },
            { x: 420, y: 268, col: c.flowerWhite },
            { x: 580, y: 245, col: c.flowerPink },
            { x: 640, y: 260, col: c.flowerRed },
            { x: 740, y: 275, col: c.flowerYellow },
            { x: 860, y: 250, col: c.flowerWhite },
            { x: 980, y: 265, col: c.flowerPink },
            { x: 1040, y: 248, col: c.flowerYellow },
          ].map((fl, i) => (
            <g key={i} transform={`translate(${fl.x}, ${fl.y})`}>
              <line x1="0" y1="12" x2="0" y2="0" stroke={c.treeFoliageDark} strokeWidth="1.2" />
              <circle cx="0" cy="0" r="3.2" fill={fl.col} />
              <circle cx="0" cy="0" r="1.3" fill="#fde047" />
            </g>
          ))}
        </svg>

        {/* ── LEFT FOREGROUND: Ghibli Tree, Calico Cat & Lantern ── */}
        <div className="absolute bottom-0 left-0 sm:left-4 md:left-8 w-56 sm:w-80 h-80 sm:h-96 pointer-events-none">
          <svg viewBox="0 0 320 380" className="w-full h-full pointer-events-none" fill="none">
            {/* Swaying Tree Canopy & Solid Trunk */}
            <g className="animated-bg-tree">
              {/* Continuous Solid Trunk with Natural Taper */}
              <path
                d="M 92 380 Q 104 335 116 270 Q 122 200 118 115 L 148 115 Q 144 175 150 235 Q 156 300 176 380 Z"
                fill={c.treeTrunk}
                stroke={strokeColor}
                strokeWidth={strokeW}
              />

              {/* Natural Root Flares spreading to ground */}
              <path
                d="M 80 380 Q 94 360 116 342 L 118 355 Q 98 372 80 380 Z"
                fill={c.treeTrunk}
                opacity="0.9"
              />
              <path
                d="M 188 380 Q 170 360 152 342 L 150 355 Q 166 372 188 380 Z"
                fill={c.treeTrunk}
                opacity="0.9"
              />

              {/* Right Branch for Lantern */}
              <path
                d="M 144 240 Q 168 200 194 160 L 184 150 Q 158 188 136 220 Z"
                fill={c.treeTrunk}
                stroke={strokeColor}
                strokeWidth="1.2"
              />

              {/* Left Side Branch */}
              <path
                d="M 118 200 Q 98 162 80 135 L 88 128 Q 104 152 124 182 Z"
                fill={c.treeTrunk}
                stroke={strokeColor}
                strokeWidth="1.2"
              />

              {/* Natural Bark Texture Lines */}
              <path
                d="M 132 375 Q 130 280 132 180 M 142 365 Q 140 260 143 175"
                stroke={strokeColor}
                strokeWidth="1"
                opacity="0.3"
                strokeLinecap="round"
                fill="none"
              />

              {/* Foliage Clusters (Lush Ghibli style bubbles) */}
              <circle cx="98" cy="110" r="45" fill={c.treeFoliageDark} />
              <circle cx="148" cy="90" r="50" fill={c.treeFoliageLight} />
              <circle cx="198" cy="120" r="42" fill={c.treeFoliageDark} />
              <circle cx="118" cy="70" r="46" fill={c.treeFoliageHighlight} />
              <circle cx="168" cy="75" r="40" fill={c.treeFoliageLight} />
              <circle cx="133" cy="50" r="34" fill={c.treeFoliageHighlight} />

              {/* Hanging Branch Lantern */}
              <g transform="translate(186, 150)" className="pointer-events-none">
                {/* Chain */}
                <line x1="0" y1="0" x2="0" y2="16" stroke={strokeColor} strokeWidth="1.2" />
                {/* Lantern Top Cap */}
                <polygon points="-8,16 8,16 0,11" fill="#334155" stroke={strokeColor} strokeWidth="1" />
                {/* Lantern Body */}
                <rect x="-7" y="16" width="14" height="18" rx="2" fill={c.lanternGlass} stroke={strokeColor} strokeWidth="1.2" />
                {/* Glow */}
                <circle cx="0" cy="25" r="5" fill={c.lanternLight} className="animated-bg-lantern" />
                {dark && (
                  <circle cx="0" cy="25" r="18" fill={c.lanternGlow} className="animated-bg-pulse" />
                )}
                {/* Lantern Bottom */}
                <polygon points="-8,34 8,34 0,38" fill="#334155" stroke={strokeColor} strokeWidth="1" />
              </g>
            </g>

            {/* Calico Cat Snoozing on the Side (Beside the Tree on the Meadow, Not on the Tree) */}
            <g transform="translate(6, 320)" className="pointer-events-none">
              {/* Grassy Ground Cushion */}
              <ellipse cx="38" cy="48" rx="36" ry="11" fill={c.grassRidge} />

              {/* Swishing Tail */}
              <g className="animated-bg-tail" style={{ transformOrigin: '16px 36px' }}>
                <path d="M16 36 Q6 30 6 20 Q6 13 13 15" stroke={c.catPatch} strokeWidth="3.8" fill="none" strokeLinecap="round" />
              </g>

              {/* Cat Body */}
              <ellipse cx="40" cy="33" rx="20" ry="13" fill={c.catBody} stroke={strokeColor} strokeWidth={strokeW} />
              <ellipse cx="49" cy="29" rx="8" ry="8" fill={c.catPatch} />

              {/* Sleeping Head */}
              <circle cx="58" cy="25" r="11" fill={c.catBody} stroke={strokeColor} strokeWidth={strokeW} />
              <polygon points="50,15 47,5 55,12" fill={c.catBody} stroke={strokeColor} strokeWidth={strokeW} />
              <polygon points="51,14 48,7 54,12" fill={c.catBlush} />
              <polygon points="64,16 69,6 61,12" fill={c.catPatch} stroke={strokeColor} strokeWidth={strokeW} />
              <polygon points="63,14 67,8 62,12" fill={c.catBlush} />

              {/* Sleeping Eyes (Happy curved arcs) */}
              <path d="M53 24 Q56 27 59 24" stroke={strokeColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M60 24 Q63 27 66 24" stroke={strokeColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
              <path d="M57 28 Q59 30 61 28" stroke={strokeColor} strokeWidth="1" fill="none" />
              <ellipse cx="51" cy="27" rx="1.8" ry="1.1" fill={c.catBlush} opacity="0.75" />
              <ellipse cx="65" cy="27" rx="1.8" ry="1.1" fill={c.catBlush} opacity="0.75" />

              {/* Flowers beside cat */}
              <circle cx="16" cy="44" r="2.8" fill={c.flowerPink} />
              <circle cx="16" cy="44" r="1.2" fill={c.flowerYellow} />
              <circle cx="72" cy="42" r="3.2" fill={c.flowerYellow} />
              <circle cx="72" cy="42" r="1.2" fill="#78350f" />
            </g>
          </svg>
        </div>

        {/* ── RIGHT FOREGROUND: Rustic Wooden Signpost, Flowers & Butterfly ── */}
        <div className="absolute bottom-0 right-0 sm:right-4 md:right-8 w-56 sm:w-80 h-72 sm:h-88 pointer-events-none">
          <svg viewBox="0 0 320 340" className="w-full h-full pointer-events-none" fill="none">
            {/* Wooden Trail Signpost ("HANMADE 🌿") */}
            <g transform="translate(140, 160)" className="pointer-events-none">
              {/* Post */}
              <rect x="52" y="30" width="10" height="150" rx="2" fill={c.signWood} stroke={strokeColor} strokeWidth="1.5" />

              {/* Wooden Plaque 1: "HANMADE 🌿" */}
              <g transform="translate(12, 42)">
                <polygon points="0,0 84,0 94,14 84,28 0,28" fill="#b4784a" stroke={strokeColor} strokeWidth="1.5" />
                <line x1="8" y1="8" x2="76" y2="8" stroke="#8a532d" strokeWidth="0.8" opacity="0.5" />
                <line x1="8" y1="18" x2="76" y2="18" stroke="#8a532d" strokeWidth="0.8" opacity="0.5" />
                <text x="44" y="19" textAnchor="middle" fill="#fef3c7" fontFamily="monospace" fontSize="9.5" fontWeight="bold">
                  HANMADE 🌿
                </text>
                <circle cx="5" cy="14" r="1.5" fill="#451a03" />
              </g>

              {/* Wooden Plaque 2: Pointing Direction */}
              <g transform="translate(24, 76)">
                <polygon points="10,0 75,0 75,22 10,22 0,11" fill="#9a6239" stroke={strokeColor} strokeWidth="1.5" />
                <text x="42" y="15" textAnchor="middle" fill="#fef3c7" fontFamily="sans-serif" fontSize="8" fontWeight="bold">
                  PORTFOLIO ➔
                </text>
              </g>

              {/* Climbing Ivy around post */}
              <path d="M52 140 Q62 120 54 100 Q48 85 58 70" stroke={c.treeFoliageDark} strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="60" cy="118" rx="4" ry="2.5" fill={c.treeFoliageHighlight} />
              <ellipse cx="50" cy="94" rx="4" ry="2.5" fill={c.treeFoliageHighlight} />
            </g>

            {/* Sunflower & Wildflower Bush */}
            <g transform="translate(40, 220)" className="pointer-events-none">
              {/* Sunflower 1 */}
              <path d="M80 120 Q78 80 84 55" stroke={c.treeFoliageDark} strokeWidth="3" fill="none" strokeLinecap="round" />
              <ellipse cx="74" cy="85" rx="9" ry="5" fill={c.treeFoliageLight} />
              <g transform="translate(84, 55)">
                {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
                  <ellipse
                    key={deg}
                    cx="0"
                    cy="0"
                    rx="14"
                    ry="4.5"
                    fill={c.flowerYellow}
                    stroke={strokeColor}
                    strokeWidth="0.8"
                    transform={`rotate(${deg})`}
                  />
                ))}
                <circle cx="0" cy="0" r="8" fill="#78350f" stroke={strokeColor} strokeWidth="1.2" />
              </g>

              {/* Pink & Purple Cosmos Flowers */}
              <path d="M50 120 Q56 95 62 80" stroke={c.treeFoliageDark} strokeWidth="2" fill="none" />
              <circle cx="62" cy="78" r="6" fill={c.flowerPink} />
              <circle cx="62" cy="78" r="2.2" fill={c.flowerYellow} />

              <path d="M110 120 Q106 100 102 90" stroke={c.treeFoliageDark} strokeWidth="2" fill="none" />
              <circle cx="102" cy="88" r="5.5" fill={c.flowerRed} />
              <circle cx="102" cy="88" r="2" fill={c.flowerYellow} />
            </g>

            {/* Fluttering Butterfly (Light Mode) or Glowing Fireflies (Dark Mode) */}
            {!dark ? (
              <g
                className="animated-bg-butterfly pointer-events-none"
                transform="translate(110, 170)"
              >
                <ellipse cx="10" cy="10" rx="1.5" ry="5" fill="#1e293b" />
                {/* Wings */}
                <g className="animated-bg-wing">
                  <ellipse cx="4" cy="7" rx="7" ry="5" fill="#f472b6" stroke={strokeColor} strokeWidth="0.8" />
                  <ellipse cx="16" cy="7" rx="7" ry="5" fill="#f472b6" stroke={strokeColor} strokeWidth="0.8" />
                  <ellipse cx="5" cy="13" rx="5" ry="3.5" fill="#fbcfe8" stroke={strokeColor} strokeWidth="0.8" />
                  <ellipse cx="15" cy="13" rx="5" ry="3.5" fill="#fbcfe8" stroke={strokeColor} strokeWidth="0.8" />
                  <circle cx="4" cy="7" r="1.5" fill="#fde047" />
                  <circle cx="16" cy="7" r="1.5" fill="#fde047" />
                </g>
              </g>
            ) : (
              /* Fireflies glowing in the bushes */
              <g className="pointer-events-none">
                <circle cx="110" cy="240" r="3" fill={c.fireflyColor} className="animated-bg-firefly-1" />
                <circle cx="150" cy="210" r="2.5" fill={c.fireflyColor} className="animated-bg-firefly-2" />
                <circle cx="70" cy="260" r="3" fill={c.fireflyColor} className="animated-bg-firefly-3" />
                <circle cx="210" cy="230" r="2.8" fill={c.fireflyColor} className="animated-bg-firefly-1" />
              </g>
            )}
          </svg>
        </div>

        {/* Floating Dandelion Fluffs / Gentle Nature Spores */}
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full pointer-events-none" fill="none">
            {/* Dandelion 1 */}
            <g className="animated-bg-dandelion-1" transform="translate(180, 280)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="0" r="3" fill={dark ? '#bef264' : '#ffffff'} opacity="0.85" />
            </g>
            {/* Dandelion 2 */}
            <g className="animated-bg-dandelion-2" transform="translate(680, 220)">
              <line x1="0" y1="0" x2="0" y2="7" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="0" r="2.5" fill={dark ? '#bef264' : '#ffffff'} opacity="0.8" />
            </g>
            {/* Dandelion 3 */}
            <g className="animated-bg-dandelion-3" transform="translate(1120, 260)">
              <line x1="0" y1="0" x2="0" y2="8" stroke={strokeColor} strokeWidth="0.8" opacity="0.6" />
              <circle cx="0" cy="0" r="2.8" fill={dark ? '#bef264' : '#ffffff'} opacity="0.8" />
            </g>
          </svg>
        </div>
      </div>

      {/* Subtle Vignette Gradient around edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 65%, ${
            dark ? 'rgba(7, 13, 30, 0.45)' : 'rgba(191, 227, 247, 0.25)'
          } 100%)`,
        }}
      />
    </div>
  );
}
