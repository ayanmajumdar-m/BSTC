import { Text, TextProps, StyleSheet, ColorValue } from 'react-native';

import { colors, fontFamilies, resolveFontFamily } from '@/theme';

type IconProps = TextProps & {
  name: string;
  size?: number;
  color?: ColorValue | string;
};

/**
 * Material Symbols Outlined icon (local font), matching Stitch iconography.
 */
export function Icon({
  name,
  size = 24,
  color = colors.textPrimary,
  style,
  ...rest
}: IconProps) {
  return (
    <Text
      {...rest}
      accessibilityElementsHidden
      importantForAccessibility="no"
      style={[
        styles.icon,
        {
          fontFamily: fontFamilies.icons,
          fontSize: size,
          lineHeight: size,
          color,
          width: size,
          height: size,
        },
        style,
      ]}>
      {name}
    </Text>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontWeight: 'normal',
    includeFontPadding: false,
    textAlign: 'center',
  },
});

/** Headline text helper with correct weight-mapped family */
export function HeadlineText({
  weight = '600',
  style,
  ...rest
}: TextProps & { weight?: string }) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: resolveFontFamily('SpaceGrotesk', weight) }, style]}
    />
  );
}

export function BodyText({
  weight = '400',
  style,
  ...rest
}: TextProps & { weight?: string }) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: resolveFontFamily('Manrope', weight) }, style]}
    />
  );
}

export function MonoText({
  weight = '400',
  style,
  ...rest
}: TextProps & { weight?: string }) {
  return (
    <Text
      {...rest}
      style={[{ fontFamily: resolveFontFamily('JetBrainsMono', weight) }, style]}
    />
  );
}
