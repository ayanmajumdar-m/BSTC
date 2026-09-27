import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  IconButton,
  Input,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function RestoreBackupScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const handleRestore = () => {
    setRestoring(true);
    setTimeout(() => {
      setRestoring(false);
      router.push('/onboarding/account-created');
    }, 1200);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Restore Backup"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Restore info"
            size={36}
            variant="ghost">
            <Icon name={icons.info} size={20} color={colors.outline} />
          </IconButton>
        }
      />

      <View style={styles.headerTextWrap}>
        <HeadlineText weight="600" style={styles.title}>
          Restore from Cloud
        </HeadlineText>
        <BodyText style={styles.subtitle}>
          A cloud backup was found for your account. Authenticate to decrypt
          and restore your wallet onto this device.
        </BodyText>
      </View>

      {/* Detected Backup Card */}
      <Card variant="low" style={styles.backupCard}>
        <View style={styles.backupLeft}>
          <View style={styles.backupIconWrap}>
            <Icon name={icons.cloud} size={22} color={colors.cyan} />
          </View>
          <View style={styles.backupMeta}>
            <BodyText weight="600" style={styles.backupTitle}>
              Personal Vault
            </BodyText>
            <BodyText style={styles.backupDesc}>
              Oct 24, 2023 · alex.vance@gmail.com
            </BodyText>
          </View>
        </View>

        <View style={styles.verifiedBadge}>
          <Icon name={icons.checkCircle} size={20} color={colors.success} />
        </View>
      </Card>

      {/* Biometric Quick Option */}
      <Button
        label="Verify with Biometrics"
        variant="secondary"
        icon={<Icon name={icons.fingerprint} size={20} color={colors.primaryTint} />}
        onPress={handleRestore}
        style={styles.biometricBtn}
      />

      {/* Divider */}
      <View style={styles.dividerRow}>
        <View style={styles.line} />
        <BodyText style={styles.orText}>or enter password</BodyText>
        <View style={styles.line} />
      </View>

      {/* Password Form */}
      <View style={styles.formSection}>
        <Input
          label="Backup Decryption Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Enter backup password"
          secureTextEntry={!showPassword}
          rightAccessory={
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}>
              <Icon
                name={showPassword ? icons.visibilityOff : icons.visibility}
                size={20}
                color={colors.outline}
              />
            </Pressable>
          }
        />
      </View>

      {/* Primary CTA */}
      <View style={styles.footer}>
        <Button
          label={restoring ? 'Decrypting & Restoring...' : 'Restore Wallet'}
          variant="primary"
          loading={restoring}
          disabled={!password && !restoring}
          iconRight={
            !restoring ? (
              <Icon
                name={icons.settingsBackupRestore}
                size={18}
                color={colors.textOnPrimary}
              />
            ) : null
          }
          onPress={handleRestore}
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
  backupCard: {
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backupLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  backupIconWrap: {
    width: 42,
    height: 42,
    borderRadius: radii.lg,
    backgroundColor: 'rgba(0, 198, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 198, 255, 0.2)',
  },
  backupMeta: {
    gap: 2,
  },
  backupTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  backupDesc: {
    ...typography.caption,
    color: colors.outline,
  },
  verifiedBadge: {
    padding: 2,
  },
  biometricBtn: {
    width: '100%',
    minHeight: 48,
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingVertical: spacing.xs,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  orText: {
    ...typography.caption,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  formSection: {
    gap: spacing.sm,
  },
  footer: {
    paddingTop: spacing.md,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 50,
  },
});
