import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  IconButton,
  MonoText,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { MOCK_WALLET_ADDRESS } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function SwapProcessingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    paySymbol?: string;
    payAmount?: string;
    receiveSymbol?: string;
    receiveAmount?: string;
  }>();

  const paySymbol = params.paySymbol ?? 'ETH';
  const payAmount = params.payAmount ?? '0.85';
  const receiveSymbol = params.receiveSymbol ?? 'USDT';
  const receiveAmount = params.receiveAmount ?? '2,928.15';

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace({
        pathname: '/swap/completed',
        params: {
          paySymbol,
          payAmount,
          receiveSymbol,
          receiveAmount,
        },
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, [paySymbol, payAmount, receiveSymbol, receiveAmount, router]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Screen contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader
        title="Processing Swap"
        onBack={() => router.replace('/')}
      />

      {/* Main Spinner Hero */}
      <View style={styles.heroSection}>
        <View style={styles.spinnerWrapper}>
          <ActivityIndicator size="large" color={colors.brand} />
          <View style={styles.centerIconWrap}>
            <Icon name={icons.swap} size={28} color={colors.brand} />
          </View>
        </View>

        <HeadlineText weight="700" style={styles.headline}>
          Swapping {paySymbol} to {receiveSymbol}
        </HeadlineText>

        <View style={styles.stepPill}>
          <View style={styles.pulsingDot} />
          <BodyText weight="600" style={styles.stepText}>
            Step 2 of 3 • Validating on-chain
          </BodyText>
        </View>

        <BodyText style={styles.latencyText}>
          Estimated confirmation: ~25 seconds
        </BodyText>
      </View>

      {/* Order Summary Card */}
      <Card variant="low" style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <BodyText style={styles.summaryLabel}>Swapping</BodyText>
          <MonoText weight="500" style={styles.summaryValue}>
            {payAmount} {paySymbol} → {receiveAmount} {receiveSymbol}
          </MonoText>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryRow}>
          <BodyText style={styles.summaryLabel}>Network</BodyText>
          <View style={styles.networkBadge}>
            <View style={styles.greenDot} />
            <BodyText style={styles.networkText}>Ethereum Mainnet</BodyText>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <BodyText style={styles.summaryLabel}>Simulated Tx ID</BodyText>
          <View style={styles.txWrap}>
            <MonoText style={styles.txText}>
              {`${MOCK_WALLET_ADDRESS.slice(0, 8)}...${MOCK_WALLET_ADDRESS.slice(-6)}`}
            </MonoText>
            <IconButton
              accessibilityLabel="Copy transaction ID"
              size={28}
              shape="square"
              variant="ghost"
              icon={
                <Icon
                  name={copied ? icons.check : icons.copy}
                  size={14}
                  color={copied ? colors.success : colors.outline}
                />
              }
              onPress={handleCopy}
            />
          </View>
        </View>
      </Card>

      {/* Speed up notice */}
      <View style={styles.footerNote}>
        <Icon name={icons.info} size={14} color={colors.outline} />
        <BodyText style={styles.footerNoteText}>
          You can safely leave this screen. The transaction will complete in the
          background.
        </BodyText>
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
    marginBottom: spacing.sm,
  },
  centerIconWrap: {
    position: 'absolute',
  },
  headline: {
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: 'center',
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
  latencyText: {
    ...typography.caption,
    color: colors.outline,
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
  summaryDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
  },
  networkBadge: {
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
  networkText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  txWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  txText: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    paddingHorizontal: spacing.sm,
    marginTop: 'auto',
  },
  footerNoteText: {
    ...typography.caption,
    color: colors.outline,
    flex: 1,
    lineHeight: 18,
  },
});
