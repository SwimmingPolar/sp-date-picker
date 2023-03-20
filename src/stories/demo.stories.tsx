import { DatePicker, DayPicker } from '@/components'
import { useDatePicker, useDayPicker } from '@/hooks'
import { Theme } from '@/styles/calendar'
import { getYearMonthDate } from '@/utils'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'

const Box = styled.div`
  padding: 0 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  figure figcaption h1 {
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: ${({ theme }: { theme: Theme }) => theme.color.textDark};
    padding-top: 15px;
  }

  .datepicker__input-box {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .demo__input {
    border: 1px solid ${({ theme }: { theme: Theme }) => theme.color.gray200};
    width: 250px;
    padding: 10px;
    cursor: text;
    border-radius: 4px;

    &::placeholder {
      color: ${({ theme }: { theme: Theme }) => theme.color.gray300};
    }
  }

  hr {
    border: 0;
    border-top: 1px solid
      ${({ theme }: { theme: Theme }) => theme.color.gray200};
    margin: 0;
  }
`

export default {
  title: 'Demo',
  parameters: {
    layout: 'fullscreen'
  }
}

const RangePickerDemo = () => {
  const datePicker = useDatePicker()
  // Extract what we need from the hook
  const { handleOpen, startDate, endDate } = datePicker
  // Create handlers that open/close the date picker
  const handleDatePickerOpen = useCallback(() => {
    handleOpen(true)
  }, [handleOpen])
  const handleDatePickerClose = useCallback(() => {
    handleOpen(false)
  }, [handleOpen])

  // Additionally, we can format the date strings
  const startDateString = useMemo(() => {
    return startDate ? getYearMonthDate(startDate) : ''
  }, [startDate])
  const endDateString = useMemo(() => {
    return endDate ? getYearMonthDate(endDate) : ''
  }, [endDate])

  return (
    <Box>
      <figure>
        <figcaption>
          <h1>Date Picker</h1>
        </figcaption>
        <div className="datepicker__input-box">
          <input
            type="text"
            className="demo__input"
            readOnly
            placeholder="Start Date"
            value={startDateString}
            onClick={handleDatePickerOpen}
          />
          <input
            type="text"
            className="demo__input"
            readOnly
            placeholder="End Date"
            value={endDateString}
            onClick={handleDatePickerOpen}
          />
          <DatePicker
            {...datePicker}
            onCloseClick={handleDatePickerClose}
            isRange
          />
        </div>
      </figure>
    </Box>
  )
}

const SingleDatePickerDemo = () => {
  const datePicker = useDatePicker()
  // Extract what we need from the hook
  const { handleOpen, date } = datePicker

  // Create handlers that open/close the date picker
  const handleDatePickerOpen = useCallback(() => {
    handleOpen(true)
  }, [handleOpen])
  const handleDatePickerClose = useCallback(() => {
    handleOpen(false)
  }, [handleOpen])

  // Additionally, we can format the date strings
  const dateString = useMemo(() => {
    return date ? getYearMonthDate(date) : ''
  }, [date])

  return (
    <Box>
      <figure>
        <figcaption>
          <h1>Date Picker - single date</h1>
        </figcaption>
        <div className="daypicker__input-box">
          <input
            type="text"
            className="demo__input"
            readOnly
            placeholder="Pick a Day!"
            onClick={handleDatePickerOpen}
            value={dateString}
          />
          <DatePicker
            {...datePicker}
            onCloseClick={handleDatePickerClose}
            isRange={false}
          />
        </div>
      </figure>
    </Box>
  )
}

const DayPickerDemo = () => {
  const dayPicker = useDayPicker()
  // Extract what we need from the hook
  const { selectedDay, handleOpen } = dayPicker
  // Create handlers that open/close the date picker
  const handleDayPickerOpen = useCallback(() => {
    handleOpen(true)
  }, [handleOpen])
  const handleDayPickerClose = useCallback(() => {
    handleOpen(false)
  }, [handleOpen])

  // Format the day
  const selectedDayString = useMemo(
    () => (selectedDay > 0 ? selectedDay : ''),
    [selectedDay]
  )

  return (
    <Box>
      <figure>
        <figcaption>
          <h1>Date Picker - single date</h1>
        </figcaption>
        <div className="daypicker__input-box">
          <input
            type="text"
            className="demo__input"
            readOnly
            placeholder="Pick a Day!"
            onClick={handleDayPickerOpen}
            value={selectedDayString}
          />
          <DayPicker {...dayPicker} onCloseClick={handleDayPickerClose} />
        </div>
      </figure>
    </Box>
  )
}

export const Demo = () => {
  return (
    <Box>
      <RangePickerDemo />
      <SingleDatePickerDemo />
      <hr />
      <DayPickerDemo />
    </Box>
  )
}
