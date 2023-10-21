import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Router from 'next/router';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import nProgress from 'nprogress';

interface IProps {
  session?: Session | null;
}

nProgress.configure({ showSpinner: false });
Router.events.on('routeChangeStart', () => nProgress.start());
Router.events.on('routeChangeComplete', () => nProgress.done());
Router.events.on('routeChangeError', () => nProgress.done());

function MyApp({ Component, pageProps }: AppProps<IProps>) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;
