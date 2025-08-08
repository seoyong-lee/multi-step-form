import { useRouter } from 'next/router';
import { useCallback } from 'react';

interface UseStepNavigationOptions {
  basePath?: string;
  stepParamName?: string;
}

export function useStepNavigation({
  basePath,
  stepParamName = 'step',
}: UseStepNavigationOptions = {}) {
  const router = useRouter();

  const currentStep = Number(router.query[stepParamName]) || 1;

  const goToStep = useCallback(
    (step: number) => {
      const path = basePath || router.pathname;
      router.push({
        pathname: path,
        query: { ...router.query, [stepParamName]: step },
      });
    },
    [router, basePath, stepParamName],
  );

  const goToNextStep = useCallback(() => {
    goToStep(currentStep + 1);
  }, [goToStep, currentStep]);

  const goToPrevStep = useCallback(() => {
    if (currentStep > 1) {
      goToStep(currentStep - 1);
    }
  }, [goToStep, currentStep]);

  const goToFirstStep = useCallback(() => {
    goToStep(1);
  }, [goToStep]);

  return {
    currentStep,
    goToStep,
    goToNextStep,
    goToPrevStep,
    goToFirstStep,
  };
}
