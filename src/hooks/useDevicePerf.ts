import { useEffect, useState } from 'react';

export type PerfTier = 'high' | 'medium' | 'low';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

/**
 * Quick perf tier probe used by the 3D scene to scale particle count and
 * disable bloom on low-end devices. Mixes navigator hints with a 1-second
 * rAF probe to estimate sustained framerate.
 */
export function useDevicePerf(): PerfTier {
  const [tier, setTier] = useState<PerfTier>('high');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const memory = (navigator as NavigatorWithMemory).deviceMemory;
    const cores = navigator.hardwareConcurrency ?? 4;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      setTier('low');
      return;
    }

    if (isMobile && (memory !== undefined ? memory <= 4 : cores <= 4)) {
      setTier('low');
      return;
    }

    let frames = 0;
    let cancelled = false;
    const start = performance.now();

    const tick = () => {
      if (cancelled) return;
      frames += 1;
      if (performance.now() - start < 1000) {
        requestAnimationFrame(tick);
      } else {
        const fps = frames;
        if (fps < 30) setTier('low');
        else if (fps < 50) setTier('medium');
        else setTier('high');
      }
    };
    requestAnimationFrame(tick);

    return () => {
      cancelled = true;
    };
  }, []);

  return tier;
}
