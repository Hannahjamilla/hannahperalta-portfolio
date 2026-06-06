import { useTheme, t } from '../../context/theme-context'

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { dark } = useTheme()
  if (!open) return null
  return (
    <div className={`fixed inset-0 z-[60] ${t(dark, 'bg-[#0a0a0f]', 'bg-white')} flex flex-col items-center justify-center gap-8`}>
      <button onClick={onClose} className="absolute top-5 right-6 text-2xl font-mono">X</button>
      {['profile', 'stats', 'quests', 'xp'].map(s => (
        <a key={s} href={`#${s}`} onClick={onClose} className="font-mono text-lg uppercase tracking-widest hover:text-cyan-400 transition-colors">[{s}]</a>
      ))}
    </div>
  )
}
