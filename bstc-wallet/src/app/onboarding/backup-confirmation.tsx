import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  MonoText,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

const MOCK_WORDS = [
  'glance',
  'matrix',
  'velvet',
  'rocket',
  'canyon',
  'harbor',
  'timber',
  'whisper',
  'fossil',
  'shield',
  'quantum',
  'beacon',
];

export default function BackupConfirmationScreen() {
  const router = useRouter();

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Verify Recovery Phrase"
        onBack={() => router.back()}
        right={
          <View style={styles.stepBadge}>
            <BodyText weight="600" style={styles.stepBadgeText}>
              Step 3 of 3
            </BodyText>
          </View>
        }
      />

      <View style={styles.headerTextWrap}>
        <HeadlineText weight="600" style={styles.title}>
          Verify Sequence
        </HeadlineText>
        <BodyText style={styles.subtitle}>
          Review your 12 secret recovery phrase words in the exact sequence
          shown below to ensure accuracy before completion.
        </BodyText>
      </View>

      {/* Sequential word grid */}
      <Card variant="low" style={styles.gridCard}>
        <View style={styles.grid}>
          {MOCK_WORDS.map((word, index) => (
            <View key={index} style={styles.wordPill}>
              <MonoText style={styles.wordIndex}>
                {String(index + 1).padStart(2, '0')}
              </MonoText>
              <MonoText weight="500" style={styles.wordText}>
                {word}
              </MonoText>
            </View>
          ))}
        </View>
      </Card>

      {/* Verified Status Card */}
      <Card variant="low" style={styles.verifiedCard}>
        <View style={styles.verifiedIconWrap}>
          <Icon name={icons.verified} size={24} color={colors.success} />
        </View>
        <View style={styles.verifiedMeta}>
          <BodyText weight="600" style={styles.verifiedTitle}>
            Phrase Verified
          </BodyText>
          <BodyText style={styles.verifiedDesc}>
            Your 12-word cryptographic seed has been verified and will be encrypted
            inside your device hardware enclave.
          </BodyText>
        </View>
      </Card>

      {/* Primary CTA */}
      <View style={styles.footer}>
        <Button
          label="Confirm & Finish"
          variant="primary"
          iconRight={<Icon name={icons.arrowForward} size={18} color={colors.textOnPrimary} />}
          onPress={() => router.replace('/onboarding/account-created')}
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
    color: colors.success,
  },
  headerTextWrap: {
    gap: spacing.xs,
  },
  title: {
    ...typography.screenTitle,
    fontSize: 20,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.bodyCompact,
    color: colors.outline,
    lineHeight: 20,
  },
  gridCard: {
    padding: spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'space-between',
  },
  wordPill: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.background,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  wordIndex: {
    fontSize: 12,
    color: colors.outline,
    width: 20,
  },
  wordText: {
    fontSize: 14,
    color: colors.textPrimary,
    flex: 1,
  },
  verifiedCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.successMuted,
    borderColor: 'rgba(14, 203, 129, 0.25)',
  },
  verifiedIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(14, 203, 129, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedMeta: {
    flex: 1,
    gap: 4,
  },
  verifiedTitle: {
    fontSize: 15,
    color: colors.success,
  },
  verifiedDesc: {
    ...typography.caption,
    color: colors.outline,
    lineHeight: 18,
  },
  footer: {
    paddingTop: spacing.md,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 50,
  },
});
