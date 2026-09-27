import { useMemo, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
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
import {
  getPortfolioSnapshot,
  getRecentContacts,
  getTokenDetail,
} from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function SendScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    tokenId?: string;
    recipient?: string;
  }>();

  const token = getTokenDetail(params.tokenId);
  const contacts = getRecentContacts();

  const [recipient, setRecipient] = useState(params.recipient ?? '');
  const [amount, setAmount] = useState('0.75');
  const [isUsdMode, setIsUsdMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sentSuccess, setSentSuccess] = useState(false);

  // Quick paste simulation
  const handlePaste = () => {
    setRecipient('0x71C2a8d10b7849204b77f48107764fbc3b413a9');
    setErrorMsg(null);
  };

  // Percentage shortcuts
  const handlePercent = (pct: number) => {
    const total = parseFloat(token.balanceRaw) || 2.45;
    const computed = (total * (pct / 100)).toFixed(4);
    setAmount(computed);
    setErrorMsg(null);
  };

  // Switch between USD and Crypto
  const toggleUnit = () => {
    setIsUsdMode((prev) => !prev);
  };

  const fiatEquivalent = useMemo(() => {
    const amt = parseFloat(amount) || 0;
    const rate = parseFloat(token.priceLabel.replace(/[^0-9.]/g, '')) || 3450.2;
    if (isUsdMode) {
      const cryptoAmt = rate > 0 ? (amt / rate).toFixed(4) : '0';
      return `≈ ${cryptoAmt} ${token.symbol}`;
    }
    const usd = (amt * rate).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `≈ $${usd} USD`;
  }, [amount, isUsdMode, token]);

  const handleContinue = () => {
    if (!recipient.trim()) {
      setErrorMsg('Please enter a recipient address');
      return;
    }
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMsg('Please enter a valid amount');
      return;
    }
    setErrorMsg(null);
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      router.push('/history');
    }, 1800);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Top App Bar Header */}
      <ScreenHeader
        title="Send"
        onBack={() => router.back()}
        right={
          <View style={styles.networkBadge}>
            <View style={styles.greenDot} />
            <BodyText weight="500" style={styles.networkLabel}>
              {token.name}
            </BodyText>
          </View>
        }
      />

      {/* 1. Selected Asset Card */}
      <Card variant="low" style={styles.assetCard}>
        <View style={styles.assetLeft}>
          <View style={styles.tokenCircle}>
            <HeadlineText
              weight="700"
              style={[styles.tokenGlyph, { color: token.iconColor }]}>
              {token.iconGlyph}
            </HeadlineText>
            <View style={styles.tokenDotWrap}>
              <View style={styles.greenDotSm} />
            </View>
          </View>
          <View style={styles.assetMeta}>
            <View style={styles.assetTitleRow}>
              <HeadlineText weight="700" style={styles.assetSymbol}>
                {token.symbol}
              </HeadlineText>
              <BodyText style={styles.assetName}>{token.name}</BodyText>
            </View>
            <MonoText style={styles.assetAvail}>
              Avail:{' '}
              <MonoText weight="500" style={styles.assetAvailHighlight}>
                {token.balanceAmount}
              </MonoText>{' '}
              <MonoText style={styles.assetAvailUsd}>
                ({token.balanceUsd})
              </MonoText>
            </MonoText>
          </View>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Change asset"
          onPress={() =>
            router.push({
              pathname: '/token/select',
              params: { target: 'send' },
            })
          }
          style={({ pressed }) => [
            styles.changeBtn,
            pressed && styles.changeBtnPressed,
          ]}>
          <BodyText weight="600" style={styles.changeBtnText}>
            Change
          </BodyText>
          <Icon name={icons.expandMore} size={16} color={colors.outline} />
        </Pressable>
      </Card>

      {/* 2. Recipient Address Section */}
      <View style={styles.recipientSection}>
        <View style={styles.recipientLabelRow}>
          <BodyText weight="500" style={styles.recipientLabel}>
            Recipient Address
          </BodyText>
          <BodyText style={styles.recipientHint}>ENS or Hex Address</BodyText>
        </View>

        <View
          style={[
            styles.inputWrap,
            errorMsg && !recipient ? styles.inputWrapError : null,
          ]}>
          <TextInput
            value={recipient}
            onChangeText={(text) => {
              setRecipient(text);
              if (errorMsg) setErrorMsg(null);
            }}
            placeholder="0x... or ENS domain"
            placeholderTextColor="rgba(132, 142, 156, 0.5)"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.addressInput}
          />
          <View style={styles.inputAccessories}>
            <Pressable
              onPress={handlePaste}
              accessibilityRole="button"
              accessibilityLabel="Paste address"
              style={({ pressed }) => [
                styles.pasteBtn,
                pressed && styles.pasteBtnPressed,
              ]}>
              <BodyText weight="600" style={styles.pasteText}>
                Paste
              </BodyText>
            </Pressable>
            <IconButton
              accessibilityLabel="Scan recipient QR"
              size={32}
              shape="square"
              variant="ghost"
              icon={
                <Icon
                  name={icons.qrScanner}
                  size={18}
                  color={colors.outline}
                />
              }
              onPress={() =>
                router.push({
                  pathname: '/send/recipient',
                  params: { tokenId: token.id },
                })
              }
            />
          </View>
        </View>

        {/* Quick Contact Chips */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contactsRow}>
          {contacts.map((contact) => (
            <Pressable
              key={contact.id}
              onPress={() => {
                setRecipient(contact.address);
                setErrorMsg(null);
              }}
              style={({ pressed }) => [
                styles.contactChip,
                recipient === contact.address && styles.contactChipActive,
                pressed && styles.contactChipPressed,
              ]}>
              <BodyText weight="500" style={styles.contactName}>
                {contact.name}
              </BodyText>
              <MonoText style={styles.contactAddress}>
                {contact.ens ?? `${contact.address.slice(0, 6)}...`}
              </MonoText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* 3. Amount Input Section */}
      <Card variant="low" style={styles.amountCard}>
        {/* Unit Switcher */}
        <Pressable
          onPress={toggleUnit}
          accessibilityRole="button"
          accessibilityLabel="Toggle currency unit"
          style={styles.unitPill}>
          <Icon name={icons.swapVert} size={14} color={colors.outline} />
          <BodyText style={styles.unitText}>
            {isUsdMode ? 'USD' : token.symbol}
          </BodyText>
        </Pressable>

        <View style={styles.amountCenter}>
          <View style={styles.amountInputRow}>
            <TextInput
              value={amount}
              onChangeText={(text) => {
                setAmount(text);
                if (errorMsg) setErrorMsg(null);
              }}
              keyboardType="decimal-pad"
              style={styles.amountBigInput}
            />
            <HeadlineText weight="700" style={styles.amountSymbol}>
              {isUsdMode ? 'USD' : token.symbol}
            </HeadlineText>
          </View>
          <MonoText style={styles.fiatEstimate}>{fiatEquivalent}</MonoText>
        </View>

        {/* Percentage Shortcuts */}
        <View style={styles.percentGrid}>
          <Pressable
            onPress={() => handlePercent(25)}
            style={({ pressed }) => [
              styles.percentBtn,
              pressed && styles.percentPressed,
            ]}>
            <MonoText style={styles.percentText}>25%</MonoText>
          </Pressable>
          <Pressable
            onPress={() => handlePercent(50)}
            style={({ pressed }) => [
              styles.percentBtn,
              pressed && styles.percentPressed,
            ]}>
            <MonoText style={styles.percentText}>50%</MonoText>
          </Pressable>
          <Pressable
            onPress={() => handlePercent(75)}
            style={({ pressed }) => [
              styles.percentBtn,
              pressed && styles.percentPressed,
            ]}>
            <MonoText style={styles.percentText}>75%</MonoText>
          </Pressable>
          <Pressable
            onPress={() => handlePercent(100)}
            style={({ pressed }) => [
              styles.maxBtn,
              pressed && styles.maxPressed,
            ]}>
            <MonoText weight="600" style={styles.maxText}>
              MAX
            </MonoText>
          </Pressable>
        </View>

        <View style={styles.availRow}>
          <BodyText style={styles.availLabel}>Available to send:</BodyText>
          <MonoText weight="500" style={styles.availValue}>
            {token.balanceAmount}
          </MonoText>
        </View>
      </Card>

      {/* 4. Network Fee Estimate Card */}
      <Card variant="low" style={styles.gasCard}>
        <View style={styles.gasTopRow}>
          <View style={styles.gasLabelWrap}>
            <Icon name={icons.gas} size={16} color={colors.success} />
            <BodyText weight="500" style={styles.gasLabel}>
              Estimated Network Fee
            </BodyText>
          </View>
          <View style={styles.gasSpeedPill}>
            <BodyText style={styles.gasSpeedText}>Normal • ~15s</BodyText>
            <Icon name={icons.edit} size={12} color={colors.outline} />
          </View>
        </View>

        <View style={styles.gasBottomRow}>
          <MonoText weight="600" style={styles.gasAmount}>
            $1.42{' '}
            <MonoText style={styles.gasAmountCrypto}>0.00044 ETH</MonoText>
          </MonoText>
          <View style={styles.gweiWrap}>
            <View style={styles.greenDotSm} />
            <MonoText style={styles.gweiText}>12 Gwei</MonoText>
          </View>
        </View>
      </Card>

      {errorMsg ? (
        <BodyText style={styles.errorBanner}>{errorMsg}</BodyText>
      ) : null}

      {/* 5. Primary Continue Action Button */}
      <View style={styles.actionWrap}>
        <PrimaryButton
          label={sentSuccess ? 'Transaction Sent!' : 'Continue'}
          icon={
            !sentSuccess ? (
              <Icon name={icons.arrowForward} size={20} color="#FFFFFF" />
            ) : (
              <Icon name={icons.check} size={20} color="#FFFFFF" />
            )
          }
          style={sentSuccess ? styles.successBtn : styles.continueBtn}
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
  networkBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  greenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  greenDotSm: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.success,
  },
  networkLabel: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  assetCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
  },
  assetLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  tokenCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surfaceHighest,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  tokenGlyph: {
    fontSize: 18,
    lineHeight: 24,
  },
  tokenDotWrap: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assetMeta: {
    flex: 1,
    gap: 2,
  },
  assetTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  assetSymbol: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  assetName: {
    ...typography.caption,
    color: colors.outline,
  },
  assetAvail: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  assetAvailHighlight: {
    color: colors.textPrimary,
  },
  assetAvailUsd: {
    color: colors.outline,
    opacity: 0.8,
  },
  changeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  changeBtnPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  changeBtnText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  recipientSection: {
    gap: spacing.sm,
  },
  recipientLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  recipientLabel: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.4,
  },
  recipientHint: {
    ...typography.caption,
    color: colors.outline,
    opacity: 0.8,
  },
  inputWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceLow,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    minHeight: 52,
    paddingHorizontal: 12,
  },
  inputWrapError: {
    borderColor: colors.error,
  },
  addressInput: {
    flex: 1,
    fontFamily: typography.dataMono.fontFamily,
    fontSize: 14,
    color: colors.textPrimary,
    paddingVertical: 12,
    paddingRight: 80,
  },
  inputAccessories: {
    position: 'absolute',
    right: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pasteBtn: {
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
  },
  pasteBtnPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  pasteText: {
    ...typography.caption,
    color: colors.primaryTint,
  },
  contactsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingVertical: 2,
  },
  contactChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  contactChipActive: {
    borderColor: colors.brand,
  },
  contactChipPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  contactName: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  contactAddress: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
  },
  amountCard: {
    padding: spacing.lg,
    alignItems: 'center',
    position: 'relative',
  },
  unitPill: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  unitText: {
    ...typography.caption,
    color: colors.outline,
  },
  amountCenter: {
    alignItems: 'center',
    marginTop: spacing.md,
  },
  amountInputRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 6,
  },
  amountBigInput: {
    ...typography.displayBalanceMobile,
    color: colors.textPrimary,
    textAlign: 'center',
    minWidth: 80,
    paddingVertical: 0,
  },
  amountSymbol: {
    ...typography.sectionTitle,
    color: colors.brand,
  },
  fiatEstimate: {
    ...typography.dataMono,
    color: colors.outline,
    marginTop: 2,
  },
  percentGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    width: '100%',
    marginTop: spacing.lg,
  },
  percentBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentPressed: {
    borderColor: colors.brand,
  },
  percentText: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  maxBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  maxPressed: {
    backgroundColor: colors.brandHover,
  },
  maxText: {
    ...typography.dataMonoSm,
    color: '#FFFFFF',
  },
  availRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(68, 70, 85, 0.2)',
  },
  availLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  availValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  gasCard: {
    padding: 14,
    gap: spacing.sm,
  },
  gasTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gasLabelWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gasLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  gasSpeedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceContainer,
  },
  gasSpeedText: {
    ...typography.caption,
    color: colors.cyan,
  },
  gasBottomRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
  gasAmount: {
    ...typography.dataMono,
    color: colors.textPrimary,
  },
  gasAmountCrypto: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  gweiWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gweiText: {
    ...typography.dataMonoSm,
    color: colors.success,
  },
  errorBanner: {
    ...typography.caption,
    color: colors.error,
    textAlign: 'center',
  },
  actionWrap: {
    marginTop: spacing.xs,
  },
  continueBtn: {
    width: '100%',
    height: 48,
  },
  successBtn: {
    width: '100%',
    height: 48,
    backgroundColor: colors.success,
  },
});
