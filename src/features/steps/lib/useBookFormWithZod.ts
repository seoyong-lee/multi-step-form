import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookFormSchema, BookFormSchema } from './schema';

export function useBookFormWithZod() {
  const form = useForm<BookFormSchema>({
    resolver: zodResolver(bookFormSchema),
    defaultValues: {
      title: '',
      author: '',
      readingStatus: undefined,
      readingStartDate: '',
      readingEndDate: '',
      publicationDate: '',
    },
    mode: 'onChange',
  });

  return form;
}
