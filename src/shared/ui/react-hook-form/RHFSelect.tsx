import { useFormContext } from 'react-hook-form';
import { SerializedStyles } from '@emotion/react';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  options: { label: string; value: string }[];

  // 기본값 및 스타일링
  placeholder?: string;
  disabled?: boolean;

  // 커스터마이징용 CSS
  wrapperCss?: SerializedStyles;
  labelCss?: SerializedStyles;
  selectCss?: SerializedStyles;
  errorCss?: SerializedStyles;
};

export const RHFSelect = ({
  name,
  label,
  required,
  options,
  placeholder = '선택해주세요',
  disabled,
  wrapperCss,
  labelCss,
  selectCss,
  errorCss,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const selectId = `select-${name}`;
  const describedBy = error ? `${selectId}-error` : undefined;

  const validationRules = required ? { required: `${label}은 필수 선택 항목입니다.` } : {};

  return (
    <div css={wrapperCss}>
      {/* 입력 필드와 연결된 라벨 - 접근성을 위해 htmlFor에 input의 id를 연결 */}
      <label htmlFor={selectId} css={labelCss}>
        {label}
      </label>
      <select
        id={selectId}
        disabled={disabled}
        aria-invalid={!!error} // 접근성을 위한 유효성 여부 표시
        aria-describedby={describedBy} // 에러 메시지를 읽어줄 수 있도록 연결
        css={selectCss}
        {...register(name, validationRules)} // react-hook-form의 register로 연결
      >
        <option value="">{placeholder}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
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
