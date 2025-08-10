import { z } from 'zod';
import { parseISO, isBefore, isAfter } from 'date-fns';
import { BookStatus } from '@/entities/book';
import {
  isoDateStringOptional,
  fieldError,
  emptyToUndefinedOptional,
} from '@/shared/lib/zodHelpers';
import { M } from '../consts/messages';

// 필드 스키마
const titleSchema = z
  .string()
  .trim()
  .min(1, { message: M.title_required })
  .max(100, { message: M.title_max });

const readingStatusSchema = z.union(
  [
    z.literal(BookStatus.WANT_TO_READ),
    z.literal(BookStatus.READING),
    z.literal(BookStatus.READ),
    z.literal(BookStatus.PENDING),
  ],
  { message: M.status_required },
);

// RHF에서 숫자 캐스팅을 하고 오므로 number 가정(별점은 필수)
const ratingSchema = z
  .number({ message: M.rating_required })
  .min(0, M.rating_min)
  .max(5, M.rating_max)
  .refine(n => Math.abs(n * 2 - Math.round(n * 2)) < Number.EPSILON, M.rating_step);

// 리뷰는 선택(빈 문자열 허용)
const reviewSchema = emptyToUndefinedOptional(z.string().trim()).optional();

// 날짜 필드(키 자체 optional)
const readingStartDateSchema = isoDateStringOptional.optional();
const readingEndDateSchema = isoDateStringOptional.optional();
const publicationDateSchema = isoDateStringOptional.optional();

// 전체 페이지 수: 입력은 문자열일 수 있으므로 empty→undefined 허용, 최소 1자(“입력됨” 보장)
const totalPagesSchema = emptyToUndefinedOptional(
  z.string().trim().min(1, { message: M.total_pages_required }),
).optional();

// 인용구 아이템(페이지는 숫자 또는 undefined로 RHF에서 정규화되어 온다고 가정)
const quoteItemSchema = z.object({
  text: z.string().trim().min(1, { message: M.quote_text_required }),
  page: z.number().min(1, { message: M.page_min1 }).optional(),
});
const quotesSchema = z.array(quoteItemSchema).optional();

// 공개 여부(폼 입력은 string 'true' | 'false' | undefined)
const isPublicSchema = z
  .string()
  .refine(v => v === 'true' || v === 'false', { message: M.is_public_required })
  .optional();

// 교차 검증 유틸
type Data = {
  readingStartDate?: string;
  readingEndDate?: string;
  publicationDate?: string;
  rating: number;
  review?: string;
  quotes?: { page?: number }[];
  totalPages?: string; // 주의: 문자열(입력 원형 유지)
};

const parse = (s?: string) => (s ? parseISO(s) : undefined);

const checkStartAfterPublication = (data: Data, add: ReturnType<typeof fieldError>) => {
  const start = parse(data.readingStartDate);
  const pub = parse(data.publicationDate);
  if (start && pub && isBefore(start, pub)) {
    add(['readingStartDate'], M.start_after_pub);
  }
};

const checkEndAfterStart = (data: Data, add: ReturnType<typeof fieldError>) => {
  const start = parse(data.readingStartDate);
  const end = parse(data.readingEndDate);
  if (start && end && isAfter(start, end)) {
    add(['readingEndDate'], M.end_after_start);
  }
};

const checkReviewMinLengthIfExtremeRating =
  (step: number | undefined) => (data: Data, add: ReturnType<typeof fieldError>) => {
    const enforce = step === undefined ? true : step >= 3;
    if (!enforce) return;
    if (data.rating === 1 || data.rating === 5) {
      const len = data.review?.trim().length ?? 0;
      if (len < 100) add(['review'], M.review_min100);
    }
  };

const checkQuotePagesRequiredIfMultiple = (data: Data, add: ReturnType<typeof fieldError>) => {
  if (!data.quotes || data.quotes.length < 2) return;
  data.quotes.forEach((q, i) => {
    if (q.page === undefined) add(['quotes', i, 'page'], M.quotes_page_required);
  });
};

const checkQuotePagesWithinTotal = (data: Data, add: ReturnType<typeof fieldError>) => {
  if (!data.totalPages || !data.quotes) return;
  const limit = Number(data.totalPages);
  if (!Number.isFinite(limit)) return;
  data.quotes.forEach((q, i) => {
    if (q.page !== undefined && q.page > limit) {
      add(['quotes', i, 'page'], M.quotes_page_lte_total(limit.toString()));
    }
  });
};

// 메인 스키마 (팩토리)
export const createBookFormSchema = (step?: number) =>
  z
    .object({
      title: titleSchema,
      readingStatus: readingStatusSchema,
      readingStartDate: readingStartDateSchema,
      readingEndDate: readingEndDateSchema,
      publicationDate: publicationDateSchema,
      rating: ratingSchema,
      review: reviewSchema,
      totalPages: totalPagesSchema,
      quotes: quotesSchema,
      isPublic: isPublicSchema,
    })
    .superRefine((data, ctx) => {
      const add = fieldError(ctx);

      // 교차 규칙들을 한 곳에 모아 순서대로 실행
      const checks = [
        checkStartAfterPublication,
        checkEndAfterStart,
        checkReviewMinLengthIfExtremeRating(step),
        checkQuotePagesRequiredIfMultiple,
        checkQuotePagesWithinTotal,
      ] as const;

      checks.forEach(fn => fn(data as Data, add));
    });
