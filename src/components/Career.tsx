import { useMemo, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLE_META, ROLE_ORDER, experience } from '../data';
import { matchesRole, useRoleFilter, type RoleFilter } from '../context/RoleContext';
import SectionHeader from './SectionHeader';
import styles from './styles/Career.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FILTER_OPTIONS: { value: RoleFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  ...ROLE_ORDER.map((r) => ({ value: r, label: ROLE_META[r].short })),
];

export default function Career() {
  const rootRef = useRef<HTMLElement>(null);
  const { selectedRole, setSelectedRole } = useRoleFilter();
  const [showEarlier, setShowEarlier] = useState(false);

  const main = useMemo(
    () => experience.filter((e) => !e.earlier && matchesRole(e.roles, selectedRole)),
    [selectedRole]
  );
  const earlier = useMemo(
    () => experience.filter((e) => e.earlier && matchesRole(e.roles, selectedRole)),
    [selectedRole]
  );

  useGSAP(
    () => {
      gsap.from(`.${styles.entry}`, {
        scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 75%' },
        x: -24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    { scope: rootRef, dependencies: [selectedRole] }
  );

  return (
    <section id="career" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="04"
          eyebrow="Career"
          title="Six years across research labs, fintech, and startups."
          description="Filter by what you're hiring for, and the timeline reshapes to surface only the work in that lane."
        />

        <div className={styles.filters} role="tablist" aria-label="Filter by role">
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

        <div className={styles.timeline}>
          {main.length === 0 && (
            <div className={styles.empty}>
              No roles tagged for this lane yet. Try another filter.
            </div>
          )}
          {main.map((e) => (
            <article key={e.id} className={styles.entry}>
              <div className={styles.entryRail}>
                <span className={styles.entryDot} />
                <span className={styles.entryLine} />
              </div>
              <div className={styles.entryBody}>
                <div className={styles.entryHead}>
                  <div>
                    <h3 className={styles.entryRole}>{e.role}</h3>
                    <div className={styles.entryCompany}>
                      <span>{e.company}</span>
                      <span className={styles.entrySep}>·</span>
                      <span>{e.location}</span>
                    </div>
                  </div>
                  <div className={styles.entryDates}>
                    <span>{e.start}</span>
                    <span className={styles.dash}>·</span>
                    <span>{e.end}</span>
                  </div>
                </div>

                {e.badge && <div className={styles.entryBadge}>{e.badge}</div>}

                <ul className={styles.entryBullets}>
                  {e.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>

                <div className={styles.entryTags}>
                  {e.roles.map((r) => (
                    <span
                      key={r}
                      className={styles.tag}
                      style={{ ['--tag-color' as string]: ROLE_META[r].color }}
                    >
                      {ROLE_META[r].short}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {earlier.length > 0 && (
          <div className={styles.earlier}>
            <button
              type="button"
              className={styles.earlierToggle}
              onClick={() => setShowEarlier((v) => !v)}
              data-cursor
            >
              {showEarlier ? '−' : '+'} Earlier roles ({earlier.length})
            </button>
            {showEarlier && (
              <ul className={styles.earlierList}>
                {earlier.map((e) => (
                  <li key={e.id} className={styles.earlierItem}>
                    <span className={styles.earlierRole}>{e.role}</span>
                    <span className={styles.earlierCompany}>
                      {e.company} · {e.location}
                    </span>
                    <span className={styles.earlierDates}>
                      {e.start} · {e.end}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
