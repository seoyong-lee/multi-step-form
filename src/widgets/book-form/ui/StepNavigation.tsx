import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { INITIAL_STEP, TOTAL_STEP } from '@/features/steps/consts/step-list';

export const StepNavigation = ({ step }: { step: number }) => {
  const router = useRouter();

  const goToStep = (nextStep: number) => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, step: nextStep },
    });
  };

  return (
    <div css={containerStyles}>
      {step > INITIAL_STEP && (
        <button css={buttonStyles} onClick={() => goToStep(step - 1)}>
          이전
        </button>
      )}
      {step < TOTAL_STEP && (
        <button css={buttonStyles} onClick={() => goToStep(step + 1)}>
          다음
        </button>
      )}
    </div>
  );
};

const containerStyles = css`
  display: flex;
  gap: 16px;
  margin-top: 32px;
`;

const buttonStyles = css`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #676767;
  color: white;
`;
