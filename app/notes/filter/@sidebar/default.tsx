const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


interface SidebarProps {
  tags?: string[];
}

export default function Sidebar({ tags = ['Work', 'Todo', 'Personal'] }: SidebarProps) {
  const pathname = usePathname();

  // Список усіх тегів із додаванням системного тегу 'all'
  const allTags = ['all', ...tags];

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './SidebarNotes.module.css';

export default function SidebarDefault() {
  const pathname = usePathname();

  return (
    <aside className={css.sidebar}>
      <h3 className={css.title}>Categories</h3>
      <nav className={css.nav}>
        <ul className={css.tagList}>
          <li className={css.tagItem}>
            <Link
              href="/notes/filter/all"
              className={`${css.tagLink} ${
                pathname === '/notes/filter/all' || pathname === '/notes/filter'
                  ? css.active
                  : ''
              }`}
            >
              All notes
            </Link>
          </li>
          {tags.map((tag) => {
            const href = `/notes/filter/${encodeURIComponent(tag)}`;
            const isActive = pathname === href;

            return (
              <li key={tag} className={css.tagItem}>
                <Link
                  href={href}
                  className={`${css.tagLink} ${isActive ? css.active : ''}`}
                >
                  #{tag}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}