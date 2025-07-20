import { StepBasicInfo } from '../ui/StepBasicInfo';
import { StepRating } from '../ui/StepRating';
import { StepReview } from '../ui/StepReview';
import { StepQuotes } from '../ui/StepQuotes';
import { StepPublish } from '../ui/StepPublish';

export const stepList = [
  { key: 'basicInfo', label: '기본 정보', component: StepBasicInfo },
  { key: 'rating', label: '추천/별점', component: StepRating },
  { key: 'review', label: '독후감', component: StepReview },
  { key: 'quotes', label: '인용구', component: StepQuotes },
  { key: 'publish', label: '공개 설정', component: StepPublish },
] as const;

export const INITIAL_STEP = 1;
export const TOTAL_STEP = stepList.length;
