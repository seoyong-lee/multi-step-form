import { css, SerializedStyles } from '@emotion/react';

type CharacterCountProps = {
  current: number;
  min?: number;
  showCheckmark?: boolean;
  wrapperCss?: SerializedStyles;
  textCss?: SerializedStyles;
  validCss?: SerializedStyles;
  invalidCss?: SerializedStyles;
  checkmarkCss?: SerializedStyles;
};

export const CharacterCount = ({
  current,
  min = 0,
  showCheckmark = true,
  wrapperCss,
  textCss,
  validCss,
  invalidCss,
  checkmarkCss,
}: CharacterCountProps) => {
  const isValid = current >= min;

  return (
    // aria-live=polite 속성은 사용자가 하고 있는 작업을 방해하지 않고 적절한 타이밍에 변화를 읽어주도록 함
    <div css={[baseWrapperStyle, wrapperCss]} aria-live="polite">
      <span
        css={[
          baseTextStyle,
          textCss,
          isValid ? validCountStyle : invalidCountStyle,
          isValid ? validCss : invalidCss,
        ]}
      >
        {current} / {min}자
      </span>
      {showCheckmark && isValid && <span css={[checkmarkStyle, checkmarkCss]}>✓</span>}
    </div>
  );
};

// 기본 스타일
const baseWrapperStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
`;

const baseTextStyle = css`
  font-size: 12px;
  font-weight: 500;
`;

const validCountStyle = css`
  color: #28a745;
`;

const invalidCountStyle = css`
  color: #dc3545;
`;

const checkmarkStyle = css`
  color: #28a745;
  font-weight: bold;
  font-size: 14px;
`;
