import { useCallback, useState } from 'react'

export const useDayPicker = (preSelectedDay?: number) => {
  const [selectedDay, setSelectedDay] = useState(preSelectedDay ?? -1)

  const onDayClick = useCallback((day: number) => {
    setSelectedDay(day)
  }, [])

  return { selectedDay, setSelectedDay, onDayClick } as const
}
