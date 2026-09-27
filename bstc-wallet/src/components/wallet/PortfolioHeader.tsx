import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText, HeadlineText, Icon, MonoText } from '@/components/ui/Icon';
import { colors, icons, radii, spacing, typography } from '@/theme';

type PortfolioHeaderProps = {
  totalBalance: string;
  changeLabel: string;
  currency?: string;
  hidden?: boolean;
  onToggleVisibility?: () => void;
};

export function PortfolioHeader({
  totalBalance,
  changeLabel,
  currency = 'USD',
  hidden = false,
  onToggleVisibility,
}: PortfolioHeaderProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <View style={styles.labelRow}>
          <BodyText weight="400" style={styles.label}>
            TOTAL BALANCE
          </BodyText>
          <Pressable
            onPress={onToggleVisibility}
            accessibilityRole="button"
            accessibilityLabel={
              hidden ? 'Show balance' : 'Hide balance'
            }
            hitSlop={8}>
            <Icon
              name={hidden ? icons.visibilityOff : icons.visibility}
              size={16}
              color={colors.outline}
            />
          </Pressable>
        </View>
        <View style={styles.currencyTag}>
          <MonoText style={styles.currencyText}>{currency}</MonoText>
        </View>
      </View>

      <HeadlineText weight="700" style={styles.balance}>
        {hidden ? '••••••' : totalBalance}
      </HeadlineText>

      <View style={styles.changeRow}>
        <View style={styles.changeChip}>
          <Icon name={icons.trendingUp} size={15} color={colors.success} />
          <MonoText weight="600" style={styles.changeText}>
            {hidden ? '••••' : changeLabel}
          </MonoText>
        </View>
        <BodyText style={styles.changeCaption}>24h Change</BodyText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.8,
  },
  currencyTag: {
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
  },
  currencyText: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  balance: {
    ...typography.displayBalanceMobile,
    color: colors.textPrimary,
  },
  changeRow: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  changeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: 'rgba(14, 203, 129, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.2)',
  },
  changeText: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  changeCaption: {
    ...typography.caption,
    color: colors.outline,
  },
});
