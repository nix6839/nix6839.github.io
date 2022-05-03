import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';
import {
  cutOverflow,
  increaseCurrentIndex,
  setCurrentIndex,
  setCurrentScrollY,
} from '../app/scrollYHistorySlice';
import store from '../app/store';
import GlobalStyle from '../GlobalStyle';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const { dispatch } = store;

  useEffect(() => {
    let popStated = false;

    router.beforePopState(() => {
      const nextHistoryIndex = window.history.state.idx;
      dispatch(setCurrentScrollY(window.scrollY));
      dispatch(setCurrentIndex(nextHistoryIndex));
      popStated = true;
      return true;
    });

    function handleRouteChangeStart() {
      if (popStated) {
        return;
      }
      dispatch(setCurrentScrollY(window.scrollY));
      dispatch(cutOverflow());
      dispatch(increaseCurrentIndex());
    }

    router.events.on('routeChangeStart', handleRouteChangeStart);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [router, dispatch]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <>
          <GlobalStyle />
          <Component {...pageProps} />
        </>
      </QueryClientProvider>
    </Provider>
  );
}
