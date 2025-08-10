import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import { FORM_ROOT_KEY, stepKey } from '../consts/storage-keys';
import { usePersistentZodForm } from './usePersistentZodForm';
import { useStepNavigation } from './useStepNavigation';
import { createBookFormSchema } from '@/features/steps/lib/schema';
import { defaultValues } from '../consts/form-default-values';
import { BookFormInput } from '@/features/steps';

export const useBookForm = (step: number) => {
  const { goToNextStep } = useStepNavigation();
  const router = useRouter();
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

  // 마지막 스텝 저장
  const handleSave = async () => {
    const fields = stepFields[step];
    const ok = await methods.trigger(fields);
    if (ok) {
      // TODO: 폼 데이터 저장 (여기에 실제 저장 로직 추가)
      console.log('폼 데이터 저장:', methods.getValues());

      // 저장 후 성공 페이지로 이동
      router.push('/success');
    }
  };

  return { ...methods, handleNextStep, handleSave };
};
