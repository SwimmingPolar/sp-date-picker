import { getYearMonth } from '@/utils'
import React, { useCallback, useMemo } from 'react'

type DateNavigationProps = {
  shouldShowSelectMonth: boolean
  setShouldShowSelectMonth: React.Dispatch<React.SetStateAction<boolean>>
  currentDate: Date
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>
  startDate?: Date
  endDate?: Date
  disablePast?: boolean
}

export const DateNavigation = ({
  shouldShowSelectMonth,
  setShouldShowSelectMonth,
  currentDate,
  setCurrentDate,
  startDate,
  endDate,
  disablePast
}: DateNavigationProps) => {
  const handleMonthTitleClick = useCallback(() => {
    setShouldShowSelectMonth(true)
  }, [setShouldShowSelectMonth])
  const handleNavigationClick = useCallback(
    (direction: -1 | 1) => () => {
      // If the date navigation is clicked on select month component,
      // navigation should move the date to previous/next year
      if (shouldShowSelectMonth) {
        setCurrentDate(
          new Date(
            currentDate.setFullYear(currentDate.getFullYear() + direction)
          )
        )
      }
      // Else if, the date navigation is clicked on days component,
      // navigation should move the date to previous/next month
      else {
        setCurrentDate(
          new Date(currentDate.setMonth(currentDate.getMonth() + direction))
        )
      }
    },
    [currentDate, setCurrentDate, shouldShowSelectMonth]
  )

  const shouldDisablePreviousButton = useMemo(() => {
    if (!disablePast || (startDate && endDate)) {
      return false
    }

    // start time used here can be either start date or end date
    const start = (startDate || endDate) as Date

    // On year selection, current year should be greater than or equal to start year
    if (shouldShowSelectMonth) {
      const currentYear = new Date(currentDate).getFullYear()
      const startYear = new Date(start).getFullYear()
      return currentYear <= startYear
    }
    // On month selection, current month should be greater than or equal to start month
    else {
      const currentYearMonth = getYearMonth(currentDate)
      const startYearMonth = getYearMonth(start)
      return new Date(currentYearMonth) <= new Date(startYearMonth)
    }
  }, [currentDate, disablePast, shouldShowSelectMonth, startDate, endDate])

  return (
    <div className="datepicker__date-navigation">
      <button
        className="datepicker__date-navigation__previous-button datepicker__date-navigiation__button"
        onClick={handleNavigationClick(-1)}
        data-testid="date-navigation-button-previous"
        disabled={shouldDisablePreviousButton}
      >
        <svg
          width="10px"
          height="10px"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          transform="matrix(-1.8369701987210297e-16,-1,1,-1.8369701987210297e-16,0,0)"
        >
          <path d="M7.06811 1.24806C7.15772 1.09446 7.32217 1 7.5 1C7.67783 1 7.84228 1.09446 7.93189 1.24806L14.9319 13.2481C15.0221 13.4027 15.0227 13.5938 14.9336 13.749C14.8444 13.9043 14.679 14 14.5 14H0.5C0.320967 14 0.155598 13.9043 0.0664289 13.749C-0.0227402 13.5938 -0.0220988 13.4027 0.0681106 13.2481L7.06811 1.24806Z"></path>
        </svg>
      </button>

      <div className="datepicker__date-navigation__current-date-box">
        <button
          className="datepicker__date-navigation__current-date"
          disabled={shouldShowSelectMonth}
          onClick={!shouldShowSelectMonth ? handleMonthTitleClick : undefined}
          data-testid="date-navigation-button"
        >
          {new Date(currentDate).toLocaleString('default', {
            year: 'numeric',
            // On select month view, we want to show the month name
            ...(shouldShowSelectMonth ? {} : { month: 'long' })
          })}
        </button>
      </div>

      <button
        className="datepicker__date-navigation__next-button  datepicker__date-navigiation__button"
        onClick={handleNavigationClick(1)}
        data-testid="date-navigation-button-next"
      >
        <svg
          width="10px"
          height="10px"
          viewBox="0 0 15 15"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          transform="matrix(6.123233995736766e-17,1,-1,6.123233995736766e-17,0,0)"
        >
          <path d="M7.06811 1.24806C7.15772 1.09446 7.32217 1 7.5 1C7.67783 1 7.84228 1.09446 7.93189 1.24806L14.9319 13.2481C15.0221 13.4027 15.0227 13.5938 14.9336 13.749C14.8444 13.9043 14.679 14 14.5 14H0.5C0.320967 14 0.155598 13.9043 0.0664289 13.749C-0.0227402 13.5938 -0.0220988 13.4027 0.0681106 13.2481L7.06811 1.24806Z"></path>
        </svg>
      </button>
    </div>
  )
}
