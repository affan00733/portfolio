import { FiFileText, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { profile } from '../data';
import styles from './styles/SocialRail.module.css';

export default function SocialRail() {
  return (
    <aside className={styles.rail} aria-label="Social links">
      <a
        href={profile.github.url}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
        data-cursor
        data-cursor-label="github"
        aria-label="GitHub"
      >
        <FiGithub />
      </a>
      <a
        href={profile.linkedin.url}
        target="_blank"
        rel="noreferrer"
        className={styles.link}
        data-cursor
        data-cursor-label="linkedin"
        aria-label="LinkedIn"
      >
        <FiLinkedin />
      </a>
      <a
        href={`mailto:${profile.email}`}
        className={styles.link}
        data-cursor
        data-cursor-label="email"
        aria-label="Email"
      >
        <FiMail />
      </a>
      <a
        href="/resumes/Mohammed_Afaan_Ansari_CV.pdf"
        target="_blank"
        rel="noreferrer"
        className={styles.link}
        data-cursor
        data-cursor-label="résumé"
        aria-label="Résumé (full CV)"
      >
        <FiFileText />
      </a>
      <span className={styles.line} aria-hidden />
    </aside>
  );
}
