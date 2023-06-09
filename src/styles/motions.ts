import { AnimationProps } from 'framer-motion'

export const backdropMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 }
} as AnimationProps

export const containerMotion = {
  initial: { x: '-50%', y: '-46%' },
  animate: { x: '-50%', y: '-50%' }
} as AnimationProps

const selectModeTransition = {
  transition: {
    type: 'tween',
    bounce: 0,
    duration: 0.095,
    ease: 'easeInOut'
  }
}

export const selectMonthMotion = {
  initial: {
    scale: 1.1,
    opacity: 0
  },
  animate: {
    scale: 1,
    opacity: 1
  },
  exit: {
    scale: 1.1,
    opacity: 0
  },
  ...selectModeTransition
}

export const selectDayMotion = {
  initial: { scale: 0.9, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: {
    sacle: 0.9,
    opacity: 0
  },
  ...selectModeTransition
} as AnimationProps
