import createCache from '@emotion/cache';
import type { EmotionCache } from '@emotion/cache';

export const emotionCache: EmotionCache = createCache({
  key: 'css', // 클래스네임 접두어
  prepend: true, // head 최상단에 스타일 삽입
});
