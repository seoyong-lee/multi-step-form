import { useWatch, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';

export const useStartDateValidation = () => {
  const { setError, clearErrors, formState } = useFormContext();
  const publicationDate = useWatch({ name: 'publicationDate' });
  const startDate = useWatch({ name: 'startDate' });
  const hasStartDateError = !!formState.errors.startDate;

  useEffect(() => {
    if (publicationDate && startDate) {
      const isInvalid = startDate < publicationDate;

      if (isInvalid && !hasStartDateError) {
        setError('startDate', {
          type: 'manual',
          message: '독서 시작일은 출판일 이후여야 합니다.',
        });
      } else if (!isInvalid && hasStartDateError && formState.errors.startDate?.type === 'manual') {
        clearErrors('startDate');
      }
    }
  }, [publicationDate, startDate, hasStartDateError, setError, clearErrors, formState.errors]);
};
