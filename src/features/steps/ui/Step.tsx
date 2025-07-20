import { toPascalCase } from '@/shared/lib/toPascalCase';
import { stepList } from '../consts/step-list';

export const Step = stepList.reduce(
  (acc, step) => {
    const pascalKey = toPascalCase(step.key); // 'basicInfo' -> 'BasicInfo'
    acc[pascalKey] = step.component;
    return acc;
  },
  {} as Record<string, React.ComponentType>,
);
