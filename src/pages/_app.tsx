import { dotFont, mainFont } from '@/styles/font';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Twemoji from 'react-twemoji';

export default function App({ Component, pageProps }: AppProps) {
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

      <Twemoji options={{ className: "twemoji" }}>
        <Component {...pageProps} />
      </Twemoji>

    </>
  )
}
