import { ReactNode } from 'react';
import { StepBasicInfo } from './StepBasicInfo';
import { StepRating } from './StepRating';
import { StepReview } from './StepReview';
import { StepQuotes } from './StepQuotes';
import { StepPublish } from './StepPublish';

export const Step = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

Step.BasicInfo = StepBasicInfo;
Step.Rating = StepRating;
Step.Review = StepReview;
Step.Quotes = StepQuotes;
Step.Publish = StepPublish;
