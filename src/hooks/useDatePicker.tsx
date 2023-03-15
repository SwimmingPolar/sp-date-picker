import { useCallback, useState } from 'react'

type UseDatePickerProps = {
  date?: Date
  startDate?: Date
  endDate?: Date
  open?: boolean
}

export const useDatePicker = (props?: UseDatePickerProps) => {
  const [date, setDate] = useState(props?.date)
  const [startDate, setStartDate] = useState(props?.startDate)
  const [endDate, setEndDate] = useState(props?.endDate)
  const [open, setOpen] = useState(props?.open ?? false)

  const onConfirmClick = useCallback(
    (props: UseDatePickerProps) => {
      setDate(props.date)
      setStartDate(props.startDate)
      setEndDate(props.endDate)
    },
    [setDate, setStartDate, setEndDate]
  )

  const handleOpen = useCallback((state: boolean) => {
    setOpen(state)
  }, [])

  return {
    date,
    setDate,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    onConfirmClick,
    open,
    handleOpen
  }
}
