import { useState, useEffect } from 'react'
import { ArrowUpRight, Volume2, VolumeX, X } from 'lucide-react'
import { useTheme, t } from '../../context/theme-context'

// Preload adjacent images for smooth navigation
const preloadImage = (src: string) => {
  const img = new Image()
  img.src = src
}

export function Lightbox({ imgs = [], alt, wip, desc, tags, link, role, period, onClose }: any) {
  const { dark } = useTheme()
  const [idx, setIdx] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())
  const [isPlaying, setIsPlaying] = useState(false)

  const hasMoreInfo = !!(desc || tags || link || role)
  const totalSlides = imgs.length + (hasMoreInfo ? 1 : 0)
  const isMoreInfoSlide = idx === imgs.length

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      window.speechSynthesis.cancel()
    }
  }, [])

  // Preload current and adjacent images
  useEffect(() => {
    const preloadImages = () => {
      if (imgs[idx] && !loadedImages.has(imgs[idx])) {
        preloadImage(imgs[idx])
        setLoadedImages(prev => new Set([...prev, imgs[idx]]))
      }

      const nextIdx = (idx + 1) % imgs.length
      if (imgs[nextIdx] && !loadedImages.has(imgs[nextIdx])) {
        preloadImage(imgs[nextIdx])
        setLoadedImages(prev => new Set([...prev, imgs[nextIdx]]))
      }

      const prevIdx = (idx - 1 + imgs.length) % imgs.length
      if (imgs[prevIdx] && !loadedImages.has(imgs[prevIdx])) {
        preloadImage(imgs[prevIdx])
        setLoadedImages(prev => new Set([...prev, imgs[prevIdx]]))
      }
    }

    if (!isMoreInfoSlide && imgs.length > 0) {
      preloadImages()
    }
  }, [idx, imgs, loadedImages, isMoreInfoSlide])

  const toggleSpeech = () => {
    if (isPlaying) {
      window.speechSynthesis.cancel()
      setIsPlaying(false)
    } else {
      window.speechSynthesis.cancel()
      const textToRead = [
        alt,
        role?.replace(/\|\s*/g, ', '),
        period,
        Array.isArray(desc) ? desc.map(d => d.replace(/^[•\-\*]\s*/, '')).join('. ') : desc
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
      window.speechSynthesis.resume()
    }
  }

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % totalSlides) }
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + totalSlides) % totalSlides) }

  const renderRoleChips = (roleStr?: string) => {
    if (!roleStr) return null
    const roles = roleStr.split('|').map(r => r.trim()).filter(Boolean)
    return (
      <div className="flex flex-wrap items-center gap-1">
        {roles.map((r, i) => (
          <span
            key={i}
            className={`inline-block px-1.5 py-0.5 text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider border ${t(dark, 'bg-[#2a241e] text-[#f5d089] border-[#665435]', 'bg-[#f4efe4] text-[#7a591e] border-[#d4c5a9]')
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
        className={`relative z-10 w-full sm:w-[85vw] md:w-[65vw] max-w-[850px] rounded-t-3xl sm:rounded-none sm:rounded-l-2xl overflow-hidden h-[65vh] sm:h-full flex flex-col justify-between transition-transform animate-slide-bottom sm:animate-slide-right cursor-default ${t(
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
                HanMade | Ideas & Creations
              </span>
              {wip && (
                <span className={`text-[8.5px] sm:text-[9.5px] font-mono font-black uppercase px-2 py-0.5 border border-current ${t(dark, 'bg-amber-950/40 text-amber-400 border-amber-800/60', 'bg-amber-100 text-amber-800 border-amber-300')}`}>
                  WIP
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {/* Voice Speech Toggle */}
              {hasMoreInfo && (
                <button
                  onClick={toggleSpeech}
                  className={`flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border transition-all cursor-pointer ${isPlaying
                      ? t(dark, 'border-[#ff6b6b] text-[#ff6b6b] bg-[#ff6b6b]/10', 'border-[#a11d1d] text-[#a11d1d] bg-[#a11d1d]/10')
                      : t(dark, 'border-white/20 text-zinc-300 hover:bg-white/10', 'border-[#d0c9b8] text-[#5c5643] hover:bg-[#eae2d0]')
                    }`}
                  title={isPlaying ? "Stop reading" : "Read story aloud"}
                >
                  {isPlaying ? (
                    <>
                      <VolumeX size={14} />
                      <span className="hidden sm:inline">STOP</span>
                    </>
                  ) : (
                    <>
                      <Volume2 size={14} />
                      <span className="hidden sm:inline">LISTEN</span>
                    </>
                  )}
                </button>
              )}

              {/* Close Button */}
              <button
                onClick={onClose}
                className={`flex items-center gap-1.5 px-2 py-1 sm:px-2.5 sm:py-1 text-[8.5px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border transition-all shrink-0 cursor-pointer ${t(dark, 'border-red-500/40 text-red-400 hover:bg-red-950/40', 'border-red-300 text-red-700 hover:bg-red-50')
                  }`}
                title="Close modal"
              >
                <X size={14} />
                <span className="hidden sm:inline">CLOSE</span>
              </button>
            </div>
          </div>

          {/* Sub-Header Tabs for Switching between Article and Photos */}
          {imgs.length > 0 && hasMoreInfo && (
            <div className={`flex border-t border-dashed px-4 sm:px-6 py-1.5 gap-2 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider ${t(dark, 'border-white/15', 'border-[#d0c9b8]')}`}>
              <button
                onClick={() => setIdx(imgs.length)}
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${isMoreInfoSlide
                    ? t(dark, 'bg-[#ff6b6b] text-black border-[#ff6b6b]', 'bg-[#a11d1d] text-white border-[#a11d1d]')
                    : t(dark, 'border-white/20 hover:bg-white/10', 'border-[#d0c9b8] hover:bg-[#eae2d0]')
                  }`}
              >
                &bull; ARTICLE DETAILS
              </button>
              <button
                onClick={() => setIdx(0)}
                className={`px-2.5 py-1 border transition-colors cursor-pointer ${!isMoreInfoSlide
                    ? t(dark, 'bg-[#ff6b6b] text-black border-[#ff6b6b]', 'bg-[#a11d1d] text-white border-[#a11d1d]')
                    : t(dark, 'border-white/20 hover:bg-white/10', 'border-[#d0c9b8] hover:bg-[#eae2d0]')
                  }`}
              >
                &bull; PHOTO GALLERY ({isMoreInfoSlide ? '1' : idx + 1}/{imgs.length})
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Content Body */}
        <div className="overflow-y-auto flex-1 flex flex-col">
          {isMoreInfoSlide ? (
            /* 📰 ARTICLE DETAILS VIEW */
            <div className="p-4 sm:p-6 md:p-8 flex flex-col gap-4 font-serif animate-fade-in">
              {/* Header Title & Live Link */}
              <div>
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-2">
                  <h2 className={`text-2xl sm:text-3xl md:text-4xl font-serif font-black uppercase tracking-tight leading-tight ${t(dark, 'text-zinc-100', 'text-[#1c1813]')}`}>
                    {alt}
                  </h2>

                  {link && (
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-mono font-bold uppercase tracking-wider border-2 border-double transition-all shrink-0 cursor-pointer ${t(dark, 'border-[#ff6b6b] text-[#ff6b6b] hover:bg-[#ff6b6b] hover:text-black', 'border-[#a11d1d] text-[#a11d1d] hover:bg-[#a11d1d] hover:text-white')
                        }`}
                    >
                      OPEN LIVE <ArrowUpRight size={14} className="stroke-[2.5]" />
                    </a>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-3 text-xs font-mono opacity-75 border-y border-dashed py-2 my-2 border-current/25">
                  {renderRoleChips(role)}
                  {period && <span>PERIOD: {period}</span>}
                </div>
              </div>

              {/* Compact Photo Preview Frame inside Article View */}
              {imgs.length > 0 && (
                <div
                  onClick={() => setIdx(0)}
                  className={`relative w-full max-w-md mx-auto h-44 sm:h-52 border-2 border-dashed p-4 sm:p-5 pb-10 sm:pb-11 cursor-pointer group transition-all overflow-hidden flex items-center justify-center shrink-0 rounded-sm my-4 sm:my-5 ${t(dark, 'border-white/20 bg-black/60 hover:border-[#ff6b6b]', 'border-[#d0c9b8] bg-[#F6EFE2] hover:border-[#a11d1d]')
                    }`}
                >
                  <img src={imgs[0]} alt={alt} className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" loading="lazy" />
                  <div className="absolute bottom-3 right-3 px-3 py-1 text-[8.5px] sm:text-[9.5px] font-mono font-black uppercase tracking-widest bg-black/85 text-white backdrop-blur-xs flex items-center gap-1.5 pointer-events-none rounded-xs border border-white/10 shadow-md">
                    <span>VIEW GALLERY ({imgs.length} PHOTOS)</span> &rsaquo;
                  </div>
                </div>
              )}

              {/* Article Overview & Bulleted Highlights */}
              {desc && (
                <div className="clear-both pt-1">
                  <div className={`my-2 py-1 px-3 border-y border-double ${t(dark, 'border-white/20 text-[#ff6b6b]', 'border-[#d0c9b8] text-[#a11d1d]')} flex items-center gap-2 text-[9.5px] font-mono font-black uppercase tracking-[0.2em] mb-3`}>
                    <span className="w-1.5 h-1.5 bg-current rotate-45 shrink-0" />
                    <span>ARTICLE OVERVIEW & KEY HIGHLIGHTS</span>
                    <span className="w-1.5 h-1.5 bg-current rotate-45 shrink-0" />
                  </div>

                  {Array.isArray(desc) ? (
                    <div className="space-y-3 clear-both">
                      {desc.map((d: string, i: number) => {
                        const isBullet = d.trim().startsWith('•') || d.trim().startsWith('-') || d.trim().startsWith('*')
                        if (isBullet) {
                          const cleanText = d.replace(/^[•\-\*]\s*/, '')
                          const parts = cleanText.split(':')
                          const title = parts.length > 1 ? parts[0] : null
                          const body = parts.length > 1 ? parts.slice(1).join(':') : cleanText

                          return (
                            <div
                              key={i}
                              className={`flex items-start gap-2.5 p-2.5 sm:p-3 rounded-sm border ${t(dark, 'bg-[#1c1c1c] border-white/10 text-zinc-200', 'bg-[#f4efe4] border-[#e2d8c3] text-[#2c261e]')
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
                            className={`text-base sm:text-lg leading-relaxed clear-both ${i === 0 ? 'first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-black first-letter:font-serif first-letter:mr-2.5 first-letter:float-left first-letter:leading-none' : ''
                              }`}
                          >
                            {d}
                          </p>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-base sm:text-lg leading-relaxed clear-both first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-black first-letter:font-serif first-letter:mr-2.5 first-letter:float-left first-letter:leading-none">
                      {desc}
                    </p>
                  )}
                </div>
              )}

              {/* Tech Stack Tags */}
              {tags && tags.length > 0 && (
                <div className="pt-1 clear-both">
                  <div className="text-[9.5px] sm:text-[10px] font-mono font-black uppercase tracking-widest opacity-70 mb-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-current rotate-45 shrink-0" /> TECH STACK & TOOLS
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((t_str: string) => (
                      <span
                        key={t_str}
                        className={`px-2.5 py-1 text-[9px] sm:text-[10px] font-mono font-bold uppercase tracking-wider border ${t(dark, 'text-[#c6bfb0] border-[#555047] bg-[#212124]', 'text-[#54442e] border-[#d2cab4] bg-[#faf6ec]')
                          }`}
                      >
                        {t_str}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* 🖼️ PHOTO GALLERY VIEW */
            <div className="p-2 sm:p-5 flex flex-col items-center justify-center flex-1 w-full h-full animate-fade-in min-h-0">
              <div className={`relative w-full flex-1 min-h-[180px] sm:min-h-[450px] flex items-center justify-center border-2 border-dashed p-2 sm:p-6 overflow-hidden rounded-sm ${t(dark, 'border-white/20 bg-black/70', 'border-[#d0c9b8] bg-[#F6EFE2]')
                }`}>
                <img
                  key={imgs[idx]}
                  src={imgs[idx]}
                  alt={alt}
                  onClick={next}
                  className="w-full h-full object-contain drop-shadow-xl cursor-pointer select-none transition-transform duration-300 hover:scale-[1.01]"
                  loading="lazy"
                  decoding="async"
                />

                <div className="absolute top-3 left-3 px-2.5 py-1 text-[8.5px] sm:text-[9.5px] font-mono font-black uppercase tracking-widest bg-black/80 text-white backdrop-blur-xs">
                  FIG 1.{idx + 1} &bull; {alt}
                </div>
              </div>

              {/* Photo Pagination Dots */}
              {imgs.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-3 shrink-0">
                  {imgs.map((_: any, i: number) => (
                    <button
                      key={i}
                      onClick={() => setIdx(i)}
                      className={`w-2.5 h-2.5 rotate-45 transition-all cursor-pointer ${i === idx
                          ? (dark ? 'bg-[#ff6b6b] scale-125' : 'bg-[#a11d1d] scale-125')
                          : 'bg-current opacity-30 hover:opacity-70'
                        }`}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Controls & Newspaper Banner */}
        <div className={`border-t-2 border-double p-3 sm:p-4 shrink-0 flex flex-col gap-2 ${t(dark, 'border-white/20 bg-[#191919]', 'border-[#d0c9b8] bg-[#F2EBD9]')
          }`}>
          {totalSlides > 1 && (
            <div className="w-full flex justify-between items-center font-mono text-xs">
              <button
                onClick={prev}
                className={`px-3 py-1.5 border font-bold uppercase tracking-wider transition-all cursor-pointer ${t(dark, 'border-white/20 text-zinc-200 hover:bg-white/10', 'border-[#d0c9b8] text-[#1c1813] hover:bg-[#eae2d0]')
                  }`}
              >
                &lsaquo; PREV
              </button>

              <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest opacity-80">
                {isMoreInfoSlide ? 'RECORD DETAILS' : `PHOTO ${idx + 1} OF ${imgs.length}`}
              </div>

              <button
                onClick={next}
                className={`px-3 py-1.5 border font-bold uppercase tracking-wider transition-all cursor-pointer ${t(dark, 'border-white/20 text-zinc-200 hover:bg-white/10', 'border-[#d0c9b8] text-[#1c1813] hover:bg-[#eae2d0]')
                  }`}
              >
                NEXT &rsaquo;
              </button>
            </div>
          )}

          <div className="flex items-center justify-between font-mono text-[8.5px] sm:text-[9.5px] uppercase tracking-widest opacity-70 pt-1 border-t border-dashed border-current/20">
            <span>HANMADE PORTFOLIO &bull; ARCHIVE PRESS</span>
            <span>VOL. 1 &bull; EST. 2024</span>
          </div>
        </div>
      </div>
    </div>
  )
}
