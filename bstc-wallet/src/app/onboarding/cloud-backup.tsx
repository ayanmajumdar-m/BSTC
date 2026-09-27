import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  Divider,
  HeadlineText,
  Icon,
  IconButton,
  Screen,
  ScreenHeader,
  Toggle,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function CloudBackupScreen() {
  const router = useRouter();
  const [autoBackup, setAutoBackup] = useState(true);
  const [backingUp, setBackingUp] = useState(false);
  const [lastBackupText, setLastBackupText] = useState('Today, 10:42 AM');

  const handleBackupNow = () => {
    setBackingUp(true);
    setTimeout(() => {
      setBackingUp(false);
      setLastBackupText('Just now');
    }, 1500);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Cloud Backup"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Backup information"
            size={36}
            variant="ghost">
            <Icon name={icons.info} size={20} color={colors.outline} />
          </IconButton>
        }
      />

      {/* Hero Provider Card */}
      <Card variant="low" style={styles.providerCard}>
        <View style={styles.providerLeft}>
          <View style={styles.providerIconWrap}>
            <Icon name={icons.cloudDone} size={26} color={colors.cyan} />
          </View>
          <View style={styles.providerMeta}>
            <HeadlineText weight="600" style={styles.providerName}>
              Google Drive
            </HeadlineText>
            <BodyText style={styles.providerEmail}>
              alex.vance@gmail.com
            </BodyText>
          </View>
        </View>

        <View style={styles.statusBadge}>
          <View style={styles.statusDot} />
          <BodyText weight="600" style={styles.statusText}>
            Connected
          </BodyText>
        </View>
      </Card>

      {/* Sync & Backup Details Card */}
      <Card variant="low" style={styles.detailsCard}>
        <View style={styles.detailRow}>
          <View>
            <BodyText weight="600" style={styles.detailLabel}>
              Last backup
            </BodyText>
            <BodyText style={styles.detailSub}>{lastBackupText}</BodyText>
          </View>
          <BodyText style={styles.sizeText}>14.2 KB</BodyText>
        </View>

        <Divider />

        <View style={styles.detailRow}>
          <View style={styles.toggleMeta}>
            <BodyText weight="600" style={styles.detailLabel}>
              Auto-backup
            </BodyText>
            <BodyText style={styles.detailSub}>
              Sync encrypted backup when tokens change
            </BodyText>
          </View>
          <Toggle
            value={autoBackup}
            onValueChange={setAutoBackup}
            accessibilityLabel="Toggle auto backup"
          />
        </View>
      </Card>

      {/* Client-Side Encryption Guarantee */}
      <Card variant="low" style={styles.encryptionCard}>
        <View style={styles.encryptionIconWrap}>
          <Icon name={icons.lock} size={20} color={colors.success} />
        </View>
        <BodyText style={styles.encryptionText}>
          AES-256 client-side encrypted before cloud transmission. Google cannot
          read your recovery phrase or transaction history.
        </BodyText>
      </Card>

      {/* Action Buttons */}
      <View style={styles.footer}>
        <Button
          label={backingUp ? 'Backing Up...' : 'Backup Now'}
          variant="primary"
          loading={backingUp}
          iconRight={
            !backingUp ? (
              <Icon name={icons.cloudUpload} size={18} color={colors.textOnPrimary} />
            ) : null
          }
          onPress={handleBackupNow}
          style={styles.primaryBtn}
        />
        <Button
          label="Restore from Backup"
          variant="outline"
          onPress={() => router.push('/onboarding/restore-backup')}
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
  providerCard: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  providerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  providerIconWrap: {
    width: 48,
    height: 48,
    borderRadius: radii.xl,
    backgroundColor: 'rgba(0, 198, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 198, 255, 0.2)',
  },
  providerMeta: {
    gap: 2,
  },
  providerName: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  providerEmail: {
    ...typography.caption,
    color: colors.outline,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.successMuted,
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.25)',
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  statusText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.success,
  },
  detailsCard: {
    padding: spacing.md,
    gap: spacing.md,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  detailSub: {
    ...typography.caption,
    color: colors.outline,
    marginTop: 2,
  },
  sizeText: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  toggleMeta: {
    flex: 1,
    paddingRight: spacing.md,
  },
  encryptionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surfaceLow,
  },
  encryptionIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.lg,
    backgroundColor: colors.successMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  encryptionText: {
    ...typography.caption,
    color: colors.outline,
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 50,
  },
  secondaryBtn: {
    width: '100%',
  },
});
