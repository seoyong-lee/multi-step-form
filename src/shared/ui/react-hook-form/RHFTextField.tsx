import { useFormContext } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  validate?: (value: string) => boolean | string;
  multiline?: boolean;
  rows?: number;

  // 커스터마이징용 CSS
  wrapperCss?: SerializedStyles;
  labelCss?: SerializedStyles;
  inputCss?: SerializedStyles;
  errorCss?: SerializedStyles;
};

export const RHFTextField = ({
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
  validate,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const inputId = `input-${name}`;
  const describedBy = error ? `${inputId}-error` : undefined;

  // 필수 여부에 따른 register 옵션 설정
  const validationRules = {
    ...(required && { required: `${label}은 필수 항목입니다.` }),
    ...(validate && { validate }),
    shouldUnregister: true,
  };

  return (
    <div css={wrapperCss}>
      {/* 입력 필드와 연결된 라벨 - 접근성을 위해 htmlFor에 input의 id를 연결 */}
      <label htmlFor={inputId} css={labelCss}>
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
          css={inputCss}
          {...register(name, validationRules)}
        />
      ) : (
        <input
          id={inputId}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          css={inputCss}
          {...register(name, validationRules)}
        />
      )}
      {error && (
        <span
          id={describedBy} // input의 aria-describedby가 이 span을 참조하도록 ID 부여
          role="alert" // 스크린 리더가 즉시 읽어주도록 알림 역할 부여
          css={errorCss}
        >
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
};
