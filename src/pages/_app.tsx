import type { AppProps } from 'next/app';
import GlobalStyle from './styles/GlobalStyle';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
