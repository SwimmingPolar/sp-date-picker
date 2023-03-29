import {
  getDayNames,
  getEmptyDays,
  getTotalDays,
  getYearMonthDate,
  isSaturday,
  isSunday
} from '@/utils'
import clsx from 'clsx'
import { AnimationProps, motion } from 'framer-motion'
import { useCallback, useMemo } from 'react'

const getDateString = (date?: Date) =>
  date?.toLocaleDateString('default', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  })

type SelectDayProps = {
  currentDate: Date
  date?: Date
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
  startDate?: Date
  setStartDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
  endDate?: Date
  setEndDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
  isRange?: boolean
  disablePast?: boolean
  motionConfig: AnimationProps
}

export const SelectDay = ({
  currentDate,
  date: selectedDate,
  setDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  isRange,
  disablePast,
  motionConfig
}: SelectDayProps) => {
  // Get empty days prior to the first day of the month
  const emptyDays = useMemo(() => getEmptyDays(currentDate), [currentDate])

  // Get total days in the month
  const days = useMemo(() => getTotalDays(currentDate), [currentDate])

  // Get day names
  const dayNames = useMemo(() => getDayNames(), [])

  const getWeekendClassName = useCallback(
    (date: number) => {
      const targetDate = new Date(new Date(currentDate).setDate(date))
      const isWeekend = isSunday(targetDate) || isSaturday(targetDate)

      return clsx(
        isWeekend ? 'weekend' : '',
        isSunday(targetDate) ? 'sunday' : '',
        isSaturday(targetDate) ? 'saturday' : ''
      )
    },
    [currentDate]
  )

  const handleDayClick = useCallback(
    (day: number) => () => {
      const date = new Date(new Date(currentDate).setDate(day))
      // If selecting range
      if (isRange) {
        // If newly selected date is already selected, remove it
        const dateString = getDateString(date)
        const startDateString = getDateString(startDate)
        const endDateString = getDateString(endDate)
        // Compare new date with start and end date to see
        // the date the user is currenltly selecting is start or end date
        // and remove accordingly
        if (dateString === startDateString || dateString === endDateString) {
          if (dateString === startDateString) {
            setStartDate?.(undefined)
          }
          if (dateString === endDateString) {
            setEndDate?.(undefined)
          }
          return
        }

        // - Set new date range if both start and end date are selected
        if (startDate && endDate) {
          // Set new start date
          setStartDate?.(date)
          // Clear old end date
          setEndDate?.(undefined)
        }
        // - Selecting the date for the first time.
        else if (!startDate && !endDate) {
          setStartDate?.(date)
        }
        // - Set end date if any date is selected (This means selecting end date)
        else {
          // Get the date that is selected previously (start or end date)
          const dateSelectedPreviously = (startDate || endDate) as Date

          // If the date selected previously is less than the new date,
          if (dateSelectedPreviously < date) {
            // Make sure dateSelectedPreviously goes to start date and date goes to end date
            setStartDate?.(dateSelectedPreviously)
            setEndDate?.(date)
          } else {
            // Vice versa
            setStartDate?.(date)
            setEndDate?.(dateSelectedPreviously)
          }
        }
      }
      // Else if, select a date
      else {
        setDate?.(date)
      }
    },
    [
      isRange,
      currentDate,
      setDate,
      startDate,
      setStartDate,
      endDate,
      setEndDate
    ]
  )

  // Check if the day given is selected
  const isSelectedDay = useCallback(
    (day: number) => {
      const date = new Date(new Date(currentDate).setDate(day)).toDateString()
      const startDateString = startDate?.toDateString()
      const endDateString = endDate?.toDateString()
      const selectedDateString = selectedDate?.toDateString()

      const classNames = ['selected']
      if (date === startDateString) {
        classNames.push('start')
      } else if (date === endDateString) {
        classNames.push('end')
      } else if (date === selectedDateString) {
        // Do nothing since 'selected' class is already added
      } else {
        classNames.pop()
      }

      return classNames
    },
    [currentDate, endDate, startDate, selectedDate]
  )

  // Check if the day is between the selected days
  const isBetweenSelectedDays = useCallback(
    (day: number) => {
      const date = new Date(new Date(currentDate).setDate(day))
      if (startDate && endDate && startDate < date && date < endDate)
        return 'between'

      return ''
    },
    [currentDate, endDate, startDate]
  )

  // Check if start and end date are set
  const isRangeSet = useMemo(() => {
    const isSameDate = startDate?.toDateString() === endDate?.toDateString()
    return startDate && endDate && !isSameDate ? 'range-set' : ''
  }, [startDate, endDate])

  // Check if the day is disabled based on
  // the disablePast prop and start/end dates
  const shouldDisableDay = useCallback(
    (day: number) => {
      // disablePast should true
      // if both dates are selected, do not disable any day
      if (!disablePast || (startDate && endDate)) {
        return false
      }

      // start time used here can be either start date or end date
      // e.g. 2021-03
      const start = (startDate || endDate) as Date
      const startDay = new Date(getYearMonthDate(start))

      // input month should be greater than or equal to start month
      // e.g. 2021-01
      const inputDay = new Date(
        getYearMonthDate(new Date(new Date(currentDate).setDate(day)))
      )

      // Disable button if
      // 2021-01 < 2021-03
      return inputDay < startDay
    },
    [disablePast, startDate, endDate, currentDate]
  )

  return (
    <motion.div
      className="datepicker__days-box"
      data-testid="days-box"
      {...motionConfig}
    >
      {
        // Day names
        dayNames.map((dayName, index) => (
          <div
            key={index}
            className={clsx(
              'datepicker__day-name',
              index === 0 || index === 6 ? 'weekend' : '',
              index === 0 ? 'sunday' : '',
              index === 6 ? 'saturday' : ''
            )}
          >
            {dayName}
          </div>
        ))
      }
      {
        // Empty days
        Array.from({ length: emptyDays }, (_, index) => (
          <div key={index} className="datepicker__empty-day" />
        ))
      }
      {days.map((day, index) => (
        <div key={index} className="datepicker__day-box">
          <button
            tabIndex={0}
            aria-label={day + ''}
            className={clsx(
              'datepicker__day',
              getWeekendClassName(day),
              isSelectedDay(day),
              isBetweenSelectedDays(day),
              isRangeSet
            )}
            onClick={handleDayClick(day)}
            disabled={shouldDisableDay(day)}
            data-testid="day-button"
          >
            <span>{day}</span>
          </button>
        </div>
      ))}
    </motion.div>
  )
}
