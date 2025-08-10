// usePersistentZodForm.ts
import { useEffect, useRef } from 'react';
import { useForm, type UseFormProps, type UseFormReturn, type FieldValues } from 'react-hook-form';

type Options<TInput extends FieldValues> = {
  defaultValues: UseFormProps<TInput>['defaultValues'];
  storageRootKey: string;
  storageStepKey: string;
  // ← resolver를 허용 (RHF의 타입 그대로)
  resolver?: UseFormProps<TInput>['resolver'];
} & Omit<
  UseFormProps<TInput>,
  'defaultValues' // defaultValues는 위에서 직접 받음
>;

export function usePersistentZodForm<TInput extends FieldValues>({
  defaultValues,
  storageRootKey,
  storageStepKey,
  ...formOptions
}: Options<TInput>): UseFormReturn<TInput> {
  const methods = useForm<TInput>({
    ...formOptions,
    defaultValues,
  });

  // 1) 최초 로드: root → step 순으로 병합해서 reset
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const read = (k: string) => {
      try {
        const raw = localStorage.getItem(k);
        return raw ? JSON.parse(raw) : undefined;
      } catch {
        return undefined;
      }
    };

    const root = read(storageRootKey) ?? {};
    const step = read(storageStepKey) ?? {};
    const merged = { ...(defaultValues as object), ...root, ...step };

    methods.reset(merged as TInput, { keepDefaultValues: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageRootKey, storageStepKey]);

  // 2) 변경 시 저장: root(누적 머지) + step(해당 스텝 스냅샷)
  const saving = useRef<number | null>(null);
  useEffect(() => {
    const sub = methods.watch(values => {
      if (typeof window === 'undefined') return;

      // 간단 디바운스
      if (saving.current) cancelAnimationFrame(saving.current);
      saving.current = requestAnimationFrame(() => {
        try {
          // root: 기존 root와 병합 저장
          const prevRoot = JSON.parse(localStorage.getItem(storageRootKey) || '{}');
          const nextRoot = { ...prevRoot, ...values };
          localStorage.setItem(storageRootKey, JSON.stringify(nextRoot));

          // step: 해당 스텝 스냅샷
          localStorage.setItem(storageStepKey, JSON.stringify(values));
        } catch {
          // noop
        }
      });
    });
    return () => {
      if (saving.current) cancelAnimationFrame(saving.current);
      sub.unsubscribe();
    };
  }, [methods, storageRootKey, storageStepKey]);

  return methods;
}
