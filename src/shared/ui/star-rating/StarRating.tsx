import { css, SerializedStyles } from '@emotion/react';
import { useState, KeyboardEvent } from 'react';

type Props = {
  value: number; // 현재 값(0~max, step 단위)
  onChange: (v: number) => void; // 값 변경 콜백
  max?: number; // 총 별 개수 (기본 5)
  step?: 0.5 | 1; // 간격 (0.5 또는 1)
  size?: number; // 별 크기(px)
  readOnly?: boolean;
  disabled?: boolean;
  containerCss?: SerializedStyles;
  starWrapperCss?: SerializedStyles;
};

export function StarRating({
  value,
  onChange,
  max = 5,
  step = 0.5,
  size = 40,
  readOnly,
  disabled,
  containerCss,
  starWrapperCss,
}: Props) {
  const [hoverValue, setHoverValue] = useState(0);

  const setClamped = (v: number) => {
    const clamped = Math.min(max, Math.max(0, v));
    // step 스냅(0.5 단위)
    const snapped = step === 1 ? Math.round(clamped) : Math.round(clamped * 2) / 2;
    onChange(snapped);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (readOnly || disabled) return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      setClamped(value + step);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      setClamped(value - step);
    } else if (e.key === 'Home') {
      e.preventDefault();
      setClamped(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      setClamped(max);
    }
  };

  const current = hoverValue || value;

  return (
    <div
      css={[ratingContainerStyle, containerCss]}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="별점"
      tabIndex={disabled ? -1 : 0}
      onKeyDown={onKeyDown}
      aria-readonly={readOnly || undefined}
      aria-disabled={disabled || undefined}
    >
      {Array.from({ length: max }, (_, i) => {
        const starIndex = i + 1;
        const isActive = current >= starIndex;
        const isHalfActive = current >= starIndex - 0.5 && current < starIndex;

        return (
          <div
            key={i}
            css={[starWrapperStyle(size), starWrapperCss]}
            onMouseLeave={() => setHoverValue(0)}
          >
            {/* 배경 별 */}
            <span css={[starStyle(size), inactiveStarStyle]}>★</span>

            {/* 활성 별 (오버레이) */}
            <span
              css={[starStyle(size), activeStarStyle]}
              style={{
                width: isHalfActive ? '50%' : isActive ? '100%' : '0%',
                overflow: 'hidden',
              }}
            >
              ★
            </span>

            {/* 좌/우 클릭 영역 */}
            <button
              type="button"
              disabled={disabled || readOnly}
              css={[starButtonStyle, halfButtonStyle]}
              onMouseEnter={() => setHoverValue(starIndex - 0.5)}
              onClick={() => setClamped(starIndex - 0.5)}
              title={`${starIndex - 0.5}점`}
            />
            <button
              type="button"
              disabled={disabled || readOnly}
              css={[starButtonStyle, fullButtonStyle]}
              onMouseEnter={() => setHoverValue(starIndex)}
              onClick={() => setClamped(starIndex)}
              title={`${starIndex}점`}
            />
          </div>
        );
      })}
    </div>
  );
}

const ratingContainerStyle = css`
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
`;

const starWrapperStyle = (size: number) => css`
  position: relative;
  display: flex;
  width: ${size}px;
  height: ${size}px;
  cursor: pointer;
`;

const starStyle = (size: number) => css`
  position: absolute;
  top: 0;
  left: 0;
  font-size: ${size}px;
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

const starButtonStyle = css`
  position: absolute;
  top: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
  width: 50%;
  height: 100%;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.08);
  }
  &:focus {
    outline: none;
    transform: scale(1.04);
  }
`;

const halfButtonStyle = css`
  left: 0;
`;

const fullButtonStyle = css`
  right: 0;
`;
