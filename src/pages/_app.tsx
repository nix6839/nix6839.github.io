import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import GlobalStyle from '../styles/GlobalStyle';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
