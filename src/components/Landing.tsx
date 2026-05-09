import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { profile } from '../data';
import styles from './styles/Landing.module.css';

const Scene = lazy(() => import('./Scene/Scene'));

const FOCUS_WORDS = [
  'Generative AI',
  'Multimodal LLMs',
  'RAG Pipelines',
  'Diffusion Models',
  'Production ML',
];

export default function Landing() {
  const rootRef = useRef<HTMLElement>(null);
  const [focusIdx, setFocusIdx] = useState(0);

  useEffect(() => {
    const id = window.setInterval(
      () => setFocusIdx((i) => (i + 1) % FOCUS_WORDS.length),
      2200
    );
    return () => window.clearInterval(id);
  }, []);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out', duration: 0.9 },
      });
      tl.from(`.${styles.eyebrowAnim}`, { y: 18, opacity: 0 })
        .from(`.${styles.h1Anim}`, { y: 36, opacity: 0 }, '-=0.55')
        .from(`.${styles.focusAnim}`, { y: 32, opacity: 0 }, '-=0.6')
        .from(`.${styles.subAnim}`, { y: 18, opacity: 0 }, '-=0.55')
        .from(
          `.${styles.metricAnim}`,
          { y: 16, opacity: 0, duration: 0.6, stagger: 0.08 },
          '-=0.5'
        )
        .from(`.${styles.ctaAnim}`, { y: 14, opacity: 0, stagger: 0.08 }, '-=0.4')
        .from(`.${styles.scrollAnim}`, { opacity: 0, duration: 1.2 }, '-=0.2');
    },
    { scope: rootRef }
  );

  return (
    <section id="landing" ref={rootRef} className={styles.section}>
      <div className={styles.scene}>
        <Suspense fallback={<div className={styles.scenePlaceholder} aria-hidden />}>
          <Scene />
        </Suspense>
      </div>

      <div className={styles.gradient} aria-hidden />

      <div className={styles.content}>
        <span className={`${styles.eyebrow} ${styles.eyebrowAnim}`}>
          <span className={styles.dot} /> {profile.location} · open to roles, summer & full-time
        </span>

        <h1 className={`${styles.h1} ${styles.h1Anim}`}>
          {profile.name}
          <span className={styles.cursor}>_</span>
        </h1>

        <div className={`${styles.focusRow} ${styles.focusAnim}`}>
          <span className={styles.focusPrefix}>AI / ML Engineer building</span>
          <span className={styles.focusSlot}>
            {FOCUS_WORDS.map((word, i) => (
              <span
                key={word}
                className={`${styles.focusWord} ${i === focusIdx ? styles.focusActive : ''}`}
              >
                {word}
              </span>
            ))}
          </span>
        </div>

        <p className={`${styles.sub} ${styles.subAnim}`}>
          Multimodal LLMs, RAG pipelines, and production-grade ML, from research benchmarks to
          inference under 100&nbsp;ms.
        </p>

        <ul className={styles.metrics}>
          {profile.subtitleMetrics.map((m) => (
            <li key={m} className={`${styles.metric} ${styles.metricAnim}`}>
              <span className={styles.metricMark} /> {m}
            </li>
          ))}
        </ul>

        <div className={styles.ctas}>
          <a
            href="#work"
            className={`${styles.ctaPrimary} ${styles.ctaAnim}`}
            data-cursor
            data-cursor-label="view"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('work')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }}
          >
            View selected work →
          </a>
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className={`${styles.ctaSecondary} ${styles.ctaAnim}`}
            data-cursor
            data-cursor-label="github"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className={`${styles.ctaSecondary} ${styles.ctaAnim}`}
            data-cursor
            data-cursor-label="linkedin"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className={`${styles.scroll} ${styles.scrollAnim}`}>
        <span>scroll</span>
        <span className={styles.scrollLine} />
      </div>
    </section>
  );
}
