import { selectDayMotion, selectMonthMotion } from '@/styles/motions'
import { AnimationProps } from 'framer-motion'
import { useMemo } from 'react'

type UseMotionProps = {
  customSelectMonthMotion?: AnimationProps
  customSelectDayMotion?: AnimationProps
}

// Combined motion from props and default motion
export const useMotion = ({
  customSelectDayMotion,
  customSelectMonthMotion
}: UseMotionProps) => {
  return {
    selectMonthMotion: useMemo<AnimationProps>(
      () => ({
        ...(selectMonthMotion || {}),
        ...(customSelectMonthMotion || {})
      }),
      [customSelectMonthMotion]
    ),
    selectDayMotion: useMemo<AnimationProps>(
      () => ({
        ...(selectDayMotion || {}),
        ...(customSelectDayMotion || {})
      }),
      [customSelectDayMotion]
    )
  }
}
