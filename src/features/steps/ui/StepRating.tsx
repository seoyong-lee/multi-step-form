import { useWatch } from 'react-hook-form';
import { css } from '@emotion/react';

import { BookFormData } from '@/entities/book';
import { RHFStarRating } from '@/shared/ui/react-hook-form';
import { InfoMessage } from '@/shared/ui/info-message';

export const StepRating = () => {
  const rating = useWatch<BookFormData, 'rating'>({ name: 'rating' });
  const isReviewRequired = rating === 1 || rating === 5;

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>2단계 - 도서 평가</h2>

      <div css={formGroupStyle}>
        <RHFStarRating name="rating" label="별점" max={5} step={0.5} size={40} clearable />
        <div css={ratingTextStyle}>{rating}점</div>
      </div>

      <InfoMessage variant={isReviewRequired ? 'warning' : 'info'}>
        {isReviewRequired
          ? `⚠️ 별점이 ${rating}점인 경우 독후감을 필수로 작성해주세요.`
          : `✓ 별점 ${rating}점 - 독후감 작성은 선택사항입니다.`}
      </InfoMessage>
    </section>
  );
};

const containerStyle = css`
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
`;

const titleStyle = css`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 32px;
  padding-bottom: 8px;
`;

const formGroupStyle = css`
  margin-bottom: 24px;
`;

const ratingTextStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;
