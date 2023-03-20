import { theme as defaultTheme, Theme } from '@/styles/calendar'
import { GlobalStyles } from '@/styles/globals'
import { Story } from '@storybook/react'
import { PropsWithChildren, useState } from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  // Use state here to expend usability later on
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </StyledThemeProvider>
  )
}

export const withThemeProvider = (Story: Story) => {
  return (
    <ThemeProvider>
      <Story />
    </ThemeProvider>
  )
}
