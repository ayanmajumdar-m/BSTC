import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Card,
  HeadlineText,
  Icon,
  IconButton,
  MonoText,
  Screen,
  ScreenHeader,
  Toggle,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function SecurityScreen() {
  const router = useRouter();
  const [biometricLock, setBiometricLock] = useState(true);
  const [privacyScreen, setPrivacyScreen] = useState(true);

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Security & Privacy"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Security information"
            size={36}
            variant="ghost">
            <Icon name={icons.info} size={20} color={colors.outline} />
          </IconButton>
        }
      />

      {/* Security Status Hero Bento Card */}
      <Card variant="low" style={styles.statusHero}>
        <View style={styles.heroLeft}>
          <View style={styles.heroIconWrap}>
            <Icon name={icons.checkCircle} size={24} color={colors.success} />
          </View>
          <View style={styles.heroMeta}>
            <HeadlineText weight="600" style={styles.heroTitle}>
              Wallet Protected
            </HeadlineText>
            <BodyText style={styles.heroSub}>
              Hardware enclave & backup active
            </BodyText>
          </View>
        </View>

        <View style={styles.optimalBadge}>
          <View style={styles.statusDot} />
          <BodyText weight="600" style={styles.optimalText}>
            Optimal
          </BodyText>
        </View>
      </Card>

      {/* Section 1: Device Security */}
      <View style={styles.section}>
        <BodyText weight="600" style={styles.sectionHeader}>
          Device Security
        </BodyText>

        <Card variant="low" padding="none" style={styles.cardGroup}>
          {/* Biometric Lock */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.iconWrap}>
                <Icon name={icons.fingerprint} size={20} color={colors.primaryTint} />
              </View>
              <View style={styles.rowMeta}>
                <BodyText weight="600" style={styles.rowTitle}>
                  Biometric Lock
                </BodyText>
                <BodyText style={styles.rowDesc}>
                  Face ID / Fingerprint verification
                </BodyText>
              </View>
            </View>
            <Toggle
              value={biometricLock}
              onValueChange={setBiometricLock}
              accessibilityLabel="Toggle Biometric Lock"
            />
          </View>

          <View style={styles.divider} />

          {/* Change PIN / Passcode */}
          <Pressable
            onPress={() => router.push('/settings/pin')}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.rowLeft}>
              <View style={styles.iconWrap}>
                <Icon name={icons.pin} size={20} color={colors.primaryTint} />
              </View>
              <View style={styles.rowMeta}>
                <BodyText weight="600" style={styles.rowTitle}>
                  Change PIN / Passcode
                </BodyText>
                <BodyText style={styles.rowDesc}>
                  Local master authentication
                </BodyText>
              </View>
            </View>
            <View style={styles.rowRight}>
              <MonoText style={styles.pinBadge}>6-Digit PIN Set</MonoText>
              <Icon name={icons.chevronRight} size={18} color={colors.outline} />
            </View>
          </Pressable>

          <View style={styles.divider} />

          {/* Auto-Lock */}
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.rowLeft}>
              <View style={styles.iconWrap}>
                <Icon name={icons.timer} size={20} color={colors.primaryTint} />
              </View>
              <View style={styles.rowMeta}>
                <BodyText weight="600" style={styles.rowTitle}>
                  Auto-Lock
                </BodyText>
                <BodyText style={styles.rowDesc}>
                  Inactivity timer protection
                </BodyText>
              </View>
            </View>
            <View style={styles.rowRight}>
              <BodyText weight="600" style={styles.autoLockValue}>
                Immediately upon exit
              </BodyText>
              <Icon name={icons.chevronRight} size={18} color={colors.outline} />
            </View>
          </Pressable>

          <View style={styles.divider} />

          {/* Privacy Screen */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={styles.iconWrap}>
                <Icon name={icons.visibilityOff} size={20} color={colors.primaryTint} />
              </View>
              <View style={styles.rowMeta}>
                <BodyText weight="600" style={styles.rowTitle}>
                  Privacy Screen
                </BodyText>
                <BodyText style={styles.rowDesc}>
                  Hide balance in app switcher
                </BodyText>
              </View>
            </View>
            <Toggle
              value={privacyScreen}
              onValueChange={setPrivacyScreen}
              accessibilityLabel="Toggle Privacy Screen"
            />
          </View>
        </Card>
      </View>

      {/* Section 2: Wallet Backup & Recovery */}
      <View style={styles.section}>
        <BodyText weight="600" style={styles.sectionHeader}>
          Backup & Recovery
        </BodyText>

        <Card variant="low" padding="none" style={styles.cardGroup}>
          {/* Recovery Phrase */}
          <Pressable
            onPress={() => router.push('/onboarding/recovery-phrase')}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.rowLeft}>
              <View style={styles.iconWrap}>
                <Icon name={icons.key} size={20} color={colors.primaryTint} />
              </View>
              <View style={styles.rowMeta}>
                <BodyText weight="600" style={styles.rowTitle}>
                  Recovery Phrase
                </BodyText>
                <BodyText style={styles.rowDesc}>
                  12-word cryptographic seed
                </BodyText>
              </View>
            </View>
            <View style={styles.rowRight}>
              <View style={styles.verifiedChip}>
                <View style={styles.statusDot} />
                <BodyText weight="600" style={styles.verifiedChipText}>
                  Verified
                </BodyText>
              </View>
              <Icon name={icons.chevronRight} size={18} color={colors.outline} />
            </View>
          </Pressable>

          <View style={styles.divider} />

          {/* Cloud Backup */}
          <Pressable
            onPress={() => router.push('/settings/cloud-backup')}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.rowLeft}>
              <View style={styles.iconWrap}>
                <Icon name={icons.cloud} size={20} color={colors.primaryTint} />
              </View>
              <View style={styles.rowMeta}>
                <BodyText weight="600" style={styles.rowTitle}>
                  Cloud Backup
                </BodyText>
                <BodyText style={styles.rowDesc}>
                  Google Drive • Synced today
                </BodyText>
              </View>
            </View>
            <View style={styles.rowRight}>
              <Icon name={icons.chevronRight} size={18} color={colors.outline} />
            </View>
          </Pressable>
        </Card>
      </View>

      {/* Cryptographic Trust Footer */}
      <View style={styles.footerNote}>
        <Icon name={icons.lock} size={18} color={colors.outline} />
        <BodyText style={styles.footerText}>
          All cryptographic keys are isolated in your device hardware enclave.
          BSTC zero-knowledge architecture prevents remote extraction.
        </BodyText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  statusHero: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  heroIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.successMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroMeta: {
    gap: 2,
  },
  heroTitle: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  heroSub: {
    ...typography.caption,
    color: colors.outline,
  },
  optimalBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceHigh,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  optimalText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.success,
  },
  section: {
    gap: spacing.xs,
  },
  sectionHeader: {
    ...typography.caption,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    paddingHorizontal: spacing.xs,
    marginBottom: 2,
  },
  cardGroup: {
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  rowPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowMeta: {
    flex: 1,
    gap: 2,
  },
  rowTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  rowDesc: {
    ...typography.caption,
    color: colors.outline,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  pinBadge: {
    ...typography.caption,
    fontSize: 11,
    color: colors.textSecondary,
    backgroundColor: colors.surfaceHighest,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
  },
  autoLockValue: {
    ...typography.caption,
    fontSize: 12,
    color: colors.primaryTint,
  },
  verifiedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: colors.successMuted,
  },
  verifiedChipText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.success,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  footerNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    paddingHorizontal: spacing.xs,
    paddingTop: spacing.xs,
  },
  footerText: {
    ...typography.caption,
    color: colors.outline,
    flex: 1,
    lineHeight: 18,
  },
});
