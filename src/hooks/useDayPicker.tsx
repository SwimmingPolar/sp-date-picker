import { useCallback, useState } from 'react'

type UseDayPickerProps = {
  preSelectedDay?: number
  open?: boolean
}

export const useDayPicker = (props?: UseDayPickerProps) => {
  const [selectedDay, setSelectedDay] = useState(props?.preSelectedDay ?? -1)
  const [open, setOpen] = useState(props?.open || false)

  const onDayClick = useCallback((day: number) => {
    setSelectedDay(day)
  }, [])

  const handleOpen = useCallback((state: boolean) => {
    setOpen(state)
  }, [])

  return { selectedDay, onDayClick, open, handleOpen } as const
}
