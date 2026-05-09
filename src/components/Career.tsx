import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLE_META, experience } from '../data';
import SectionHeader from './SectionHeader';
import styles from './styles/Career.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Career() {
  const rootRef = useRef<HTMLElement>(null);
  const [showEarlier, setShowEarlier] = useState(false);

  const main = experience.filter((e) => !e.earlier);
  const earlier = experience.filter((e) => e.earlier);

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
    { scope: rootRef }
  );

  return (
    <section id="career" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="04"
          eyebrow="Career"
          title="Six years across research labs, fintech, and startups."
        />

        <div className={styles.timeline}>
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
