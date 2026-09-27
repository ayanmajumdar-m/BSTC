import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  HeadlineText,
  Icon,
  Screen,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen contentContainerStyle={styles.container}>
      {/* Background ambient lighting */}
      <View style={styles.ambientGlow} />

      {/* Main Hero & Identity */}
      <View style={styles.heroSection}>
        {/* Hexagon Logo Container */}
        <View style={styles.hexagonOuter}>
          <View style={styles.hexagonInner}>
            <Icon name={icons.token} size={42} color={colors.cyan} />
            <View style={styles.verifiedBadge}>
              <Icon name={icons.verified} size={14} color={colors.success} />
            </View>
          </View>
        </View>

        <HeadlineText weight="700" style={styles.title}>
          BSTC Wallet
        </HeadlineText>

        <BodyText style={styles.subtitle}>
          The self-custody wallet engineered for speed, privacy, and
          institutional-grade decentralized security.
        </BodyText>

        {/* Feature Badges */}
        <View style={styles.badgeRow}>
          <View style={styles.featurePill}>
            <View style={[styles.dot, { backgroundColor: colors.success }]} />
            <BodyText weight="500" style={styles.featureText}>
              Non-Custodial
            </BodyText>
          </View>
          <BodyText style={styles.bullet}>•</BodyText>
          <View style={styles.featurePill}>
            <View style={[styles.dot, { backgroundColor: colors.cyan }]} />
            <BodyText weight="500" style={styles.featureText}>
              Biometric Lock
            </BodyText>
          </View>
          <BodyText style={styles.bullet}>•</BodyText>
          <View style={styles.featurePill}>
            <View style={[styles.dot, { backgroundColor: colors.primaryTint }]} />
            <BodyText weight="500" style={styles.featureText}>
              Multi-Chain
            </BodyText>
          </View>
        </View>

        {/* Telemetry Micro-bar */}
        <View style={styles.telemetryBar}>
          <BodyText style={styles.telemetryText}>
            ED25519 / SECP256K1 • ZERO-KNOWLEDGE READY
          </BodyText>
        </View>
      </View>

      {/* Bottom Actions */}
      <View style={styles.actionSection}>
        <Button
          label="Create a New Wallet"
          variant="primary"
          iconRight={
            <Icon name={icons.arrowForward} size={18} color={colors.textOnPrimary} />
          }
          onPress={() => router.push('/onboarding/create')}
          style={styles.primaryBtn}
        />

        <Button
          label="I already have a wallet"
          variant="secondary"
          icon={<Icon name={icons.download} size={18} color={colors.textPrimary} />}
          onPress={() => router.push('/onboarding/import')}
          style={styles.secondaryBtn}
        />

        <View style={styles.termsRow}>
          <BodyText style={styles.termsText}>
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </BodyText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    paddingBottom: spacing.lg,
  },
  ambientGlow: {
    position: 'absolute',
    top: '20%',
    left: '25%',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
  hexagonOuter: {
    width: 96,
    height: 96,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: 'rgba(68, 70, 85, 0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
    shadowColor: colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  hexagonInner: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
  },
  title: {
    fontSize: 32,
    lineHeight: 40,
    color: colors.textPrimary,
    letterSpacing: -0.5,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.bodyCompact,
    color: colors.outline,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22,
    marginBottom: spacing.xl,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: 'rgba(68, 70, 85, 0.4)',
  },
  featurePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  featureText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
  },
  bullet: {
    ...typography.caption,
    fontSize: 10,
    color: colors.outlineVariant,
  },
  telemetryBar: {
    marginTop: spacing.xl,
  },
  telemetryText: {
    ...typography.dataMonoSm,
    fontSize: 10,
    color: colors.outline,
    letterSpacing: 1.2,
    opacity: 0.7,
  },
  actionSection: {
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 52,
  },
  secondaryBtn: {
    width: '100%',
    minHeight: 52,
  },
  termsRow: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
  },
  termsText: {
    ...typography.caption,
    color: colors.outline,
    textAlign: 'center',
    lineHeight: 16,
  },
});
