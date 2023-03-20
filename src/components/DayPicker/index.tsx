import { CloseButton } from '@/components'
import { Provider } from '@/provider'
import { backdropMotion, containerMotion } from '@/styles/motions'
import clsx from 'clsx'
import { AnimatePresence, AnimationProps, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo } from 'react'
import { createPortal } from 'react-dom'
import { StyledBox } from './index.styles'

type DayPickerProps = {
  title?: string
  selectedDay: number
  open: boolean
  onDayClick: (day: number) => void
  onCloseClick: () => void
  onBackdropClick?: () => void
  style?: React.CSSProperties
  customMotion?: AnimationProps
} & React.HTMLAttributes<HTMLDivElement>

export const DayPicker = ({
  title,
  selectedDay,
  onDayClick,
  onCloseClick,
  onBackdropClick,
  className,
  open,
  style,
  customMotion,
  ...rest
}: DayPickerProps) => {
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), [])

  const handleClick = useCallback(
    (day: number) => () => {
      onDayClick(day)
      onCloseClick()
    },
    [onDayClick, onCloseClick]
  )

  const combinedMotion = useMemo(
    () => ({
      ...containerMotion,
      ...(customMotion ? customMotion : {})
    }),
    [customMotion]
  )

  const render = useMemo(
    () => (
      <AnimatePresence>
        {open && (
          <motion.div
            className={clsx('daypicker__box', className ?? '')}
            tabIndex={-1}
            data-testid="daypicker"
            style={style ? style : {}}
          >
            {/* DayPicker Title */}
            <div className="daypicker__title-box">
              <h1 className="daypicker__title" data-testid="title">
                {title ? title : 'Pick a day!'}
              </h1>
            </div>

            {/* Close Button */}
            <CloseButton
              className="daypicker__close-button"
              onClick={onCloseClick}
              data-testid="close-button"
            />

            {/* Days */}
            <div className="daypicker__days-box">
              {days.map((day, index) => (
                <button
                  key={index}
                  tabIndex={0}
                  aria-label={day + ''}
                  className={clsx(
                    'daypicker__day',
                    selectedDay === day ? 'selected' : ''
                  )}
                  onClick={handleClick(day)}
                  data-testid="day"
                >
                  <span>{day}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [
      title,
      days,
      selectedDay,
      onCloseClick,
      handleClick,
      className,
      style,
      open
    ]
  )

  const renderWithPortal = useMemo(
    () => (
      <>
        {createPortal(
          <Provider>
            <StyledBox>
              <AnimatePresence>
                {open && (
                  <>
                    <motion.div
                      className="sp-datepicker-container"
                      {...combinedMotion}
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
              </AnimatePresence>
            </StyledBox>
          </Provider>,
          document.getElementById('root') as HTMLElement
        )}
      </>
    ),
    [render, open, onBackdropClick, combinedMotion]
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
