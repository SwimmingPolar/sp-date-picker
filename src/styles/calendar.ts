import { css } from 'styled-components'

// Theme
const light = {
  background: '#f8f8f8',
  blue: '#2c7fff',
  skyblue: '#e6f4ff',
  red: '#ff0000',
  textDark: '#444',
  textGray: '#585858',
  gray100: '#f2f2f2',
  gray200: '#dadada',
  gray300: '#b5b5b5',
  gray400: '#444'
}
const dark = Object.assign({}, light, {
  // add more colors if needed
})
export const colors = {
  light,
  dark
}

export type Theme = typeof theme

export const theme = {
  color: Object.assign({}, light)
}

// Mixin
export const mixin = {
  calendarLayout: css`
    display: flex;
    background-color: #fff;
    border-radius: 7px;
    padding: 16px;
    position: relative;
    width: 312px;
    box-shadow: rgb(34 34 34 / 10%) 0px 0px 14px 3px;

    @media (max-width: 312px) {
      padding: 10px 0;
    }
  `,
  closeButton: css`
    position: absolute;
    top: 12px;
    right: 12px;
    cursor: pointer;
  `,
  title: css`
    padding: 4px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    user-select: none;
    color: ${({ theme }: { theme: Theme }) => theme.color.textGray};
  `,
  grid: (columns: number) => css`
    display: grid;
    grid-template-columns: repeat(${columns}, 1fr);
    margin-top: 16px;
  `,
  dayName: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px 1px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.14;
    outline: none;
    user-select: none;
    color: ${({ theme }: { theme: Theme }) => theme.color.textGray};
    width: 40px;
    height: 40px;

    &.sunday {
      color: ${({ theme }: { theme: Theme }) => theme.color.red};
    }
  `,
  day: css`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px 1px;
    font-size: 14px;
    font-weight: bold;
    line-height: 1.14;
    border-radius: 25px;
    cursor: pointer;
    outline: none;
    user-select: none;
    color: ${({ theme }: { theme: Theme }) => theme.color.textGray};
    border: 1px solid transparent;
    min-width: 40px;
    min-height: 40px;

    &.sunday {
      color: ${({ theme }: { theme: Theme }) => theme.color.red};
    }

    &:hover {
      background-color: ${({ theme }: { theme: Theme }) => theme.color.skyblue};
    }

    &:active {
      border-color: ${({ theme }: { theme: Theme }) => theme.color.blue};
      transition: 0.25s ease;
    }

    &:focus-visible {
      color: ${({ theme }: { theme: Theme }) => theme.color.gray400};
      outline: 1px solid ${({ theme }: { theme: Theme }) => theme.color.gray400};
    }

    &.selected {
      color: ${({ theme }: { theme: Theme }) => theme.color.blue};
      border-color: ${({ theme }: { theme: Theme }) => theme.color.blue};

      &:focus-visible {
        outline: none;
      }
    }

    &:disabled {
      cursor: default;
      color: ${({ theme }: { theme: Theme }) => theme.color.gray200};
      border-color: transparent;
      background-color: #fff;
    }
  `
}
