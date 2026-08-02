import { useState, useEffect } from 'react'
import { Volume2, VolumeX, ArrowUpRight } from 'lucide-react'
import { useTheme, t } from '../../context/theme-context'
import type { DetailData } from '../../types'

export function DetailModal({ data, onClose }: { data: DetailData; onClose: () => void }) {
  const { dark } = useTheme()
  const [imgIdx, setImgIdx] = useState(0)
  const imgs = data.imgs || []
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      window.speechSynthesis.cancel() // Stop speech when modal closes
    }
  }, [])

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      window.speechSynthesis.cancel()
      const textToRead = [
        data.title?.replace(/DR\.\s*/gi, ''),
        data.subtitle,
        data.period?.replace(/\|\s*\+63.*$/g, ''),
        Array.isArray(data.desc) ? data.desc.map(d => d.replace(/^[•\-\*]\s*/, '')).join('. ') : data.desc
      ].filter(Boolean).join('. ')

      const utterance = new SpeechSynthesisUtterance(textToRead)

      const voices = window.speechSynthesis.getVoices()
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && /zira|susan|hazel|heather|female|samantha|victoria|aria|jenny|sonia|google/i.test(v.name))
        || voices.find(v => v.lang.startsWith('en') && !/david|mark|male|boy|guy/i.test(v.name))
      if (preferredVoice) utterance.voice = preferredVoice

      utterance.rate = 0.95
      utterance.onend = () => setIsPlaying(false)
      utterance.onerror = () => setIsPlaying(false)

      setIsPlaying(true)
      window.speechSynthesis.speak(utterance)
      window.speechSynthesis.resume() // Fixes Edge bug where TTS silently pauses/locks
    }
  }

  const renderRoles = (roleStr?: string) => {
    if (!roleStr) return null
    const roles = roleStr.split('|').map(r => r.trim()).filter(Boolean)
    return (
      <div className="flex flex-wrap items-center gap-1">
        {roles.map((r, idx) => (
          <span
            key={idx}
            className={`inline-block px-1.5 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider border ${
              t(dark, 'bg-[#2a241e] text-[#f5d089] border-[#665435]', 'bg-[#f4efe4] text-[#7a591e] border-[#d4c5a9]')
            }`}
          >
            {r}
          </span>
        ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-stretch justify-end p-0 cursor-pointer" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 backdrop-blur-md bg-black/40 sm:bg-black/55 transition-opacity" />

      {/* Side Modal (Desktop) / Bottom Sheet (Mobile) Container */}
      <div
        className={`relative z-10 w-full sm:w-[85vw] md:w-[65vw] max-w-[850px] rounded-t-3xl sm:rounded-none sm:rounded-l-2xl overflow-hidden min-h-[50vh] sm:min-h-0 max-h-[92vh] sm:max-h-full flex flex-col justify-between transition-transform animate-slide-bottom sm:animate-slide-right cursor-default ${
          t(
            dark,
            'bg-[#141414] text-[#e0e0e0] border-t sm:border-t-0 sm:border-l border-white/15 shadow-2xl shadow-black/80',
            'bg-[#faf9f6] text-[#1c1813] border-t sm:border-t-0 sm:border-l border-[#d0c9b8] shadow-2xl'
          )
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Mobile Drag Pill */}
        <div className="sm:hidden flex justify-center py-2 bg-black/5 dark:bg-white/5 border-b border-current/10 shrink-0">
          <div className="w-10 h-1 rounded-full bg-current opacity-25" />
        </div>

        {/* Newspaper Masthead Header */}
        <div className={`border-b-2 border-double shrink-0 ${t(dark, 'border-white/20 bg-[#191919]', 'border-[#d0c9b8] bg-[#F2EBD9]')}`}>
          <div className="flex items-center justify-between px-4 sm:px-5 py-2 gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 bg-current rotate-45 shrink-0 opacity-80" />
              <span className={`font-mono text-[9px] sm:text-[10px] font-black uppercase tracking-widest truncate ${t(dark, 'text-[#ff6b6b]', 'text-[#a11d1d]')}`}>
                HanMade Chronicle
              </span>
              {data.badge && (
                <span className={`text-[8.5px] sm:text-[9.5px] font-mono font-black uppercase px-2 py-0.5 border border-current ${t(dark, 'bg-emerald-950/40 text-emerald-400 border-emerald-800/60', 'bg-emerald-50 text-emerald-800 border-emerald-300')}`}>
                  {data.badge}
                </span>
              )}
              {data.wip && (
                <span className={`text-[8.5px] sm:text-[9.5px] font-mono font-black uppercase px-2 py-0.5 border border-current ${t(dark, 'bg-amber-950/40 text-amber-400 border-amber-800/60', 'bg-amber-100 text-amber-800 border-amber-300')}`}>
                  WIP
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Voice Reader Button */}
              <button
                onClick={toggleSpeech}
                className={`flex items-center gap-1.5 px-2.5 py-1 text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${
                  isPlaying
                    ? t(dark, 'border-[#ff6b6b] text-[#ff6b6b] bg-[#ff6b6b]/10', 'border-[#a11d1d] text-[#a11d1d] bg-[#a11d1d]/10')
                    : t(dark, 'border-white/20 text-zinc-300 hover:bg-white/10', 'border-[#d0c9b8] text-[#5c5643] hover:bg-[#eae2d0]')
                }`}
                title="Read article aloud"
              >
                {isPlaying ? (
                  <>
                    <VolumeX size={12} />
                    <span>STOP</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={12} />
                    <span>LISTEN</span>
                  </>
                )}
              </button>

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`px-2.5 py-1 text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border transition-all shrink-0 cursor-pointer ${
                  t(dark, 'border-red-500/40 text-red-400 hover:bg-red-950/40', 'border-red-300 text-red-700 hover:bg-red-50')
                }`}
              >
                [X] CLOSE
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Newspaper Body */}
        <div className="overflow-y-auto flex-1 flex flex-col">
          {/* Framed Image Viewer for Normal Projects */}
          {!data.profileMode && imgs.length > 0 && (
            <div className={`relative w-full max-w-lg mx-auto h-36 sm:h-44 border-b border-2 border-dashed my-3 p-2 flex items-center justify-center overflow-hidden shrink-0 rounded-sm ${
              t(dark, 'bg-black/60 border-white/15', 'bg-[#F6EFE2] border-[#d0c9b8]')
            }`}>
              <img src={imgs[imgIdx]} alt={data.title} className="max-w-full max-h-full object-contain drop-shadow-md" decoding="async" loading="lazy" />

              {imgs.length > 1 && (
                <>
                  <button
                    onClick={() => setImgIdx(i => (i - 1 + imgs.length) % imgs.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 px-2 py-0.5 font-mono font-bold text-[10px] border border-current bg-black/70 text-white dark:bg-white/10 dark:hover:bg-white/20 hover:bg-black transition-colors cursor-pointer"
                  >
                    &lsaquo; PREV
                  </button>
                  <button
                    onClick={() => setImgIdx(i => (i + 1) % imgs.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-0.5 font-mono font-bold text-[10px] border border-current bg-black/70 text-white dark:bg-white/10 dark:hover:bg-white/20 hover:bg-black transition-colors cursor-pointer"
                  >
                    NEXT &rsaquo;
                  </button>
                  <div className="absolute bottom-1.5 left-0 right-0 flex justify-center gap-1.5">
                    {imgs.map((_, i) => (
                      <span
                        key={i}
                        className={`w-2 h-2 rotate-45 transition-all ${
                          i === imgIdx ? (dark ? 'bg-[#ff6b6b] scale-125' : 'bg-[#a11d1d] scale-125') : 'bg-current opacity-30'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}

              <div className="absolute top-1.5 left-1.5 px-2 py-0.5 text-[8px] font-mono font-black uppercase tracking-widest bg-black/70 text-white backdrop-blur-xs">
                FIG 1.{imgIdx + 1} &bull; PRESS PHOTO
              </div>
            </div>
          )}

          <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-5 font-serif">
            {/* Profile Mode Header */}
            {data.profileMode ? (
              <div className={`p-4 sm:p-6 border-2 border-double flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-2 ${
                t(dark, 'bg-[#1e1e1e] border-white/20', 'bg-[#F6EFE2] border-[#d0c9b8]')
              }`}>
                {imgs.length > 0 && (
                  <div className={`relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 border-2 p-1 ${
                    t(dark, 'border-white/20 bg-black', 'border-[#d0c9b8] bg-white')
                  }`}>
                    <img src={imgs[imgIdx]} alt={data.title} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" decoding="async" loading="lazy" />
                  </div>
                )}
                <div className="flex-1 text-center sm:text-left space-y-1.5 sm:mt-1">
                  <div className={`text-[9px] sm:text-[10px] font-mono font-black uppercase tracking-widest ${t(dark, 'text-[#ff6b6b]', 'text-[#a11d1d]')}`}>
                    &bull; AUTHOR BIOGRAPHY &bull;
                  </div>
                  <h2 className={`text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight leading-none ${t(dark, 'text-zinc-100', 'text-[#1c1813]')}`}>
                    {data.title}
                  </h2>
                  {data.subtitle && <p className="text-sm sm:text-base italic opacity-90">{data.subtitle}</p>}
                  {data.period && <p className="text-xs font-mono opacity-60 pt-1">{data.period}</p>}
                </div>
              </div>
            ) : (
              /* Standard Project Header */
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <div>
                    <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-black uppercase tracking-tight leading-tight ${t(dark, 'text-zinc-100', 'text-[#1c1813]')}`}>
                      {data.title}
                    </h2>
                    {data.subtitle && (
                      <p className={`text-sm sm:text-base font-serif italic mt-1.5 ${t(dark, 'text-[#ff6b6b]', 'text-[#a11d1d]')}`}>
                        {data.subtitle}
                      </p>
                    )}
                  </div>

                  {data.link && (
                    <a
                      href={data.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 border-double transition-all shrink-0 cursor-pointer ${
                        t(dark, 'border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-black', 'border-[#a11d1d] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')
                      }`}
                    >
                      OPEN LIVE <ArrowUpRight size={14} className="stroke-[2.5]" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono opacity-75 border-y border-dashed py-2 my-2 border-current/25">
                  {renderRoles(data.subtitle)}
                  {data.period && <span>PERIOD: {data.period}</span>}
                  {data.date && <span>UNLOCKED: {data.date}</span>}
                </div>
              </div>
            )}

            {/* Main Article Overview & Bulleted Highlights */}
            {data.desc && (
              <div className="clear-both pt-1">
                <div className={`my-2 py-1 px-3 border-y border-double ${t(dark, 'border-white/20 text-[#ff6b6b]', 'border-[#d0c9b8] text-[#a11d1d]')} flex items-center gap-2 text-[9.5px] font-mono font-black uppercase tracking-[0.2em] mb-3`}>
                  <span className="w-1.5 h-1.5 bg-current rotate-45 shrink-0" />
                  <span>SPECIAL REPORT OVERVIEW & KEY HIGHLIGHTS</span>
                  <span className="w-1.5 h-1.5 bg-current rotate-45 shrink-0" />
                </div>

                {Array.isArray(data.desc) ? (
                  <div className="space-y-3 clear-both">
                    {data.desc.map((d, i) => {
                      const isBullet = d.trim().startsWith('•') || d.trim().startsWith('-') || d.trim().startsWith('*')
                      if (isBullet) {
                        const cleanText = d.replace(/^[•\-\*]\s*/, '')
                        const parts = cleanText.split(':')
                        const title = parts.length > 1 ? parts[0] : null
                        const body = parts.length > 1 ? parts.slice(1).join(':') : cleanText

                        return (
                          <div
                            key={i}
                            className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-sm border ${
                              t(dark, 'bg-[#1c1c1c] border-white/10 text-zinc-200', 'bg-[#f4efe4] border-[#e2d8c3] text-[#2c261e]')
                            }`}
                          >
                            <span className={`mt-1.5 w-2 h-2 rotate-45 shrink-0 ${t(dark, 'bg-[#ff6b6b]', 'bg-[#a11d1d]')}`} />
                            <div className="text-sm sm:text-base leading-relaxed">
                              {title ? (
                                <>
                                  <strong className={`font-mono uppercase font-bold text-xs sm:text-sm mr-1.5 tracking-wide ${t(dark, 'text-[#ff6b6b]', 'text-[#a11d1d]')}`}>{title}:</strong>
                                  <span>{body}</span>
                                </>
                              ) : (
                                <span>{cleanText}</span>
                              )}
                            </div>
                          </div>
                        )
                      }

                      return (
                        <p
                          key={i}
                          className={`text-base sm:text-lg leading-relaxed clear-both ${
                            i === 0 ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-black first-letter:font-serif first-letter:mr-2.5 first-letter:float-left first-letter:leading-none' : ''
                          }`}
                        >
                          {d}
                        </p>
                      )
                    })}
                  </div>
                ) : (
                  <p className="text-base sm:text-lg leading-relaxed clear-both first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-black first-letter:font-serif first-letter:mr-2.5 first-letter:float-left first-letter:leading-none">
                    {data.desc}
                  </p>
                )}
              </div>
            )}

            {/* Tech Stack / Tags */}
            {data.tags && data.tags.length > 0 && (
              <div className="pt-1 clear-both">
                <div className="text-[9.5px] sm:text-[10px] font-mono font-black uppercase tracking-widest opacity-70 mb-2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-current rotate-45 shrink-0" /> TECH STACK & SPECIFICATIONS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {data.tags.map(tg => (
                    <span
                      key={tg}
                      className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border ${
                        t(dark, 'text-[#c6bfb0] border-[#555047] bg-[#212124]', 'text-[#54442e] border-[#d2cab4] bg-[#faf6ec]')
                      }`}
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex-grow" />
        </div>

        {/* Newspaper Footer Strip */}
        <div className={`px-4 sm:px-6 py-3 border-t-2 border-double flex items-center justify-between font-mono text-[9px] sm:text-[10px] uppercase tracking-widest shrink-0 ${
          t(dark, 'border-white/20 text-zinc-400 bg-[#191919]', 'border-[#d0c9b8] text-[#5c5643] bg-[#F2EBD9]')
        }`}>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-current rotate-45 shrink-0" /> HANMADE CHRONICLE
          </span>
          <span>ARTICLE ARCHIVE RECORD &bull; EST. 2024</span>
        </div>
      </div>
    </div>
  )
}
