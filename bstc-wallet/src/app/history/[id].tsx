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
  Screen,
  ScreenHeader,
  SecondaryButton,
} from '@/components/ui';
import { getTransactionDetail } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function TransactionDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const tx = getTransactionDetail(id);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (field: string, text: string) => {
    setCopiedField(field);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const isReceived = tx.kind === 'received';
  const isSent = tx.kind === 'sent';

  const iconName = isReceived
    ? icons.arrowDown
    : isSent
      ? icons.arrowUp
      : icons.swap;

  const iconBg = isReceived
    ? 'rgba(14, 203, 129, 0.18)'
    : isSent
      ? 'rgba(246, 70, 93, 0.15)'
      : 'rgba(35, 74, 213, 0.25)';

  const iconBorder = isReceived
    ? 'rgba(14, 203, 129, 0.3)'
    : isSent
      ? 'rgba(246, 70, 93, 0.3)'
      : 'rgba(184, 195, 255, 0.3)';

  const iconColor = isReceived
    ? colors.success
    : isSent
      ? colors.error
      : colors.primaryTint;

  const amountColor = isReceived
    ? colors.success
    : isSent
      ? colors.textPrimary
      : colors.textPrimary;

  const truncate = (val: string) =>
    val.length > 16 ? `${val.slice(0, 8)}...${val.slice(-6)}` : val;

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Transaction Details"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Share transaction"
            size={36}
            shape="square"
            variant="ghost"
            icon={<Icon name={icons.share} size={18} color={colors.outline} />}
          />
        }
      />

      {/* Hero Section */}
      <View style={styles.hero}>
        <View
          style={[
            styles.iconCircle,
            { backgroundColor: iconBg, borderColor: iconBorder },
          ]}>
          <Icon name={iconName} size={28} color={iconColor} />
        </View>

        <HeadlineText weight="700" style={[styles.primaryAmt, { color: amountColor }]}>
          {tx.primaryAmount}
        </HeadlineText>

        <MonoText style={styles.secondaryAmt}>{tx.secondaryAmount}</MonoText>

        <View style={styles.badgeWrap}>
          <Badge label={tx.status} tone="success" />
        </View>
      </View>

      {/* Details Bento Card */}
      <Card variant="low" style={styles.detailsCard}>
        {/* Date & Time */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Date & Time</BodyText>
          <MonoText weight="500" style={styles.detailValue}>
            {tx.timestamp}
          </MonoText>
        </View>

        {/* Asset */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Asset</BodyText>
          <View style={styles.assetWrap}>
            <BodyText weight="600" style={styles.detailValue}>
              {tx.asset} ({tx.assetSymbol})
            </BodyText>
          </View>
        </View>

        {/* Network */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Network</BodyText>
          <BodyText weight="500" style={styles.detailValue}>
            {tx.network}
          </BodyText>
        </View>

        {/* From */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>From</BodyText>
          <Pressable
            onPress={() => handleCopy('from', tx.fromAddress)}
            style={styles.copyRow}>
            <MonoText style={styles.monoValue}>
              {copiedField === 'from' ? 'Copied!' : truncate(tx.fromAddress)}
            </MonoText>
            <Icon
              name={copiedField === 'from' ? icons.check : icons.copy}
              size={14}
              color={copiedField === 'from' ? colors.success : colors.outline}
            />
          </Pressable>
        </View>

        {/* To */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>To</BodyText>
          <Pressable
            onPress={() => handleCopy('to', tx.toAddress)}
            style={styles.copyRow}>
            <MonoText style={styles.monoValue}>
              {copiedField === 'to' ? 'Copied!' : truncate(tx.toAddress)}
            </MonoText>
            <Icon
              name={copiedField === 'to' ? icons.check : icons.copy}
              size={14}
              color={copiedField === 'to' ? colors.success : colors.outline}
            />
          </Pressable>
        </View>

        {/* Network Fee */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Network Fee</BodyText>
          <MonoText style={styles.detailValue}>{tx.networkFee}</MonoText>
        </View>

        {/* Gas Price */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Gas Price</BodyText>
          <MonoText style={styles.detailValue}>{tx.gasPrice}</MonoText>
        </View>

        {/* Nonce */}
        <View style={styles.detailRow}>
          <BodyText style={styles.detailLabel}>Nonce</BodyText>
          <MonoText style={styles.detailValue}>#{tx.nonce}</MonoText>
        </View>

        {/* Transaction Hash */}
        <View style={[styles.detailRow, styles.lastRow]}>
          <BodyText style={styles.detailLabel}>Transaction Hash</BodyText>
          <Pressable
            onPress={() => handleCopy('hash', tx.txHash)}
            style={styles.copyRow}>
            <MonoText style={styles.monoValue}>
              {copiedField === 'hash' ? 'Copied!' : truncate(tx.txHash)}
            </MonoText>
            <Icon
              name={copiedField === 'hash' ? icons.check : icons.copy}
              size={14}
              color={copiedField === 'hash' ? colors.success : colors.outline}
            />
          </Pressable>
        </View>
      </Card>

      {/* Explorer Action */}
      <View style={styles.actionWrap}>
        <SecondaryButton
          label="View on Block Explorer"
          icon={<Icon name={icons.openInNew} size={18} color={colors.textPrimary} />}
          onPress={() => {}}
          style={styles.explorerBtn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  hero: {
    alignItems: 'center',
    gap: 4,
    paddingTop: spacing.xs,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  primaryAmt: {
    ...typography.displayBalanceMobile,
  },
  secondaryAmt: {
    ...typography.dataMono,
    color: colors.outline,
    marginTop: 2,
  },
  badgeWrap: {
    marginTop: spacing.sm,
  },
  detailsCard: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(68, 70, 85, 0.2)',
  },
  lastRow: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  detailLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  detailValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  assetWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  copyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 2,
  },
  monoValue: {
    ...typography.dataMonoSm,
    color: colors.cyan,
  },
  actionWrap: {
    marginTop: spacing.xs,
  },
  explorerBtn: {
    width: '100%',
    height: 48,
  },
});
