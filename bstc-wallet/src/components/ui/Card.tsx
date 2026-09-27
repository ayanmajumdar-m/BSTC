import { ReactNode } from 'react';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';

import { colors, radii, spacing } from '@/theme';

export type CardVariant = 'surface' | 'low' | 'elevated' | 'highest';

type CardProps = {
  children: ReactNode;
  variant?: CardVariant;
  radius?: 'md' | 'lg' | 'xl';
  padding?: number | 'none';
  onPress?: () => void;
  style?: ViewStyle;
  accessibilityLabel?: string;
};

/**
 * Standard Obsidian Terminal modular card container.
 * Encased in a crisp 1px stroke of #2A303A / borderSubtle.
 */
export function Card({
  children,
  variant = 'surface',
  radius = 'xl',
  padding = 14,
  onPress,
  style,
  accessibilityLabel,
}: CardProps) {
  const containerRadius =
    radius === 'xl' ? radii.xl : radius === 'lg' ? radii.lg : radii.md;
  const paddingValue = padding === 'none' ? 0 : padding;

  const cardStyle: ViewStyle = {
    borderRadius: containerRadius,
    padding: paddingValue,
  };

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        style={({ pressed }) => [
          styles.base,
          variant === 'surface' && styles.surface,
          variant === 'low' && styles.low,
          variant === 'elevated' && styles.elevated,
          variant === 'highest' && styles.highest,
          cardStyle,
          pressed && styles.pressed,
          style,
        ]}>
        {children}
      </Pressable>
    );
  }

  return (
    <View
      style={[
        styles.base,
        variant === 'surface' && styles.surface,
        variant === 'low' && styles.low,
        variant === 'elevated' && styles.elevated,
        variant === 'highest' && styles.highest,
        cardStyle,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  surface: {
    backgroundColor: colors.surface,
  },
  low: {
    backgroundColor: colors.surfaceLow,
  },
  elevated: {
    backgroundColor: colors.surfaceElevated,
  },
  highest: {
    backgroundColor: colors.surfaceHighest,
  },
  pressed: {
    opacity: 0.92,
  },
});
