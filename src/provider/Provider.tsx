import { ThemeProvider } from '@/provider/ThemeProvider'
import { Story } from '@storybook/react'
import { PropsWithChildren } from 'react'

export const Provider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <ThemeProvider>{children}</ThemeProvider>
    </>
  )
}

export const withProvider = (Story: Story) => {
  return (
    <Provider>
      <Story />
    </Provider>
  )
}
