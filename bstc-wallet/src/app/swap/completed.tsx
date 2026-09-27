import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
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
} from '@/components/ui';
import { MOCK_WALLET_ADDRESS } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function SwapCompletedScreen() {
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

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDone = () => {
    router.replace('/');
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Header with Close action */}
      <ScreenHeader
        title=""
        onBack={handleDone}
        right={
          <IconButton
            accessibilityLabel="Close"
            size={36}
            shape="circle"
            variant="ghost"
            icon={<Icon name={icons.close} size={20} color={colors.outline} />}
            onPress={handleDone}
          />
        }
      />

      {/* Hero Success */}
      <View style={styles.heroSection}>
        <View style={styles.successHalo}>
          <Icon name={icons.checkCircle} size={48} color={colors.success} />
        </View>

        <HeadlineText weight="700" style={styles.headline}>
          Swap Successful
        </HeadlineText>

        <BodyText style={styles.subtitle}>
          Your tokens have arrived in your wallet
        </BodyText>
      </View>

      {/* Received Amount Card */}
      <Card variant="low" style={styles.receivedCard}>
        <BodyText style={styles.receivedLabel}>You Received</BodyText>
        <HeadlineText weight="700" style={styles.receivedAmount}>
          +{receiveAmount} {receiveSymbol}
        </HeadlineText>
        <MonoText style={styles.receivedFiat}>
          ≈ ${receiveAmount} USD
        </MonoText>
        <View style={styles.swappedFromWrap}>
          <BodyText style={styles.swappedFromText}>
            Swapped from {payAmount} {paySymbol}
          </BodyText>
        </View>
      </Card>

      {/* Details Card */}
      <Card variant="low" style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Status</BodyText>
          <View style={styles.statusPill}>
            <View style={styles.greenDot} />
            <BodyText weight="600" style={styles.statusText}>
              Completed
            </BodyText>
          </View>
        </View>

        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Network</BodyText>
          <BodyText weight="500" style={styles.detailValue}>
            Ethereum Mainnet
          </BodyText>
        </View>

        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Transaction ID</BodyText>
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

        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Network Gas Fee</BodyText>
          <MonoText style={styles.detailValue}>0.0009 ETH ($3.20)</MonoText>
        </View>

        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Completed At</BodyText>
          <MonoText style={styles.detailValue}>Just now</MonoText>
        </View>
      </Card>

      {/* Actions */}
      <View style={styles.actionSection}>
        <Button
          label="View on Etherscan"
          variant="outline"
          icon={<Icon name={icons.openInNew} size={16} color={colors.outline} />}
          style={styles.explorerBtn}
          onPress={() => {}}
        />

        <PrimaryButton
          label="Done"
          style={styles.doneBtn}
          onPress={handleDone}
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
  heroSection: {
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.md,
  },
  successHalo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  headline: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.outline,
    fontSize: 14,
  },
  receivedCard: {
    padding: spacing.lg,
    alignItems: 'center',
    gap: 6,
  },
  receivedLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  receivedAmount: {
    ...typography.displayBalanceMobile,
    fontSize: 28,
    color: colors.success,
  },
  receivedFiat: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  swappedFromWrap: {
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
  },
  swappedFromText: {
    fontSize: 11,
    color: colors.outline,
  },
  detailsCard: {
    padding: 16,
    gap: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  detailValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statusText: {
    fontSize: 11,
    color: colors.success,
  },
  txWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  txText: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  actionSection: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  explorerBtn: {
    width: '100%',
    height: 48,
  },
  doneBtn: {
    width: '100%',
    height: 48,
  },
});
