import { Pressable, StyleSheet, View } from 'react-native';

import { Badge } from '@/components/ui/Badge';
import { BodyText, Icon, MonoText } from '@/components/ui/Icon';
import { colors, radii, spacing, typography } from '@/theme';

export type TransactionKind = 'received' | 'sent' | 'swap' | 'failed' | 'approve';

export type TransactionRowData = {
  id: string;
  kind: TransactionKind;
  title: string;
  subtitle: string;
  primaryAmount: string;
  secondaryAmount?: string;
  statusLabel?: string;
  statusTone?: 'success' | 'error' | 'warning' | 'brand' | 'neutral';
  amountPositive?: boolean;
};

type TransactionRowProps = {
  tx: TransactionRowData;
  onPress?: () => void;
  /** Compact single-row used inside Recent Activity card */
  embedded?: boolean;
};

const kindIcon: Record<TransactionKind, { name: string; bg: string; border: string; color: string }> = {
  received: {
    name: 'arrow_downward',
    bg: 'rgba(14, 203, 129, 0.18)',
    border: 'rgba(14, 203, 129, 0.3)',
    color: colors.success,
  },
  sent: {
    name: 'arrow_upward',
    bg: 'rgba(246, 70, 93, 0.15)',
    border: 'rgba(246, 70, 93, 0.3)',
    color: colors.error,
  },
  swap: {
    name: 'swap_horiz',
    bg: 'rgba(35, 74, 213, 0.25)',
    border: 'rgba(184, 195, 255, 0.3)',
    color: colors.primaryTint,
  },
  failed: {
    name: 'close',
    bg: colors.errorMuted,
    border: 'rgba(246, 70, 93, 0.3)',
    color: colors.error,
  },
  approve: {
    name: 'verified_user',
    bg: 'rgba(35, 74, 213, 0.2)',
    border: 'rgba(35, 74, 213, 0.3)',
    color: colors.primaryTint,
  },
};

export function TransactionRow({ tx, onPress, embedded }: TransactionRowProps) {
  const icon = kindIcon[tx.kind];
  const amountColor =
    tx.amountPositive === true
      ? colors.success
      : tx.amountPositive === false
        ? colors.textPrimary
        : colors.textPrimary;

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={tx.title}
      style={({ pressed }) => [
        styles.row,
        !embedded && styles.standalone,
        pressed && onPress && styles.pressed,
      ]}>
      <View style={styles.left}>
        <View
          style={[
            styles.iconWrap,
            { backgroundColor: icon.bg, borderColor: icon.border },
          ]}>
          <Icon name={icon.name} size={18} color={icon.color} />
        </View>
        <View style={styles.meta}>
          <View style={styles.titleRow}>
            <BodyText weight="600" style={styles.title} numberOfLines={1}>
              {tx.title}
            </BodyText>
            {tx.statusLabel ? (
              <Badge
                label={tx.statusLabel}
                tone={tx.statusTone ?? 'success'}
              />
            ) : null}
          </View>
          <BodyText style={styles.subtitle} numberOfLines={1}>
            {tx.subtitle}
          </BodyText>
        </View>
      </View>
      <View style={styles.right}>
        <MonoText weight="500" style={[styles.primaryAmt, { color: amountColor }]}>
          {tx.primaryAmount}
        </MonoText>
        {tx.secondaryAmount ? (
          <MonoText style={styles.secondaryAmt}>{tx.secondaryAmount}</MonoText>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    gap: spacing.md,
    minHeight: spacing.touch,
  },
  standalone: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  pressed: {
    backgroundColor: colors.surfaceElevated,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.outline,
  },
  right: {
    alignItems: 'flex-end',
    gap: 2,
  },
  primaryAmt: {
    ...typography.dataMono,
  },
  secondaryAmt: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
});
