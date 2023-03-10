import { CloseButton } from '@/components'
import { useDatePicker } from '@/hooks'
import clsx from 'clsx'
import React, { useCallback, useState } from 'react'
import {
  CalendarFooter,
  DateNavigation,
  SelectDay,
  SelectMonth
} from './components'
import './index.scss'

type DatePickerProps = {
  title?: string
  isRange?: boolean
  date?: Date
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
  startDate?: Date
  setStartDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
  endDate?: Date
  setEndDate?: React.Dispatch<React.SetStateAction<Date | undefined>>
  onConfirmClick: ({
    date,
    startDate,
    endDate
  }: {
    date?: Date
    startDate?: Date
    endDate?: Date
  }) => void
  onCloseClick: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const DatePicker = ({
  title,
  isRange,
  date,
  setDate,
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  onConfirmClick,
  onCloseClick,
  className,
  ...rest
}: DatePickerProps) => {
  const [currentDate, setCurrentDate] = useState(date ?? new Date())
  // If dates are not set, show select month component
  const [shouldShowSelectMonth, setShouldShowSelectMonth] = useState(
    !startDate && !endDate
  )
  // Use backup date states to retain the date states
  // when the user doesn't click on the confirm button
  const dateBackup = useDatePicker({
    date,
    startDate,
    endDate
  })

  const handleClearDateClick = useCallback(() => {
    dateBackup.setStartDate(undefined)
    dateBackup.setEndDate(undefined)
    dateBackup.setDate(undefined)
  }, [dateBackup])

  const handleConfirmClick = useCallback(() => {
    // On range picker
    if (isRange) {
      // Allow empty date on both sides
      // Since there's no logical xor in js,
      // this is the way to go.
      if (
        dateBackup.startDate === undefined &&
        dateBackup.endDate === undefined
      ) {
        setStartDate?.(dateBackup.startDate)
        setEndDate?.(dateBackup.endDate)
      }

      // If any of the dates are not set, do nothing
      if (dateBackup.startDate && dateBackup.endDate) {
        setStartDate?.(dateBackup.startDate)
        setEndDate?.(dateBackup.endDate)
      }
    }
    // On single date picker
    else {
      setDate?.(dateBackup.date)
    }
    onConfirmClick({
      date: dateBackup.date,
      startDate: dateBackup.startDate,
      endDate: dateBackup.endDate
    })
    onCloseClick()
  }, [
    dateBackup.date,
    dateBackup.endDate,
    dateBackup.startDate,
    isRange,
    onConfirmClick,
    onCloseClick,
    setDate,
    setEndDate,
    setStartDate
  ])

  return (
    <div
      className={clsx('datepicker__box', className ?? '')}
      tabIndex={-1}
      {...rest}
      data-testid="datepicker"
    >
      {/* DatePicker Title */}
      <div className="datepicker__title-box">
        <h1 className="datepicker__title" data-testid="title">
          {title ? title : 'Pick a day!'}
        </h1>
      </div>

      {/* Close Button */}
      <CloseButton
        className="datepicker__close-button"
        onClick={onCloseClick}
        data-testid="close-button"
      />

      {/* Date Navigation */}
      <DateNavigation
        shouldShowSelectMonth={shouldShowSelectMonth}
        setShouldShowSelectMonth={setShouldShowSelectMonth}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />

      {/* SelectMonth / SelectDay */}
      {shouldShowSelectMonth ? (
        <SelectMonth
          setCurrentDate={setCurrentDate}
          setShouldShowSelectMonth={setShouldShowSelectMonth}
          currentDate={currentDate}
          date={dateBackup.date}
          startDate={dateBackup.startDate}
          endDate={dateBackup.endDate}
        />
      ) : (
        <SelectDay
          isRange={isRange}
          currentDate={currentDate}
          {...dateBackup}
        />
      )}

      {/* Calendar Footer */}
      {!shouldShowSelectMonth && (
        <CalendarFooter
          onClearDateClick={handleClearDateClick}
          onConfirmClick={handleConfirmClick}
        />
      )}
    </div>
  )
}
