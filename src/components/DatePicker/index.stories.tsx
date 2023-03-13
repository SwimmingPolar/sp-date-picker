import { DatePicker } from '@/components'
import { useDatePicker } from '@/hooks'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect } from 'react'
import styled from 'styled-components'

const DateToString = (date?: Date) =>
  date?.toLocaleDateString('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

const Box = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #8d8d8d;
  padding: 15px;
`

export default {
  title: 'components/DatePicker',
  component: DatePicker,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    title: '기간을 선택해주세요!'
  },
  argTypes: {
    onConfirmClick: { action: 'confirmed' },
    onCloseClick: { action: 'closed' }
  }
} as ComponentMeta<typeof DatePicker>

const Template: ComponentStory<typeof DatePicker> = args => (
  <DatePicker {...args} />
)

// We do not wrap 'Box' component in 'Template' component in the above.
// Because we may need different 'Box' component for each story
export const Day: ComponentStory<typeof DatePicker> = args => {
  const datePicker = useDatePicker()
  const { date } = datePicker

  useEffect(() => {
    console.log('date: ', DateToString(date))
  }, [date])

  return (
    <Box>
      <Template {...args} {...datePicker} />
    </Box>
  )
}
Day.args = {
  title: '날짜를 선택해주세요!'
}

export const Range: ComponentStory<typeof DatePicker> = args => {
  const datePicker = useDatePicker()

  return (
    <Box>
      <Template {...args} {...datePicker} isRange />
    </Box>
  )
}

export const DisablePast: ComponentStory<typeof DatePicker> = args => {
  const datePicker = useDatePicker()

  return (
    <Box>
      <Template {...args} {...datePicker} isRange disablePast />
    </Box>
  )
}
DisablePast.storyName = 'Range - disable past'
