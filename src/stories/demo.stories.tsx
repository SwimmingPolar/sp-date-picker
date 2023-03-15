import { DatePicker, DayPicker } from '@/components'
import { useDatePicker, useDayPicker } from '@/hooks'
import { getYearMonthDate } from '@/utils'
import { useCallback, useMemo } from 'react'
import styled from 'styled-components'
import './demo.scss'

const Box = styled.div`
  padding: 0 15px;
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
    <div className="box">
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
    </div>
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
    <div className="box">
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
    </div>
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
    <div className="box">
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
    </div>
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
