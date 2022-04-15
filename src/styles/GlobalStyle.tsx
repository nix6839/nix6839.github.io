import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
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
    font-family: Pretendard, NanumGothic, sans-serif;
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
