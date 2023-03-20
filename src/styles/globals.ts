import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *:where(:not(iframe, canvas, img, svg, video):not(svg *)) {
    all: unset;
    display: revert;
  }

  a,
  button {
    cursor: revert;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body {
    line-height: 1;
  }

  img,
  picture,
  video,
  canvas,
  svg {
    display: block;
    max-width: 100%;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    overflow-wrap: break-word;
  }

  ol,
  ul,
  menu {
    list-style: none;
  }

  /* reset default text opacity of input placeholder */
  ::placeholder {
    color: unset;
  }

  /* Removes spacing between cells in tables */
  table {
    border-collapse: collapse;
  }

  #root,
  article,
  div,
  footer,
  header,
  main,
  nav,
  section {
    display: flex;
    flex-direction: column;
  }

  html,
  body {
    width: 100%;
  }

  /* The isolation CSS property determines whether an element must create a new stacking context. */
  #root {
    isolation: isolate;
  }

  /* Clip overflow text */
  p,
  span,
  a {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    word-break: keep-all;
    word-wrap: break-word;
  }

  /* default header styles */
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2.25rem;
  }
  h3 {
    font-size: 2rem;
  }
  h4 {
    font-size: 1.75rem;
  }
  h5 {
    font-size: 1.5rem;
  }
  h6 {
    font-size: 1.25rem;
  }

  a {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
  }

  .sp-datepicker-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
  }

  .sp-datepicker-backdrop {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.45);
    user-select: none;
    z-index: 0;
  }
`
