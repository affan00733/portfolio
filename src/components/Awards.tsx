import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { awards } from '../data';
import type { AwardEntry } from '../data/types';
import SectionHeader from './SectionHeader';
import styles from './styles/Awards.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Group {
  id: AwardEntry['group'];
  label: string;
  hint: string;
}

const GROUPS: Group[] = [
  { id: 'research', label: 'Research', hint: 'Peer-reviewed recognition' },
  { id: 'industry', label: 'Industry', hint: 'Promotion · performance · offers' },
  { id: 'hackathon-win', label: 'Hackathon Wins', hint: 'First-place finishes' },
  { id: 'hackathon-finalist', label: 'Finalists / Runner-Ups', hint: 'National + intl. competitions' },
  { id: 'community', label: 'Community & Mentorship', hint: '40+ mentees · $50K NGO impact' },
];

export default function Awards() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.column}`, {
        scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' },
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="awards" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="07"
          eyebrow="Awards & impact"
          title="Honors, performance recognition, and community work."
        />

        <div className={styles.grid}>
          {GROUPS.map((g) => {
            const items = awards.filter((a) => a.group === g.id);
            if (items.length === 0) return null;
            return (
              <div key={g.id} className={styles.column}>
                <div className={styles.colHead}>
                  <h3 className={styles.colTitle}>{g.label}</h3>
                  <p className={styles.colHint}>{g.hint}</p>
                </div>
                <ul className={styles.list}>
                  {items.map((a) => (
                    <li key={a.id} className={styles.item}>
                      <div className={styles.itemTop}>
                        <span className={styles.bullet} />
                        <h4 className={styles.itemTitle}>{a.title}</h4>
                        {a.year && <span className={styles.year}>{a.year}</span>}
                      </div>
                      {a.detail && <p className={styles.detail}>{a.detail}</p>}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
