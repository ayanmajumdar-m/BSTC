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
import { MOCK_WALLET_ADDRESS } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function BuyReviewScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    fiatAmount?: string;
    cryptoAmount?: string;
    cryptoSymbol?: string;
    methodName?: string;
    provider?: string;
    feeEstimated?: string;
  }>();

  const fiatAmount = params.fiatAmount ?? '500.00';
  const cryptoAmount = params.cryptoAmount ?? '0.1555';
  const cryptoSymbol = params.cryptoSymbol ?? 'ETH';
  const methodName = params.methodName ?? 'Apple Pay / Google Pay';
  const provider = params.provider ?? 'MoonPay';

  const fiatNum = parseFloat(fiatAmount) || 500;
  const feeNum = 14.25;
  const purchaseNum = (fiatNum - feeNum).toFixed(2);

  const handlePay = () => {
    router.push({
      pathname: '/buy/processing',
      params: {
        fiatAmount,
        cryptoAmount,
        cryptoSymbol,
        provider,
      },
    });
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader title="Review Order" onBack={() => router.back()} />

      {/* Main Order Card */}
      <Card variant="low" style={styles.orderCard}>
        <BodyText style={styles.orderLabel}>You Receive</BodyText>
        <HeadlineText weight="700" style={styles.orderAmount}>
          {cryptoAmount} {cryptoSymbol}
        </HeadlineText>
        <MonoText style={styles.orderFiat}>
          ≈ ${fiatAmount} USD
        </MonoText>
        <View style={styles.ratePill}>
          <Icon name={icons.sync} size={12} color={colors.outline} />
          <MonoText style={styles.rateText}>1 ETH = $3,123.79 USD</MonoText>
        </View>
      </Card>

      {/* Payment & Routing Info Card */}
      <Card variant="low" style={styles.infoCard}>
        <View style={styles.infoRow}>
          <BodyText style={styles.infoLabel}>Payment Method</BodyText>
          <View style={styles.infoValueWrap}>
            <Icon name={icons.smartphone} size={16} color={colors.textPrimary} />
            <BodyText weight="500" style={styles.infoValue}>
              {methodName}
            </BodyText>
          </View>
        </View>

        <View style={styles.infoDivider} />

        <View style={styles.infoRow}>
          <BodyText style={styles.infoLabel}>Gateway Provider</BodyText>
          <View style={styles.infoValueWrap}>
            <Icon name={icons.verified} size={14} color={colors.success} />
            <BodyText weight="500" style={styles.infoValue}>
              {provider} (Licensed VASP)
            </BodyText>
          </View>
        </View>

        <View style={styles.infoDivider} />

        <View style={styles.infoRow}>
          <BodyText style={styles.infoLabel}>Delivery Destination</BodyText>
          <MonoText style={styles.addressText}>
            Personal Vault ({MOCK_WALLET_ADDRESS.slice(0, 6)}...
            {MOCK_WALLET_ADDRESS.slice(-4)})
          </MonoText>
        </View>
      </Card>

      {/* Financial Breakdown Card */}
      <Card variant="low" style={styles.breakdownCard}>
        <HeadlineText weight="600" style={styles.breakdownTitle}>
          Price & Fee Summary
        </HeadlineText>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>Purchase Amount</BodyText>
          <MonoText style={styles.breakdownValue}>${purchaseNum} USD</MonoText>
        </View>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>Partner & Network Fee</BodyText>
          <MonoText style={styles.breakdownValue}>
            ${feeNum.toFixed(2)} USD
          </MonoText>
        </View>

        <View style={styles.breakdownRow}>
          <BodyText style={styles.breakdownLabel}>BSTC Processing Fee</BodyText>
          <MonoText style={styles.freeFeeText}>$0.00 (Promo Free)</MonoText>
        </View>

        <View style={styles.breakdownDivider} />

        <View style={styles.breakdownRow}>
          <HeadlineText weight="700" style={styles.totalLabel}>
            Total Charged
          </HeadlineText>
          <HeadlineText weight="700" style={styles.totalValue}>
            ${fiatAmount} USD
          </HeadlineText>
        </View>
      </Card>

      {/* Compliance / Terms Note */}
      <BodyText style={styles.termsNote}>
        By clicking Confirm & Pay, you agree to {provider}'s Terms of Service and
        Privacy Policy. On-chain delivery typically finalizes within 2 minutes.
      </BodyText>

      {/* Bottom CTA */}
      <View style={styles.actionWrap}>
        <PrimaryButton
          label={`Confirm & Pay $${fiatAmount}`}
          icon={<Icon name={icons.fingerprint} size={20} color="#FFFFFF" />}
          style={styles.payBtn}
          onPress={handlePay}
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
  orderCard: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: 6,
  },
  orderLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  orderAmount: {
    ...typography.displayBalanceMobile,
    fontSize: 32,
    color: colors.textPrimary,
  },
  orderFiat: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  ratePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
  },
  rateText: {
    ...typography.dataMonoSm,
    fontSize: 11,
    color: colors.outline,
  },
  infoCard: {
    padding: 16,
    gap: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  infoLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  infoValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoValue: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textPrimary,
  },
  addressText: {
    ...typography.dataMonoSm,
    fontSize: 12,
    color: colors.textPrimary,
  },
  infoDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
  },
  breakdownCard: {
    padding: 16,
    gap: 12,
  },
  breakdownTitle: {
    fontSize: 14,
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
  freeFeeText: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  breakdownDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
    marginVertical: 4,
  },
  totalLabel: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  totalValue: {
    fontSize: 18,
    color: colors.brand,
  },
  termsNote: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: spacing.sm,
  },
  actionWrap: {
    marginTop: spacing.xs,
  },
  payBtn: {
    width: '100%',
    height: 48,
  },
});
