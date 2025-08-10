import z from 'zod';
import { createBookFormSchema } from '../lib/schema';

// (RHF 입력: input 타입 / 최종 저장: 필요 시 별도 Output 스키마에서 transform)
export type BookFormInput = z.input<ReturnType<typeof createBookFormSchema>>;
export type BookFormOutput = z.output<ReturnType<typeof createBookFormSchema>>;
