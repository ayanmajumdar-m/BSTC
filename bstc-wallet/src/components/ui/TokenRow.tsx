import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText, HeadlineText, MonoText } from '@/components/ui/Icon';
import { colors, radii, spacing, typography } from '@/theme';

export type TokenRowData = {
  id: string;
  name: string;
  symbol: string;
  networkLabel?: string;
  networkBadge?: string;
  priceLabel: string;
  changeLabel?: string;
  changePositive?: boolean;
  balanceUsd: string;
  balanceAmount: string;
  iconGlyph: string;
  iconColor: string;
};

type TokenRowProps = {
  token: TokenRowData;
  onPress?: () => void;
};

export function TokenRow({ token, onPress }: TokenRowProps) {
  const badgeText = token.networkBadge ?? token.networkLabel;
  const isTron = badgeText === 'TRC-20';
  const isMainnet = badgeText === 'Mainnet';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={`${token.name} ${token.balanceUsd}`}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.left}>
        <View
          style={[
            styles.icon,
            {
              backgroundColor: `${token.iconColor}1A`,
              borderColor: `${token.iconColor}4D`,
            },
          ]}>
          <HeadlineText
            weight="700"
            style={[styles.glyph, { color: token.iconColor }]}>
            {token.iconGlyph}
          </HeadlineText>
        </View>
        <View style={styles.meta}>
          <View style={styles.nameRow}>
            <HeadlineText weight="700" style={styles.name}>
              {token.name}
            </HeadlineText>
            {badgeText ? (
              <View
                style={[
                  styles.networkBadgeWrap,
                  isTron && styles.tronBadgeWrap,
                ]}>
                <BodyText
                  weight="600"
                  style={[
                    styles.networkBadgeText,
                    isTron && styles.tronBadgeText,
                    isMainnet && styles.mainnetBadgeText,
                  ]}>
                  {badgeText}
                </BodyText>
              </View>
            ) : (
              <BodyText weight="600" style={styles.symbolText}>
                {token.symbol}
              </BodyText>
            )}
          </View>
          <View style={styles.priceRow}>
            <MonoText style={styles.price}>{token.priceLabel}</MonoText>
            {token.changeLabel ? (
              <MonoText
                style={[
                  styles.change,
                  {
                    color: token.changePositive
                      ? colors.success
                      : colors.error,
                  },
                ]}>
                {token.changeLabel}
              </MonoText>
            ) : null}
          </View>
        </View>
      </View>
      <View style={styles.right}>
        <MonoText weight="500" style={styles.balanceUsd}>
          {token.balanceUsd}
        </MonoText>
        <MonoText style={styles.balanceAmt}>{token.balanceAmount}</MonoText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: 14,
    minHeight: spacing.touch,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  glyph: {
    fontSize: 15,
    lineHeight: 20,
  },
  meta: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  name: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  networkBadgeWrap: {
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.sm,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  tronBadgeWrap: {
    backgroundColor: 'rgba(255, 0, 19, 0.15)',
    borderColor: 'rgba(255, 0, 19, 0.3)',
  },
  networkBadgeText: {
    ...typography.caption,
    fontSize: 10,
    lineHeight: 14,
    color: colors.outline,
  },
  tronBadgeText: {
    color: '#FF6B78',
  },
  mainnetBadgeText: {
    color: colors.cyan,
  },
  symbolText: {
    ...typography.caption,
    fontSize: 11,
    lineHeight: 14,
    color: colors.outline,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  price: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  change: {
    fontSize: 11,
    lineHeight: 14,
  },
  right: {
    alignItems: 'flex-end',
    gap: 2,
  },
  balanceUsd: {
    ...typography.dataMono,
    color: colors.textPrimary,
  },
  balanceAmt: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
});
