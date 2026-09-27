import React, { useCallback } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Icon,
  IconButton,
  Screen,
  SegmentedControlRow,
  TokenRow,
} from '@/components/ui';
import { PortfolioHeader } from '@/components/wallet/PortfolioHeader';
import { RecentActivity } from '@/components/wallet/RecentActivity';
import {
  NetworkFilter,
  WalletSelector,
} from '@/components/wallet/WalletSelector';
import { QuickAction } from '@/components/ui/QuickAction';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useWalletState } from '@/state/wallet-state';
import { colors, icons, radii, spacing, typography } from '@/theme';

/**
 * Wallet Home — Stitch screen
 * projects/.../screens/153903b99e1347c09326b7b922b6e6df
 */
export default function WalletHomeScreen() {
  const router = useRouter();
  const portfolio = usePortfolio();
  const { walletName, networkLabel } = useWalletState();

  const goHistory = useCallback(() => {
    router.navigate('/history');
  }, [router]);

  return (
    <Screen scroll tabBarInset contentContainerStyle={styles.content}>
      {/* Header: wallet selector · network · QR */}
      <View style={styles.header}>
        <WalletSelector
          name={walletName || portfolio.walletName}
          onPress={() => router.push('/settings/wallet-management')}
        />
        <View style={styles.headerRight}>
          <NetworkFilter
            label={networkLabel || portfolio.networkLabel}
            onPress={() => router.push('/settings/network-management')}
          />
          <IconButton
            accessibilityLabel="Scan QR code"
            size={44}
            shape="circle"
            onPress={() => router.push('/qr')}
            icon={
              <Icon name={icons.qrScanner} size={20} color={colors.textPrimary} />
            }
          />
        </View>
      </View>

      <PortfolioHeader
        totalBalance={portfolio.totalBalance}
        changeLabel={portfolio.changeLabel}
        hidden={portfolio.balanceHidden}
        onToggleVisibility={portfolio.toggleBalanceVisibility}
      />

      {/* Quick actions */}
      <View style={styles.actions}>
        <QuickAction
          label="Send"
          icon={icons.send}
          onPress={() => router.push('/send')}
        />
        <QuickAction
          label="Receive"
          icon={icons.receive}
          onPress={() => router.push('/receive')}
        />
        <QuickAction
          label="Buy"
          icon={icons.buy}
          iconSize={22}
          onPress={() => router.push('/buy')}
        />
        <QuickAction
          label="Swap"
          icon={icons.swap}
          onPress={() => router.push('/swap')}
        />
      </View>

      {/* Asset tabs + token list */}
      <View style={styles.assets}>
        <View style={styles.assetTabs}>
          <SegmentedControlRow
            segments={[
              { key: 'tokens', label: 'Tokens' },
              { key: 'nfts', label: 'NFTs' },
              { key: 'defi', label: 'DeFi' },
            ]}
            value={portfolio.assetTab}
            onChange={portfolio.setAssetTab}
          />
        </View>

        {portfolio.assetTab === 'tokens' ? (
          <View style={styles.tokenList}>
            {portfolio.tokens.map((token) => (
              <TokenRow
                key={token.id}
                token={token}
                onPress={() => router.push(`/token/${token.id}`)}
              />
            ))}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Manage Tokens"
              onPress={() => router.push('/token/manage')}
              style={({ pressed }) => [
                styles.manageBtn,
                pressed && styles.managePressed,
              ]}>
              <Icon name={icons.manage} size={18} color={colors.outline} />
              <BodyText weight="600" style={styles.manageLabel}>
                Manage Tokens
              </BodyText>
            </Pressable>
          </View>
        ) : (
          <View style={styles.emptyTab}>
            <BodyText style={styles.emptyText}>
              {portfolio.assetTab === 'nfts'
                ? 'No NFTs yet'
                : 'No DeFi positions yet'}
            </BodyText>
          </View>
        )}
      </View>

      <RecentActivity
        items={portfolio.recentActivity}
        onViewAll={goHistory}
        onItemPress={(id) => router.push(`/history/${id}`)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.xl,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xxl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.xs,
  },
  assets: {
    gap: spacing.md,
  },
  assetTabs: {
    paddingHorizontal: spacing.xs,
  },
  tokenList: {
    gap: spacing.xs,
  },
  manageBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    marginTop: spacing.xs,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    backgroundColor: colors.surfaceContainer,
  },
  managePressed: {
    opacity: 0.8,
  },
  manageLabel: {
    ...typography.bodySecondary,
    color: colors.outline,
    letterSpacing: 0.2,
  },
  emptyTab: {
    paddingVertical: spacing.xxl,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  emptyText: {
    ...typography.bodySecondary,
    color: colors.outline,
  },
});
