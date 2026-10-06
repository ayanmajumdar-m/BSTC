import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  Avatar,
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
import { colors, icons, radii, spacing, typography } from '@/theme';
import { useWalletState } from '@/state/wallet-state';

export default function AccountCreatedScreen() {
  const router = useRouter();
  const { setHasWallet } = useWalletState();

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="BSTC Wallet"
        onBack={() => {
          setHasWallet(true);
          if (router.canDismiss()) { router.dismissAll(); } router.replace('/(tabs)');
        }}
        right={
          <IconButton
            accessibilityLabel="Help"
            size={36}
            variant="ghost">
            <Icon name={icons.help} size={20} color={colors.outline} />
          </IconButton>
        }
      />

      {/* Hero Success State */}
      <View style={styles.heroSection}>
        <View style={styles.successIconOuter}>
          <View style={styles.successIconGlow} />
          <View style={styles.successIconWrap}>
            <Icon name={icons.checkCircle} size={40} color={colors.success} />
          </View>
        </View>

        <HeadlineText weight="600" style={styles.heroTitle}>
          Account Created!
        </HeadlineText>
        <BodyText style={styles.heroSubtitle}>
          Your BSTC non-custodial wallet account is ready to use.
        </BodyText>
      </View>

      {/* User Badge Card */}
      <Card variant="low" style={styles.userCard}>
        <Avatar initials="AV" size={48} />
        <View style={styles.userMeta}>
          <View style={styles.userTitleRow}>
            <HeadlineText weight="600" style={styles.userName}>
              Alex Vance
            </HeadlineText>
            <View style={styles.verifiedBadge}>
              <Icon name={icons.verified} size={12} color={colors.success} />
              <BodyText weight="600" style={styles.verifiedText}>
                Verified
              </BodyText>
            </View>
          </View>
          <MonoText style={styles.userEmail}>alex.vance@example.com</MonoText>
        </View>
      </Card>

      {/* Security Architecture Reminder */}
      <Card variant="low" style={styles.securityCard}>
        <View style={styles.securityIconWrap}>
          <Icon name={icons.security} size={20} color={colors.cyan} />
        </View>
        <BodyText style={styles.securityText}>
          Your wallet is protected by biometrics and device-level hardware enclave.
        </BodyText>
      </Card>

      {/* Protocol Telemetry */}
      <View style={styles.telemetryRow}>
        <BodyText style={styles.telemetryLabel}>Network Protocol</BodyText>
        <View style={styles.telemetryVal}>
          <View style={styles.liveDot} />
          <MonoText style={styles.protocolText}>BSTC-Mainnet-v2.4</MonoText>
        </View>
      </View>

      {/* Primary CTA */}
      <View style={styles.footer}>
        <Button
          label="Continue to Wallet"
          variant="primary"
          iconRight={<Icon name={icons.arrowForward} size={18} color={colors.textOnPrimary} />}
          onPress={() => {
            setHasWallet(true);
            if (router.canDismiss()) { router.dismissAll(); } router.replace('/(tabs)');
          }}
          style={styles.primaryBtn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  heroSection: {
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  successIconOuter: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  successIconGlow: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(14, 203, 129, 0.15)',
  },
  successIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(14, 203, 129, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTitle: {
    ...typography.screenTitle,
    fontSize: 24,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...typography.bodyCompact,
    color: colors.outline,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  userMeta: {
    flex: 1,
    gap: 4,
  },
  userTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  userName: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    backgroundColor: colors.successMuted,
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.25)',
  },
  verifiedText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.success,
  },
  userEmail: {
    ...typography.caption,
    color: colors.outline,
  },
  securityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: 'rgba(25, 28, 31, 0.5)',
    borderColor: colors.borderSubtle,
  },
  securityIconWrap: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  securityText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 18,
  },
  telemetryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  telemetryLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  telemetryVal: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  protocolText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.cyan,
  },
  footer: {
    paddingTop: spacing.lg,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 50,
  },
});
