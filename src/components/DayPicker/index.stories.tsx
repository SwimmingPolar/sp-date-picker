import { DayPicker } from '@/components'
import { useDayPicker } from '@/hooks'
import { ComponentMeta, ComponentStory } from '@storybook/react'

export default {
  title: 'components/DayPicker',
  component: DayPicker,
  parameters: {
    layout: 'fullscreen'
  },
  args: {
    title: '하루를 선택해주세요!'
  },
  argTypes: {
    onDayClick: { action: 'selected' },
    onCloseClick: { action: 'closed' }
  }
} as ComponentMeta<typeof DayPicker>

const Template: ComponentStory<typeof DayPicker> = args => (
  <DayPicker {...args} />
)

// We do not wrap 'Box' component in 'Template' component in the above.
// Because we may need different 'Box' component for each story
export const Default: ComponentStory<typeof DayPicker> = args => {
  const { onDayClick, ...rest } = useDayPicker({
    open: true
  })
  return <Template {...args} {...rest} />
}
