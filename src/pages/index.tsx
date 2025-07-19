import { BookForm } from '@/widgets/book-form';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Multi Step Form</title>
        <meta name="description" content="MultiStep Form" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BookForm />
    </>
  );
}
