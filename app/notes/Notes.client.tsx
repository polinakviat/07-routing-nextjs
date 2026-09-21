'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotesByTag } from '../../lib/api';

interface NotesClientProps {
  tag: string;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['notes', 'filter', tag],
    queryFn: () => fetchNotesByTag(tag),
    enabled: Boolean(tag),
  });

  if (isLoading) {
    return <div>Завантаження нотаток...</div>;
  }

  if (isError) {
    return <div>Помилка завантаження: {(error as Error).message}</div>;
  }

  return (
    <div>
      <h1>Нотатки за тегом: #{tag}</h1>

      {notes && notes.length > 0 ? (
        <ul>
          {notes.map((note) => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Нотаток з цим тегом не знайдено.</p>
      )}
    </div>
  );
}