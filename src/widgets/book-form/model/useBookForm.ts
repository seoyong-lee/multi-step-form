import { zodResolver } from '@hookform/resolvers/zod';

import { FORM_ROOT_KEY, stepKey } from '../consts/storage-keys';
import { usePersistentZodForm } from './usePersistentZodForm';
import { useStepNavigation } from './useStepNavigation';
import { BookFormInput, createBookFormSchema } from '@/features/steps/lib/schema';
import { defaultValues } from '../consts/form-default-values';

export const useBookForm = (step: number) => {
  const { goToNextStep } = useStepNavigation();
  const schema = createBookFormSchema(step);

  // useBookForm.ts
  const stepFields: Record<number, (keyof BookFormInput)[]> = {
    1: ['title', 'publicationDate', 'readingStatus', 'readingStartDate', 'readingEndDate'],
    2: ['rating'],
    3: ['review'],
    4: ['quotes'],
    5: ['isPublic'],
  };

  const methods = usePersistentZodForm<BookFormInput>({
    defaultValues,
    storageRootKey: FORM_ROOT_KEY,
    storageStepKey: stepKey(step),
    mode: 'onChange',
    resolver: zodResolver(schema),
  });

  // 다음 스텝 이동
  const handleNextStep = async () => {
    const fields = stepFields[step];
    const ok = await methods.trigger(fields);
    if (ok) goToNextStep();
  };

  return { ...methods, handleNextStep };
};
