import { TextStyle } from 'react-native';

/**
 * Font family names registered via expo-font (local assets/fonts).
 */
export const fontFamilies = {
  headline: 'SpaceGrotesk',
  body: 'Manrope',
  mono: 'JetBrainsMono',
  icons: 'MaterialSymbolsOutlined',
} as const;

type TypeStyle = Pick<
  TextStyle,
  'fontFamily' | 'fontSize' | 'fontWeight' | 'lineHeight' | 'letterSpacing'
>;

/**
 * Stitch typography scale (Obsidian Terminal).
 */
export const typography = {
  displayBalance: {
    fontFamily: fontFamilies.headline,
    fontSize: 40,
    fontWeight: '600',
    lineHeight: 48,
    letterSpacing: -0.8,
  },
  displayBalanceMobile: {
    fontFamily: fontFamilies.headline,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
    letterSpacing: -0.32,
  },
  balance: {
    fontFamily: fontFamilies.headline,
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
    letterSpacing: -0.32,
  },
  screenTitle: {
    fontFamily: fontFamilies.headline,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.24,
  },
  sectionTitle: {
    fontFamily: fontFamilies.headline,
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
  },
  bodyDefault: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyCompact: {
    fontFamily: fontFamilies.body,
    fontSize: 15,
    fontWeight: '400',
    lineHeight: 22,
  },
  body14: {
    fontFamily: fontFamilies.body,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySecondary: {
    fontFamily: fontFamilies.body,
    fontSize: 13,
    fontWeight: '400',
    lineHeight: 18,
  },
  caption: {
    fontFamily: fontFamilies.body,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  button: {
    fontFamily: fontFamilies.body,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    letterSpacing: 0.16,
  },
  dataMono: {
    fontFamily: fontFamilies.mono,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 20,
  },
  dataMonoSm: {
    fontFamily: fontFamilies.mono,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
} as const satisfies Record<string, TypeStyle>;

export type TypographyToken = keyof typeof typography;
