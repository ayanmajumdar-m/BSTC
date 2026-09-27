import { useMemo, useState } from 'react';
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
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
import { getPortfolioSnapshot, getSwapQuote } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function SwapScreen() {
  const router = useRouter();

  // Slippage state
  const [slippage, setSlippage] = useState('0.5%');
  const [showSlippageModal, setShowSlippageModal] = useState(false);

  // Form tokens & amounts
  const [paySymbol, setPaySymbol] = useState<'ETH' | 'USDT'>('ETH');
  const [payAmount, setPayAmount] = useState('0.85');

  // Reverse mapping for direction flip
  const receiveSymbol = paySymbol === 'ETH' ? 'USDT' : 'ETH';

  const quote = useMemo(() => {
    return getSwapQuote(payAmount, slippage);
  }, [payAmount, slippage]);

  // Handle switching pay & receive
  const handleSwitchDirection = () => {
    setPaySymbol((prev) => (prev === 'ETH' ? 'USDT' : 'ETH'));
    // If switching, flip amounts proportionally
    if (paySymbol === 'ETH') {
      setPayAmount('2928.15');
    } else {
      setPayAmount('0.85');
    }
  };

  const handlePercent = (pct: number) => {
    const total = paySymbol === 'ETH' ? 1.45 : 4120.5;
    const computed = (total * (pct / 100)).toFixed(paySymbol === 'ETH' ? 4 : 2);
    setPayAmount(computed);
  };

  const handleReview = () => {
    router.push({
      pathname: '/swap/review',
      params: {
        paySymbol,
        payAmount,
        receiveSymbol,
        receiveAmount: quote.receiveAmount,
        slippage,
      },
    });
  };

  const payGlyph = paySymbol === 'ETH' ? 'Ξ' : '₮';
  const payColor = paySymbol === 'ETH' ? colors.ethereum : colors.usdt;
  const payBalance = paySymbol === 'ETH' ? '1.45 ETH' : '4,120.50 USDT';

  const receiveGlyph = receiveSymbol === 'ETH' ? 'Ξ' : '₮';
  const receiveColor = receiveSymbol === 'ETH' ? colors.ethereum : colors.usdt;
  const receiveBalance = receiveSymbol === 'ETH' ? '1.45 ETH' : '4,120.50 USDT';

  return (
    <Screen scroll keyboardAvoiding contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader
        title="Swap"
        onBack={() => router.back()}
        right={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Adjust slippage tolerance"
            onPress={() => setShowSlippageModal(true)}
            style={({ pressed }) => [
              styles.slippagePill,
              pressed && styles.slippagePillPressed,
            ]}>
            <BodyText weight="600" style={styles.slippageText}>
              {slippage}
            </BodyText>
            <Icon name={icons.manage} size={14} color={colors.outline} />
          </Pressable>
        }
      />

      {/* Double Stack Card with Center Switch Button */}
      <View style={styles.swapStackContainer}>
        {/* 1. You Pay Card */}
        <Card variant="low" style={styles.swapCard}>
          <View style={styles.cardHeaderRow}>
            <BodyText weight="500" style={styles.cardLabel}>
              You Pay
            </BodyText>
            <View style={styles.balanceRow}>
              <MonoText style={styles.balanceText}>Balance: {payBalance}</MonoText>
              <View style={styles.percentPills}>
                <Pressable
                  onPress={() => handlePercent(50)}
                  style={({ pressed }) => [
                    styles.miniPercentBtn,
                    pressed && styles.miniPercentBtnPressed,
                  ]}>
                  <MonoText style={styles.miniPercentText}>50%</MonoText>
                </Pressable>
                <Pressable
                  onPress={() => handlePercent(100)}
                  style={({ pressed }) => [
                    styles.miniPercentBtn,
                    styles.miniMaxBtn,
                    pressed && styles.miniPercentBtnPressed,
                  ]}>
                  <MonoText weight="600" style={styles.miniMaxText}>
                    MAX
                  </MonoText>
                </Pressable>
              </View>
            </View>
          </View>

          <View style={styles.inputAndTokenRow}>
            <TextInput
              value={payAmount}
              onChangeText={setPayAmount}
              keyboardType="decimal-pad"
              placeholder="0.0"
              placeholderTextColor="rgba(132, 142, 156, 0.4)"
              style={styles.amountInput}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Select pay token"
              onPress={() =>
                router.push({
                  pathname: '/token/select',
                  params: { target: 'swapPay' },
                })
              }
              style={({ pressed }) => [
                styles.tokenSelectorPill,
                pressed && styles.tokenSelectorPillPressed,
              ]}>
              <View
                style={[
                  styles.tokenCircleSm,
                  { backgroundColor: `${payColor}22` },
                ]}>
                <HeadlineText
                  weight="700"
                  style={[styles.tokenGlyphSm, { color: payColor }]}>
                  {payGlyph}
                </HeadlineText>
              </View>
              <HeadlineText weight="700" style={styles.tokenSymbol}>
                {paySymbol}
              </HeadlineText>
              <Icon name={icons.expandMore} size={16} color={colors.outline} />
            </Pressable>
          </View>

          <View style={styles.cardFooterRow}>
            <MonoText style={styles.fiatEstimate}>{quote.payFiat}</MonoText>
          </View>
        </Card>

        {/* Center Switch Direction Button */}
        <View style={styles.switchButtonWrapper}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Switch swap direction"
            onPress={handleSwitchDirection}
            style={({ pressed }) => [
              styles.switchButton,
              pressed && styles.switchButtonPressed,
            ]}>
            <Icon name={icons.swapVert} size={22} color={colors.textPrimary} />
          </Pressable>
        </View>

        {/* 2. You Receive Card */}
        <Card variant="low" style={styles.swapCard}>
          <View style={styles.cardHeaderRow}>
            <BodyText weight="500" style={styles.cardLabel}>
              You Receive
            </BodyText>
            <MonoText style={styles.balanceText}>Balance: {receiveBalance}</MonoText>
          </View>

          <View style={styles.inputAndTokenRow}>
            <TextInput
              value={quote.receiveAmount}
              editable={false}
              style={styles.amountInput}
            />

            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Select receive token"
              onPress={() =>
                router.push({
                  pathname: '/token/select',
                  params: { target: 'swapReceive' },
                })
              }
              style={({ pressed }) => [
                styles.tokenSelectorPill,
                pressed && styles.tokenSelectorPillPressed,
              ]}>
              <View
                style={[
                  styles.tokenCircleSm,
                  { backgroundColor: `${receiveColor}22` },
                ]}>
                <HeadlineText
                  weight="700"
                  style={[styles.tokenGlyphSm, { color: receiveColor }]}>
                  {receiveGlyph}
                </HeadlineText>
              </View>
              <HeadlineText weight="700" style={styles.tokenSymbol}>
                {receiveSymbol}
              </HeadlineText>
              <Icon name={icons.expandMore} size={16} color={colors.outline} />
            </Pressable>
          </View>

          <View style={styles.cardFooterRow}>
            <MonoText style={styles.fiatEstimate}>{quote.receiveFiat}</MonoText>
            <View style={styles.impactBadge}>
              <BodyText style={styles.impactText}>
                Price Impact {quote.priceImpact}
              </BodyText>
            </View>
          </View>
        </Card>
      </View>

      {/* Rate & Route Telemetry Card */}
      <Card variant="low" style={styles.routeCard}>
        <View style={styles.rateHeaderRow}>
          <View style={styles.rateLeft}>
            <Icon name={icons.sync} size={14} color={colors.brand} />
            <MonoText weight="500" style={styles.rateText}>
              {quote.exchangeRate}
            </MonoText>
          </View>
          <View style={styles.bestRatePill}>
            <BodyText style={styles.bestRateText}>Optimal</BodyText>
          </View>
        </View>

        <View style={styles.routeDivider} />

        <View style={styles.routeDetailRow}>
          <BodyText style={styles.routeDetailLabel}>Network Gas</BodyText>
          <MonoText style={styles.routeDetailValue}>
            {quote.networkGas}{' '}
            <MonoText style={styles.routeDetailSub}>({quote.gasCrypto})</MonoText>
          </MonoText>
        </View>

        <View style={styles.routeDetailRow}>
          <BodyText style={styles.routeDetailLabel}>Slippage Tolerance</BodyText>
          <MonoText style={styles.routeDetailValue}>{quote.slippage}</MonoText>
        </View>

        <View style={styles.routeDetailRow}>
          <BodyText style={styles.routeDetailLabel}>Routing</BodyText>
          <View style={styles.routingWrap}>
            <Icon name={icons.verified} size={12} color={colors.success} />
            <BodyText style={styles.routingText}>BSTC DEX Aggregator</BodyText>
          </View>
        </View>
      </Card>

      {/* Bottom CTA Action */}
      <View style={styles.actionWrap}>
        <PrimaryButton
          label="Review Swap"
          icon={<Icon name={icons.arrowForward} size={20} color="#FFFFFF" />}
          style={styles.reviewBtn}
          onPress={handleReview}
        />
      </View>

      {/* Slippage Settings Modal */}
      <Modal
        visible={showSlippageModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowSlippageModal(false)}>
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowSlippageModal(false)}>
          <Pressable
            style={styles.modalCard}
            onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <HeadlineText weight="700" style={styles.modalTitle}>
                Slippage Tolerance
              </HeadlineText>
              <IconButton
                accessibilityLabel="Close slippage modal"
                size={32}
                shape="circle"
                variant="ghost"
                icon={<Icon name={icons.close} size={18} color={colors.outline} />}
                onPress={() => setShowSlippageModal(false)}
              />
            </View>

            <BodyText style={styles.modalSubtitle}>
              Setting a high slippage tolerance increases transaction success
              rates during high market volatility.
            </BodyText>

            <View style={styles.slippageGrid}>
              {['0.1%', '0.5%', '1.0%'].map((opt) => (
                <Pressable
                  key={opt}
                  onPress={() => {
                    setSlippage(opt);
                    setShowSlippageModal(false);
                  }}
                  style={[
                    styles.slippageOptionBtn,
                    slippage === opt && styles.slippageOptionBtnActive,
                  ]}>
                  <MonoText
                    weight={slippage === opt ? '700' : '500'}
                    style={[
                      styles.slippageOptionText,
                      slippage === opt && styles.slippageOptionTextActive,
                    ]}>
                    {opt}
                  </MonoText>
                </Pressable>
              ))}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  slippagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  slippagePillPressed: {
    backgroundColor: colors.surfaceHigh,
  },
  slippageText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  swapStackContainer: {
    position: 'relative',
    gap: 8,
  },
  swapCard: {
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
    letterSpacing: 0.3,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  balanceText: {
    ...typography.dataMonoSm,
    fontSize: 11,
    color: colors.outline,
  },
  percentPills: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  miniPercentBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  miniPercentBtnPressed: {
    backgroundColor: colors.surfaceHigh,
  },
  miniPercentText: {
    fontSize: 10,
    color: colors.outline,
  },
  miniMaxBtn: {
    backgroundColor: 'rgba(35, 74, 213, 0.2)',
    borderColor: colors.brand,
  },
  miniMaxText: {
    fontSize: 10,
    color: colors.brand,
  },
  inputAndTokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  amountInput: {
    flex: 1,
    ...typography.displayBalanceMobile,
    color: colors.textPrimary,
    paddingVertical: 0,
    fontSize: 28,
  },
  tokenSelectorPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  tokenSelectorPillPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  tokenCircleSm: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenGlyphSm: {
    fontSize: 12,
  },
  tokenSymbol: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  cardFooterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fiatEstimate: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  impactBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(14, 203, 129, 0.1)',
  },
  impactText: {
    fontSize: 10,
    color: colors.success,
  },
  switchButtonWrapper: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    zIndex: 10,
  },
  switchButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 2,
    borderColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  switchButtonPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  routeCard: {
    padding: 16,
    gap: 12,
  },
  rateHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rateLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rateText: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  bestRatePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
  },
  bestRateText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '600',
  },
  routeDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
  },
  routeDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  routeDetailLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  routeDetailValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  routeDetailSub: {
    color: colors.outline,
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
  actionWrap: {
    marginTop: spacing.xs,
  },
  reviewBtn: {
    width: '100%',
    height: 48,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.xxl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: spacing.lg,
    gap: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  modalSubtitle: {
    ...typography.caption,
    color: colors.outline,
    lineHeight: 18,
  },
  slippageGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  slippageOptionBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slippageOptionBtnActive: {
    borderColor: colors.brand,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
  },
  slippageOptionText: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  slippageOptionTextActive: {
    color: colors.textPrimary,
  },
});
