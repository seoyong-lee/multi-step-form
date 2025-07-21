import { BookFormLayout } from './BookFormLayout';
import { StepNavigation } from './StepNavigation';
import { useBookForm } from '../model/useBookForm';
import { useRouter } from 'next/router';
import { StepProvider } from './StepContext';
import { SwitchCase } from '@/shared/ui/switch-case';
import { Step } from '@/features/steps';
import { INITIAL_STEP } from '@/features/steps/consts/step-list';
import { FormProvider } from 'react-hook-form';

export const BookForm = () => {
  const router = useRouter();
  const step = Number(router.query.step ?? INITIAL_STEP);
  const methods = useBookForm(step);

  return (
    <StepProvider>
      <FormProvider {...methods}>
        <BookFormLayout>
          <BookFormLayout.Content>
            <form onSubmit={methods.handleSubmit(methods.handleNextStep)}>
              <SwitchCase
                value={step}
                caseBy={{
                  1: <Step.BasicInfo />,
                  2: <Step.Rating />,
                  3: <Step.Review />,
                  4: <Step.Quotes />,
                  5: <Step.Publish />,
                }}
                defaultComponent={<Step.BasicInfo />}
              />
              <StepNavigation step={step} />
            </form>
          </BookFormLayout.Content>
          <BookFormLayout.Sidebar />
        </BookFormLayout>
      </FormProvider>
    </StepProvider>
  );
};
