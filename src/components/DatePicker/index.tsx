import { CloseButton } from '@/components'
import { useDatePicker, useMotion } from '@/hooks'
import { Provider } from '@/provider'
import { backdropMotion, containerMotion } from '@/styles/motions'
import clsx from 'clsx'
import { AnimatePresence, AnimationProps, motion } from 'framer-motion'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  CalendarFooter,
  DateNavigation,
  SelectDay,
  SelectMonth
} from './components'
import { StyledBox } from './index.styles'

export type DatePickerProps = {
  title?: string
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
  onBackdropClick?: () => void
  isRange?: boolean
  disablePast?: boolean
  open: boolean
  style?: React.CSSProperties
  customSelectMonthMotion?: AnimationProps
  customSelectDayMotion?: AnimationProps
} & React.HTMLAttributes<HTMLDivElement>

export const DatePicker = ({
  title,
  date,
  setDate,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  onConfirmClick,
  onCloseClick,
  onBackdropClick,
  isRange = true,
  disablePast,
  open,
  style,
  customSelectMonthMotion,
  customSelectDayMotion,
  className,
  id
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
      setStartDate?.(dateBackup.startDate)
      setEndDate?.(dateBackup.endDate)
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

  // Get motion config
  const { selectMonthMotion, selectDayMotion } = useMotion({
    customSelectMonthMotion,
    customSelectDayMotion
  })

  const render = useMemo(
    () => (
      <Provider>
        <StyledBox>
          <AnimatePresence>
            {open && (
              <motion.div
                id={id}
                className={clsx('datepicker__box', className ?? '')}
                tabIndex={-1}
                data-testid="datepicker"
                style={style ? style : {}}
              >
                {/* DatePicker Title */}
                <div className="datepicker__title-box">
                  <h1 className="datepicker__title" data-testid="title">
                    {title ? title : 'Pick dates range!'}
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
                  startDate={dateBackup.startDate}
                  endDate={dateBackup.endDate}
                  disablePast={disablePast}
                />

                {/* SelectMonth / SelectDay */}
                <AnimatePresence mode="wait" initial={false}>
                  {shouldShowSelectMonth && (
                    <SelectMonth
                      setCurrentDate={setCurrentDate}
                      setShouldShowSelectMonth={setShouldShowSelectMonth}
                      currentDate={currentDate}
                      date={dateBackup.date}
                      startDate={dateBackup.startDate}
                      endDate={dateBackup.endDate}
                      disablePast={disablePast}
                      motionConfig={selectMonthMotion}
                      key="select-month"
                    />
                  )}
                  {!shouldShowSelectMonth && (
                    <SelectDay
                      isRange={isRange}
                      disablePast={disablePast}
                      currentDate={currentDate}
                      {...dateBackup}
                      motionConfig={selectDayMotion}
                      key="select-day"
                    />
                  )}
                </AnimatePresence>

                {/* Calendar Footer */}
                <CalendarFooter
                  onClearDateClick={handleClearDateClick}
                  onConfirmClick={handleConfirmClick}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </StyledBox>
      </Provider>
    ),
    [
      className,
      currentDate,
      dateBackup,
      disablePast,
      handleClearDateClick,
      handleConfirmClick,
      isRange,
      onCloseClick,
      shouldShowSelectMonth,
      style,
      title,
      selectDayMotion,
      selectMonthMotion,
      open,
      id
    ]
  )

  const renderWithPortal = useMemo(
    () => (
      <>
        {createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  className="sp-datepicker-container"
                  {...containerMotion}
                >
                  {render}
                </motion.div>
                <motion.div
                  className="sp-datepicker-backdrop"
                  onClick={onBackdropClick}
                  {...backdropMotion}
                />
              </>
            )}
          </AnimatePresence>,
          document.querySelector('body') as HTMLElement
        )}
      </>
    ),
    [render, open, onBackdropClick]
  )

  // Enable close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onCloseClick()
      }
    }

    window.addEventListener('keydown', handleEscape)
    return () => {
      window.removeEventListener('keydown', handleEscape)
    }
  }, [onCloseClick])

  return (
    <>
      {/* Without custom styles render to portal by default */}
      {!style ? renderWithPortal : null}

      {/* With custom styles, will render the component directly */}
      {style ? render : null}
    </>
  )
}
