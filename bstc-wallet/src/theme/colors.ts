/**
 * Obsidian Terminal color tokens — Stitch design system source of truth.
 */
export const colors = {
  /** Canvas and surfaces */
  background: '#0B0E11',
  bg: '#0B0E11',
  surface: '#1E232A',
  surfaceContainer: '#1D2023',
  surfaceLow: '#191C1F',
  surfaceElevated: '#2A303A',
  elevated: '#2A303A',
  surfaceHigh: '#272A2E',
  surfaceHighest: '#323538',
  highest: '#323538',

  /** Typography */
  text: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textSecondary: '#848E9C',
  textOnPrimary: '#FFFFFF',
  textOnPrimaryFixed: '#001356',

  /** Brand and accents */
  brand: '#234AD5',
  brandHover: '#1B3BB5',
  primary: '#234AD5',
  blue: '#234AD5',
  cyan: '#00C6FF',
  primaryTint: '#B8C3FF',

  /** Status semantics */
  success: '#0ECB81',
  successMuted: 'rgba(14, 203, 129, 0.12)',
  error: '#F6465D',
  errorMuted: 'rgba(246, 70, 93, 0.12)',
  warning: '#F3BA2F',
  warningMuted: 'rgba(243, 186, 47, 0.12)',

  /** Dividers & Outlines */
  divider: '#2A303A',
  border: '#2A303A',
  borderSubtle: 'rgba(68, 70, 85, 0.3)',
  outline: '#848E9C',
  outlineVariant: '#444655',

  /** Navigation */
  tabInactive: '#848E9C',
  tabActive: '#234AD5',

  /** Token brand accents used in Stitch screens */
  bitcoin: '#F7931A',
  ethereum: '#627EEA',
  usdt: '#26A17B',
  usdtTron: '#FF0013',
  solana: '#14F195',
  polygon: '#8247E5',
} as const;

export type ColorToken = keyof typeof colors;
