import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import { emotionCache } from '@/lib/emotionCache';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const originalRenderPage = ctx.renderPage;

    const cache = emotionCache;
    // HTML 안에서 실제 사용된 스타일만 추출
    const { extractCriticalToChunks } = createEmotionServer(cache);

    // Next.js의 기본 렌더링 함수를 오버라이드, Emotion 캐시를 App 컴포넌트에 주입하는 방식으로 교체
    ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App: any) => {
          return function EnhanceApp(props) {
            return <App emotionCache={cache} {...props} />;
          };
        },
      });

    const initialProps = await Document.getInitialProps(ctx);
    /*
     * 1. 어떤 className이 들어있는지 분석
     * 2. 각 className이 어떤 CSS를 필요로 하는지 분석
     * 3. 필요한 CSS만 모아서 추출 (critical CSS)
     **/
    const emotionStyles = extractCriticalToChunks(initialProps.html);
    const emotionStyleTags = emotionStyles.styles.map(style => (
      <style
        key={style.key}
        data-emotion={`${style.key} ${style.ids.join(' ')}`}
        dangerouslySetInnerHTML={{ __html: style.css }}
      />
    ));

    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {emotionStyleTags}
        </>
      ),
    };
  }

  render() {
    return (
      <Html lang="ko">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
