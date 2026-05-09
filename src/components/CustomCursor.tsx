import { useEffect, useRef } from 'react';
import styles from './styles/CustomCursor.module.css';

const HOVER_SELECTOR = 'a, button, [data-cursor]';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isCoarse = window.matchMedia('(pointer: coarse)').matches;
    if (isCoarse) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const dot = { x: target.x, y: target.y };
    const ring = { x: target.x, y: target.y };
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(HOVER_SELECTOR) as HTMLElement | null;
      if (el) {
        ringRef.current?.classList.add(styles.ringActive);
        const label = el.dataset.cursorLabel;
        if (label && labelRef.current) {
          labelRef.current.textContent = label;
          labelRef.current.classList.add(styles.labelVisible);
        }
      } else {
        ringRef.current?.classList.remove(styles.ringActive);
        labelRef.current?.classList.remove(styles.labelVisible);
      }
    };

    const onDown = () => ringRef.current?.classList.add(styles.ringPress);
    const onUp = () => ringRef.current?.classList.remove(styles.ringPress);

    const animate = () => {
      dot.x += (target.x - dot.x) * 0.55;
      dot.y += (target.y - dot.y) * 0.55;
      ring.x += (target.x - ring.x) * 0.18;
      ring.y += (target.y - ring.y) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }
      raf = requestAnimationFrame(animate);
    };

    document.body.classList.add(styles.bodyHide);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.body.classList.remove(styles.bodyHide);
    };
  }, []);

  return (
    <div className={styles.cursor} aria-hidden>
      <div ref={ringRef} className={styles.ring}>
        <span ref={labelRef} className={styles.label} />
      </div>
      <div ref={dotRef} className={styles.dot} />
    </div>
  );
}
