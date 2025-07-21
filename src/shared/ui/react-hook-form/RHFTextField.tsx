import { useFormContext } from 'react-hook-form';

type Props = {
  name: string;
  label: string;
  required?: boolean;
  type?: string;
  placeholder?: string;
  disabled?: boolean;

  // 커스터마이징용 className
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
};

export const RHFTextField = ({
  name,
  label,
  required,
  type = 'text',
  placeholder,
  disabled,
  wrapperClassName,
  labelClassName,
  inputClassName,
  errorClassName,
}: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];
  const inputId = `input-${name}`;
  const describedBy = error ? `${inputId}-error` : undefined;

  // 필수 여부에 따른 register 옵션 설정
  const validationRules = required ? { required: `${label}은 필수 항목입니다.` } : {};

  return (
    <div className={wrapperClassName}>
      {/* 입력 필드와 연결된 라벨 - 접근성을 위해 htmlFor에 input의 id를 연결 */}
      <label htmlFor={inputId} className={labelClassName}>
        {label}
      </label>
      {/* 입력 필드 */}
      <input
        id={inputId} // label과 연결되도록 고유 ID 부여
        type={type} // 기본 입력 타입 (예: text, email, number 등)
        placeholder={placeholder} // 사용자 안내를 위한 힌트
        disabled={disabled} // 비활성화 여부
        {...register(name, validationRules)} // react-hook-form의 register로 연결
        aria-invalid={!!error} // 접근성을 위한 유효성 여부 표시
        aria-describedby={describedBy} // 에러 메시지를 읽어줄 수 있도록 연결
        className={inputClassName} // 커스터마이징 가능한 스타일 클래스
      />
      {error && (
        <span
          id={describedBy} // input의 aria-describedby가 이 span을 참조하도록 ID 부여
          role="alert" // 스크린 리더가 즉시 읽어주도록 알림 역할 부여
          className={errorClassName} // 에러 스타일링을 위한 클래스
        >
          {error.message?.toString()}
        </span>
      )}
    </div>
  );
};
