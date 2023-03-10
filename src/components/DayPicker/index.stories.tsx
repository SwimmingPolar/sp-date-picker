import { DayPicker } from '@/components'
import { useDayPicker } from '@/hooks'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useMemo } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #8d8d8d;
  padding: 15px;
`

export default {
  title: 'components/DayPicker',
  component: DayPicker,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    title: 'Pick a day!'
  },
  argTypes: {
    onCloseClick: { action: 'closed' }
  }
} as ComponentMeta<typeof DayPicker>

const Template: ComponentStory<typeof DayPicker> = args => (
  <DayPicker {...args} />
)

// We do not wrap 'Box' component in 'Template' component in the above.
// Because we may need different 'Box' component for each story
export const Default: ComponentStory<typeof DayPicker> = args => {
  return (
    <Box>
      <Template {...args} {...useDayPicker(2)} />
    </Box>
  )
}
