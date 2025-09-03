'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
  useTheme,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {

  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  return (
    <NextThemesProvider
      attribute="class"
      enableSystem
      defaultTheme="system"
      {...props}
    >
      {mounted ? children : null}
    </NextThemesProvider>
  )
}
