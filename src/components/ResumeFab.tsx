import { useEffect, useRef, useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import { resumes } from '../data';
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
          <div className={styles.menuHint}>Pick the variant for your req:</div>
          {resumes.map((r) => (
            <a
              key={r.id}
              href={r.file}
              target="_blank"
              rel="noreferrer"
              className={styles.menuItem}
              role="menuitem"
              data-cursor
              onClick={() => setOpen(false)}
            >
              <span className={styles.menuLabel}>{r.label}</span>
              <span className={styles.menuDesc}>{r.description}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
