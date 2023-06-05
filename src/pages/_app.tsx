import { dotFont, mainFont } from '@/styles/font';
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from "next-auth/react";
import type { AppProps } from 'next/app';

import 'zenn-content-css';

const queryClient = new QueryClient()

export default function App({
  Component,
  pageProps: {
    session,
    ...pageProps
  },
}: AppProps) {
  return (
    <>

      <style jsx global>{`
        :root {
          --font-main: ${mainFont.style.fontFamily};
          --font-dot: ${dotFont.style.fontFamily}, ${mainFont.style.fontFamily};
        }
        html {
          font-family: ${mainFont.style.fontFamily};
          overscroll-behavior: none;
        }
      `}</style>

      <SessionProvider session={session}>
        {/* <Twemoji options={{ className: "twemoji" }}> */}
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
        {/* </Twemoji> */}
      </SessionProvider>

    </>
  )
}
