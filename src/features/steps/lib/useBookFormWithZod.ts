import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookFormSchema } from './schema';
import { BookStatus } from '@/entities/book';
import z from 'zod';

export type BookFormInput = z.input<typeof bookFormSchema>; // 입력 타입
export type BookFormOutput = z.output<typeof bookFormSchema>; // 출력 타입 (onSubmit로 나올 타입)

export function useBookFormWithZod() {
  const form = useForm<BookFormInput>({
    resolver: zodResolver(bookFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
      readingStatus: undefined as unknown as BookStatus, // 초기 미선택 상태
      readingStartDate: '',
      readingEndDate: '',
      publicationDate: '',
      rating: 0, // 기본값 필요 시 조정
      review: '',
    },
  });

  return form;
}
