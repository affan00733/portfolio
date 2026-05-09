import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { publications } from '../data';
import type { PublicationVenue } from '../data/types';
import SectionHeader from './SectionHeader';
import styles from './styles/Publications.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function venueLabel(v: PublicationVenue): { text: string; tone: string } {
  switch (v.kind) {
    case 'conference':
      return {
        text: v.status ? `${v.venue} ${v.year} · ${v.status}` : `${v.venue} ${v.year}`,
        tone: 'conf',
      };
    case 'journal':
      return { text: `${v.venue} ${v.year}`, tone: 'journal' };
    case 'preprint':
      return { text: `${v.venue} · ${v.year}`, tone: 'preprint' };
    case 'in-prep':
      return { text: `In preparation · ${v.year}`, tone: 'inprep' };
  }
}

export default function Publications() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(`.${styles.pubFeatured}`, {
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
      gsap.from(`.${styles.list} .${styles.pub}`, {
        scrollTrigger: { trigger: `.${styles.list}`, start: 'top 80%' },
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.07,
      });
    },
    { scope: rootRef }
  );

  const featured = publications.filter((p) => p.highlight);
  const rest = publications.filter((p) => !p.highlight);

  return (
    <section id="publications" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="05"
          eyebrow="Publications"
          title="5 peer-reviewed papers + 2 in preparation."
          description="Lead author on ChartDesign (under review at COLM 2026) and on the ASONAM 2023 2nd Best Paper. Author bolded throughout."
        />

        <div className={styles.featured}>
          {featured.map((p) => {
            const v = venueLabel(p.venue);
            return (
              <article key={p.id} className={`${styles.pub} ${styles.pubFeatured}`} data-cursor>
                <div className={styles.featuredHead}>
                  <span className={`${styles.venue} ${styles[`venue_${v.tone}`]}`}>{v.text}</span>
                  {p.award && <span className={styles.award}>★ {p.award}</span>}
                  {p.leadAuthor && <span className={styles.lead}>Lead author</span>}
                </div>
                <h3 className={styles.title}>{p.title}</h3>
                <p className={styles.authors}>{boldSelf(p.authors)}</p>
                <p className={styles.summary}>{p.summary}</p>
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
            );
          })}
        </div>

        <ol className={styles.list}>
          {rest.map((p, i) => {
            const v = venueLabel(p.venue);
            return (
              <li key={p.id} className={styles.pub} data-cursor>
                <div className={styles.num}>0{featured.length + i + 1}</div>
                <div className={styles.body}>
                  <div className={styles.head}>
                    <span className={`${styles.venue} ${styles[`venue_${v.tone}`]}`}>{v.text}</span>
                    {p.award && <span className={styles.award}>★ {p.award}</span>}
                    {p.leadAuthor && <span className={styles.lead}>Lead author</span>}
                  </div>
                  <h3 className={styles.title}>{p.title}</h3>
                  <p className={styles.authors}>{boldSelf(p.authors)}</p>
                  <p className={styles.summary}>{p.summary}</p>
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
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

function boldSelf(authors: string) {
  const SELF = 'Mohammed Afaan Ansari';
  if (!authors.includes(SELF)) return authors;
  const parts = authors.split(SELF);
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <strong>{SELF}</strong>}
    </span>
  ));
}
