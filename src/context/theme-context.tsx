import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export const ThemeCtx = createContext({ dark: false, toggle: () => {} })

export const useTheme = () => useContext(ThemeCtx)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false)
  
  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark(!dark) }}>
      {children}
    </ThemeCtx.Provider>
  )
}

export function t(dark: boolean, d: string, l: string) { return dark ? d : l }
