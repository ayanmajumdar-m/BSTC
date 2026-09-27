import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function CreateWalletScreen() {
  const router = useRouter();

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Create Wallet"
        onBack={() => router.back()}
        right={
          <View style={styles.stepBadge}>
            <BodyText weight="600" style={styles.stepBadgeText}>
              Step 1 of 3
            </BodyText>
          </View>
        }
      />

      {/* Hero section */}
      <View style={styles.heroSection}>
        <View style={styles.heroIconContainer}>
          <Icon name={icons.shield} size={28} color={colors.primaryTint} />
        </View>
        <HeadlineText weight="600" style={styles.heroTitle}>
          Create Your Wallet
        </HeadlineText>
        <BodyText style={styles.heroSubtitle}>
          A 12-word recovery phrase will be generated to keep your crypto assets
          safe and completely in your control.
        </BodyText>
      </View>

      {/* Guidance Cards */}
      <View style={styles.guidanceList}>
        <Card variant="low" style={styles.guideCard}>
          <View style={[styles.guideIconWrap, { backgroundColor: colors.successMuted }]}>
            <Icon name={icons.lock} size={20} color={colors.success} />
          </View>
          <View style={styles.guideTextWrap}>
            <BodyText weight="600" style={styles.guideTitle}>
              True Self-Custody
            </BodyText>
            <BodyText style={styles.guideDescription}>
              You hold your private keys. Only you can access or authorize
              transactions with your funds.
            </BodyText>
          </View>
        </Card>

        <Card variant="low" style={styles.guideCard}>
          <View style={[styles.guideIconWrap, { backgroundColor: 'rgba(0, 198, 255, 0.12)' }]}>
            <Icon name={icons.visibilityOff} size={20} color={colors.cyan} />
          </View>
          <View style={styles.guideTextWrap}>
            <BodyText weight="600" style={styles.guideTitle}>
              Anonymous & Private
            </BodyText>
            <BodyText style={styles.guideDescription}>
              No email, phone number, or personal identity required. Truly
              permissionless financial access.
            </BodyText>
          </View>
        </Card>

        <Card variant="low" style={styles.guideCard}>
          <View style={[styles.guideIconWrap, { backgroundColor: 'rgba(35, 74, 213, 0.15)' }]}>
            <Icon name={icons.verified} size={20} color={colors.brand} />
          </View>
          <View style={styles.guideTextWrap}>
            <BodyText weight="600" style={styles.guideTitle}>
              Your Sole Responsibility
            </BodyText>
            <BodyText style={styles.guideDescription}>
              If you lose your recovery phrase, BSTC cannot recover your funds.
              Write it down and keep it safe.
            </BodyText>
          </View>
        </Card>
      </View>

      {/* Footer Actions */}
      <View style={styles.footer}>
        <Button
          label="Create New Wallet"
          variant="primary"
          iconRight={<Icon name={icons.arrowForward} size={18} color={colors.textOnPrimary} />}
          onPress={() => router.push('/onboarding/recovery-phrase')}
          style={styles.primaryBtn}
        />
        <Button
          label="Import Existing Wallet"
          variant="ghost"
          onPress={() => router.replace('/onboarding/import')}
          style={styles.secondaryBtn}
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
  stepBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  stepBadgeText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.primaryTint,
  },
  heroSection: {
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  heroIconContainer: {
    width: 60,
    height: 60,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  heroTitle: {
    ...typography.screenTitle,
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  heroSubtitle: {
    ...typography.bodyCompact,
    color: colors.outline,
    textAlign: 'center',
    paddingHorizontal: spacing.md,
    lineHeight: 20,
  },
  guidanceList: {
    gap: spacing.md,
  },
  guideCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
  },
  guideIconWrap: {
    width: 38,
    height: 38,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  guideTextWrap: {
    flex: 1,
    gap: 4,
  },
  guideTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  guideDescription: {
    ...typography.caption,
    color: colors.outline,
    lineHeight: 18,
  },
  footer: {
    gap: spacing.xs,
    paddingTop: spacing.lg,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 50,
  },
  secondaryBtn: {
    width: '100%',
  },
});
