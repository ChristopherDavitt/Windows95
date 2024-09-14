'use client'

import React from 'react'
import { ThemeProvider } from 'styled-components'
import original from 'react95/dist/themes/original'


export function Providers({ children }: { children: React.ReactNode }) {
  return (
      <ThemeProvider theme={original}>
        {children}
      </ThemeProvider>

  )
}
