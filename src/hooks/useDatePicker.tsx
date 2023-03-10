import { useCallback, useState } from 'react'

type UseDatePickerProps = {
  date?: Date
  startDate?: Date
  endDate?: Date
}

export const useDatePicker = (props?: UseDatePickerProps) => {
  const [date, setDate] = useState(props?.date)
  const [startDate, setStartDate] = useState(props?.startDate)
  const [endDate, setEndDate] = useState(props?.endDate)

  const onConfirmClick = useCallback(
    (props: UseDatePickerProps) => {
      setDate(props.date)
      setStartDate(props.startDate)
      setEndDate(props.endDate)
    },
    [setDate, setStartDate, setEndDate]
  )

  return {
    date,
    setDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onConfirmClick
  }
}
