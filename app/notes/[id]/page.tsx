import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NoteDetailsClient from './NoteDetails.client';

interface NotePageProps {
  params: Promise<{ id: string }>;
}

// Динамічна генерація metadata для SEO та заголовків вкладки
export async function generateMetadata({ params }: NotePageProps) {
  const { id } = await params;
  try {
    const note = await fetchNoteById(id);
    return {
      title: `${note.title} | NoteHub`,
      description: note.content.slice(0, 160),
    };
  } catch {
    return {
      title: 'Note Details | NoteHub',
      description: 'View note details',
    };
  }
}

export default async function NoteDetailsPage({ params }: NotePageProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Prefetch даних для SSR гідратації
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}