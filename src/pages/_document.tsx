import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>
        <meta name="theme-color" content="#78c84e" />
        <meta property="og:site_name" content="한영우의 개발 블로그" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
