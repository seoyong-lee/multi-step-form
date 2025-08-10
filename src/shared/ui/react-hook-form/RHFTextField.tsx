import {
  useFormContext,
  type FieldValues,
  type Path,
  type RegisterOptions,
  get,
} from 'react-hook-form';
import { css, SerializedStyles } from '@emotion/react';

type BaseProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  validate?: (value: string) => boolean | string;
  multiline?: boolean;
  rows?: number;

  // react-hook-form 규칙을 그대로 전달 (minLength, pattern 등)
  rules?: RegisterOptions<TFieldValues, Path<TFieldValues>>;

  // 커스터마이징용 CSS
  wrapperCss?: SerializedStyles;
  labelCss?: SerializedStyles;
  inputCss?: SerializedStyles;
  errorCss?: SerializedStyles;
};

export function RHFTextField<TFieldValues extends FieldValues>({
  name,
  label,
  required,
  type = 'text',
  placeholder,
  disabled,
  multiline = false,
  rows = 4,
  wrapperCss,
  labelCss,
  inputCss,
  errorCss,
  rules,
}: BaseProps<TFieldValues>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<TFieldValues>();

  const error = get(errors, name as string);
  const inputId = `input-${name}`;
  const describedBy = error ? `${inputId}-error` : undefined;

  const registerOptions: RegisterOptions<TFieldValues, Path<TFieldValues>> = {
    ...(required && { required: `${label}은 필수 항목입니다.` }),
    ...(rules || {}),
  };

  return (
    <div css={[fieldWrapperStyle, wrapperCss]}>
      {/* 입력 필드와 연결된 라벨 - 접근성을 위해 htmlFor에 input의 id를 연결 */}
      <label htmlFor={inputId} css={[labelStyle, labelCss]}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={inputId}
          placeholder={placeholder}
          disabled={disabled}
          rows={rows}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          css={[inputStyle, inputCss]}
          {...register(name, registerOptions)}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          css={[inputStyle, inputCss]}
          {...register(name, registerOptions)}
        />
      )}
      {error && (
        <span
          id={describedBy} // input의 aria-describedby가 이 span을 참조하도록 ID 부여
          role="alert" // 스크린 리더가 즉시 읽어주도록 알림 역할 부여
          css={[errorStyle, errorCss]}
        >
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
}

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
