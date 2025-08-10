import { useFormContext, Controller } from 'react-hook-form';
import { Select, SelectProps, SelectOption } from '../select/Select';

interface RHFSelectProps
  extends Omit<SelectProps, 'value' | 'onChange' | 'onBlur' | 'error' | 'touched'> {
  name: string;
  options: SelectOption[];
}

export const RHFSelect = ({
  name,
  label,
  required,
  options,
  placeholder,
  disabled,
  wrapperCss,
  labelCss,
  selectCss,
  errorCss,
  ...restProps
}: RHFSelectProps) => {
  const {
    control,
    formState: { errors, touchedFields },
  } = useFormContext();

  const error = errors[name];
  const touched = touchedFields[name] || !!error;
  const validationRules = required
    ? {
        required: {
          value: true,
          message: `${label}은 필수 선택 항목입니다.`,
        },
      }
    : {};

  return (
    <Controller
      name={name}
      control={control}
      rules={validationRules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Select
          {...restProps}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          label={label}
          required={required}
          options={options}
          placeholder={placeholder}
          disabled={disabled}
          error={error?.message?.toString()}
          touched={touched}
          wrapperCss={wrapperCss}
          labelCss={labelCss}
          selectCss={selectCss}
          errorCss={errorCss}
        />
      )}
    />
  );
};
