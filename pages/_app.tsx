import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface IProps {
  session?: Session | null;
}

function MyApp({ Component, pageProps }: AppProps<IProps>) {
  return (
    <SessionProvider session={pageProps?.session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;
