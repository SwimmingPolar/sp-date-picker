import { DayPicker } from '@/components'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'

let component: ReturnType<typeof render>
let onDayClick: ReturnType<typeof vi.fn>
let onCloseClick: ReturnType<typeof vi.fn>

beforeEach(() => {
  onDayClick = vi.fn()
  onCloseClick = vi.fn()
  component = render(
    <DayPicker
      title="Pick a day!"
      selectedDay={1}
      onDayClick={onDayClick}
      onCloseClick={onCloseClick}
    />
  )
})

it('should render title', () => {
  const { getByTestId } = component
  expect(getByTestId('title')).toHaveTextContent(/Pick a day!/)
})
it('should close when close button is clicked', () => {
  const { getByTestId } = component
  const closeButton = getByTestId('close-button')
  act(() => {
    userEvent.click(closeButton)
  })
  expect(onCloseClick).toHaveBeenCalled()
})
it('should have 31 days to pick', () => {
  const { getAllByTestId } = component
  const days = getAllByTestId('day')

  expect(days).toHaveLength(31)
})
it('should be initialized with correct selected day', () => {
  const { getAllByTestId } = component
  const days = getAllByTestId('day')

  expect(days[0]).toHaveClass('selected')
})
it('should correctly select day', () => {
  const { getAllByTestId } = component
  const days = getAllByTestId('day')

  act(() => {
    // Select day 3
    userEvent.click(days[2])
  })

  expect(onDayClick).toHaveBeenCalledWith(3)

  // @Important:
  // Be aware that the selected day cannot be updated
  // since the onDayClick handler is mocked.
})