import { useWatch, useFormContext } from 'react-hook-form';
import { css } from '@emotion/react';
import { useState } from 'react';

export const StepRating = () => {
  const { setValue } = useFormContext();
  const rating = useWatch({ name: 'rating' }) as number;
  const [hoverRating, setHoverRating] = useState(0);

  const totalStars = 5;

  const handleStarClick = (starValue: number, isHalf: boolean = false) => {
    const newRating = isHalf ? starValue - 0.5 : starValue;
    setValue('rating', newRating);
  };

  const handleStarHover = (starValue: number, isHalf: boolean = false) => {
    const hoverValue = isHalf ? starValue - 0.5 : starValue;
    setHoverRating(hoverValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleClearRating = () => {
    setValue('rating', 0);
  };

  return (
    <section css={containerStyle}>
      <h2 css={titleStyle}>2단계 - 도서 평가</h2>

      <div css={formGroupStyle}>
        <label css={labelStyle}>별점</label>
        <div css={ratingContainerStyle}>
          {Array.from({ length: totalStars }, (_, starIndex) => {
            const starValue = starIndex + 1;
            const currentRating = hoverRating || rating;
            const isActive = currentRating >= starValue;
            const isHalfActive = currentRating >= starValue - 0.5 && currentRating < starValue;

            return (
              <div key={starIndex} css={starWrapperStyle}>
                {/* 배경 별 (비활성) */}
                <span css={[starStyle, inactiveStarStyle]}>★</span>

                {/* 활성 별 (오버레이) */}
                <span
                  css={[starStyle, activeStarStyle, isHalfActive && halfActiveStarStyle]}
                  style={{
                    width: isHalfActive ? '50%' : isActive ? '100%' : '0%',
                    overflow: 'hidden',
                  }}
                >
                  ★
                </span>

                {/* 왼쪽 반쪽 클릭 영역 (0.5점) */}
                <button
                  type="button"
                  css={[starButtonStyle, halfStarButtonStyle]}
                  onClick={() => handleStarClick(starValue, true)}
                  onMouseEnter={() => handleStarHover(starValue, true)}
                  onMouseLeave={handleMouseLeave}
                  title={`${starValue - 0.5}점`}
                />

                {/* 오른쪽 반쪽 클릭 영역 (1.0점) */}
                <button
                  type="button"
                  css={[starButtonStyle, fullStarButtonStyle]}
                  onClick={() => handleStarClick(starValue, false)}
                  onMouseEnter={() => handleStarHover(starValue, false)}
                  onMouseLeave={handleMouseLeave}
                  title={`${starValue}점`}
                />
              </div>
            );
          })}
        </div>

        <div css={ratingTextStyle}>{rating > 0 ? `${rating}점` : '별점을 선택해주세요'}</div>

        {rating > 0 && (
          <button
            type="button"
            css={clearButtonStyle}
            onClick={handleClearRating}
            title="별점 초기화"
          >
            별점 초기화
          </button>
        )}

        <input type="hidden" name="rating" value={rating || 0} />
      </div>

      {rating > 0 && (
        <div css={infoStyle}>
          {rating === 1 || rating === 5 ? (
            <p css={warningStyle}>⚠️ 별점이 {rating}점인 경우 독후감을 필수로 작성해주세요.</p>
          ) : (
            <p css={infoTextStyle}>✓ 별점 {rating}점 - 독후감 작성은 선택사항입니다.</p>
          )}
        </div>
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

const labelStyle = css`
  font-weight: 500;
  color: #555;
  font-size: 14px;
  margin-bottom: 12px;
  display: block;
`;

const ratingContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  margin-bottom: 12px;
  justify-content: center;
`;

const starWrapperStyle = css`
  position: relative;
  display: flex;
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

const starStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  font-size: 40px;
  line-height: 1;
  transition: all 0.2s ease;
`;

const inactiveStarStyle = css`
  color: #e0e0e0;
`;

const activeStarStyle = css`
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
`;

const halfActiveStarStyle = css`
  color: #ffd700;
  text-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
`;

const starButtonStyle = css`
  position: absolute;
  top: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
    transform: scale(1.05);
  }
`;

const halfStarButtonStyle = css`
  left: 0;
  width: 50%;
  height: 100%;
`;

const fullStarButtonStyle = css`
  right: 0;
  width: 50%;
  height: 100%;
`;

const ratingTextStyle = css`
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  text-align: center;
  margin-top: 12px;
  margin-bottom: 8px;
`;

const clearButtonStyle = css`
  display: block;
  margin: 0 auto;
  padding: 8px 16px;
  background: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  color: #6c757d;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #e9ecef;
    border-color: #adb5bd;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(108, 117, 125, 0.25);
  }
`;

const infoStyle = css`
  margin-top: 16px;
  padding: 12px;
  border-radius: 8px;
  background: #f8f9fa;
`;

const warningStyle = css`
  color: #dc3545;
  font-size: 14px;
  margin: 0;
`;

const infoTextStyle = css`
  color: #296f39;
  font-size: 14px;
  margin: 0;
`;
