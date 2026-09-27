import { ViewStyle } from 'react-native';

/**
 * Shadows only where Stitch uses elevation (Level 2 drawers/modals).
 * Default resting cards use borders, not shadows.
 */
export const shadows = {
  none: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
  },
  elevated: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.65,
    shadowRadius: 16,
    elevation: 12,
  },
  focusCyan: {
    shadowColor: '#00C6FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
} as const satisfies Record<string, ViewStyle>;
