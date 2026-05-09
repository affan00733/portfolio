import { useEffect, useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { profile } from '../data';
import styles from './styles/ResumeFab.module.css';

export default function ResumeFab() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapRef}
      className={`${styles.fab} ${open ? styles.fabOpen : ''}`}
    >
      <button
        type="button"
        className={styles.btn}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        data-cursor
        data-cursor-label="résumé"
      >
        <FiDownload aria-hidden />
        <span>Résumé</span>
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          <a
            href={profile.resumePath}
            target="_blank"
            rel="noreferrer"
            className={styles.menuItem}
            role="menuitem"
            data-cursor
            onClick={() => setOpen(false)}
          >
            Résumé · 1 page
          </a>
          <a
            href={profile.cvPath}
            target="_blank"
            rel="noreferrer"
            className={styles.menuItem}
            role="menuitem"
            data-cursor
            onClick={() => setOpen(false)}
          >
            Full CV
          </a>
        </div>
      )}
    </div>
  );
}
