import { useState, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useTheme, t } from '../../context/theme-context'

// Preload adjacent images for smooth navigation
const preloadImage = (src: string) => {
  const img = new Image()
  img.src = src
}

export function Lightbox({ imgs, alt, wip, desc, tags, link, role, period, onClose }: any) {
  const { dark } = useTheme()
  const [idx, setIdx] = useState(0)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const hasMoreInfo = !!(desc || tags || link || role)
  const totalSlides = imgs.length + (hasMoreInfo ? 1 : 0)
  const isMoreInfoSlide = idx === imgs.length

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Preload current and adjacent images
  useEffect(() => {
    const preloadImages = () => {
      // Always preload current image
      if (imgs[idx] && !loadedImages.has(imgs[idx])) {
        preloadImage(imgs[idx])
        setLoadedImages(prev => new Set([...prev, imgs[idx]]))
      }
      
      // Preload next image
      const nextIdx = (idx + 1) % imgs.length
      if (imgs[nextIdx] && !loadedImages.has(imgs[nextIdx])) {
        preloadImage(imgs[nextIdx])
        setLoadedImages(prev => new Set([...prev, imgs[nextIdx]]))
      }
      
      // Preload previous image
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

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % totalSlides) }
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + totalSlides) % totalSlides) }

  return (
    <div className="fixed inset-0 z-[70] flex items-end lg:items-stretch justify-end p-0" onClick={onClose}>
      <div className="absolute inset-0 backdrop-blur-md bg-black/40 lg:bg-black/50" />

      <div className={`relative z-10 w-full lg:w-[65vw] lg:max-w-[850px] max-h-[92vh] lg:max-h-full lg:h-full overflow-y-auto rounded-t-3xl lg:rounded-none lg:rounded-l-2xl flex flex-col justify-start lg:justify-center p-5 lg:p-8 ${
        t(dark, 'bg-[#0f0f1a] border-t lg:border-t-0 lg:border-l border-white/10 shadow-2xl shadow-black/80', 'bg-[#fdfbf7] border-t lg:border-t-0 lg:border-l border-amber-900/10 shadow-2xl')
      }`} onClick={e => e.stopPropagation()}>

        {/* Drag handle pill — mobile & tablet only */}
        <div className="lg:hidden flex justify-center mb-4 -mt-1">
          <div className={`w-10 h-1 rounded-full ${t(dark, 'bg-white/20', 'bg-black/15')}`} />
        </div>


        {/* Game UI Header */}
        <div className={`w-full flex justify-between items-end mb-4 border-b-2 pb-2 ${t(dark, 'border-cyan-900', 'border-amber-200/60')}`}>
          <div className="flex flex-col">
            <span className={`font-semibold tracking-wide text-xs sm:text-xs uppercase ${t(dark, 'text-cyan-400', 'text-amber-700')}`}>
              {isMoreInfoSlide ? 'PROJECT_DETAILS' : 'VIEWING_DATA'}
            </span>
            <span className={`font-mono text-xs sm:text-sm mt-1.5 flex items-center gap-2 ${t(dark, 'text-gray-400', 'text-gray-600')}`}>
              {alt}
              {wip && <span className={`inline-flex px-1.5 py-0.5 rounded text-[10px] font-mono font-bold whitespace-nowrap border ${t(dark, 'bg-amber-950/40 text-amber-400 border-amber-800/50', 'bg-amber-50 text-amber-700 border-amber-200')}`}>Work in Progress</span>}
            </span>
          </div>
          <button
            onClick={onClose}
            className={`font-semibold tracking-wide text-xs sm:text-xs px-3 py-2 border transition-all ${t(dark, 'border-red-900/50 text-red-400 hover:bg-red-950/50 hover:border-red-500', 'border-red-200 text-red-600 hover:bg-red-50 hover:border-red-400')}`}
          >
            [X] CLOSE
          </button>
        </div>

        {/* Main Content Area — fixed height so modal never resizes between slides */}
        <div className={`relative w-full border p-2 lg:p-4 ${t(dark, 'border-cyan-800/50 bg-black/50 shadow-sm', 'border-amber-200/50 bg-white shadow-xl')}`}>
          <div className={`relative w-full h-[32vh] sm:h-[38vh] lg:h-[55vh] flex ${isMoreInfoSlide ? 'items-start' : 'items-center justify-center'} overflow-y-auto overflow-x-hidden ${t(dark, 'bg-[#0a0a0f]/80', 'bg-[#fcfaf5]')}`}>
            {isMoreInfoSlide ? (
              <div className="p-5 lg:p-8 w-full min-h-full flex flex-col text-left animate-fade-in relative z-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-5 border-b border-dashed border-gray-200 dark:border-white/10">
                  <h2 className={`text-2xl lg:text-3xl font-black tracking-tight ${t(dark, 'text-white', 'text-gray-900')}`}>{alt}</h2>
                  {link && (
                    <a href={link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 lg:px-5 lg:py-2.5 rounded-xl text-xs lg:text-sm font-bold border transition-all shadow-sm shrink-0 self-start sm:self-auto ${t(dark, 'border-cyan-700/50 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-900/50 hover:-translate-y-0.5', 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:-translate-y-0.5')}`}>
                      OPEN LIVE <ArrowUpRight size={14} className="stroke-[2.5]" />
                    </a>
                  )}
                </div>
                
                <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 p-4 rounded-xl border ${t(dark, 'bg-white/5 border-white/5', 'bg-gray-50 border-gray-100')}`}>
                  {role && (
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1.5 ${t(dark, 'text-gray-500', 'text-gray-400')}`}>Role</span>
                      <div className="flex flex-wrap gap-1.5">
                        {role.split('|').map((r: string, idx: number) => (
                          <span key={idx} className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold border ${t(dark, 'bg-cyan-950/40 text-cyan-300 border-cyan-800/50', 'bg-indigo-50 text-indigo-700 border-indigo-200')}`}>
                            {r.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {period && (
                    <div className="flex flex-col">
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${t(dark, 'text-gray-500', 'text-gray-400')}`}>Timeline</span>
                      <span className={`text-sm font-mono ${t(dark, 'text-gray-300', 'text-gray-600')}`}>{period}</span>
                    </div>
                  )}
                </div>
                
                {desc && (
                  <div className="mb-8">
                    <h3 className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 flex items-center gap-2 ${t(dark, 'text-gray-400', 'text-gray-500')}`}>
                      <span className={t(dark, 'text-cyan-500', 'text-indigo-500')}>&#9632;</span> Project Overview
                    </h3>
                    {Array.isArray(desc) ? (
                      <div className="space-y-3">
                        {desc.map((d:string, i:number) => (
                          <div key={i} className="flex items-start gap-2.5">
                            <span className={`mt-1.5 w-1.5 h-1.5 rounded-sm shrink-0 ${t(dark, 'bg-cyan-500/50', 'bg-indigo-400')}`} />
                            <p className={`text-sm leading-relaxed ${t(dark, 'text-gray-300', 'text-gray-600')}`}>{d}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-sm leading-relaxed ${t(dark, 'text-gray-300', 'text-gray-600')}`}>{desc}</p>
                    )}
                  </div>
                )}

                {tags && tags.length > 0 && (
                  <div className="mb-6 mt-auto">
                    <h3 className={`text-xs font-mono font-bold uppercase tracking-widest mb-3 flex items-center gap-2 ${t(dark, 'text-gray-400', 'text-gray-500')}`}>
                      <span className={t(dark, 'text-amber-500', 'text-amber-500')}>&#9632;</span> Tech Stack & Tools
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((t_str: string) => <span key={t_str} className={`px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold border shadow-sm transition-all hover:-translate-y-0.5 ${t(dark, 'bg-[#0f0f1a] border-cyan-900/30 text-cyan-300 hover:border-cyan-500/50', 'bg-white border-indigo-100 text-indigo-700 hover:border-indigo-300')}`}>{t_str}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <img
                key={imgs[idx]}
                src={imgs[idx]}
                alt={alt}
                className="max-w-full max-h-full object-contain animate-fade-in drop-shadow-lg"
                loading="lazy"
                decoding="async"
              />
            )}
          </div>
        </div>


        {/* Navigation Controls */}
        {totalSlides > 1 && (
          <div className="w-full flex justify-between items-center mt-4 sm:mt-6">
            <button
              onClick={prev}
              className={`font-semibold tracking-wide text-xs sm:text-xs px-4 py-3 border transition-all ${t(dark, 'border-cyan-900 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500', 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400')}`}
            >
              {'< PREV'}
            </button>

            <div className={`font-mono text-sm sm:text-base px-4 py-2 border ${t(dark, 'border-white/10 text-white/50 bg-black/30', 'border-gray-200 text-gray-500 bg-white/50')}`}>
              {isMoreInfoSlide ? 'DETAILS' : `FILE ${idx + 1}/${imgs.length}`}
            </div>

            <button
              onClick={next}
              className={`font-semibold tracking-wide text-xs sm:text-xs px-4 py-3 border transition-all ${t(dark, 'border-cyan-900 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500', 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400')}`}
            >
              {'NEXT >'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

