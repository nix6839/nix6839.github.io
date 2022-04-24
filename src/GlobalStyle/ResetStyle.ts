import { css } from 'styled-components';

export default css`
  html,
  body,
  p,
  ol,
  ul,
  li,
  dl,
  dt,
  dd,
  blockquote,
  figure,
  fieldset,
  legend,
  textarea,
  pre,
  iframe,
  hr,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    padding: 0;
  }

  button,
  input,
  select {
    margin: 0;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  #__next {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui,
      Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo',
      'Noto Sans KR', 'Malgun Gothic', 'Apple Color Emoji', 'Segoe UI Emoji',
      'Segoe UI Symbol', sans-serif;
    line-height: 1.5;
    background-color: #fff;
    color: #212529;
  }

  code,
  pre,
  samp,
  var {
    font-family: 'JetBrains Mono NL', 'JetBrains Mono', D2Coding, monospace;
  }

  a {
    color: inherit;
  }
`;
