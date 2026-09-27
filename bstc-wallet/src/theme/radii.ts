/**
 * Stitch corner radii.
 * Cards/modules: 12–16px. Pills/chips: full.
 */
export const radii = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 24,
  full: 9999,
} as const;

export type RadiusToken = keyof typeof radii;
