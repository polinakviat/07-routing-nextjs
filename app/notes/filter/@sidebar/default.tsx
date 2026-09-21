'use client';

import Link from 'next/link';
import { TagLink } from '../../../../components/TagLink/TagLink'
import { usePathname } from 'next/navigation';
import css from './SidebarNotes.module.css';


const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];

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
                <TagLink href={`/notes/filter/${encodeURIComponent(tag)}`}>
                #{tag}
              </TagLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}