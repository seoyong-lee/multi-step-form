import { SubmitHandler } from 'react-hook-form';
import type { BookFormData } from '@/entities/book';
import { formOptions } from '../consts/form-options';
import { formDefaultValues } from '../consts/form-default-values';
import { usePersistentForm } from './usePersistentForm';
import { useStepNavigation } from './useStepNavigation';

const getStepStorageKey = (step: number) => `book-form-step-${step}`;

export const useBookForm = (step: number) => {
  const storageKey = getStepStorageKey(step);
  const { goToNextStep } = useStepNavigation();

  // formOptions에서 defaultValues를 제외한 옵션들만 사용
  const { defaultValues, ...otherOptions } = formOptions;

  const methods = usePersistentForm<BookFormData>({
    storageKey,
    defaultValues: formDefaultValues,
    ...otherOptions,
  });

  const handleNextStep: SubmitHandler<BookFormData> = async () => {
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
