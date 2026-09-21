'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface TagLinkProps {
  href: string;
  children: React.ReactNode;
}

export function TagLink({ href, children }: TagLinkProps) {
  const pathname = usePathname();

  // Перевірка активного маршруту
  const isActive =
    pathname === href ||
    (href === '/notes/filter/all' && pathname === '/notes/filter');

  return (
    <Link
      href={href}
    >
      {children}
    </Link>
  );
}