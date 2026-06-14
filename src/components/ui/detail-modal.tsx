import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
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
      let textToRead = [
        data.title?.replace(/DR\.\s*/gi, ''),
        data.subtitle,
        data.period?.replace(/\|\s*\+63.*$/g, ''),
        Array.isArray(data.desc) ? data.desc.join('. ') : data.desc
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
  
  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 backdrop-blur-md bg-black/5" />
      <div
        className={`relative z-10 w-full sm:max-w-md md:max-w-2xl lg:max-w-4xl sm:mx-6 rounded-t-3xl sm:rounded-3xl overflow-hidden min-h-[50vh] sm:min-h-0 max-h-[90vh] flex flex-col transition-transform animate-slide-bottom sm:animate-slide-right ${t(dark, 'bg-[#0f0f1a] border border-white/10', 'bg-[#fdfbf7] border border-amber-900/10 shadow-2xl')}`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`flex items-center justify-between px-5 py-4 border-b ${t(dark, 'border-white/10', 'border-gray-300/50')}`}>
          <div className="flex items-center gap-2 flex-wrap">
            {data.badge && <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${t(dark, 'bg-green-950/50 border border-green-800/40 text-green-400', 'bg-green-50 border border-green-200 text-green-700')}`}>{data.badge}</span>}
            {data.wip && <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${t(dark, 'bg-amber-950/40 border border-amber-800/50 text-amber-400', 'bg-amber-100 border border-amber-300 text-amber-700')}`}>WIP</span>}

            {/* Voice Reader Button */}
            <button 
              onClick={toggleSpeech}
              className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-mono font-bold border transition-colors ${isPlaying 
                ? t(dark, 'bg-cyan-950/50 border-cyan-800/50 text-cyan-400', 'bg-indigo-50 border-indigo-200 text-indigo-700')
                : t(dark, 'bg-white/5 border-white/10 text-gray-400 hover:text-white', 'bg-gray-100 border-gray-200 text-gray-600 hover:text-gray-900')}`}
              title="Read text aloud"
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
          </div>
          <button onClick={onClose} className={`text-xs font-mono font-bold px-3 py-1.5 rounded-lg border transition-all shrink-0 ${t(dark, 'border-red-900/50 text-red-400 hover:bg-red-950/40', 'border-red-200 text-red-500 hover:bg-red-50')}`}>[X] CLOSE</button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto flex-1 flex flex-col">
          {/* Image Viewer (Normal Projects) */}
          {!data.profileMode && imgs.length > 0 && (
            <div className={`relative w-full h-44 sm:h-56 md:h-72 lg:h-96 flex items-center justify-center overflow-hidden ${t(dark, 'bg-black/40', 'bg-[#eaebed]')}`}>
              <img src={imgs[imgIdx]} alt={data.title} className="max-w-full max-h-full object-contain" loading="lazy" decoding="async" />
              {imgs.length > 1 && (
                <>
                  <button onClick={() => setImgIdx(i => (i - 1 + imgs.length) % imgs.length)} className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-bold">‹</button>
                  <button onClick={() => setImgIdx(i => (i + 1) % imgs.length)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center text-sm font-bold">›</button>
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
                    {imgs.map((_, i) => <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === imgIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />)}
                  </div>
                </>
              )}
            </div>
          )}

          <div className="px-5 pt-6 pb-6 flex flex-col gap-6">
            <div>
              <div className="clearfix space-y-5">
              
              {/* Clean Profile Header Format */}
              {data.profileMode ? (
                <div className={`p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-5 mb-5 ${t(dark, 'bg-[#0a0a14] border border-white/5 shadow-inner', 'bg-gray-100 border border-gray-200/80 shadow-sm')}`}>
                  {imgs.length > 0 && (
                    <div className={`relative w-28 h-28 sm:w-32 sm:h-32 shrink-0 rounded-full overflow-hidden shadow-lg border-4 ${t(dark, 'border-[#131320]', 'border-white')}`}>
                      <img src={imgs[imgIdx]} alt={data.title} className="w-full h-full object-cover object-[50%_15%]" loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="flex-1 text-center sm:text-left space-y-1 sm:space-y-1.5 sm:mt-2">
                    <h2 className={`text-2xl md:text-3xl font-black tracking-tight leading-none ${t(dark, 'text-white', 'text-gray-900')}`}>{data.title}</h2>
                    {data.subtitle && <p className={`text-base md:text-lg font-medium ${t(dark, 'text-gray-400', 'text-gray-500')}`}>{data.subtitle}</p>}
                    {data.period && <p className={`text-xs font-mono pt-1 ${t(dark, 'text-gray-500', 'text-gray-400')}`}>{data.period}</p>}
                  </div>
                </div>
              ) : (
                /* Compact Project Title for Mobile/iPad */
                <div className="mb-5">
                  <div className="flex justify-between items-start gap-4">
                    <h2 className={`text-xl md:text-2xl lg:text-3xl font-black tracking-tight ${t(dark, 'text-white', 'text-gray-900')}`}>{data.title}</h2>
                    {data.link && (
                      <a href={data.link} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-bold border transition-all active:scale-95 shrink-0 shadow-sm ${t(dark, 'border-cyan-700/50 bg-cyan-950/30 text-cyan-400 hover:bg-cyan-900/50', 'border-indigo-200 bg-indigo-50 text-indigo-700 hover:bg-indigo-100')}`}>
                        OPEN LIVE <span className="font-sans font-black text-xs leading-none">↗</span>
                      </a>
                    )}
                  </div>
                  {data.subtitle && <p className={`text-sm md:text-base font-semibold mt-1 md:mt-1.5 ${t(dark, 'text-cyan-400', 'text-indigo-600')}`}>{data.subtitle}</p>}
                  {data.period && <p className={`text-xs font-mono mt-1 ${t(dark, 'text-gray-500', 'text-gray-400')}`}>{data.period}</p>}
                  {data.date && <p className={`text-xs font-mono mt-1 ${t(dark, 'text-gray-500', 'text-gray-400')}`}>Unlocked: {data.date}</p>}
                </div>
              )}

              {data.desc && (
                  <div className="mb-5">
                    {Array.isArray(data.desc) ? (
                      <div className="space-y-2.5">
                        {data.desc.map((d, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${t(dark, data.profileMode ? 'bg-purple-500' : 'bg-cyan-500', data.profileMode ? 'bg-violet-400' : 'bg-indigo-400')}`} />
                            <p className={`text-base md:text-lg leading-relaxed ${t(dark, 'text-gray-300', 'text-gray-600')}`}>{d}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className={`text-base md:text-lg leading-relaxed ${t(dark, 'text-gray-300', 'text-gray-600')}`}>{data.desc}</p>
                    )}
                  </div>
              )}

              {data.tags && data.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 clear-both pt-1">
                  {data.tags.map(tg => (
                    <span key={tg} className={`px-2.5 py-1 rounded-md text-[11px] font-mono ${t(dark, 'bg-white/5 border border-white/10 text-gray-400', 'bg-gray-100 border border-gray-200 text-gray-600')}`}>{tg}</span>
                  ))}
                </div>
              )}
            </div>
            </div>

            {/* Spacer pushes footer to bottom */}
            <div className="flex-grow" />

            {/* Footer pinned at bottom */}
            <div className={`mt-4 pt-4 border-t border-dashed flex items-center justify-between font-mono text-[10px] uppercase tracking-wider ${t(dark, 'border-white/10 text-gray-500', 'border-gray-300/50 text-gray-400')}`}>
              <span>FILE LOG END</span>
              <span>{data.tags && data.tags.length > 0 ? 'TAGGED RECORDS' : 'STANDARD ENTRY'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
