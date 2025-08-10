// schema.ts
import { z } from 'zod';
import { parseISO, isBefore, isAfter } from 'date-fns';
import { BookStatus } from '@/entities/book';
import {
  isoDateStringOptional,
  fieldError,
  emptyToUndefinedOptional,
} from '@/shared/lib/zodHelpers';

// Base fields
const titleSchema = z
  .string()
  .trim()
  .min(1, { message: '제목을 입력해주세요.' })
  .max(100, { message: '제목은 100자 이하여야 합니다.' });

const readingStatusSchema = z.union(
  [
    z.literal(BookStatus.WANT_TO_READ),
    z.literal(BookStatus.READING),
    z.literal(BookStatus.READ),
    z.literal(BookStatus.PENDING),
  ],
  { message: '독서 상태를 선택해주세요.' },
);

const ratingSchema = z
  .number({ message: '별점을 입력해주세요.' })
  .min(0, '별점은 0점 이상이어야 합니다.')
  .max(5, '별점은 5점 이하여야 합니다.')
  .refine(
    n => Math.abs(n * 2 - Math.round(n * 2)) < Number.EPSILON,
    '별점은 0.5점 단위로 입력해주세요.',
  );

const reviewSchema = emptyToUndefinedOptional(z.string().trim()).optional();

const quotesSchema = emptyToUndefinedOptional(z.string().trim()).optional();

const isPublicSchema = z.boolean().optional();

// Main schema
export const createBookFormSchema = (step?: number) =>
  z
    .object({
      title: titleSchema,
      readingStatus: readingStatusSchema,
      readingStartDate: isoDateStringOptional,
      readingEndDate: isoDateStringOptional,
      publicationDate: isoDateStringOptional,
      rating: ratingSchema,
      review: reviewSchema,
      quotes: quotesSchema,
      isPublic: isPublicSchema,
    })
    .superRefine((data, ctx) => {
      const err = fieldError(ctx);

      const start = data.readingStartDate ? parseISO(data.readingStartDate) : undefined;
      const end = data.readingEndDate ? parseISO(data.readingEndDate) : undefined;
      const publication = data.publicationDate ? parseISO(data.publicationDate) : undefined;

      // 시작일 vs 출판일
      if (start && publication && isBefore(start, publication)) {
        err(['readingStartDate'], '독서 시작일은 출판일 이후여야 합니다.');
      }

      // 시작일 vs 종료일
      if (start && end && isAfter(start, end)) {
        err(['readingEndDate'], '독서 종료일은 시작일보다 빠를 수 없습니다.');
      }

      // 극단 평점 시 리뷰 100자: "리뷰 단계(3) 이후"에만
      const enforceReview = step === undefined ? true : step >= 3;
      if (enforceReview && (data.rating === 1 || data.rating === 5)) {
        const len = data.review?.trim().length ?? 0;
        if (len < 100) {
          err(
            ['review'],
            '별점이 1점 또는 5점인 경우, 의견을 뒷받침하기 위해 최소 100자 이상의 독후감을 작성해주세요.',
          );
        }
      }
    });

// 스키마 타입
export type BookFormInput = z.input<ReturnType<typeof createBookFormSchema>>;
export type BookFormOutput = z.output<ReturnType<typeof createBookFormSchema>>;
