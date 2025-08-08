import { useForm, UseFormReturn, FieldValues, UseFormProps, DefaultValues } from 'react-hook-form';
import { useEffect } from 'react';

interface UsePersistentFormOptions<T extends FieldValues> {
  storageKey: string;
  defaultValues: DefaultValues<T>;
  mode?: UseFormProps<T>['mode'];
  reValidateMode?: UseFormProps<T>['reValidateMode'];
  criteriaMode?: UseFormProps<T>['criteriaMode'];
  shouldFocusError?: UseFormProps<T>['shouldFocusError'];
  shouldUnregister?: UseFormProps<T>['shouldUnregister'];
  shouldUseNativeValidation?: UseFormProps<T>['shouldUseNativeValidation'];
}

export function usePersistentForm<T extends FieldValues>({
  storageKey,
  defaultValues,
  ...formOptions
}: UsePersistentFormOptions<T>): UseFormReturn<T> {
  const methods = useForm<T>({
    ...formOptions,
    defaultValues,
  });

  // localStorage에서 데이터 복원
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const parsedData = JSON.parse(stored);
          methods.reset(parsedData);
        } catch (error) {
          console.warn('Failed to parse stored form data:', error);
          // 파싱 실패 시 기본값 사용
          methods.reset(defaultValues);
        }
      }
    }
  }, [methods, storageKey, defaultValues]);

  // 폼 데이터 변경 시 localStorage에 저장
  useEffect(() => {
    const subscription = methods.watch(values => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(storageKey, JSON.stringify(values));
      }
    });
    return () => subscription.unsubscribe();
  }, [methods, storageKey]);

  return methods;
}
