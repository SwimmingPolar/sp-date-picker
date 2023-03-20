import { mixin } from '@/styles/calendar'
import styled from 'styled-components'

export const StyledBox = styled.div`
  .daypicker__box {
    ${mixin.calendarLayout}

    .daypicker__close-button {
      ${mixin.closeButton}
    }

    .daypicker__title {
      ${mixin.title}
    }

    .daypicker__days-box {
      ${mixin.grid(7)}
    }

    .daypicker__day {
      ${mixin.day}
    }
  }
`
