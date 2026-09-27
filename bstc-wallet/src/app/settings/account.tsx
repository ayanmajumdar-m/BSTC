import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
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

export default function AccountDetailsScreen() {
  const router = useRouter();
  const { signOut } = useWalletState();
  const [copied, setCopied] = useState(false);

  const handleCopyId = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Account"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Security status"
            size={36}
            variant="ghost">
            <Icon name={icons.verified} size={20} color={colors.primaryTint} />
          </IconButton>
        }
      />

      {/* Profile Header Module */}
      <View style={styles.profileHeader}>
        <View style={styles.avatarWrap}>
          <Avatar initials="AV" size={80} />
          <View style={styles.avatarBadge}>
            <Icon name={icons.checkCircle} size={16} color={colors.success} />
          </View>
        </View>

        <HeadlineText weight="600" style={styles.profileName}>
          Alex Vance
        </HeadlineText>
        <MonoText style={styles.profileEmail}>alex.vance@gmail.com</MonoText>

        <Pressable
          onPress={() => {}}
          style={({ pressed }) => [styles.editProfileBtn, pressed && styles.btnPressed]}>
          <Icon name={icons.edit} size={14} color={colors.primaryTint} />
          <BodyText weight="600" style={styles.editProfileText}>
            Edit Profile
          </BodyText>
        </Pressable>
      </View>

      <View style={styles.divider} />

      {/* Account Details List */}
      <View style={styles.section}>
        <BodyText weight="600" style={styles.sectionHeader}>
          Account Details
        </BodyText>

        <Card variant="low" padding="none" style={styles.detailsCard}>
          {/* Account ID */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <BodyText style={styles.rowLabel}>Account ID</BodyText>
              <MonoText weight="500" style={styles.idValue}>
                BSTC-8829-4102
              </MonoText>
            </View>
            <Pressable
              onPress={handleCopyId}
              hitSlop={8}
              accessibilityRole="button"
              accessibilityLabel="Copy Account ID"
              style={({ pressed }) => [styles.copyBtn, pressed && styles.btnPressed]}>
              <Icon
                name={copied ? icons.check : icons.copy}
                size={18}
                color={copied ? colors.success : colors.outline}
              />
            </Pressable>
          </View>

          <View style={styles.innerDivider} />

          {/* Connected Google Account */}
          <Pressable
            onPress={() => {}}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.rowLeft}>
              <BodyText style={styles.rowLabel}>Connected Google Account</BodyText>
              <View style={styles.googleAccountRow}>
                <View style={styles.activeDot} />
                <BodyText style={styles.rowValue}>alex.vance@gmail.com</BodyText>
              </View>
            </View>
            <View style={styles.rowRight}>
              <View style={styles.activeBadge}>
                <BodyText weight="600" style={styles.activeBadgeText}>
                  Active
                </BodyText>
              </View>
              <Icon name={icons.chevronRight} size={18} color={colors.outline} />
            </View>
          </Pressable>

          <View style={styles.innerDivider} />

          {/* Account Security Tier */}
          <Pressable
            onPress={() => router.push('/settings/security')}
            style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
            <View style={styles.rowLeft}>
              <BodyText style={styles.rowLabel}>Account Security Tier</BodyText>
              <View style={styles.tierRow}>
                <Icon name={icons.verified} size={15} color={colors.success} />
                <BodyText weight="500" style={styles.rowValue}>
                  Verified • Enclave Protected
                </BodyText>
              </View>
            </View>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </Pressable>

          <View style={styles.innerDivider} />

          {/* Member Since */}
          <View style={styles.row}>
            <View style={styles.rowLeft}>
              <BodyText style={styles.rowLabel}>Member Since</BodyText>
              <BodyText weight="500" style={styles.rowValue}>
                October 2023
              </BodyText>
            </View>
            <View style={styles.tierBadge}>
              <BodyText weight="600" style={styles.tierBadgeText}>
                Institutional Tier 1
              </BodyText>
            </View>
          </View>
        </Card>
      </View>

      {/* Sign Out Action */}
      <View style={styles.signOutSection}>
        <Button
          label="Sign Out"
          variant="destructive"
          icon={<Icon name={icons.logout} size={18} color={colors.error} />}
          iconRight={<Icon name={icons.arrowForward} size={16} color={colors.error} />}
          onPress={() => {
            signOut();
            router.replace('/welcome');
          }}
          style={styles.signOutBtn}
        />
        <MonoText style={styles.versionText}>
          BSTC Obsidian Terminal Client v2.4.1 (Enclave Secured)
        </MonoText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.xs,
  },
  avatarWrap: {
    position: 'relative',
    marginBottom: spacing.xs,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.surface,
  },
  profileName: {
    fontSize: 22,
    color: colors.textPrimary,
  },
  profileEmail: {
    ...typography.caption,
    color: colors.outline,
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginTop: spacing.xs,
  },
  btnPressed: {
    opacity: 0.7,
  },
  editProfileText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.textPrimary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
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
  detailsCard: {
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
    gap: 3,
    flex: 1,
  },
  rowLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  idValue: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  rowValue: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  googleAccountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  activeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  tierRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  copyBtn: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    backgroundColor: colors.successMuted,
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.25)',
  },
  activeBadgeText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.success,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  tierBadgeText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.textSecondary,
  },
  innerDivider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  signOutSection: {
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.lg,
  },
  signOutBtn: {
    width: '100%',
    minHeight: 48,
  },
  versionText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
    textAlign: 'center',
  },
});
