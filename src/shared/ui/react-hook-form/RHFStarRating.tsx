import { Controller, useFormContext, type FieldValues, type Path, get } from 'react-hook-form';
import { css, type SerializedStyles } from '@emotion/react';
import { StarRating } from '../star-rating';

type Props<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label?: string;
  max?: number;
  step?: 0.5 | 1;
  size?: number;
  clearable?: boolean;
  readOnly?: boolean;
  disabled?: boolean;

  wrapperCss?: SerializedStyles;
  labelCss?: SerializedStyles;
  ratingCss?: SerializedStyles;
  errorCss?: SerializedStyles;
  infoCss?: SerializedStyles;
};

export function RHFStarRating<TFieldValues extends FieldValues>({
  name,
  label = '별점',
  max = 5,
  step = 0.5,
  size = 40,
  clearable = true,
  readOnly,
  disabled,
  wrapperCss,
  labelCss,
  ratingCss,
  errorCss,
}: Props<TFieldValues>) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TFieldValues>();
  const error = get(errors, name);
  const id = `rating-${String(name)}`;

  return (
    <div css={[containerStyle, wrapperCss]}>
      {label && (
        <label htmlFor={id} css={[labelStyle, labelCss]}>
          {label}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <StarRating
              value={Number(field.value ?? 0)}
              onChange={v => field.onChange(v)}
              max={max}
              step={step}
              size={size}
              readOnly={readOnly}
              disabled={disabled}
              containerCss={ratingCss}
            />
            {clearable && Number(field.value ?? 0) > 0 && (
              <button
                type="button"
                css={clearBtnStyle}
                onClick={() => field.onChange(0)}
                aria-label="별점 초기화"
              >
                별점 초기화
              </button>
            )}
            {/* 접근성용 숨김 입력 (폼 제출 시 값 보장) */}
            <input id={id} type="hidden" {...field} />
          </>
        )}
      />

      {error && (
        <div role="alert" css={[errorTextStyle, errorCss]}>
          {String(error.message ?? '')}
        </div>
      )}
    </div>
  );
}

const containerStyle = css`
  display: grid;
  gap: 8px;
  margin-bottom: 24px;
`;

const labelStyle = css`
  font-weight: 500;
  color: #555;
  font-size: 14px;
`;

const errorTextStyle = css`
  color: #dc3545;
  font-size: 12px;
`;

const clearBtnStyle = css`
  display: inline-block;
  margin: 8px auto 0;
  padding: 6px 12px;
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
