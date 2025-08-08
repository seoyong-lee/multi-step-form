import { SerializedStyles } from '@emotion/react';

export interface SelectOption {
  label: string;
  value: string;
}

export interface SelectProps {
  // 기본 props
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;

  // UI props
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  options: SelectOption[];

  // 상태 props
  error?: string;
  touched?: boolean;

  // 스타일링
  wrapperCss?: SerializedStyles;
  labelCss?: SerializedStyles;
  selectCss?: SerializedStyles;
  errorCss?: SerializedStyles;
}

export const Select = ({
  id,
  name,
  value,
  onChange,
  onBlur,
  label,
  placeholder = '선택해주세요',
  disabled = false,
  required = false,
  options,
  error,
  touched,
  wrapperCss,
  labelCss,
  selectCss,
  errorCss,
}: SelectProps) => {
  const selectId = id || `select-${name || 'default'}`;
  const hasError = error && touched;
  const describedBy = hasError ? `${selectId}-error` : undefined;

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(event.target.value);
  };

  return (
    <div css={wrapperCss}>
      {label && (
        <label htmlFor={selectId} css={labelCss}>
          {label}
          {required && <span aria-label="필수"> *</span>}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value || ''}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        aria-invalid={hasError ? 'true' : 'false'}
        aria-describedby={describedBy}
        css={selectCss}
      >
        <option value="">{placeholder}</option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>

      {hasError && (
        <span id={describedBy} role="alert" css={errorCss}>
          {error}
        </span>
      )}
    </div>
  );
};
