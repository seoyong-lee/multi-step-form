import { validateStartDate, validateEndDate } from './validation';

describe('validateStartDate', () => {
  it('should return true when start date is after publication date', () => {
    const result = validateStartDate('2024-01-15', '2024-01-10');
    expect(result).toBe(true);
  });

  it('should return error when start date is before publication date', () => {
    const result = validateStartDate('2024-01-05', '2024-01-10');
    expect(result).toBe('독서 시작일은 출판일 이후여야 합니다.');
  });

  it('should return error when start date is invalid', () => {
    const result = validateStartDate('invalid-date', '2024-01-10');
    expect(result).toBe('올바른 시작일을 입력해주세요.');
  });

  it('should return true when publication date is not provided', () => {
    const result = validateStartDate('2024-01-15');
    expect(result).toBe(true);
  });

  it('should return true when both dates are the same', () => {
    const result = validateStartDate('2024-01-10', '2024-01-10');
    expect(result).toBe(true);
  });
});

describe('validateEndDate', () => {
  it('should return true when end date is after start date', () => {
    const result = validateEndDate('2024-01-20', '2024-01-15');
    expect(result).toBe(true);
  });

  it('should return error when end date is before start date', () => {
    const result = validateEndDate('2024-01-10', '2024-01-15');
    expect(result).toBe('독서 종료일은 시작일보다 빠를 수 없습니다.');
  });

  it('should return error when end date is invalid', () => {
    const result = validateEndDate('invalid-date', '2024-01-15');
    expect(result).toBe('올바른 종료일을 입력해주세요.');
  });

  it('should return true when start date is not provided', () => {
    const result = validateEndDate('2024-01-20');
    expect(result).toBe(true);
  });

  it('should return true when both dates are the same', () => {
    const result = validateEndDate('2024-01-15', '2024-01-15');
    expect(result).toBe(true);
  });
});
