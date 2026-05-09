import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLE_META, projects } from '../data';
import SectionHeader from './SectionHeader';
import styles from './styles/Work.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Work() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.card}`, {
        scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' },
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="work" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="06"
          eyebrow="Selected work"
          title="Projects that shipped or are under review."
          description="Real work: research code, production systems, peer-reviewed publications. Featured items first."
        />

        <div className={styles.grid}>
          {projects.map((p) => (
            <article
              key={p.id}
              className={`${styles.card} ${p.featured ? styles.cardFeatured : ''}`}
              data-cursor
            >
              <header className={styles.head}>
                <span className={styles.period}>{p.period}</span>
                {p.featured && <span className={styles.featured}>★ Featured</span>}
              </header>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.summary}>{p.summary}</p>
              <ul className={styles.bullets}>
                {p.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <div className={styles.stack}>
                {p.stack.map((s) => (
                  <span key={s} className={styles.chip}>
                    {s}
                  </span>
                ))}
              </div>
              <div className={styles.tags}>
                {p.roles.map((r) => (
                  <span
                    key={r}
                    className={styles.tag}
                    style={{ ['--tag-color' as string]: ROLE_META[r].color }}
                  >
                    {ROLE_META[r].short}
                  </span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link.url}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.link}
                  data-cursor
                  data-cursor-label="open"
                >
                  {p.link.label} ↗
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
