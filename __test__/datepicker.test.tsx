import { DatePicker } from '@/components'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { act } from 'react-dom/test-utils'
import { it, vi } from 'vitest'

let component: ReturnType<typeof render>
let onConfirmClick: ReturnType<typeof vi.fn>
let onCloseClick: ReturnType<typeof vi.fn>

beforeEach(() => {
  onConfirmClick = vi.fn()
  onCloseClick = vi.fn()
  component = render(
    <DatePicker
      title="날짜를 선택해주세요!"
      onConfirmClick={onConfirmClick}
      onCloseClick={onCloseClick}
    />
  )
})

it('should render title', () => {
  const { getByTestId } = component
  expect(getByTestId('title')).toHaveTextContent(/날짜를 선택해주세요!/)
})
it('should close when close button is clicked', () => {
  const { getByTestId } = component
  const closeButton = getByTestId('close-button')
  act(() => {
    userEvent.click(closeButton)
  })
  expect(onCloseClick).toHaveBeenCalled()
})

it('should show select month component when dates are not set', () => {
  const { getByTestId, queryByTestId } = component
  expect(getByTestId('select-month')).toBeInTheDocument()
  expect(queryByTestId('select-day')).not.toBeInTheDocument()
})
it('should show select day component when month is selected', () => {
  const { getByTestId, getAllByTestId, queryByTestId } = component
  const monthButtons = getAllByTestId('month-button')
  act(() => {
    userEvent.click(monthButtons[0])
  })
  expect(queryByTestId('select-month')).not.toBeInTheDocument()
  expect(getByTestId('select-day')).toBeInTheDocument()
})
it('should show select month component when the month title is clicked', () => {
  const { getByTestId, queryByTestId } = component
  const navigationButton = getByTestId('date-navigation-button')
  act(() => {
    userEvent.click(navigationButton)
  })
  expect(getByTestId('select-month')).toBeInTheDocument()
  expect(queryByTestId('select-day')).not.toBeInTheDocument()
})
it('should change the year with date navigation button', () => {
  const { getByTestId, getAllByTestId } = component
  const previousButton = getByTestId('date-navigation-button-previous')
  const nextButton = getByTestId('date-navigation-button-next')
  act(() => {
    userEvent.click(navigationButton)
  })
  act(() => {
    userEvent.click(yearButtons[0])
  })
  expect(navigationButton).toHaveTextContent(/2019/)
})
it.todo('should be able to reset the start date by clicking on new start date')

it.todo('should show correct calendar page')
// e.g. 2020-01-01 ~ 2022-12-31
// click 2020-01-01 => show 2020-01-01
// click 2022-12-31 => show 2022-12-31
