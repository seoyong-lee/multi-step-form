import { createContext, useContext, useState } from 'react';
import { formDefaultValues } from '../consts/form-default-values';
import { StepData } from '../types/step-data';

type StepContextType = {
  stepData: StepData;
  setStepData: (data: StepData) => void;
};

const StepContext = createContext<StepContextType | null>(null);

export const useStepContext = () => {
  const ctx = useContext(StepContext);
  if (!ctx) throw new Error('useStepContext must be used within StepProvider');
  return ctx;
};

// Step Context 관리 - 브라우저 저장소에 저장
export const StepProvider = ({ children }: { children: React.ReactNode }) => {
  const [stepData, setStepDataState] = useState<StepData>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('step-data');
      return stored ? JSON.parse(stored) : formDefaultValues;
    }
    return formDefaultValues;
  });

  const setStepData = (data: StepData) => {
    setStepDataState(data);
    localStorage.setItem('step-data', JSON.stringify(data));
  };

  return <StepContext.Provider value={{ stepData, setStepData }}>{children}</StepContext.Provider>;
};
