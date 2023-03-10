import { CloseButton } from '@/components'
import clsx from 'clsx'
import { useCallback, useMemo } from 'react'
import './index.scss'

type DayPickerProps = {
  title?: string
  selectedDay: number
  onDayClick: (day: number) => void
  onCloseClick: () => void
} & React.HTMLAttributes<HTMLDivElement>

export const DayPicker = ({
  title,
  selectedDay,
  onDayClick,
  onCloseClick,
  className,
  ...rest
}: DayPickerProps) => {
  const days = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), [])

  const handleClick = useCallback(
    (day: number) => () => {
      onDayClick(day)
    },
    [onDayClick]
  )

  return (
    <div
      className={clsx('daypicker__box', className ?? '')}
      tabIndex={-1}
      {...rest}
      data-testid="daypicker"
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
            className={clsx(
              'daypicker__day',
              selectedDay === day ? 'selected' : ''
            )}
            aria-label={day + ''}
            tabIndex={0}
            onClick={handleClick(day)}
            key={index}
            data-testid="day"
          >
            <span>{day}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
