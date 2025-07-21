import { UseFormProps } from 'react-hook-form';
import type { BookFormData } from '@/entities/book';
import { formDefaultValues } from './form-default-values';

export const formOptions: UseFormProps<BookFormData> = {
  defaultValues: formDefaultValues,

  // 유효성 검사 모드
  mode: 'onChange', // 입력 시마다 유효성 검사 수행 (입력할 때마다 즉시 검증)
  reValidateMode: 'onChange', // 유효하지 않은 필드가 수정될 때마다 재검증

  // 에러 처리
  criteriaMode: 'all', // 하나의 필드에서 발생한 모든 유효성 에러를 함께 표시
  shouldFocusError: true, // 첫 번째 에러 필드에 자동 포커스

  // 필드 관리
  shouldUnregister: true, // 조건부 렌더링에서 숨겨진 필드 제거
  shouldUseNativeValidation: false, // HTML5 기본 검증 비활성화 (커스텀 UI 사용)

  // 리셋 옵션
  resetOptions: {
    keepDirtyValues: true, // 더티 값은 유지
    keepErrors: false, // 에러는 초기화
    keepTouched: false, // 터치 상태 초기화
    keepIsSubmitted: false, // 제출 상태 초기화
    keepSubmitCount: false, // 제출 횟수 초기화
  },
};
