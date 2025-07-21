import { BookFormLayout } from './BookFormLayout';
import { StepNavigation } from './StepNavigation';
import { useBookForm } from '../model/useBookForm';
import { useRouter } from 'next/router';
import { StepProvider } from './StepContext';
import { SwitchCase } from '@/shared/ui/switch-case';
import { Step } from '@/features/steps';
import { INITIAL_STEP } from '@/features/steps/consts/step-list';

export const BookForm = () => {
  const methods = useBookForm();
  const router = useRouter();
  const step = Number(router.query.step ?? INITIAL_STEP);

  return (
    <StepProvider>
      <methods.FormProvider {...methods}>
        <BookFormLayout>
          <BookFormLayout.Content>
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
          </BookFormLayout.Content>
          <BookFormLayout.Sidebar />
        </BookFormLayout>
      </methods.FormProvider>
    </StepProvider>
  );
};
