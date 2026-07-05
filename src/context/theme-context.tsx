import { createContext, useContext } from 'react'

export const ThemeCtx = createContext({ dark: false, toggle: () => {} })

export const useTheme = () => useContext(ThemeCtx)


export function t(dark: boolean, d: string, l: string) { return dark ? d : l }
