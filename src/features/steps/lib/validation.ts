export function validateStartDate(startDate: string, getValues: (name: string) => string) {
  const publicationDate = getValues('publicationDate');
  if (publicationDate && startDate && startDate < publicationDate) {
    return '독서 시작일은 출판일 이후여야 합니다.';
  }
  return true;
}

export function validateEndDate(endDate: string, getValues: (name: string) => string) {
  const startDate = getValues('startDate');
  if (startDate && endDate && startDate > endDate) {
    return '독서 종료일은 시작일보다 빠를 수 없습니다.';
  }
  return true;
}
