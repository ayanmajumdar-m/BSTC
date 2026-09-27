import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  IconButton,
  MonoText,
  PrimaryButton,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { getDAppConnectionRequest } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function DAppConnectScreen() {
  const router = useRouter();
  const req = getDAppConnectionRequest();
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
    setTimeout(() => {
      router.back();
    }, 1200);
  };

  const handleReject = () => {
    router.back();
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Top Header */}
      <ScreenHeader
        title="Connection Request"
        onBack={handleReject}
        right={
          <IconButton
            accessibilityLabel="Close"
            size={36}
            shape="circle"
            variant="ghost"
            icon={<Icon name={icons.close} size={20} color={colors.outline} />}
            onPress={handleReject}
          />
        }
      />

      {/* dApp Identity & Verification */}
      <View style={styles.dappIdentity}>
        <View style={styles.dappAvatarContainer}>
          <View style={styles.dappAvatar}>
            <Icon
              name={icons.currencyExchange}
              size={32}
              color={req.dappIconColor}
            />
          </View>
          <View style={styles.verifiedBadgeWrap}>
            <Icon name={icons.verified} size={14} color={colors.success} />
          </View>
        </View>

        <HeadlineText weight="700" style={styles.dappTitle}>
          {req.dappName}
        </HeadlineText>

        <View style={styles.urlPill}>
          <Icon name={icons.lock} size={12} color={colors.success} />
          <MonoText style={styles.urlText}>{req.dappUrl}</MonoText>
          <View style={styles.pillDot} />
          <BodyText weight="600" style={styles.verifiedText}>
            Verified
          </BodyText>
        </View>
      </View>

      {/* Connection Target Metadata Card */}
      <Card variant="low" style={styles.targetCard}>
        {/* Wallet Row */}
        <View style={styles.targetRow}>
          <BodyText style={styles.targetLabel}>Requested Wallet</BodyText>
          <View style={styles.targetValueRow}>
            <View style={styles.walletBadge}>
              <BodyText weight="700" style={styles.walletBadgeText}>
                {req.accountBadge}
              </BodyText>
            </View>
            <View style={styles.walletDetails}>
              <BodyText weight="500" style={styles.walletName}>
                {req.accountName}
              </BodyText>
              <MonoText style={styles.walletAddress}>
                {`${req.accountAddress.slice(0, 6)}...${req.accountAddress.slice(-4)}`}
              </MonoText>
            </View>
          </View>
        </View>

        <View style={styles.cardDivider} />

        {/* Network Row */}
        <View style={styles.targetRow}>
          <BodyText style={styles.targetLabel}>Network</BodyText>
          <View style={styles.networkValueRow}>
            <View style={styles.pulsingGreenDot} />
            <BodyText weight="600" style={styles.networkName}>
              {req.networkName}
            </BodyText>
            <MonoText style={styles.chainIdText}>
              (Chain ID: {req.chainId})
            </MonoText>
          </View>
        </View>
      </Card>

      {/* Permissions Requested Section */}
      <View style={styles.permissionsSection}>
        <View style={styles.permissionsHeader}>
          <BodyText weight="600" style={styles.permissionsTitle}>
            PERMISSIONS REQUESTED
          </BodyText>
          <MonoText style={styles.permissionsScope}>
            {req.permissions.length} scopes
          </MonoText>
        </View>

        <Card variant="low" style={styles.permissionsCard}>
          {req.permissions.map((perm, idx) => (
            <View key={perm.id}>
              <View style={styles.permissionItem}>
                <View
                  style={[
                    styles.permIconWrap,
                    perm.tone === 'success'
                      ? styles.permIconSuccess
                      : styles.permIconBrand,
                  ]}>
                  <Icon
                    name={
                      perm.icon === 'visibility'
                        ? icons.visibility
                        : icons.touchApp
                    }
                    size={16}
                    color={
                      perm.tone === 'success' ? colors.success : colors.brand
                    }
                  />
                </View>
                <View style={styles.permTextWrap}>
                  <BodyText weight="600" style={styles.permTitle}>
                    {perm.title}
                  </BodyText>
                  <BodyText style={styles.permDesc}>{perm.desc}</BodyText>
                </View>
              </View>
              {idx < req.permissions.length - 1 ? (
                <View style={styles.permDivider} />
              ) : null}
            </View>
          ))}
        </Card>

        {/* Negative Reassurance Guarantee Pill */}
        <Card variant="low" style={styles.guaranteeCard}>
          <Icon name={icons.shield} size={18} color={colors.success} />
          <BodyText style={styles.guaranteeText}>
            This dApp{' '}
            <BodyText weight="700" style={styles.guaranteeHighlight}>
              cannot
            </BodyText>{' '}
            execute transfers or move funds without your explicit confirmation.
          </BodyText>
        </Card>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <Button
          label="Reject"
          variant="outline"
          style={styles.rejectBtn}
          onPress={handleReject}
        />
        <PrimaryButton
          label={connected ? 'Connected!' : 'Connect'}
          icon={
            !connected ? (
              <Icon name={icons.arrowForward} size={18} color="#FFFFFF" />
            ) : (
              <Icon name={icons.check} size={18} color="#FFFFFF" />
            )
          }
          style={connected ? styles.connectedBtn : styles.connectBtn}
          onPress={handleConnect}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shieldWrap: {
    width: 26,
    height: 26,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    color: colors.textPrimary,
  },
  dappIdentity: {
    alignItems: 'center',
    paddingVertical: spacing.xs,
    gap: 8,
  },
  dappAvatarContainer: {
    position: 'relative',
    marginBottom: 4,
  },
  dappAvatar: {
    width: 64,
    height: 64,
    borderRadius: radii.xxl,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadgeWrap: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  dappTitle: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  urlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  urlText: {
    ...typography.dataMonoSm,
    fontSize: 12,
    color: colors.outline,
  },
  pillDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: colors.outline,
  },
  verifiedText: {
    fontSize: 11,
    color: colors.success,
  },
  targetCard: {
    padding: 16,
    gap: 12,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  targetLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  targetValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
  },
  walletDetails: {
    alignItems: 'flex-end',
  },
  walletName: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  walletAddress: {
    fontSize: 11,
    color: colors.outline,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
  },
  networkValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulsingGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  networkName: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  chainIdText: {
    fontSize: 11,
    color: colors.outline,
  },
  permissionsSection: {
    gap: 10,
  },
  permissionsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  permissionsTitle: {
    fontSize: 11,
    color: colors.outline,
    letterSpacing: 0.5,
  },
  permissionsScope: {
    fontSize: 11,
    color: colors.outline,
  },
  permissionsCard: {
    padding: 14,
    gap: 12,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  permIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },
  permIconSuccess: {
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.25)',
  },
  permIconBrand: {
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(35, 74, 213, 0.3)',
  },
  permTextWrap: {
    flex: 1,
    gap: 2,
  },
  permTitle: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  permDesc: {
    ...typography.caption,
    color: colors.outline,
    lineHeight: 16,
  },
  permDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
    marginTop: 10,
  },
  guaranteeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 10,
    backgroundColor: 'rgba(14, 203, 129, 0.06)',
    borderColor: 'rgba(14, 203, 129, 0.2)',
  },
  guaranteeText: {
    ...typography.caption,
    color: colors.outline,
    flex: 1,
    lineHeight: 18,
  },
  guaranteeHighlight: {
    color: colors.textPrimary,
    textDecorationLine: 'underline',
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  rejectBtn: {
    flex: 1,
    height: 48,
  },
  connectBtn: {
    flex: 1,
    height: 48,
  },
  connectedBtn: {
    flex: 1,
    height: 48,
    backgroundColor: colors.success,
  },
});
