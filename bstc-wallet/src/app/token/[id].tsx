import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  Badge,
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  IconButton,
  MonoText,
  PrimaryButton,
  Screen,
  ScreenHeader,
  SecondaryButton,
  TransactionRow,
} from '@/components/ui';
import { getTokenDetail } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function TokenDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const token = getTokenDetail(id);

  const [copied, setCopied] = useState(false);

  const handleCopyContract = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncatedContract =
    token.contractAddress.length > 14
      ? `${token.contractAddress.slice(0, 5)}...${token.contractAddress.slice(-4)}`
      : token.contractAddress;

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Top App Bar Header */}
      <ScreenHeader
        title={token.name}
        onBack={() => router.back()}
        right={
          <View style={styles.headerRight}>
            <View style={styles.networkBadgeWrap}>
              <BodyText weight="600" style={styles.networkBadgeText}>
                {token.networkBadge ?? token.networkLabel ?? 'Mainnet'}
              </BodyText>
            </View>
            <IconButton
              accessibilityLabel="Open explorer"
              size={40}
              variant="ghost"
              icon={
                <Icon name={icons.openInNew} size={18} color={colors.outline} />
              }
            />
          </View>
        }
      />

      {/* Hero Balance & Live Price */}
      <View style={styles.hero}>
        <View style={styles.iconCircle}>
          <HeadlineText
            weight="700"
            style={[styles.glyph, { color: token.iconColor }]}>
            {token.iconGlyph}
          </HeadlineText>
          {token.networkBadge ? (
            <View style={styles.miniBadge}>
              <BodyText weight="700" style={styles.miniBadgeText}>
                {token.networkBadge}
              </BodyText>
            </View>
          ) : null}
        </View>

        <BodyText style={styles.balanceCaption}>
          {token.name} Balance
        </BodyText>

        <View style={styles.balanceRow}>
          <HeadlineText weight="700" style={styles.balanceAmount}>
            {token.balanceRaw}
          </HeadlineText>
          <HeadlineText weight="600" style={styles.balanceSymbol}>
            {token.symbol}
          </HeadlineText>
        </View>

        <MonoText weight="600" style={styles.fiatAmount}>
          {token.balanceUsd}{' '}
          <BodyText style={styles.fiatUnit}>USD</BodyText>
        </MonoText>

        {/* Live Price Pill */}
        <View style={styles.pricePill}>
          <BodyText style={styles.pricePillLabel}>
            1 {token.symbol} =
          </BodyText>
          <MonoText weight="500" style={styles.pricePillValue}>
            {token.priceLabel}
          </MonoText>
          {token.changeLabel ? (
            <View style={styles.changeChip}>
              <Icon
                name={
                  token.changePositive ? icons.trendingUp : icons.trendingDown
                }
                size={14}
                color={token.changePositive ? colors.success : colors.error}
              />
              <MonoText
                weight="600"
                style={[
                  styles.changeChipText,
                  {
                    color: token.changePositive
                      ? colors.success
                      : colors.error,
                  },
                ]}>
                {token.changeLabel}
              </MonoText>
            </View>
          ) : null}
        </View>
      </View>

      {/* Primary Action Buttons (Send / Receive) */}
      <View style={styles.actionRow}>
        <PrimaryButton
          label="Send"
          icon={<Icon name={icons.northEast} size={18} color="#FFFFFF" />}
          style={styles.actionBtn}
          onPress={() =>
            router.push({
              pathname: '/send',
              params: { tokenId: token.id },
            })
          }
        />
        <SecondaryButton
          label="Receive"
          icon={
            <Icon
              name={icons.receive}
              size={18}
              color={colors.textPrimary}
            />
          }
          style={styles.actionBtn}
          onPress={() =>
            router.push({
              pathname: '/receive',
              params: { tokenId: token.id },
            })
          }
        />
      </View>

      {/* Quick Stats Bento Card */}
      <Card variant="low" style={styles.statsCard}>
        <View style={styles.statRow}>
          <BodyText style={styles.statLabel}>Market Cap</BodyText>
          <MonoText weight="500" style={styles.statValue}>
            {token.marketCap}
          </MonoText>
        </View>

        <View style={styles.statRow}>
          <BodyText style={styles.statLabel}>24h High / Low</BodyText>
          <View style={styles.highLowWrap}>
            <MonoText weight="500" style={styles.highVal}>
              {token.high24h}
            </MonoText>
            <BodyText style={styles.highLowSlash}>/</BodyText>
            <MonoText weight="500" style={styles.lowVal}>
              {token.low24h}
            </MonoText>
          </View>
        </View>

        <View style={styles.statRow}>
          <BodyText style={styles.statLabel}>Network Protocol</BodyText>
          <View style={styles.protocolWrap}>
            <View style={styles.greenDot} />
            <BodyText style={styles.protocolText}>{token.protocol}</BodyText>
          </View>
        </View>

        <View style={[styles.statRow, styles.lastStatRow]}>
          <BodyText style={styles.statLabel}>Contract Address</BodyText>
          <Pressable
            onPress={handleCopyContract}
            accessibilityRole="button"
            accessibilityLabel="Copy contract address"
            style={({ pressed }) => [
              styles.copyContractBtn,
              pressed && styles.copyContractPressed,
            ]}>
            <MonoText style={styles.contractAddress}>
              {copied ? 'Copied!' : truncatedContract}
            </MonoText>
            <Icon
              name={copied ? icons.check : icons.copy}
              size={14}
              color={copied ? colors.success : colors.outline}
            />
          </Pressable>
        </View>
      </Card>

      {/* Recent Transactions Section */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <HeadlineText weight="700" style={styles.sectionTitle}>
            Recent Transactions
          </HeadlineText>
          <Pressable
            onPress={() => router.push('/history')}
            accessibilityRole="button"
            accessibilityLabel="View all transactions">
            <BodyText weight="500" style={styles.viewAllText}>
              View All
            </BodyText>
          </Pressable>
        </View>

        <View style={styles.txList}>
          {token.recentTransactions.map((tx) => (
            <TransactionRow
              key={tx.id}
              tx={tx}
              onPress={() => router.push(`/history/${tx.id}`)}
            />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  networkBadgeWrap: {
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  networkBadgeText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
  },
  hero: {
    alignItems: 'center',
    paddingTop: spacing.xs,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    position: 'relative',
  },
  glyph: {
    fontSize: 26,
    lineHeight: 32,
  },
  miniBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: colors.surfaceHighest,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.sm,
    paddingHorizontal: 6,
    paddingVertical: 1,
  },
  miniBadgeText: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.cyan,
    letterSpacing: 0.5,
  },
  balanceCaption: {
    ...typography.bodyDefault,
    color: colors.outline,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: 4,
  },
  balanceAmount: {
    ...typography.displayBalanceMobile,
    fontFamily: typography.dataMono.fontFamily,
    color: colors.textPrimary,
  },
  balanceSymbol: {
    ...typography.sectionTitle,
    color: colors.outline,
  },
  fiatAmount: {
    ...typography.bodyDefault,
    fontWeight: '600',
    color: colors.cyan,
    marginTop: 2,
  },
  fiatUnit: {
    ...typography.caption,
    color: colors.outline,
    fontWeight: '400',
  },
  pricePill: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  pricePillLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  pricePillValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  changeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(14, 203, 129, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.2)',
  },
  changeChipText: {
    fontSize: 11,
    lineHeight: 14,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
    height: 48,
  },
  statsCard: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(68, 70, 85, 0.2)',
  },
  lastStatRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  statLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  statValue: {
    ...typography.dataMono,
    color: colors.textPrimary,
  },
  highLowWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  highVal: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  highLowSlash: {
    ...typography.caption,
    color: colors.outline,
    marginHorizontal: 4,
  },
  lowVal: {
    ...typography.dataMonoSm,
    color: colors.error,
  },
  protocolWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  protocolText: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
  },
  copyContractBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  copyContractPressed: {
    backgroundColor: colors.surfaceHigh,
  },
  contractAddress: {
    ...typography.dataMonoSm,
    color: colors.cyan,
  },
  recentSection: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  viewAllText: {
    ...typography.bodySecondary,
    color: colors.primaryTint,
  },
  txList: {
    gap: spacing.sm,
  },
});
