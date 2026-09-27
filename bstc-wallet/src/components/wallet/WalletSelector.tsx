import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText, Icon } from '@/components/ui/Icon';
import { colors, icons, radii, spacing, typography } from '@/theme';

type WalletSelectorProps = {
  name: string;
  onPress?: () => void;
};

export function WalletSelector({ name, onPress }: WalletSelectorProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Wallet ${name}`}
      style={({ pressed }) => [styles.pill, pressed && styles.pressed]}>
      <View style={styles.icon}>
        <Icon name={icons.wallet} size={13} color={colors.primaryTint} />
      </View>
      <BodyText weight="600" style={styles.name} numberOfLines={1}>
        {name}
      </BodyText>
      <Icon name={icons.expandMore} size={16} color={colors.outline} />
    </Pressable>
  );
}

type NetworkFilterProps = {
  label: string;
  onPress?: () => void;
};

export function NetworkFilter({ label, onPress }: NetworkFilterProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Network ${label}`}
      style={({ pressed }) => [styles.networkPill, pressed && styles.pressed]}>
      <View style={styles.dot} />
      <BodyText weight="500" style={styles.networkLabel} numberOfLines={1}>
        {label}
      </BodyText>
      <Icon name={icons.expandMore} size={16} color={colors.outline} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    minHeight: 38,
  },
  icon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    ...typography.bodySecondary,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  networkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    minHeight: 38,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cyan,
  },
  networkLabel: {
    ...typography.bodySecondary,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  pressed: {
    opacity: 0.85,
    transform: [{ scale: 0.98 }],
  },
});
