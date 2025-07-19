import { useForm, FormProvider } from 'react-hook-form';
import { formDefaultValues } from '../consts/form-default-values';

export const useBookForm = () => {
  const methods = useForm({
    defaultValues: formDefaultValues,
    mode: 'onChange',
  });

  return {
    ...methods,
    FormProvider,
  };
};
