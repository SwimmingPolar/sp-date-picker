import { DatePicker, DatePickerProps } from '@/components'
import { DisablePast, Range } from '@/components/DatePicker/index.stories'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PropsWithChildren } from 'react'
import { act } from 'react-dom/test-utils'
import { it, vi } from 'vitest'

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
let onConfirmClick: ReturnType<typeof vi.fn>
let onCloseClick: ReturnType<typeof vi.fn>

type RenderWithProps = {
  Component?: typeof DatePicker | typeof Range
  props?: Partial<DatePickerProps>
}
const renderWithProps = ({
  Component = DatePicker,
  props
}: RenderWithProps) => {
  // Mock functions
  onConfirmClick = vi.fn()
  onCloseClick = vi.fn()

  // Merge props
  const renderProps = Object.assign(
    {
      title: '날짜를 선택해주세요!',
      onConfirmClick,
      onCloseClick
    },
    props ?? {}
  )

  // Render
  component = render(<Component open={true} {...renderProps} />)
}

describe('DatePicker', () => {
  beforeEach(() => {
    renderWithProps({})
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
    expect(queryByTestId('days-box')).not.toBeInTheDocument()
  })
  it('should show select day component when month is selected', () => {
    const { getByTestId, getAllByTestId, queryByTestId, debug } = component
    const monthButtons = getAllByTestId('month-button')
    act(() => {
      userEvent.click(monthButtons[0])
    })
    expect(queryByTestId('select-month')).not.toBeInTheDocument()
    expect(getByTestId('days-box')).toBeInTheDocument()
  })
  it('should show select month component when the month title is clicked', () => {
    const { getByTestId, queryByTestId } = component
    const navigationButton = getByTestId('date-navigation-button')
    act(() => {
      userEvent.click(navigationButton)
    })
    expect(getByTestId('select-month')).toBeInTheDocument()
    expect(queryByTestId('days-box')).not.toBeInTheDocument()
  })
  describe('change the date with the same date navigation button', () => {
    it('should change the month when the next button is clicked', () => {
      const { getByTestId, getAllByTestId } = component
      const months = getAllByTestId('month-button')
      const previousButton = getByTestId('date-navigation-button-previous')
      const nextButton = getByTestId('date-navigation-button-next')

      // Click on February (the year do not matter)
      act(() => {
        userEvent.click(months[1])
      })

      // Check if the month is February
      const dateNavigationButton = getByTestId(
        'date-navigation-button'
      ) as HTMLButtonElement
      const currentYearAndMonth = new Date(
        dateNavigationButton?.textContent ?? ''
      )
      let currentMonth = currentYearAndMonth.getMonth()
      expect(currentMonth).toBe(1)

      // Click on the next button
      act(() => {
        userEvent.click(nextButton)
      })
      // Check if the month is March
      currentMonth = new Date(
        dateNavigationButton?.textContent ?? ''
      ).getMonth()
      expect(currentMonth).toBe(2)

      // Click on the previous button
      act(() => {
        userEvent.click(previousButton)
      })
      // Check if the month is February again
      currentMonth = new Date(
        dateNavigationButton?.textContent ?? ''
      ).getMonth()
      expect(currentMonth).toBe(1)
    })
    it('should change the year when the next button is clicked', () => {
      const { getByTestId } = component
      const previousButton = getByTestId('date-navigation-button-previous')
      const nextButton = getByTestId('date-navigation-button-next')

      // Get the current year
      const dateNavigationButton = getByTestId(
        'date-navigation-button'
      ) as HTMLButtonElement
      const currentYearAndMonth = new Date(
        dateNavigationButton?.textContent ?? ''
      )
      // We are going to use this value as a starting point
      const currentYear = currentYearAndMonth.getFullYear()

      // Click on the next button
      act(() => {
        userEvent.click(nextButton)
      })
      // Check if the nextYear has a value that is 1 year ahead of the currentYear
      const nextYear = new Date(
        dateNavigationButton?.textContent ?? ''
      ).getFullYear()
      expect(nextYear).toBe(currentYear + 1)

      // Click on the previous button
      act(() => {
        userEvent.click(previousButton)
      })
      // Check if the year is the same as the currentYear
      const previousYear = new Date(
        dateNavigationButton?.textContent ?? ''
      ).getFullYear()
      expect(previousYear).toBe(currentYear)
    })
  })
})

describe('Range Picker', () => {
  beforeEach(() => {
    renderWithProps({
      Component: Range
    })
  })

  it('should reset the dates that are selected by clicking on new date', () => {
    // Click any month of the year
    const { getByTestId, getAllByTestId, debug } = component
    const months = getAllByTestId('month-button')
    act(() => {
      userEvent.click(months[0])
    })

    // Select any start/end date
    const daysBox = getByTestId('days-box')
    const days = getAllByTestId('day-button')
    act(() => {
      userEvent.click(days[0])
    })
    act(() => {
      userEvent.click(days[15])
    })

    // Check if the range is correctly selected
    const start = daysBox.querySelector('.selected.start')
    const end = daysBox.querySelector('.selected.end')
    expect(start?.textContent).toBe('1')
    expect(end?.textContent).toBe('16')

    // Click on the start date again
    act(() => {
      userEvent.click(days[5])
    })

    // Make sure there's only one selection
    expect([...daysBox.querySelectorAll('.selected')]).toHaveLength(1)

    // After selecting new start date, make sure there's no end date selected
    expect(daysBox.querySelector('.selected.end')).toBeNull()
  })
  it('should remove start/end date by clicking on the date selected', () => {
    const { getByTestId, getAllByTestId } = component
    const months = getAllByTestId('month-button')
    act(() => {
      userEvent.click(months[0])
    })

    // Select any start/end date
    const daysBox = getByTestId('days-box')
    const days = getAllByTestId('day-button')
    act(() => {
      userEvent.click(days[0])
    })
    act(() => {
      userEvent.click(days[15])
    })

    // Check if the range is correctly selected
    let start = daysBox.querySelector('.selected.start')
    const end = daysBox.querySelector('.selected.end')
    expect(start?.textContent).toBe('1')
    expect(end?.textContent).toBe('16')

    // Click on the start date again to remove it
    act(() => {
      userEvent.click(days[0])
    })

    // Make sure there's only one selection
    expect([...daysBox.querySelectorAll('.selected')]).toHaveLength(1)

    // Click on new start date
    act(() => {
      userEvent.click(days[5])
    })

    start = daysBox.querySelector('.selected.start')
    expect(start?.textContent).toBe('6')

    // After selecting new start date, make sure there are start and end dates selected
    expect([...daysBox.querySelectorAll('.selected')]).toHaveLength(2)
  })
})

describe('Range Picker with disablePast', () => {
  beforeEach(() => {
    renderWithProps({
      Component: DisablePast
    })
  })

  // @Todo: Fix this test
  it('should disable previous months when disablePast is set', async () => {
    const { getByTestId, getAllByTestId } = component

    // Click on February (the year do not matter)
    const months = getAllByTestId('month-button')
    act(() => {
      userEvent.click(months[5])
    })

    // Click on the any day of the month
    const days = getAllByTestId('day-button')

    act(() => {
      userEvent.click(days[5])
    })

    const previousButton = getByTestId('date-navigation-button-previous')

    // Check if the previous button is disabled
    expect(previousButton).toBeDisabled()

    // Remove start date by clicking on it again
    act(() => {
      userEvent.click(days[5])
    })

    // Check if the previous button is enabled
    expect(previousButton).not.toBeDisabled()
  })
  it('should disable previous days when disablePast is set', () => {
    const { getAllByTestId } = component

    // Click on February (the year do not matter)
    const months = getAllByTestId('month-button')
    act(() => {
      userEvent.click(months[1])
    })

    // Click on the any day of the month
    const days = getAllByTestId('day-button')
    act(() => {
      userEvent.click(days[5])
    })

    // Check previous days to be disabled
    const previousDays = days.slice(0, 5)
    previousDays.forEach(day => {
      expect(day).toBeDisabled()
    })

    // Remove start date by clicking on it
    act(() => {
      userEvent.click(days[5])
    })

    previousDays.forEach(day => {
      expect(day).not.toBeDisabled()
    })
  })
  it('should not be able to go to previous month when disablePast is set', () => {
    const { getByTestId, getAllByTestId } = component

    // Click on February (the year do not matter)
    const months = getAllByTestId('month-button')
    act(() => {
      userEvent.click(months[1])
    })

    // Click on the any day of the month
    const days = getAllByTestId('day-button')
    act(() => {
      userEvent.click(days[5])
    })

    const previousButton = getByTestId('date-navigation-button-previous')

    // Check if the previous button is disabled
    expect(previousButton).toBeDisabled()
  })
  it('should not be able to go to previous year when disablePast is set', () => {
    const { getByTestId, getAllByTestId } = component

    // Click on February (the year do not matter)
    const months = getAllByTestId('month-button')
    act(() => {
      userEvent.click(months[1])
    })

    // Click on the any day of the month
    const days = getAllByTestId('day-button')
    act(() => {
      userEvent.click(days[5])
    })

    // Go to month selection mode
    const dateNavigationButton = getByTestId('date-navigation-button')
    act(() => {
      userEvent.click(dateNavigationButton)
    })

    // Check if the previous button is disabled
    const previousButton = getByTestId('date-navigation-button-previous')

    expect(previousButton).toBeDisabled()
  })
})
