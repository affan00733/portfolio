import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { education, profile } from '../data';
import SectionHeader from './SectionHeader';
import styles from './styles/About.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function About() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.reveal}`, {
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        y: 28,
        opacity: 0,
        duration: 0.85,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="about" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="01"
          eyebrow="About"
          title="Research-grade ML, shipped in production."
        />

        <div className={styles.grid}>
          <div className={styles.bio}>
            {profile.bio.map((p, i) => (
              <p key={i} className={`${styles.para} ${styles.reveal}`}>
                {p}
              </p>
            ))}
          </div>

          <aside className={styles.side}>
            <div className={`${styles.card} ${styles.reveal}`}>
              <div className={styles.cardLabel}>Education</div>
              <ul className={styles.eduList}>
                {education.map((e) => (
                  <li key={e.id} className={styles.eduItem}>
                    <div className={styles.eduDegree}>{e.degree}</div>
                    <div className={styles.eduInst}>{e.institution}</div>
                    <div className={styles.eduMeta}>
                      <span>{e.start} · {e.end}</span>
                      {e.gpa && <span> · GPA {e.gpa}</span>}
                    </div>
                    {e.advisor && <div className={styles.eduAdvisor}>{e.advisor}</div>}
                  </li>
                ))}
              </ul>
            </div>

            <div className={`${styles.card} ${styles.reveal}`}>
              <div className={styles.cardLabel}>Currently</div>
              <ul className={styles.now}>
                <li>Multimodal LLM benchmarking @ UMD CLIP Lab</li>
                <li>Lead author, ChartDesign (COLM 2026)</li>
                <li>Building ARIA · agentic CVE prioritization</li>
                <li>Open to <strong>2026 internships and full-time</strong> roles</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
