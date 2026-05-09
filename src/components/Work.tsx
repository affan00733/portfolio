import { useMemo, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLE_META, ROLE_ORDER, projects } from '../data';
import { matchesRole, useRoleFilter, type RoleFilter } from '../context/RoleContext';
import SectionHeader from './SectionHeader';
import styles from './styles/Work.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FILTER_OPTIONS: { value: RoleFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...ROLE_ORDER.map((r) => ({ value: r, label: ROLE_META[r].short })),
];

export default function Work() {
  const rootRef = useRef<HTMLElement>(null);
  const { selectedRole, setSelectedRole } = useRoleFilter();

  const visible = useMemo(
    () => projects.filter((p) => matchesRole(p.roles, selectedRole)),
    [selectedRole]
  );

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
    { scope: rootRef, dependencies: [selectedRole] }
  );

  return (
    <section id="work" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="06"
          eyebrow="Selected work"
          title="Projects that shipped or are under review."
          description="Each card is real work: research code, production systems, or peer-reviewed publications. Filter by lane to surface only what's relevant to your role."
        />

        <div className={styles.filters} role="tablist" aria-label="Filter projects by role">
          {FILTER_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={selectedRole === opt.value}
              className={`${styles.filter} ${selectedRole === opt.value ? styles.filterActive : ''}`}
              onClick={() => setSelectedRole(opt.value)}
              data-cursor
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {visible.length === 0 && (
            <div className={styles.empty}>
              No projects tagged for this lane. Try another filter.
            </div>
          )}
          {visible.map((p) => (
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
