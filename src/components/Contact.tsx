import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { profile, resumes } from '../data';
import SectionHeader from './SectionHeader';
import styles from './styles/Contact.module.css';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact() {
  const rootRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [openResume, setOpenResume] = useState(false);
  const [copied, setCopied] = useState(false);

  useGSAP(
    () => {
      gsap.from(`.${styles.reveal}`, {
        scrollTrigger: { trigger: rootRef.current, start: 'top 75%' },
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.08,
      });
    },
    { scope: rootRef }
  );

  useEffect(() => {
    if (!openResume) return;
    const onClick = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setOpenResume(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [openResume]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // ignore
    }
  };

  return (
    <section id="contact" ref={rootRef} className={styles.section}>
      <div className={styles.inner}>
        <SectionHeader
          index="08"
          eyebrow="Get in touch"
          title="Hiring for an AI / ML, Data, or SDE role?"
          description="Looking for 2026 summer internships and full-time roles. Reach out by email; I usually reply within a day."
        />

        <div className={styles.cta}>
          <a
            href={`mailto:${profile.email}`}
            className={`${styles.bigEmail} ${styles.reveal}`}
            data-cursor
            data-cursor-label="email"
          >
            <span className={styles.bigEmailText}>{profile.email}</span>
            <span className={styles.bigEmailArrow}>→</span>
          </a>

          <div className={`${styles.actions} ${styles.reveal}`}>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={copyEmail}
              data-cursor
              data-cursor-label={copied ? 'copied' : 'copy'}
            >
              {copied ? '✓ Copied' : 'Copy email'}
            </button>

            <div className={styles.resumeWrap} ref={dropdownRef}>
              <button
                type="button"
                className={styles.resumeBtn}
                onClick={() => setOpenResume((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={openResume}
                data-cursor
                data-cursor-label="résumé"
              >
                Download résumé
                <span className={styles.caret}>▾</span>
              </button>
              {openResume && (
                <div className={styles.menu} role="menu">
                  <div className={styles.menuHint}>Pick the variant that matches your req:</div>
                  {resumes.map((r) => (
                    <a
                      key={r.id}
                      href={r.file}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.menuItem}
                      role="menuitem"
                      data-cursor
                    >
                      <span className={styles.menuLabel}>{r.label}</span>
                      <span className={styles.menuDesc}>{r.description}</span>
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`${styles.grid} ${styles.reveal}`}>
          <a
            href={profile.linkedin.url}
            target="_blank"
            rel="noreferrer"
            className={styles.channel}
            data-cursor
          >
            <span className={styles.channelLabel}>LinkedIn</span>
            <span className={styles.channelValue}>{profile.linkedin.label}</span>
            <span className={styles.channelArrow}>↗</span>
          </a>
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className={styles.channel}
            data-cursor
          >
            <span className={styles.channelLabel}>GitHub</span>
            <span className={styles.channelValue}>{profile.github.label}</span>
            <span className={styles.channelArrow}>↗</span>
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className={styles.channel} data-cursor>
            <span className={styles.channelLabel}>Phone</span>
            <span className={styles.channelValue}>{profile.phone}</span>
            <span className={styles.channelArrow}>↗</span>
          </a>
          <div className={styles.channel}>
            <span className={styles.channelLabel}>Location</span>
            <span className={styles.channelValue}>{profile.location}</span>
          </div>
        </div>

        <footer className={styles.footer}>
          <span>
            Built with React, Three.js, GSAP. Designed and deployed by {profile.shortName}.
          </span>
          <span className={styles.footerYear}>© {new Date().getFullYear()}</span>
        </footer>
      </div>
    </section>
  );
}
