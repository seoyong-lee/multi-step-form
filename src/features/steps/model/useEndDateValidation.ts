import { useWatch, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

export const useEndDateValidation = () => {
  const { setError, clearErrors, formState } = useFormContext();
  const startDate = useWatch({ name: 'startDate' });
  const endDate = useWatch({ name: 'endDate' });
  const hasEndDateError = !!formState.errors.endDate;

  useEffect(() => {
    if (startDate && endDate) {
      const isInvalid = startDate > endDate;

      if (isInvalid && !hasEndDateError) {
        setError('endDate', {
          type: 'manual',
          message: '독서 종료일은 시작일보다 빠를 수 없습니다.',
        });
      } else if (!isInvalid && hasEndDateError && formState.errors.endDate?.type === 'manual') {
        clearErrors('endDate');
      }
    }
  }, [startDate, endDate, hasEndDateError, setError, clearErrors, formState.errors]);
};
