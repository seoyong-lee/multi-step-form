import { parseISO, isValid, isBefore } from 'date-fns';

// 날짜 문자열을 Date 객체로 변환하는 헬퍼 함수
function parseDate(dateString: string): Date | null {
  if (!dateString) return null;

  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch {
    return null;
  }
}

// 개선된 함수 시그니처 - date-fns 사용
export function validateStartDate(startDate: string, publicationDate?: string): string | true {
  const start = parseDate(startDate);
  const publication = publicationDate ? parseDate(publicationDate) : null;

  // 시작일이 유효하지 않은 경우
  if (!start) {
    return '올바른 시작일을 입력해주세요.';
  }

  // 출판일이 있고, 시작일이 출판일보다 이전인 경우
  if (publication && isBefore(start, publication)) {
    return '독서 시작일은 출판일 이후여야 합니다.';
  }

  return true;
}

export function validateEndDate(endDate: string, startDate?: string): string | true {
  const end = parseDate(endDate);
  const start = startDate ? parseDate(startDate) : null;

  // 종료일이 유효하지 않은 경우
  if (!end) {
    return '올바른 종료일을 입력해주세요.';
  }

  // 시작일이 있고, 종료일이 시작일보다 이전인 경우
  if (start && isBefore(end, start)) {
    return '독서 종료일은 시작일보다 빠를 수 없습니다.';
  }

  return true;
}

// 전체 폼 데이터를 받는 통합 검증 함수
export interface BookFormData {
  title?: string;
  author?: string;
  readingStatus?: string;
  readingStartDate?: string;
  readingEndDate?: string;
  publicationDate?: string;
}

export function validateBookForm(data: BookFormData): Record<string, string | true> {
  const errors: Record<string, string | true> = {};

  // 제목 검증
  if (!data.title?.trim()) {
    errors.title = '제목을 입력해주세요.';
  }

  // 독서 시작일 검증
  if (data.readingStartDate) {
    const startDateError = validateStartDate(data.readingStartDate, data.publicationDate);
    if (startDateError !== true) {
      errors.readingStartDate = startDateError;
    }
  }

  // 독서 종료일 검증
  if (data.readingEndDate) {
    const endDateError = validateEndDate(data.readingEndDate, data.readingStartDate);
    if (endDateError !== true) {
      errors.readingEndDate = endDateError;
    }
  }

  return errors;
}
