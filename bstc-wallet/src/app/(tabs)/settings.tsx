import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  Avatar,
  BodyText,
  Button,
  HeadlineText,
  Icon,
  Screen,
  ScreenHeader,
  SettingRow,
  SettingSection,
} from '@/components/ui';
import { useSettingsProfile } from '@/hooks/usePortfolio';
import { useWalletState } from '@/state/wallet-state';
import { colors, icons, radii, spacing, typography } from '@/theme';

/**
 * Settings Screen — Stitch screen
 * projects/.../screens/7c62bb95e7d549ff96ea0fc208cff151
 */
export default function SettingsScreen() {
  const router = useRouter();
  const profile = useSettingsProfile();
  const { signOut } = useWalletState();

  const handleSignOut = () => {
    signOut();
    if (router.canDismiss()) { router.dismissAll(); } router.replace('/welcome');
  };

  return (
    <Screen scroll tabBarInset contentContainerStyle={styles.content}>
      <ScreenHeader title="Settings" />

      {/* User Profile Card */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Profile: ${profile.name}`}
        onPress={() => router.push('/settings/account')}
        style={({ pressed }) => [
          styles.profileCard,
          pressed && styles.profilePressed,
        ]}>
        <View style={styles.profileLeft}>
          <Avatar initials={profile.initials} size={48} />
          <View style={styles.profileMeta}>
            <HeadlineText weight="600" style={styles.profileName}>
              {profile.name}
            </HeadlineText>
            <BodyText style={styles.profileEmail}>
              {profile.email}
            </BodyText>
          </View>
        </View>
        <Icon name={icons.chevronRight} size={20} color={colors.outline} />
      </Pressable>

      {/* SECURITY Section */}
      <SettingSection title="SECURITY">
        <SettingRow
          label="Security & Privacy"
          icon={icons.security}
          onPress={() => router.push('/settings/security')}
        />
      </SettingSection>

      {/* WALLET Section */}
      <SettingSection title="WALLET">
        <SettingRow
          label="Wallet Management"
          icon={icons.wallet}
          onPress={() => router.push('/settings/wallet-management')}
        />
      </SettingSection>

      {/* BACKUP Section */}
      <SettingSection title="BACKUP">
        <SettingRow
          label="Wallet Backup"
          icon={icons.backup}
          onPress={() => router.push('/settings/cloud-backup')}
        />
      </SettingSection>

      {/* PREFERENCES Section */}
      <SettingSection title="PREFERENCES">
        <SettingRow
          label="Preferences"
          icon={icons.manage}
          onPress={() => router.push('/settings/preferences')}
        />
        <SettingRow
          label="Notifications"
          icon={icons.notifications}
          onPress={() => router.push('/settings/notifications')}
        />
        <SettingRow
          label="Help & Support"
          icon={icons.help}
          onPress={() => {}}
        />
        <SettingRow
          label="Terms & Privacy"
          icon={icons.terms}
          onPress={() => {}}
        />
      </SettingSection>

      {/* Sign Out Button & Version */}
      <View style={styles.footer}>
        <Button
          label="Sign Out"
          variant="destructive"
          icon={<Icon name={icons.logout} size={18} color={colors.error} />}
          onPress={handleSignOut}
          style={styles.signOutBtn}
        />
        <BodyText style={styles.version}>
          BSTC Wallet v2.4.0 (Build 302)
        </BodyText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: colors.surfaceLow,
    borderRadius: radii.xl,
  },
  profilePressed: {
    backgroundColor: colors.surfaceContainer,
    transform: [{ scale: 0.99 }],
  },
  profileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  profileMeta: {
    gap: 2,
  },
  profileName: {
    fontSize: 16,
    lineHeight: 22,
    color: colors.textPrimary,
    letterSpacing: -0.2,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.outline,
  },
  footer: {
    gap: spacing.lg,
    alignItems: 'center',
    paddingTop: spacing.xs,
    paddingBottom: spacing.xl,
  },
  signOutBtn: {
    width: '100%',
  },
  version: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.2,
  },
});
