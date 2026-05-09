import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './styles/SectionHeader.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface Props {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = 'left',
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const targets = rootRef.current?.querySelectorAll(`.${styles.reveal}`);
      if (!targets) return;
      gsap.from(targets, {
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top 80%',
        },
        y: 28,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className={`${styles.header} ${align === 'center' ? styles.center : ''}`}
    >
      <div className={`${styles.row} ${styles.reveal}`}>
        <span className={styles.index}>{index}</span>
        <span className={styles.eyebrow}>{eyebrow}</span>
      </div>
      <h2 className={`${styles.title} ${styles.reveal}`}>{title}</h2>
      {description && <p className={`${styles.description} ${styles.reveal}`}>{description}</p>}
    </div>
  );
}
