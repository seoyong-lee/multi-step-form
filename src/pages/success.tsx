import Head from 'next/head';
import { useRouter } from 'next/router';
import { css } from '@emotion/react';

export default function Success() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <>
      <Head>
        <title>저장 완료 - Multi Step Form</title>
        <meta name="description" content="폼 제출이 완료되었습니다" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div css={containerStyles}>
        <div css={cardStyles}>
          <div css={iconContainerStyles}>
            <div css={iconWrapperStyles}>
              <svg css={iconStyles} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 css={titleStyles}>저장 완료!</h1>
            <p css={descriptionStyles}>책 정보가 성공적으로 저장되었습니다.</p>
          </div>

          <div css={buttonContainerStyles}>
            <button css={buttonStyles} onClick={handleGoHome}>
              홈으로 돌아가기
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const containerStyles = css`
  min-height: 100vh;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const cardStyles = css`
  max-width: 400px;
  width: 100%;
  background: #1a1a1a;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  padding: 32px;
  text-align: center;
`;

const iconContainerStyles = css`
  margin-bottom: 24px;
`;

const iconWrapperStyles = css`
  margin: 0 auto 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 64px;
  width: 64px;
  border-radius: 50%;
  background-color: #dcfce7da;
`;

const iconStyles = css`
  height: 32px;
  width: 32px;
  color: #16a34a;
`;

const titleStyles = css`
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  margin: 0 0 8px 0;
`;

const descriptionStyles = css`
  color: #6b7280;
  margin: 0;
`;

const buttonContainerStyles = css`
  margin-top: 16px;
`;

const buttonStyles = css`
  width: 100%;
  background-color: #2563eb;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #1d4ed8;
  }

  &:focus {
    outline: 2px solid #3b82f6;
    outline-offset: 2px;
  }
`;
