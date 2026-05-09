import { useEffect, useState } from 'react';
import { profile } from '../data';
import styles from './styles/Navbar.module.css';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'what-i-do', label: 'What I Do' },
  { id: 'tech', label: 'Tech' },
  { id: 'career', label: 'Career' },
  { id: 'publications', label: 'Publications' },
  { id: 'work', label: 'Work' },
  { id: 'awards', label: 'Awards' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavigate = (id: string) => {
    setOpen(false);
    if (id === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // scrollIntoView respects html { scroll-padding-top } for the navbar offset.
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header className={`${styles.nav} ${scrolled ? styles.navScrolled : ''}`}>
      <div className={styles.inner}>
        <button
          type="button"
          className={styles.brand}
          onClick={() => handleNavigate('landing')}
          data-cursor
          data-cursor-label="top"
        >
          <span className={styles.brandMark} />
          <span className={styles.brandText}>{profile.shortName}</span>
        </button>

        <nav className={`${styles.menu} ${open ? styles.menuOpen : ''}`}>
          {NAV_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              className={styles.link}
              onClick={() => handleNavigate(item.id)}
              data-cursor
            >
              <span className={styles.linkIndex}>0{idx + 1}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.right}>
          <a
            href="#contact"
            className={styles.cta}
            data-cursor
            data-cursor-label="contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavigate('contact');
            }}
          >
            Get in touch
          </a>
          <button
            type="button"
            className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
