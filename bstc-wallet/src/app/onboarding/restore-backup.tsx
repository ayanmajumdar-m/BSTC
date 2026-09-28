import { useState, useRef, useEffect } from 'react';
import { Pressable, StyleSheet, View, Modal } from 'react-native';
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
import { useWalletState } from '@/state/wallet-state';

export default function RestoreBackupScreen() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [restoring, setRestoring] = useState(false);
  
  const [restoreStatus, setRestoreStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const { restoreWallet } = useWalletState();
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleRestore = async () => {
    if (restoring) return; // Prevent duplicate requests
    setRestoring(true);
    setRestoreStatus('idle');
    setErrorMessage('');
    
    try {
      await restoreWallet(password);
      setRestoreStatus('success');
      
      timeoutRef.current = setTimeout(() => {
        setRestoreStatus('idle');
        router.replace('/(tabs)');
      }, 2500);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      setErrorMessage(message);
      setRestoreStatus('error');
      
      timeoutRef.current = setTimeout(() => {
        setRestoreStatus('idle');
      }, 3000);
    } finally {
      setRestoring(false);
    }
  };

  return (
    <Screen scroll keyboardAvoiding contentContainerStyle={styles.content}>
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

      {/* Floating Status Message */}
      <Modal visible={restoreStatus !== 'idle'} transparent animationType="fade">
        <View style={styles.floatingOverlay}>
          <View style={[
            styles.floatingMessage, 
            restoreStatus === 'success' ? styles.floatingSuccess : styles.floatingError
          ]}>
            <Icon
              name={restoreStatus === 'success' ? icons.checkCircle : icons.warning}
              size={28}
              color={restoreStatus === 'success' ? colors.success : colors.error}
            />
            <BodyText style={styles.floatingText}>
              {restoreStatus === 'success'
                ? 'Backup restored successfully'
                : `Backup restore failed: ${errorMessage}`}
            </BodyText>
          </View>
        </View>
      </Modal>
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
  floatingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  floatingMessage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.lg,
    padding: spacing.xl,
    gap: spacing.md,
    maxWidth: 300,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
  },
  floatingSuccess: {
    borderColor: 'rgba(14, 203, 129, 0.3)',
  },
  floatingError: {
    borderColor: 'rgba(246, 70, 93, 0.3)',
  },
  floatingText: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
