import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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

export default function RecoveryPhraseScreen() {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Recovery Phrase"
        onBack={() => router.back()}
        right={
          <View style={styles.stepBadge}>
            <BodyText weight="600" style={styles.stepBadgeText}>
              Step 2 of 3
            </BodyText>
          </View>
        }
      />

      <View style={styles.headerTextWrap}>
        <HeadlineText weight="600" style={styles.title}>
          Write Down Your Phrase
        </HeadlineText>
        <BodyText style={styles.subtitle}>
          Write down or store these 12 words in a safe offline location. Do not
          screenshot or share.
        </BodyText>
      </View>

      {/* 12-Word Grid */}
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

        {/* Utilities Bar */}
        <View style={styles.utilRow}>
          <Pressable
            onPress={handleCopy}
            style={({ pressed }) => [styles.copyBtn, pressed && styles.btnPressed]}>
            <Icon
              name={copied ? icons.check : icons.copy}
              size={16}
              color={copied ? colors.success : colors.primaryTint}
            />
            <BodyText weight="600" style={[styles.copyBtnText, copied && { color: colors.success }]}>
              {copied ? 'Copied to Clipboard' : 'Copy phrase'}
            </BodyText>
          </Pressable>

          <View style={styles.securityIndicator}>
            <Icon name={icons.lock} size={14} color={colors.outline} />
            <BodyText style={styles.securityText}>Offline & encrypted</BodyText>
          </View>
        </View>
      </Card>

      {/* Warning Callout */}
      <Card variant="low" style={styles.warningCard}>
        <Icon name={icons.info} size={20} color={colors.warning} />
        <BodyText style={styles.warningText}>
          Never take screenshots or save digitally. Back up offline only. Anyone
          with this phrase has full access to your funds.
        </BodyText>
      </Card>

      {/* Confirmation Checkbox */}
      <Pressable
        onPress={() => setConfirmed(!confirmed)}
        style={styles.checkboxRow}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: confirmed }}>
        <View style={[styles.checkbox, confirmed && styles.checkboxActive]}>
          {confirmed ? (
            <Icon name={icons.check} size={14} color={colors.textOnPrimary} />
          ) : null}
        </View>
        <BodyText style={styles.checkboxLabel}>
          I have written down my recovery phrase in a safe place
        </BodyText>
      </Pressable>

      {/* Primary CTA */}
      <View style={styles.footer}>
        <Button
          label="Continue"
          variant="primary"
          disabled={!confirmed}
          iconRight={<Icon name={icons.arrowForward} size={18} color={colors.textOnPrimary} />}
          onPress={() => router.push('/onboarding/backup-confirmation')}
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
    color: colors.primaryTint,
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
    gap: spacing.md,
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
  utilRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing.xs,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  copyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  btnPressed: {
    opacity: 0.6,
  },
  copyBtnText: {
    ...typography.caption,
    color: colors.primaryTint,
  },
  securityIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  securityText: {
    ...typography.caption,
    color: colors.outline,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.warningMuted,
    borderColor: 'rgba(243, 186, 47, 0.25)',
  },
  warningText: {
    ...typography.caption,
    color: colors.warning,
    flex: 1,
    lineHeight: 18,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radii.sm,
    borderWidth: 1.5,
    borderColor: colors.outline,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  checkboxLabel: {
    ...typography.bodyCompact,
    color: colors.textPrimary,
    flex: 1,
  },
  footer: {
    paddingTop: spacing.sm,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 50,
  },
});
