import { BookStatus } from '@/entities/book';
import { BookFormInput } from '@/features/steps';

export const defaultValues: BookFormInput = {
  title: '',
  readingStatus: undefined as unknown as BookStatus,
  readingStartDate: '',
  readingEndDate: '',
  publicationDate: '',
  rating: 3,
  review: '',
  totalPages: 0,
  quotes: [],
  isPublic: undefined,
};
