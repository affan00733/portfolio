import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Marquee from 'react-fast-marquee';
import { marqueeSkills, skillCategories } from '../data';
import SectionHeader from './SectionHeader';
import styles from './styles/TechStack.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function TechStack() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.category}`, {
        scrollTrigger: { trigger: `.${styles.grid}`, start: 'top 80%' },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="tech" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="03"
          eyebrow="Tech stack"
          title="Tools I reach for, in order of how often."
          description="Top strip is the daily-driver set. The grid below is the full surface: what I've shipped, fine-tuned, deployed, or written about in publications."
        />

        <div className={styles.marqueeWrap}>
          <Marquee gradient gradientColor="#0A0E14" gradientWidth={80} speed={36} pauseOnHover>
            {marqueeSkills.map((s) => (
              <span key={s.name} className={styles.pill}>
                <span className={styles.pillDot} /> {s.name}
              </span>
            ))}
          </Marquee>
        </div>

        <div className={styles.grid}>
          {skillCategories.map((cat) => (
            <div key={cat.id} className={styles.category}>
              <h3 className={styles.catTitle}>
                <span className={styles.catBar} /> {cat.label}
              </h3>
              <ul className={styles.itemList}>
                {cat.items.map((item) => (
                  <li key={item} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
