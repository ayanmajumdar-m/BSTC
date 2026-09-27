import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
import { getPaymentMethods, PaymentMethod } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function PaymentMethodScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    fiatAmount?: string;
    cryptoAmount?: string;
    cryptoSymbol?: string;
  }>();

  const fiatAmount = params.fiatAmount ?? '500.00';
  const cryptoAmount = params.cryptoAmount ?? '0.1555';
  const cryptoSymbol = params.cryptoSymbol ?? 'ETH';

  const methods = getPaymentMethods();
  const [selectedMethodId, setSelectedMethodId] = useState<string>('apple_pay');

  const selectedMethod =
    methods.find((m) => m.id === selectedMethodId) ?? methods[0];

  const handleContinue = () => {
    router.push({
      pathname: '/buy/review',
      params: {
        fiatAmount,
        cryptoAmount,
        cryptoSymbol,
        methodId: selectedMethod.id,
        methodName: selectedMethod.name,
        provider: selectedMethod.provider,
        feeEstimated: selectedMethod.feeEstimated,
      },
    });
  };

  const getMethodIcon = (id: string) => {
    switch (id) {
      case 'apple_pay':
        return icons.smartphone;
      case 'debit_card':
        return icons.buy;
      case 'bank_transfer':
        return icons.accountBalance;
      case 'wire':
        return icons.schedule;
      default:
        return icons.payments;
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader
        title="Payment Method"
        onBack={() => router.back()}
      />

      {/* Order Total Header Card */}
      <Card variant="low" style={styles.orderSummaryCard}>
        <BodyText style={styles.orderSummaryLabel}>Purchasing</BodyText>
        <HeadlineText weight="700" style={styles.orderSummaryCrypto}>
          {cryptoAmount} {cryptoSymbol}
        </HeadlineText>
        <MonoText style={styles.orderSummaryFiat}>
          Total: ${fiatAmount} USD
        </MonoText>
      </Card>

      {/* Methods List */}
      <View style={styles.methodsList}>
        <BodyText weight="600" style={styles.sectionTitle}>
          Select Gateway & Provider
        </BodyText>

        {methods.map((method) => {
          const isSelected = selectedMethodId === method.id;
          return (
            <Pressable
              key={method.id}
              accessibilityRole="radio"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setSelectedMethodId(method.id)}
              style={({ pressed }) => [
                styles.methodCard,
                isSelected && styles.methodCardSelected,
                pressed && styles.methodCardPressed,
              ]}>
              <View style={styles.methodLeft}>
                <View
                  style={[
                    styles.methodIconWrap,
                    isSelected && styles.methodIconWrapSelected,
                  ]}>
                  <Icon
                    name={getMethodIcon(method.id)}
                    size={20}
                    color={isSelected ? colors.brand : colors.outline}
                  />
                </View>

                <View style={styles.methodInfo}>
                  <View style={styles.methodNameRow}>
                    <HeadlineText weight="600" style={styles.methodName}>
                      {method.name}
                    </HeadlineText>
                    {method.badge ? (
                      <View
                        style={[
                          styles.badgePill,
                          method.badge === 'POPULAR'
                            ? styles.popularBadge
                            : styles.lowFeeBadge,
                        ]}>
                        <BodyText style={styles.badgeText}>
                          {method.badge}
                        </BodyText>
                      </View>
                    ) : null}
                  </View>

                  <BodyText style={styles.methodSub}>
                    {method.provider} • {method.feePercentage} fee (
                    {method.feeEstimated}) • {method.speed}
                  </BodyText>
                </View>
              </View>

              <View
                style={[
                  styles.radioCircle,
                  isSelected && styles.radioCircleSelected,
                ]}>
                {isSelected ? <View style={styles.radioInnerDot} /> : null}
              </View>
            </Pressable>
          );
        })}
      </View>

      {/* Direct Non-Custodial Delivery Trust Banner */}
      <Card variant="low" style={styles.trustBanner}>
        <View style={styles.trustIconWrap}>
          <Icon name={icons.shield} size={18} color={colors.brand} />
        </View>
        <View style={styles.trustTextWrap}>
          <HeadlineText weight="600" style={styles.trustTitle}>
            Direct On-Chain Delivery
          </HeadlineText>
          <BodyText style={styles.trustDescription}>
            Purchased crypto is routed and minted directly into your
            non-custodial vault. BSTC never holds your keys or fiat.
          </BodyText>
        </View>
      </Card>

      {/* Bottom CTA */}
      <View style={styles.actionWrap}>
        <PrimaryButton
          label="Continue to Review"
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
  orderSummaryCard: {
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  orderSummaryLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  orderSummaryCrypto: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  orderSummaryFiat: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  methodsList: {
    gap: spacing.sm,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.4,
    marginBottom: 4,
    paddingHorizontal: 2,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  methodCardSelected: {
    borderColor: colors.brand,
    backgroundColor: 'rgba(35, 74, 213, 0.08)',
  },
  methodCardPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  methodLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  methodIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  methodIconWrapSelected: {
    backgroundColor: 'rgba(35, 74, 213, 0.2)',
  },
  methodInfo: {
    flex: 1,
    gap: 2,
  },
  methodNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  methodName: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  methodSub: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
  },
  badgePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
  },
  popularBadge: {
    backgroundColor: 'rgba(35, 74, 213, 0.2)',
  },
  lowFeeBadge: {
    backgroundColor: 'rgba(14, 203, 129, 0.15)',
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleSelected: {
    borderColor: colors.brand,
  },
  radioInnerDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.brand,
  },
  trustBanner: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
    backgroundColor: 'rgba(35, 74, 213, 0.06)',
    borderColor: 'rgba(35, 74, 213, 0.2)',
  },
  trustIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  trustTextWrap: {
    flex: 1,
    gap: 4,
  },
  trustTitle: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  trustDescription: {
    ...typography.caption,
    color: colors.outline,
    lineHeight: 18,
  },
  actionWrap: {
    marginTop: spacing.xs,
  },
  continueBtn: {
    width: '100%',
    height: 48,
  },
});
