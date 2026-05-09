import type { PerfTier } from '../../hooks/useDevicePerf';

export const ACCENT = '#22D3EE';
export const ACCENT_DIM = '#0E7490';
export const NODE_COLOR = '#67E8F9';
export const EDGE_COLOR = '#1C9CB0';
export const PULSE_COLOR = '#A5F3FC';

export interface SceneParams {
  nodeCount: number;
  radius: number;
  edgeThreshold: number;
  pulseCount: number;
  bloom: boolean;
  dpr: [number, number];
}

export function paramsForTier(tier: PerfTier): SceneParams {
  switch (tier) {
    case 'high':
      return {
        nodeCount: 110,
        radius: 4,
        edgeThreshold: 1.55,
        pulseCount: 14,
        bloom: true,
        dpr: [1, 1.8],
      };
    case 'medium':
      return {
        nodeCount: 75,
        radius: 4,
        edgeThreshold: 1.7,
        pulseCount: 9,
        bloom: true,
        dpr: [1, 1.5],
      };
    case 'low':
      return {
        nodeCount: 42,
        radius: 3.6,
        edgeThreshold: 1.85,
        pulseCount: 5,
        bloom: false,
        dpr: [1, 1.25],
      };
  }
}
