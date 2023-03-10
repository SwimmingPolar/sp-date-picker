import clsx from 'clsx'
import { useCallback, useMemo } from 'react'

type SelectMonthProps = {
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  setShouldShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  currentDate: Date
  date: Date | undefined
  startDate: Date | undefined
  endDate: Date | undefined
}

export const SelectMonth = ({
  setCurrentDate,
  setShouldShowSelectMonth,
  currentDate,
  date: SelectedDate,
  startDate,
  endDate
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
            >
              <span>{monthName}</span>
            </button>
          </div>
        )
      })}
    </div>
  )
}
