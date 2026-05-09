import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ROLE_META, whatIDo } from '../data';
import SectionHeader from './SectionHeader';
import styles from './styles/WhatIDo.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function WhatIDo() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.card}`, {
        scrollTrigger: { trigger: rootRef.current, start: 'top 70%' },
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="what-i-do" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="02"
          eyebrow="What I do"
          title="Five lanes, one engineer."
          description="Same engineer, different recruiter brief. Each card is built from concrete shipped work, with no buzzwords unless there's a number behind them."
        />

        <div className={styles.grid}>
          {whatIDo.map((card) => {
            const meta = ROLE_META[card.role];
            return (
              <article
                key={card.id}
                className={styles.card}
                style={{ ['--card-accent' as string]: meta.color }}
                data-cursor
              >
                <header className={styles.cardHead}>
                  <span className={styles.cardTag}>{meta.short}</span>
                  <span className={styles.cardArrow}>↗</span>
                </header>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardDesc}>{card.description}</p>
                <ul className={styles.examples}>
                  {card.examples.map((ex) => (
                    <li key={ex}>
                      <span className={styles.exDot} /> {ex}
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
