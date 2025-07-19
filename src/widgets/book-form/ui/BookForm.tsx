import { BookFormLayout } from './BookFormLayout';
import { StepNavigation } from './StepNavigation';
import { useBookForm } from '../model/useBookForm';
import { useRouter } from 'next/router';
import { Step } from '@/features/steps';
import { StepProvider } from './StepContext';

export const BookForm = () => {
  const methods = useBookForm();
  const router = useRouter();
  const step = Number(router.query.step ?? 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step.BasicInfo />;
      case 2:
        return <Step.Rating />;
      case 3:
        return <Step.Review />;
      case 4:
        return <Step.Quotes />;
      case 5:
        return <Step.Publish />;
      default:
        return <Step.BasicInfo />;
    }
  };
  return (
    <StepProvider>
      <methods.FormProvider {...methods}>
        <BookFormLayout stepContent={renderStep()} navigation={<StepNavigation step={step} />} />
      </methods.FormProvider>
    </StepProvider>
  );
};
