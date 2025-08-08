import { z } from 'zod';
import { BookStatus } from '@/entities/book';
import { parseISO, isValid, isAfter, isBefore } from 'date-fns';

// 기본 날짜 검증 함수 - date-fns 사용
const isValidDate = (dateString: string): boolean => {
  if (!dateString) return true; // 빈 값은 유효하다고 처리

  try {
    const date = parseISO(dateString);
    return isValid(date);
  } catch {
    return false;
  }
};

// 기본 스키마 정의
const baseSchema = z.object({
  title: z.string().min(1, '제목을 입력해주세요.').max(100, '제목은 100자 이하여야 합니다.'),

  author: z.string().max(50, '저자명은 50자 이하여야 합니다.').optional(),

  readingStatus: z
    .enum([BookStatus.WANT_TO_READ, BookStatus.READING, BookStatus.READ, BookStatus.PENDING])
    .refine((status: BookStatus) => status !== undefined, '독서 상태를 선택해주세요.'),

  readingStartDate: z
    .string()
    .refine((date: string) => !date || isValidDate(date), '올바른 날짜 형식이 아닙니다.')
    .optional(),

  readingEndDate: z
    .string()
    .refine((date: string) => !date || isValidDate(date), '올바른 날짜 형식이 아닙니다.')
    .optional(),

  publicationDate: z
    .string()
    .refine((date: string) => !date || isValidDate(date), '올바른 날짜 형식이 아닙니다.')
    .optional(),
});

// BookForm 스키마 정의
export const bookFormSchema = baseSchema
  .refine(
    data => {
      // 독서 시작일과 출판일 비교
      if (data.readingStartDate && data.publicationDate) {
        try {
          const startDate = parseISO(data.readingStartDate);
          const publicationDate = parseISO(data.publicationDate);
          return (
            isAfter(startDate, publicationDate) || startDate.getTime() === publicationDate.getTime()
          );
        } catch {
          return false;
        }
      }
      return true;
    },
    {
      message: '독서 시작일은 출판일 이후여야 합니다.',
      path: ['readingStartDate'],
    },
  )
  .refine(
    data => {
      // 독서 시작일과 종료일 비교
      if (data.readingStartDate && data.readingEndDate) {
        try {
          const startDate = parseISO(data.readingStartDate);
          const endDate = parseISO(data.readingEndDate);
          return isBefore(startDate, endDate) || startDate.getTime() === endDate.getTime();
        } catch {
          return false;
        }
      }
      return true;
    },
    {
      message: '독서 종료일은 시작일보다 빠를 수 없습니다.',
      path: ['readingEndDate'],
    },
  );

// 스키마에서 타입 추출
export type BookFormSchema = z.infer<typeof bookFormSchema>;

// 검증 함수
export function validateWithZod(
  data: unknown,
): { success: true; data: BookFormSchema } | { success: false; errors: Record<string, string> } {
  const result = bookFormSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  // Zod 에러를 Record 형태로 변환
  const errors: Record<string, string> = {};
  result.error.issues.forEach((error: z.ZodIssue) => {
    const field = error.path.join('.');
    errors[field] = error.message;
  });

  return { success: false, errors };
}
