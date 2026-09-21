import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from '@tanstack/react-query';
import { fetchNotes } from '../../../../lib/api';
import NotesPageClient from './NotesPage.client';

interface FilterPageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateMetadata({ params }: FilterPageProps) {
  const { slug } = await params;
  const rawTag = slug?.[0];
  const tagTitle = rawTag && rawTag !== 'all' ? decodeURIComponent(rawTag) : 'All';

  return {
    title: `${tagTitle} Notes | NoteHub`,
    description: `Filtered notes by category: ${tagTitle}`,
  };
}

export default async function NotesFilterPage({ params }: FilterPageProps) {
  const { slug } = await params;
  const rawTag = slug?.[0];

  // Якщо параметр 'all' або відсутній, tag = undefined (щоб не надсилати tag на бекенд)
  const tag = rawTag && rawTag !== 'all' ? decodeURIComponent(rawTag) : undefined;

  const queryClient = new QueryClient();

  // Prefetch першої сторінки нотаток з урахуванням фільтра за тегом
  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => fetchNotes(1, 12, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesPageClient tag={tag} />
    </HydrationBoundary>
  );
}