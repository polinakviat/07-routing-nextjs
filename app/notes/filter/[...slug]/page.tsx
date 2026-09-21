import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotesByTag } from '../../../../lib/api';
import NotesClient from '../../../notes/Notes.client';

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function FilteredNotesPage({ params }: PageProps) {
  const { slug } = await params;

  // Отримуємо тег з масиву slug (наприклад, /notes/filter/work -> slug = ['work'])
  const rawTag = slug?.[0] ?? '';
  const tag = decodeURIComponent(rawTag);

  const queryClient = new QueryClient();

  // Виконуємо prefetch за потрібним тегом
  await queryClient.prefetchQuery({
    queryKey: ['notes', 'filter', tag],
    queryFn: () => fetchNotesByTag(tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}