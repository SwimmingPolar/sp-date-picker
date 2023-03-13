import { getYearMonth } from '@/utils'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'

type SelectMonthProps = {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  setShouldShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  currentDate: Date
  date: Date | undefined
  startDate: Date | undefined
  endDate: Date | undefined
  disablePast?: boolean
}

export const SelectMonth = ({
  setCurrentDate,
  setShouldShowSelectMonth,
  currentDate,
  date: SelectedDate,
  startDate,
  endDate,
  disablePast
}: SelectMonthProps) => {
  const months = useMemo(() => Array.from({ length: 12 }).map((_, i) => i), [])

  const isSelectedMonth = useCallback(
    (month: number) => {
      const getDateString = (date?: Date) =>
        date?.toLocaleDateString('default', {
          year: 'numeric',
          month: 'numeric'
        })
      const date = getDateString(
        new Date(new Date(currentDate).setMonth(month))
      )
      const startDateString = getDateString(startDate)
      const endDateString = getDateString(endDate)
      const selectedDateString = getDateString(SelectedDate)

      return date === startDateString ||
        date === endDateString ||
        date === selectedDateString
        ? 'selected'
        : ''
    },
    [startDate, endDate, SelectedDate, currentDate]
  )

  const handleMonthClick = useCallback(
    (month: number) => () => {
      // Set the calendar to show the selected month
      setCurrentDate(new Date(currentDate.setMonth(month)))
      // Hide the select month component to show days of the selected month
      setShouldShowSelectMonth(false)
    },
    [currentDate, setCurrentDate, setShouldShowSelectMonth]
  )

  const shouldDisableMonth = useCallback(
    (month: number) => {
      // disablePast should true
      // if both dates are selected, do not disable any month
      if (!disablePast || (startDate && endDate)) {
        return false
      }

      // start time used here can be either start date or end date
      // e.g. 2021-03
      const start = (startDate || endDate) as Date
      const startMonth = new Date(getYearMonth(start))

      // input month should be greater than or equal to start month
      // e.g. 2021-01
      const inputMonth = new Date(
        getYearMonth(new Date(new Date(currentDate).setMonth(month)))
      )

      // Disable button if
      // 2021-01 < 2021-03
      return inputMonth < startMonth
    },
    [disablePast, startDate, endDate, currentDate]
  )

  return (
    <div className="datepicker__months-box" data-testid="select-month">
      {months.map((month, index) => {
        const monthName = new Date(new Date().setMonth(month)).toLocaleString(
          'default',
          {
            month: 'long'
          }
        )
        return (
          <div key={index}>
            <button
              tabIndex={0}
              aria-label={monthName}
              className={clsx('datepicker__month', isSelectedMonth(month))}
              onClick={handleMonthClick(month)}
              data-testid="month-button"
              disabled={shouldDisableMonth(month)}
            >
              <span>{monthName}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
