import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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
  SecondaryButton,
} from '@/components/ui';
import { QRCodeView } from '@/components/wallet/QRCodeView';
import {
  MOCK_WALLET_ADDRESS,
  getTokenDetail,
} from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function ReceiveScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tokenId?: string }>();
  const token = getTokenDetail(params.tokenId);

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Top App Bar Header */}
      <ScreenHeader
        title="Receive"
        onBack={() => router.back()}
        right={
          <View style={styles.headerRight}>
            <View style={styles.networkBadge}>
              <View style={styles.greenDot} />
              <BodyText style={styles.networkLabel}>
                {token.networkBadge ?? 'Mainnet'}
              </BodyText>
            </View>
            <IconButton
              accessibilityLabel="Network info"
              size={36}
              shape="square"
              variant="ghost"
              icon={<Icon name={icons.info} size={18} color={colors.outline} />}
            />
          </View>
        }
      />

      {/* Token Selector Card */}
      <Pressable
        onPress={() =>
          router.push({
            pathname: '/token/select',
            params: { target: 'receive' },
          })
        }
        accessibilityRole="button"
        accessibilityLabel={`Change asset: current ${token.name}`}
        style={({ pressed }) => [
          styles.tokenCard,
          pressed && styles.tokenCardPressed,
        ]}>
        <View style={styles.tokenLeft}>
          <View style={styles.tokenIcon}>
            <HeadlineText
              weight="700"
              style={[styles.tokenGlyph, { color: token.iconColor }]}>
              {token.iconGlyph}
            </HeadlineText>
          </View>
          <View style={styles.tokenMeta}>
            <View style={styles.tokenNameRow}>
              <HeadlineText weight="700" style={styles.tokenName}>
                {token.name}
              </HeadlineText>
              <View style={styles.symbolPill}>
                <BodyText weight="600" style={styles.symbolPillText}>
                  {token.symbol}
                </BodyText>
              </View>
            </View>
            <BodyText style={styles.tokenSubtitle}>
              {token.name} {token.networkBadge ?? 'Mainnet'} •{' '}
              <BodyText style={styles.changeLink}>Tap to change</BodyText>
            </BodyText>
          </View>
        </View>
        <Icon name={icons.unfoldMore} size={20} color={colors.outline} />
      </Pressable>

      {/* QR Code Elevated Terminal Card */}
      <Card variant="low" style={styles.qrCard}>
        {/* Instruction */}
        <View style={styles.scanInstruction}>
          <Icon name={icons.qrScanner} size={16} color={colors.cyan} />
          <BodyText weight="600" style={styles.scanText}>
            Scan to Deposit Assets
          </BodyText>
        </View>

        {/* QR Code */}
        <View style={styles.qrContainer}>
          <QRCodeView size={196} badgeText="BSTC" />
        </View>

        {/* Address Box Module */}
        <View style={styles.addressBox}>
          <View style={styles.addressBoxHeader}>
            <BodyText style={styles.addressType}>
              {token.name} Address
            </BodyText>
            <View style={styles.validatedWrap}>
              <View style={styles.greenDotSm} />
              <BodyText style={styles.validatedText}>Validated</BodyText>
            </View>
          </View>

          <View style={styles.addressRow}>
            <MonoText
              weight="400"
              numberOfLines={1}
              style={styles.addressText}>
              {MOCK_WALLET_ADDRESS}
            </MonoText>
            <Pressable
              onPress={handleCopy}
              accessibilityRole="button"
              accessibilityLabel="Copy address inline"
              style={({ pressed }) => [
                styles.copyInlineBtn,
                pressed && styles.copyInlinePressed,
              ]}>
              <Icon
                name={copied ? icons.check : icons.copy}
                size={18}
                color={copied ? colors.success : colors.outline}
              />
            </Pressable>
          </View>
        </View>
      </Card>

      {/* Quick Action Hub: Copy / Share */}
      <View style={styles.actionRow}>
        <PrimaryButton
          label={copied ? 'Copied!' : 'Copy Address'}
          icon={
            <Icon
              name={copied ? icons.check : icons.copy}
              size={18}
              color="#FFFFFF"
            />
          }
          onPress={handleCopy}
          style={styles.actionBtn}
        />
        <SecondaryButton
          label="Share"
          icon={<Icon name={icons.share} size={18} color={colors.textPrimary} />}
          onPress={handleCopy}
          style={styles.actionBtn}
        />
      </View>

      {/* Secondary Utility Action: Request Specific Amount */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Request specific amount"
        onPress={() => {}}
        style={({ pressed }) => [
          styles.requestBtn,
          pressed && styles.requestBtnPressed,
        ]}>
        <Icon name={icons.payments} size={18} color={colors.outline} />
        <BodyText weight="500" style={styles.requestText}>
          Request Specific Amount
        </BodyText>
      </Pressable>

      {/* Security & Institutional Disclaimer Alert */}
      <View style={styles.disclaimerCard}>
        <Icon name={icons.warning} size={18} color={colors.outline} />
        <BodyText style={styles.disclaimerText}>
          Only send <BodyText weight="600" style={styles.disclaimerBold}>{token.symbol} and {token.networkBadge ?? 'supported'}</BodyText> tokens to this address. Sending unsupported digital assets or interacting via incorrect networks will result in permanent loss of funds.
        </BodyText>
      </View>

      {/* Copy Toast Feedback */}
      {copied ? (
        <View style={styles.toast}>
          <Icon name={icons.checkCircle} size={16} color={colors.success} />
          <BodyText style={styles.toastText}>
            Address copied to clipboard
          </BodyText>
        </View>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
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
    color: colors.outline,
  },
  tokenCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 14,
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  tokenCardPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenGlyph: {
    fontSize: 16,
    lineHeight: 20,
  },
  tokenMeta: {
    flex: 1,
    gap: 2,
  },
  tokenNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  tokenName: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  symbolPill: {
    backgroundColor: colors.surfaceHighest,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.sm,
  },
  symbolPillText: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.outline,
  },
  tokenSubtitle: {
    ...typography.caption,
    color: colors.outline,
  },
  changeLink: {
    ...typography.caption,
    color: colors.cyan,
  },
  qrCard: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.lg,
  },
  scanInstruction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  scanText: {
    ...typography.caption,
    fontSize: 11,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.outline,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  addressBox: {
    width: '100%',
    gap: 6,
  },
  addressBoxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  addressType: {
    ...typography.caption,
    color: colors.outline,
  },
  validatedWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  validatedText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.success,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.background,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  addressText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 18,
    color: colors.textPrimary,
  },
  copyInlineBtn: {
    width: 32,
    height: 32,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copyInlinePressed: {
    backgroundColor: colors.surfaceHigh,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  actionBtn: {
    flex: 1,
    height: 48,
  },
  requestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    backgroundColor: colors.surfaceLow,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  requestBtnPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  requestText: {
    ...typography.bodySecondary,
    color: colors.textPrimary,
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    padding: 14,
    backgroundColor: colors.surfaceLow,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  disclaimerText: {
    flex: 1,
    ...typography.caption,
    lineHeight: 18,
    color: colors.outline,
  },
  disclaimerBold: {
    color: colors.textPrimary,
  },
  toast: {
    position: 'absolute',
    top: 70,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.surfaceHighest,
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.4)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: radii.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  toastText: {
    ...typography.caption,
    fontWeight: '500',
    color: colors.textPrimary,
  },
});
