import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNoteById } from '../../../lib/api';
import NotePreviewClient from './NotePreview.client';

interface NotePreviewProps {
  params: Promise<{ id: string }>;
}

export default async function NotePreview({ params }: NotePreviewProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  // Заздалегідь виконуємо prefetch даних нотатки на сервері
  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotePreviewClient id={id} />
    </HydrationBoundary>
  );
}