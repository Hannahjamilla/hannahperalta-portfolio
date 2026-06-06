import { useState, useEffect } from 'react'
import { useTheme, t } from '../../context/theme-context'

export function Lightbox({ imgs, alt, wip, onClose }: { imgs: string[]; alt: string; wip?: boolean; onClose: () => void }) {
  const { dark } = useTheme()
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const next = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i + 1) % imgs.length) }
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setIdx(i => (i - 1 + imgs.length) % imgs.length) }

  return (
    <div className="fixed inset-0 z-[70] flex flex-col items-center justify-center p-4 sm:p-8" onClick={onClose}>
      <div className={`absolute inset-0 ${t(dark, 'bg-[#0a0a0f]/95', 'bg-[#f8f7f4]/95')} backdrop-blur-md `} />

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center" onClick={e => e.stopPropagation()}>

        {/* Game UI Header */}
        <div className={`w-full flex justify-between items-end mb-4 border-b-2 pb-2 ${t(dark, 'border-cyan-900', 'border-indigo-200')}`}>
          <div className="flex flex-col">
            <span className={`font-semibold tracking-wide text-xs sm:text-xs uppercase ${t(dark, 'text-cyan-400', 'text-indigo-600')}`}>
              // VIEWING_DATA
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

        {/* Main Image Frame */}
        <div className={`relative w-full border p-2 sm:p-4 ${t(dark, 'border-cyan-800/50 bg-black/50 shadow-sm hover:shadow-md', 'border-indigo-300 bg-white/50 shadow-xl')}`}>
          <div className="relative w-full h-[50vh] sm:h-[65vh] flex items-center justify-center overflow-hidden bg-black/10">
            <img
              key={imgs[idx]}
              src={imgs[idx]}
              alt={alt}
              className="max-w-full max-h-full object-contain animate-fade-in drop-shadow-lg"
            />
          </div>
        </div>

        {/* Navigation Controls */}
        {imgs.length > 1 && (
          <div className="w-full flex justify-between items-center mt-6">
            <button
              onClick={prev}
              className={`font-semibold tracking-wide text-xs sm:text-xs px-4 py-3 border transition-all ${t(dark, 'border-cyan-900 text-cyan-400 hover:bg-cyan-950/50 hover:border-cyan-500', 'border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400')}`}
            >
              {'< PREV'}
            </button>

            <div className={`font-mono text-sm sm:text-base px-4 py-2 border ${t(dark, 'border-white/10 text-white/50 bg-black/30', 'border-gray-200 text-gray-500 bg-white/50')}`}>
              FILE {idx + 1}/{imgs.length}
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
