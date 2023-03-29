import { mixin, Theme } from '@/styles/calendar'
import styled from 'styled-components'

export const StyledBox = styled.div`
  .datepicker__box {
    ${mixin.calendarLayout}

    .datepicker__close-button {
      ${mixin.closeButton}
    }

    .datepicker__title {
      ${mixin.title}
    }

    .datepicker__date-navigation {
      display: flex;
      flex-direction: row;
      margin-top: 20px;
      align-self: center;
      min-width: 170px;
      justify-content: space-between;
    }

    .datepicker__date-navigation__current-date-box {
      display: flex;
      justify-content: center;
    }
    .datepicker__date-navigation__current-date {
      border-radius: 20px;
      font-size: 16px;
      padding: 0 20px;
      height: 100%;
      background-color: ${({ theme }: { theme: Theme }) => theme.color.gray100};
      font-weight: bold;
      color: ${({ theme }: { theme: Theme }) => theme.color.textGray};

      &:not(:disabled) {
        cursor: pointer;
      }

      &:not(:disabled):active {
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.color.gray200};
      }
    }

    .datepicker__date-navigiation__button {
      cursor: pointer;
      padding: 15px;

      svg {
        fill: ${({ theme }: { theme: Theme }) => theme.color.gray200};
      }

      &:hover {
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.color.gray100};
        border-radius: 25px;

        svg {
          fill: ${({ theme }: { theme: Theme }) => theme.color.gray300};
        }
      }

      &:active {
        svg {
          fill: ${({ theme }: { theme: Theme }) => theme.color.gray400};
        }
      }

      &:disabled {
        cursor: default;
        background-color: #fff;
        svg {
          fill: ${({ theme }: { theme: Theme }) => theme.color.gray100};
        }
      }
    }

    .datepicker__months-box {
      ${mixin.grid(3)}
      padding: 0 10px;

      > div {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0;
      }
    }

    .datepicker__month {
      ${mixin.day}
      padding: 15px 11px;
      border-radius: 50%;
      width: 60px;
      height: 60px;
      font-size: 16px;
      color: ${({ theme }: { theme: Theme }) => theme.color.textDark};
    }

    .datepicker__day-name {
      ${mixin.dayName}
    }

    .datepicker__days-box {
      ${mixin.grid(7)}

      > div:has(.range-set.selected) {
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.color.skyblue};
      }

      > div:has(.range-set.selected.start) {
        border-top-left-radius: 50%;
        border-bottom-left-radius: 50%;
      }

      > div:has(.range-set.selected.end) {
        border-top-right-radius: 50%;
        border-bottom-right-radius: 50%;
      }

      div:has(.between) {
        background-color: ${({ theme }: { theme: Theme }) =>
          theme.color.skyblue};
      }
    }

    .datepicker__day {
      ${mixin.day}

      &.selected {
        color: #fff;
        background-color: ${({ theme }: { theme: Theme }) => theme.color.blue};
      }
      &:disabled {
        border-color: transparent;
      }
    }

    .datepicker__empty-day {
      width: 40px;
      height: 40px;
      flex: 0;
    }

    .datepicker__footer {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      margin: 20px 15px 0 0;
      gap: 10px;
    }

    .datepicker__footer__button {
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }

    .datepicker__footer__clear-date-button {
      text-decoration: underline;
      color: ${({ theme }: { theme: Theme }) => theme.color.textDark};
    }
    .datepicker__footer__confirm-button {
      padding: 9px 15px;
      border-radius: 8px;
      color: #fff;
      background-color: ${({ theme }: { theme: Theme }) => theme.color.blue};
    }
  }
`
