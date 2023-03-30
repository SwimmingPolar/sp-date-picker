import { DayPicker } from '@/components'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PropsWithChildren } from 'react'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'

vi.mock('framer-motion', async () => {
  const actual = await vi.importActual<typeof import('framer-motion')>(
    'framer-motion'
  )

  return {
    ...actual,
    AnimatePresence: ({ children }: PropsWithChildren) => children
  }
})

let component: ReturnType<typeof render>
let onDayClick: ReturnType<typeof vi.fn>
let onCloseClick: ReturnType<typeof vi.fn>

beforeEach(() => {
  onDayClick = vi.fn()
  onCloseClick = vi.fn()
  component = render(
    <DayPicker
      open={true}
      title="하루를 선택해주세요!"
      selectedDay={1}
      onDayClick={onDayClick}
      onCloseClick={onCloseClick}
    />
  )
})

it('should render title', () => {
  const { getByTestId } = component
  expect(getByTestId('title')).toHaveTextContent(/하루를 선택해주세요!/)
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
