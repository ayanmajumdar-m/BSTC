import { StyleSheet, View } from 'react-native';

import { BodyText } from '@/components/ui/Icon';
import { colors, radii, spacing, typography } from '@/theme';

type NetworkBadgeProps = {
  label: string;
  /** Cyan active indicator (Stitch network pill) */
  active?: boolean;
  compact?: boolean;
};

export function NetworkBadge({
  label,
  active = false,
  compact = false,
}: NetworkBadgeProps) {
  return (
    <View style={[styles.badge, compact && styles.compact]}>
      {active ? <View style={styles.dot} /> : null}
      <BodyText weight="500" style={styles.label} numberOfLines={1}>
        {label}
      </BodyText>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.full,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  compact: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.cyan,
  },
  label: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
    fontWeight: '500',
  },
});
