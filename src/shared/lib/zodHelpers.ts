import { z } from 'zod';
import { parseISO, isValid } from 'date-fns';

// 빈 문자열은 undefined로 처리 (선택 입력 필드에 유용)

export const emptyToUndefined = <T extends z.ZodString>(schema: T) =>
  z
    .union([z.string(), z.undefined()])
    .transform(v => (typeof v === 'string' && v.trim() === '' ? undefined : v))
    .pipe(schema);

// "YYYY-MM-DD" 같은 ISO-ish 문자열만 허용
export const isoDateStringOptional = z
  .union([z.string(), z.undefined()])
  .transform(v => (typeof v === 'string' && v.trim() === '' ? undefined : v))
  .refine(
    v => {
      if (!v) return true;
      try {
        const d = parseISO(v);
        return isValid(d);
      } catch {
        return false;
      }
    },
    { message: '올바른 날짜 형식이 아닙니다.' },
  )
  .optional();

export const fieldError = (ctx: z.RefinementCtx) => (path: (string | number)[], message: string) =>
  ctx.addIssue({ code: 'custom', path, message });
