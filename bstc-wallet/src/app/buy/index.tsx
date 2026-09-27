import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

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
import { getBuyQuote } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function BuyScreen() {
  const router = useRouter();

  const [fiatAmount, setFiatAmount] = useState('500');
  const quote = useMemo(() => getBuyQuote(fiatAmount), [fiatAmount]);

  const shortcutAmounts = ['100', '250', '500', '1000'];

  const handleContinue = () => {
    router.push({
      pathname: '/buy/payment',
      params: {
        fiatAmount: quote.fiatAmount,
        cryptoAmount: quote.cryptoAmount,
        cryptoSymbol: quote.cryptoSymbol,
      },
    });
  };

  return (
    <Screen scroll keyboardAvoiding contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader
        title="Buy Crypto"
        onBack={() => router.back()}
        right={
          <View style={styles.verifiedPill}>
            <Icon name={icons.shield} size={14} color={colors.success} />
            <BodyText style={styles.verifiedText}>Fiat Gateway</BodyText>
          </View>
        }
      />

      {/* 1. You Pay (Fiat) Card */}
      <Card variant="low" style={styles.inputCard}>
        <View style={styles.cardHeaderRow}>
          <BodyText weight="500" style={styles.cardLabel}>
            You Pay
          </BodyText>
          <View style={styles.currencyPill}>
            <BodyText weight="600" style={styles.currencyCode}>
              USD
            </BodyText>
            <Icon name={icons.expandMore} size={14} color={colors.outline} />
          </View>
        </View>

        <View style={styles.amountInputRow}>
          <HeadlineText weight="700" style={styles.fiatSymbol}>
            $
          </HeadlineText>
          <TextInput
            value={fiatAmount}
            onChangeText={setFiatAmount}
            keyboardType="number-pad"
            placeholder="0"
            placeholderTextColor="rgba(132, 142, 156, 0.4)"
            style={styles.amountInput}
          />
        </View>

        {/* Amount Preset Chips */}
        <View style={styles.presetChipsRow}>
          {shortcutAmounts.map((amt) => (
            <Pressable
              key={amt}
              onPress={() => setFiatAmount(amt)}
              style={({ pressed }) => [
                styles.presetChip,
                fiatAmount === amt && styles.presetChipActive,
                pressed && styles.presetChipPressed,
              ]}>
              <MonoText
                weight={fiatAmount === amt ? '700' : '500'}
                style={[
                  styles.presetChipText,
                  fiatAmount === amt && styles.presetChipTextActive,
                ]}>
                ${amt}
              </MonoText>
            </Pressable>
          ))}
        </View>
      </Card>

      {/* Live Rate Banner */}
      <View style={styles.rateBanner}>
        <Icon name={icons.sync} size={14} color={colors.brand} />
        <MonoText style={styles.rateText}>{quote.exchangeRate}</MonoText>
      </View>

      {/* 2. You Receive (Crypto) Card */}
      <Card variant="low" style={styles.inputCard}>
        <View style={styles.cardHeaderRow}>
          <BodyText weight="500" style={styles.cardLabel}>
            You Receive (Estimated)
          </BodyText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Select crypto token"
            onPress={() =>
              router.push({
                pathname: '/token/select',
                params: { target: 'buy' },
              })
            }
            style={({ pressed }) => [
              styles.tokenPill,
              pressed && styles.tokenPillPressed,
            ]}>
            <View style={styles.tokenCircleSm}>
              <HeadlineText weight="700" style={styles.tokenGlyphSm}>
                Ξ
              </HeadlineText>
            </View>
            <HeadlineText weight="700" style={styles.tokenSymbol}>
              {quote.cryptoSymbol}
            </HeadlineText>
            <Icon name={icons.expandMore} size={16} color={colors.outline} />
          </Pressable>
        </View>

        <View style={styles.receiveAmountRow}>
          <HeadlineText weight="700" style={styles.receiveAmountBig}>
            {quote.cryptoAmount}
          </HeadlineText>
          <HeadlineText weight="700" style={styles.receiveSymbolBadge}>
            {quote.cryptoSymbol}
          </HeadlineText>
        </View>
      </Card>

      {/* 3. Destination Vault Card */}
      <Card variant="low" style={styles.destinationCard}>
        <View style={styles.destinationLeft}>
          <View style={styles.walletIconWrap}>
            <Icon
              name={icons.wallet}
              size={18}
              color={colors.primaryTint}
            />
          </View>
          <View>
            <BodyText style={styles.destinationLabel}>Deposit Destination</BodyText>
            <HeadlineText weight="600" style={styles.destinationAddress}>
              Personal Vault ({quote.destinationAddress.slice(0, 6)}...
              {quote.destinationAddress.slice(-4)})
            </HeadlineText>
          </View>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change destination"
          style={({ pressed }) => [
            styles.changeBtn,
            pressed && styles.changeBtnPressed,
          ]}>
          <BodyText weight="600" style={styles.changeBtnText}>
            Change
          </BodyText>
        </Pressable>
      </Card>

      {/* 4. Estimated Fees Card */}
      <Card variant="low" style={styles.feesCard}>
        <View style={styles.feeRow}>
          <BodyText style={styles.feeLabel}>Network Gas Fee</BodyText>
          <MonoText style={styles.feeValue}>{quote.networkFee}</MonoText>
        </View>
        <View style={styles.feeRow}>
          <BodyText style={styles.feeLabel}>BSTC Processing Fee</BodyText>
          <MonoText style={styles.feePromo}>{quote.processingFee}</MonoText>
        </View>
      </Card>

      {/* Bottom CTA */}
      <View style={styles.actionWrap}>
        <PrimaryButton
          label="Select Payment Method"
          icon={<Icon name={icons.arrowForward} size={20} color="#FFFFFF" />}
          style={styles.continueBtn}
          onPress={handleContinue}
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
  verifiedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: 'rgba(14, 203, 129, 0.1)',
  },
  verifiedText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '500',
  },
  inputCard: {
    padding: 16,
    gap: 12,
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  currencyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceContainer,
  },
  currencyCode: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  fiatSymbol: {
    fontSize: 32,
    color: colors.outline,
  },
  amountInput: {
    ...typography.displayBalanceMobile,
    fontSize: 36,
    color: colors.textPrimary,
    flex: 1,
    paddingVertical: 0,
  },
  presetChipsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 4,
  },
  presetChip: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetChipActive: {
    borderColor: colors.brand,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
  },
  presetChipPressed: {
    backgroundColor: colors.surfaceHigh,
  },
  presetChipText: {
    ...typography.dataMonoSm,
    fontSize: 12,
    color: colors.outline,
  },
  presetChipTextActive: {
    color: colors.textPrimary,
  },
  rateBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainer,
    marginVertical: -4,
  },
  rateText: {
    ...typography.dataMonoSm,
    fontSize: 12,
    color: colors.outline,
  },
  tokenPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  tokenPillPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  tokenCircleSm: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: 'rgba(98, 126, 234, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenGlyphSm: {
    fontSize: 12,
    color: colors.ethereum,
  },
  tokenSymbol: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  receiveAmountRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  receiveAmountBig: {
    ...typography.displayBalanceMobile,
    fontSize: 32,
    color: colors.textPrimary,
  },
  receiveSymbolBadge: {
    fontSize: 16,
    color: colors.brand,
  },
  destinationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  destinationLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  walletIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  destinationLabel: {
    ...typography.caption,
    color: colors.outline,
    fontSize: 11,
  },
  destinationAddress: {
    ...typography.caption,
    fontSize: 13,
    color: colors.textPrimary,
  },
  changeBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceContainer,
  },
  changeBtnPressed: {
    backgroundColor: colors.surfaceHigh,
  },
  changeBtnText: {
    ...typography.caption,
    color: colors.outline,
    fontSize: 12,
  },
  feesCard: {
    padding: 14,
    gap: 10,
  },
  feeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  feeLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  feeValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  feePromo: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  actionWrap: {
    marginTop: spacing.xs,
  },
  continueBtn: {
    width: '100%',
    height: 48,
  },
});
