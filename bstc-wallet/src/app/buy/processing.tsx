import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  MonoText,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function BuyProcessingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    fiatAmount?: string;
    cryptoAmount?: string;
    cryptoSymbol?: string;
    provider?: string;
  }>();

  const fiatAmount = params.fiatAmount ?? '500.00';
  const cryptoAmount = params.cryptoAmount ?? '0.1555';
  const cryptoSymbol = params.cryptoSymbol ?? 'ETH';
  const provider = params.provider ?? 'MoonPay';

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace({
        pathname: '/buy/completed',
        params: {
          fiatAmount,
          cryptoAmount,
          cryptoSymbol,
          provider,
        },
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, [fiatAmount, cryptoAmount, cryptoSymbol, provider, router]);

  return (
    <Screen contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader
        title="Processing Purchase"
        onBack={() => router.replace('/')}
      />

      {/* Main Status Hero */}
      <View style={styles.heroSection}>
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size="large" color={colors.brand} />
          <View style={styles.centerIconWrap}>
            <Icon
              name={icons.currencyExchange}
              size={28}
              color={colors.brand}
            />
          </View>
        </View>

        <HeadlineText weight="700" style={styles.headline}>
          Processing Purchase
        </HeadlineText>

        <BodyText style={styles.providerNote}>
          Your order is being processed by {provider}
        </BodyText>

        <View style={styles.stepPill}>
          <View style={styles.pulsingDot} />
          <BodyText weight="600" style={styles.stepText}>
            Step 2 of 2 • Gateway Confirmation
          </BodyText>
        </View>
      </View>

      {/* Order Summary Card */}
      <Card variant="low" style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <BodyText style={styles.summaryLabel}>You Paid</BodyText>
          <MonoText weight="600" style={styles.summaryValue}>
            ${fiatAmount} USD
          </MonoText>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryRow}>
          <BodyText style={styles.summaryLabel}>You Receive</BodyText>
          <MonoText weight="600" style={styles.cryptoValue}>
            +{cryptoAmount} {cryptoSymbol}
          </MonoText>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryRow}>
          <BodyText style={styles.summaryLabel}>Provider</BodyText>
          <BodyText weight="500" style={styles.summaryValue}>
            {provider}
          </BodyText>
        </View>

        <View style={styles.summaryRow}>
          <BodyText style={styles.summaryLabel}>Status</BodyText>
          <View style={styles.statusWrap}>
            <View style={styles.greenDot} />
            <BodyText weight="500" style={styles.statusText}>
              Payment Authorized
            </BodyText>
          </View>
        </View>
      </Card>

      {/* Return Action */}
      <View style={styles.footerAction}>
        <Button
          label="Back to Wallet"
          variant="outline"
          style={styles.backBtn}
          onPress={() => router.replace('/')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xxl,
    justifyContent: 'space-between',
    flex: 1,
  },
  heroSection: {
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.xl,
  },
  spinnerWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(35, 74, 213, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(35, 74, 213, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginBottom: spacing.xs,
  },
  centerIconWrap: {
    position: 'absolute',
  },
  headline: {
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  providerNote: {
    ...typography.caption,
    color: colors.outline,
    fontSize: 14,
  },
  stepPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginTop: spacing.xs,
  },
  pulsingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  stepText: {
    ...typography.caption,
    color: colors.brand,
  },
  summaryCard: {
    padding: 16,
    gap: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  summaryLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  summaryValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  cryptoValue: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
  },
  statusWrap: {
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
  statusText: {
    ...typography.caption,
    color: colors.success,
  },
  footerAction: {
    marginTop: 'auto',
  },
  backBtn: {
    width: '100%',
    height: 48,
  },
});
