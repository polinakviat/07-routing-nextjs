import Link from 'next/link';
import css from './SidebarNotes.module.css';
import { usePathname } from 'next/navigation';

const tags = ['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'];


interface SidebarProps {
  tags?: string[];
}

export default function Sidebar({ tags = ['Work', 'Todo', 'Personal'] }: SidebarProps) {
  const pathname = usePathname();

  // Список усіх тегів із додаванням системного тегу 'all'
  const allTags = ['all', ...tags];

  return (
    <aside className={css.sidebar}>
      <h3 className={css.title}>Tags</h3>
      <nav className={css.nav}>
        <ul className={css.tagList}>
          {allTags.map((tag) => {
            const href = `/notes/filter/${encodeURIComponent(tag)}`;
            
            const isActive =
              pathname === href ||
              (tag === 'all' && (pathname === '/notes/filter' || pathname === '/notes/filter/all'));

            return (
              <li key={tag} className={css.tagItem}>
                <Link
                  href={href}
                  className={`${css.tagLink} ${isActive ? css.active : ''}`}
                >
                  {tag === 'all' ? 'All notes' : `#${tag}`}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}