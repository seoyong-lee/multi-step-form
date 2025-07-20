import { useForm, FormProvider } from 'react-hook-form';
import type { BookFormData } from '@/entities/book';
import { formOptions } from '../consts/form-options';

export const useBookForm = () => {
  const methods = useForm<BookFormData>(formOptions);

  return {
    ...methods,
    FormProvider,
  };
};
