import { BookFormData, BookStatus } from '@/entities/book';

export const formDefaultValues: BookFormData = {
  title: '',
  publicationDate: '',
  status: BookStatus.WANT_TO_READ,
  startDate: '',
  endDate: '',
  rating: 0,
  review: '',
  quotes: [],
  isPublic: false,
};
