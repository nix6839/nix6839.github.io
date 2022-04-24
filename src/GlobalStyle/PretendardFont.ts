import { css } from 'styled-components';

export default css`
  @font-face {
    font-family: 'Pretendard';
    font-weight: 400;
    font-display: swap;
    src: local('Pretendard Regular'),
      url('https://unpkg.com/pretendard@1.2.2/dist/web/static/woff2/Pretendard-Regular.woff2')
        format('woff2'),
      url('https://unpkg.com/pretendard@1.2.2/dist/web/static/woff/Pretendard-Regular.woff')
        format('woff');
  }

  @font-face {
    font-family: 'Pretendard';
    font-weight: 700;
    font-display: swap;
    src: local('Pretendard Bold'),
      url('https://unpkg.com/pretendard@1.2.2/dist/web/static/woff2/Pretendard-Bold.woff2')
        format('woff2'),
      url('https://unpkg.com/pretendard@1.2.2/dist/web/static/woff/Pretendard-Bold.woff')
        format('woff');
  }
`;
