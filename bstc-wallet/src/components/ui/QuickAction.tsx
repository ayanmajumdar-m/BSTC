import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText, Icon } from '@/components/ui/Icon';
import { colors, radii, spacing, typography } from '@/theme';

type QuickActionProps = {
  label: string;
  icon: string;
  onPress?: () => void;
  iconSize?: number;
};

/**
 * Circular quick action used on Wallet Home (Send / Receive / Buy / Swap).
 */
export function QuickAction({
  label,
  icon,
  onPress,
  iconSize = 24,
}: QuickActionProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [styles.wrap, pressed && styles.pressed]}>
      <View style={styles.circle}>
        <Icon name={icon} size={iconSize} color={colors.textPrimary} />
      </View>
      <BodyText weight="500" style={styles.label}>
        {label}
      </BodyText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    gap: 6,
  },
  circle: {
    width: 56,
    height: 56,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    transform: [{ scale: 0.95 }],
    opacity: 0.9,
  },
  label: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
  },
});
