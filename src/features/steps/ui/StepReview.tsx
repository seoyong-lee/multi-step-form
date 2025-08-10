import { useWatch, useFormContext } from 'react-hook-form';
import { css } from '@emotion/react';
import { RHFTextField } from '@/shared/ui/react-hook-form';
import { BookFormData } from '@/entities/book';
import { InfoMessage } from '@/shared/ui/info-message';
import { CharacterCount } from '@/shared/ui/count';

export const StepReview = () => {
  const { getValues } = useFormContext();
  const rating = useWatch<BookFormData, 'rating'>({ name: 'rating' });
  const review = useWatch<BookFormData, 'review'>({ name: 'review' });

  const currentRating = rating || getValues('rating') || 0;
  const isReviewRequired = currentRating === 1 || currentRating === 5;
  const currentLength = review?.length || 0;
  const minLength = 100;

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>3단계 - 독후감</h2>

      <div css={formGroupStyle}>
        <RHFTextField
          name="review"
          label="독후감"
          placeholder="책을 읽고 느낀 점이나 생각을 자유롭게 작성해주세요."
          multiline
          rows={8}
          required={isReviewRequired}
          wrapperCss={fieldWrapperStyle}
          labelCss={labelStyle}
          inputCss={textareaStyle}
          errorCss={errorStyle}
        />

        {isReviewRequired && (
          <CharacterCount current={currentLength} min={minLength} showCheckmark />
        )}
      </div>

      {isReviewRequired ? (
        <InfoMessage variant="warning">
          ⚠️ 별점이 {currentRating}점인 경우, 의견을 뒷받침하기 위해 최소 {minLength}자 이상의
          독후감을 작성해주세요.
        </InfoMessage>
      ) : (
        <InfoMessage variant="info">
          💡 별점이 2~4점인 경우 독후감 작성은 선택사항입니다. 하지만 독후감을 작성하면 더 나은 독서
          경험을 할 수 있습니다.
        </InfoMessage>
      )}
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

const fieldWrapperStyle = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const labelStyle = css`
  font-weight: 500;
  color: #555;
  font-size: 14px;
`;

const textareaStyle = css`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  color: #fff;
  resize: vertical;
  min-height: 120px;
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

const errorStyle = css`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;
