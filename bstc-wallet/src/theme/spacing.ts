/**
 * Stitch spacing scale (Obsidian Terminal).
 * margin = 20px screen padding; section rhythm = 24px.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  margin: 20,
  screenMargin: 20,
  xl: 24,
  section: 24,
  xxl: 32,
  gutter: 16,
  touchMin: 44,
  touch: 48,
} as const;

export type SpacingToken = keyof typeof spacing;
