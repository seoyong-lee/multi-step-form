import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import type { BookFormData } from '@/entities/book';
import { formOptions } from '../consts/form-options';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const getStepStorageKey = (step: number) => `step-data-${step}`;

export const useBookForm = (step: number) => {
  const router = useRouter();
  const storageKey = getStepStorageKey(step);

  const methods = useForm<BookFormData>({
    ...formOptions,
    defaultValues: formOptions.defaultValues,
  });

  // localStorage 값으로 reset
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        methods.reset(JSON.parse(stored));
      }
    }
  }, [methods, storageKey]);

  useEffect(() => {
    const subscription = methods.watch(values => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, storageKey]);

  // 다음 스텝 이동 함수
  const goToNextStep = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, step: step + 1 },
    });
  };

  const handleNextStep: SubmitHandler<BookFormData> = async data => {
    console.log(data);
    const isValid = await methods.trigger();
    if (isValid) {
      goToNextStep();
    }
  };

  return {
    ...methods,
    handleNextStep,
  };
};
