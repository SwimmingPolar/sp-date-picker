import { DatePicker } from '@/components'
import { useDatePicker } from '@/hooks'
import { getYearMonthDate } from '@/utils'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { useEffect } from 'react'

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
  const datePicker = useDatePicker({
    open: true
  })
  const { date } = datePicker

  useEffect(() => {
    console.log('date: ', getYearMonthDate(date as Date))
  }, [date])

  return <Template {...args} {...datePicker} isRange={false} />
}
Day.args = {
  title: '날짜를 선택해주세요!'
}

export const Range: ComponentStory<typeof DatePicker> = args => {
  const datePicker = useDatePicker({
    open: true
  })

  return <Template {...args} {...datePicker} />
}

export const DisablePast: ComponentStory<typeof DatePicker> = args => {
  const datePicker = useDatePicker({
    open: true
  })

  return <Template {...args} {...datePicker} disablePast />
}
DisablePast.storyName = 'Range - disable past'
