import {
  useFormContext,
  type FieldValues,
  type Path,
  type RegisterOptions,
  get,
} from 'react-hook-form';
import { css, type SerializedStyles } from '@emotion/react';

type NumberProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;

  // HTML 속성
  min?: number;
  max?: number;
  step?: number | 'any';

  // RHF 규칙(숫자 전용: pattern/valueAsDate/valueAsNumber는 제외)
  rules?: Omit<
    RegisterOptions<TFieldValues, Path<TFieldValues>>,
    'pattern' | 'valueAsDate' | 'valueAsNumber'
  >;

  // 파싱 옵션
  integer?: boolean; // true면 소수점 절삭
  allowEmpty?: boolean; // '' 입력 시 undefined로 (기본 true)

  // 스타일 오버라이드
  wrapperCss?: SerializedStyles;
  labelCss?: SerializedStyles;
  inputCss?: SerializedStyles;
  errorCss?: SerializedStyles;
};

export function RHFNumberField<TFieldValues extends FieldValues>({
  name,
  label,
  required,
  placeholder,
  disabled,
  min,
  max,
  step = 1,
  rules,
  integer = false,
  allowEmpty = true,
  wrapperCss,
  labelCss,
  inputCss,
  errorCss,
}: NumberProps<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = get(errors, name as string);
  const inputId = `input-${String(name)}`;
  const describedBy = error ? `${inputId}-error` : undefined;

  const registerOptions: RegisterOptions<TFieldValues, Path<TFieldValues>> = {
    ...(required && { required: `${label}은 필수 항목입니다.` }),
    ...rules,
    valueAsNumber: true,
    setValueAs: v => {
      if (v === '' || v === null || v === undefined) {
        return allowEmpty ? undefined : 0;
      }
      const n = typeof v === 'string' ? Number(v) : v;
      if (!Number.isFinite(n)) return undefined; // NaN 방지
      return integer ? Math.trunc(n) : n;
    },
  };

  return (
    <div css={[fieldWrapperStyle, wrapperCss]}>
      <label htmlFor={inputId} css={[labelStyle, labelCss]}>
        {label}
      </label>
      <input
        id={inputId}
        type="number"
        inputMode="numeric"
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={describedBy}
        min={min}
        max={max}
        step={step}
        css={[inputStyle, inputCss]}
        // 마우스 휠로 값 바뀌는 것 방지(원하면 제거)
        onWheel={e => (e.currentTarget as HTMLInputElement).blur()}
        {...register(name, registerOptions)}
      />
      {error && (
        <span id={describedBy} role="alert" css={[errorStyle, errorCss]}>
          {String(error.message ?? '')}
        </span>
      )}
    </div>
  );
}

// 기본 스타일은 텍스트 필드와 동일하게 재사용
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

const inputStyle = css`
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.2s ease;
  color: #fff;

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
