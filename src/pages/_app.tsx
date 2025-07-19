import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import type { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { emotionCache } from '@/lib/emotionCache';

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function App({
  Component,
  pageProps,
  emotionCache: clientSideEmotionCache,
}: MyAppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache || emotionCache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}
