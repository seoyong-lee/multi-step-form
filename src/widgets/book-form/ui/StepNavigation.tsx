import { css } from '@emotion/react';
import { INITIAL_STEP, TOTAL_STEP } from '@/features/steps/consts/step-list';
import { useStepNavigation } from '../model/useStepNavigation';
import { useBookForm } from '../model/useBookForm';

export const StepNavigation = ({ step }: { step: number }) => {
  const { goToPrevStep } = useStepNavigation();
  const { handleSave } = useBookForm(step);

  return (
    <div css={containerStyles}>
      <div css={buttonContainerStyles}>
        {step > INITIAL_STEP && (
          <button css={buttonStyles} type="button" onClick={goToPrevStep}>
            이전
          </button>
        )}
        {step < TOTAL_STEP ? (
          <button css={buttonStyles} type="submit">
            다음
          </button>
        ) : (
          <button css={saveButtonStyles} type="button" onClick={handleSave}>
            저장
          </button>
        )}
      </div>
    </div>
  );
};

const containerStyles = css`
  display: flex;
  justify-content: center;
  padding: 24px;
  gap: 16px;
  margin-top: 32px;
`;

const buttonContainerStyles = css`
  display: flex;
  justify-content: flex-end;
  max-width: 600px;
  width: 100%;
  gap: 16px;
`;

const buttonStyles = css`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #676767;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const saveButtonStyles = css`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #28a745;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;
