import Link from 'next/link';

export const metadata = {
  title: '404 - Page Not Found | NoteHub',
  description: 'Sorry, the page you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main>
      <h1>404 - Page not found</h1>
      <p>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link href="/">
        Return to Home
      </Link>
    </main>
  );
}