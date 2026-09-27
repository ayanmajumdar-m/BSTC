import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  MonoText,
  PrimaryButton,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { getSwapQuote } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function SwapReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    paySymbol?: string;
    payAmount?: string;
    receiveSymbol?: string;
    receiveAmount?: string;
    slippage?: string;
  }>();

  const payAmount = params.payAmount ?? '0.85';
  const paySymbol = params.paySymbol ?? 'ETH';
  const receiveAmount = params.receiveAmount ?? '2,928.15';
  const receiveSymbol = params.receiveSymbol ?? 'USDT';
  const slippage = params.slippage ?? '0.5%';

  const quote = getSwapQuote(payAmount, slippage);

  const payGlyph = paySymbol === 'ETH' ? 'Ξ' : '₮';
  const payColor = paySymbol === 'ETH' ? colors.ethereum : colors.usdt;

  const receiveGlyph = receiveSymbol === 'ETH' ? 'Ξ' : '₮';
  const receiveColor = receiveSymbol === 'ETH' ? colors.ethereum : colors.usdt;

  const handleConfirm = () => {
    router.replace({
      pathname: '/swap/processing',
      params: {
        paySymbol,
        payAmount,
        receiveSymbol,
        receiveAmount,
      },
    });
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader title="Review Swap" onBack={() => router.back()} />

      {/* Visual Conversion Card */}
      <Card variant="low" style={styles.conversionCard}>
        {/* You Pay Row */}
        <View style={styles.conversionRow}>
          <View style={styles.tokenMetaLeft}>
            <View
              style={[
                styles.tokenCircle,
                { backgroundColor: `${payColor}22` },
              ]}>
              <HeadlineText
                weight="700"
                style={[styles.tokenGlyph, { color: payColor }]}>
                {payGlyph}
              </HeadlineText>
            </View>
            <View>
              <BodyText style={styles.directionLabel}>You Pay</BodyText>
              <HeadlineText weight="700" style={styles.tokenAmount}>
                {payAmount} {paySymbol}
              </HeadlineText>
            </View>
          </View>
          <MonoText style={styles.fiatAmount}>{quote.payFiat}</MonoText>
        </View>

        {/* Central Connector */}
        <View style={styles.connectorRow}>
          <View style={styles.connectorLine} />
          <View style={styles.connectorBadge}>
            <Icon name={icons.arrowDown} size={16} color={colors.brand} />
          </View>
          <View style={styles.connectorLine} />
        </View>

        {/* You Receive Row */}
        <View style={styles.conversionRow}>
          <View style={styles.tokenMetaLeft}>
            <View
              style={[
                styles.tokenCircle,
                { backgroundColor: `${receiveColor}22` },
              ]}>
              <HeadlineText
                weight="700"
                style={[styles.tokenGlyph, { color: receiveColor }]}>
                {receiveGlyph}
              </HeadlineText>
            </View>
            <View>
              <BodyText style={styles.directionLabel}>You Receive</BodyText>
              <HeadlineText weight="700" style={styles.tokenAmount}>
                {receiveAmount} {receiveSymbol}
              </HeadlineText>
            </View>
          </View>
          <MonoText style={styles.fiatAmount}>{quote.receiveFiat}</MonoText>
        </View>

        {/* Rate Banner */}
        <View style={styles.rateBanner}>
          <Icon name={icons.sync} size={14} color={colors.outline} />
          <MonoText style={styles.rateBannerText}>
            1 {paySymbol} ≈ {quote.exchangeRate.split('≈')[1]?.trim() ?? '3,444.88 USDT'}
          </MonoText>
        </View>
      </Card>

      {/* Breakdown Card */}
      <Card variant="low" style={styles.breakdownCard}>
        <HeadlineText weight="600" style={styles.breakdownTitle}>
          Transaction Breakdown
        </HeadlineText>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>Price Impact</BodyText>
          <MonoText style={styles.optimalText}>
            {quote.priceImpact} (Optimal)
          </MonoText>
        </View>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>Estimated Network Fee</BodyText>
          <MonoText style={styles.breakdownValue}>
            {quote.networkGas}{' '}
            <MonoText style={styles.breakdownSub}>({quote.gasCrypto})</MonoText>
          </MonoText>
        </View>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>BSTC Protocol Fee</BodyText>
          <MonoText style={styles.freeFeeText}>$0.00 (Promo Free)</MonoText>
        </View>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>Slippage Tolerance</BodyText>
          <MonoText style={styles.breakdownValue}>{slippage} (Auto)</MonoText>
        </View>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>Minimum Received</BodyText>
          <MonoText weight="500" style={styles.breakdownValue}>
            {quote.minReceived}
          </MonoText>
        </View>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>Routing</BodyText>
          <View style={styles.routingWrap}>
            <Icon name={icons.verified} size={12} color={colors.success} />
            <BodyText style={styles.routingText}>BSTC DEX Aggregator</BodyText>
          </View>
        </View>
      </Card>

      {/* Trust & MEV Protection Card */}
      <Card variant="low" style={styles.trustCard}>
        <View style={styles.trustHeader}>
          <View style={styles.shieldWrap}>
            <Icon name={icons.shield} size={16} color={colors.brand} />
          </View>
          <BodyText weight="600" style={styles.trustTitle}>
            Protected by MEV-guard & Slippage Armor
          </BodyText>
        </View>
        <BodyText style={styles.trustDescription}>
          Transactions are simulated before broadcast to prevent frontrunning
          and sandwich attacks on Ethereum.
        </BodyText>
      </Card>

      {/* Bottom CTA Action */}
      <View style={styles.actionWrap}>
        <PrimaryButton
          label="Confirm Swap"
          icon={<Icon name={icons.lock} size={18} color="#FFFFFF" />}
          style={styles.confirmBtn}
          onPress={handleConfirm}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  conversionCard: {
    padding: 16,
    gap: 14,
  },
  conversionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tokenMetaLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  tokenCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenGlyph: {
    fontSize: 18,
  },
  directionLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  tokenAmount: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  fiatAmount: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  connectorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: -4,
  },
  connectorLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.25)',
  },
  connectorBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  rateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainer,
    marginTop: 4,
  },
  rateBannerText: {
    ...typography.dataMonoSm,
    fontSize: 12,
    color: colors.outline,
  },
  breakdownCard: {
    padding: 16,
    gap: 14,
  },
  breakdownTitle: {
    ...typography.sectionTitle,
    fontSize: 15,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  breakdownLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  breakdownValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  breakdownSub: {
    color: colors.outline,
  },
  optimalText: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  freeFeeText: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  routingWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  routingText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  trustCard: {
    padding: 14,
    gap: 6,
    backgroundColor: 'rgba(35, 74, 213, 0.08)',
    borderColor: 'rgba(35, 74, 213, 0.25)',
  },
  trustHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shieldWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(35, 74, 213, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustTitle: {
    ...typography.caption,
    color: colors.textPrimary,
    fontSize: 13,
  },
  trustDescription: {
    ...typography.caption,
    color: colors.outline,
    lineHeight: 18,
    paddingLeft: 32,
  },
  actionWrap: {
    marginTop: spacing.xs,
  },
  confirmBtn: {
    width: '100%',
    height: 48,
  },
});
