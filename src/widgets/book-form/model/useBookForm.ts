import { useForm, FormProvider } from 'react-hook-form';
import type { BookFormData } from '@/entities/book';
import { formOptions } from '../consts/form-options';
import { useEffect } from 'react';

const STORAGE_KEY = 'step-data';

export const useBookForm = () => {
  const methods = useForm<BookFormData>({
    ...formOptions,
    defaultValues: formOptions.defaultValues,
  });

  // localStorage 값으로 reset
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        methods.reset(JSON.parse(stored));
      }
    }
  }, [methods]);

  useEffect(() => {
    const subscription = methods.watch(values => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return {
    ...methods,
    FormProvider,
  };
};
