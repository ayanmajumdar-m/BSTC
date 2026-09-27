import { loadAsync } from 'expo-font';

/**
 * Load local Stitch fonts from assets/fonts.
 * Call once at app root before rendering UI.
 */
export async function loadAppFonts(): Promise<void> {
  await loadAsync({
    SpaceGrotesk: require('../../assets/fonts/SpaceGrotesk-Regular.ttf'),
    'SpaceGrotesk-Medium': require('../../assets/fonts/SpaceGrotesk-Medium.ttf'),
    'SpaceGrotesk-SemiBold': require('../../assets/fonts/SpaceGrotesk-SemiBold.ttf'),
    'SpaceGrotesk-Bold': require('../../assets/fonts/SpaceGrotesk-Bold.ttf'),
    Manrope: require('../../assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('../../assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('../../assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('../../assets/fonts/Manrope-Bold.ttf'),
    JetBrainsMono: require('../../assets/fonts/JetBrainsMono-Regular.ttf'),
    'JetBrainsMono-Medium': require('../../assets/fonts/JetBrainsMono-Medium.ttf'),
    MaterialSymbolsOutlined: require('../../assets/fonts/MaterialSymbolsOutlined.ttf'),
  });
}

/**
 * Map CSS-like weight to the registered family variant.
 * React Native on Android needs the weight-specific family name.
 */
export function resolveFontFamily(
  base: 'SpaceGrotesk' | 'Manrope' | 'JetBrainsMono',
  weight?: string | number,
): string {
  const w = String(weight ?? '400');
  if (base === 'SpaceGrotesk') {
    if (w === '700' || w === 'bold') return 'SpaceGrotesk-Bold';
    if (w === '600' || w === 'semibold') return 'SpaceGrotesk-SemiBold';
    if (w === '500' || w === 'medium') return 'SpaceGrotesk-Medium';
    return 'SpaceGrotesk';
  }
  if (base === 'Manrope') {
    if (w === '700' || w === 'bold') return 'Manrope-Bold';
    if (w === '600' || w === 'semibold') return 'Manrope-SemiBold';
    if (w === '500' || w === 'medium') return 'Manrope-Medium';
    return 'Manrope';
  }
  if (w === '500' || w === '600' || w === 'medium' || w === 'semibold') {
    return 'JetBrainsMono-Medium';
  }
  return 'JetBrainsMono';
}
