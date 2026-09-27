import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  Badge,
  BodyText,
  Card,
  HeadlineText,
  Icon,
  MonoText,
  NetworkBadge,
  Screen,
  ScreenHeader,
  SearchBar,
  SegmentedControlRow,
} from '@/components/ui';
import {
  getFeaturedProtocols,
  getRecentDApps,
  MOCK_WALLET_ADDRESS,
  Web3DApp,
} from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'defi', label: 'DeFi' },
  { key: 'nfts', label: 'NFTs' },
  { key: 'bridges', label: 'Bridges' },
  { key: 'gaming', label: 'Gaming' },
  { key: 'social', label: 'Social' },
];

export default function Web3Screen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const [recentDApps, setRecentDApps] = useState(() => getRecentDApps());
  const allProtocols = useMemo(() => getFeaturedProtocols(), []);

  const filteredProtocols = useMemo(() => {
    let list = allProtocols;
    if (category !== 'all') {
      list = list.filter((p) => p.category === category);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.categoryLabel.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allProtocols, category, search]);

  return (
    <Screen scroll tabBarInset contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader
        title="Explore dApps"
        right={
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Network selection"
            onPress={() => router.push('/settings/network-management')}
            style={({ pressed }) => [styles.networkPill, pressed && { opacity: 0.8 }]}>
            <View style={styles.networkDot} />
            <BodyText weight="600" style={styles.networkText}>
              Ethereum
            </BodyText>
            <Icon name={icons.expandMore} size={14} color={colors.outline} />
          </Pressable>
        }
      />

      {/* Active Session Status Banner */}
      <Card variant="low" style={styles.sessionCard}>
        <View style={styles.sessionLeft}>
          <View style={styles.linkIconWrap}>
            <Icon name={icons.link} size={16} color={colors.success} />
          </View>
          <View>
            <BodyText style={styles.sessionCaption}>Active Session</BodyText>
            <MonoText style={styles.sessionAddress}>
              {`${MOCK_WALLET_ADDRESS.slice(0, 6)}...${MOCK_WALLET_ADDRESS.slice(-4)}`}
            </MonoText>
          </View>
        </View>
        <View style={styles.activeStatusBadge}>
          <View style={styles.pulsingGreenDot} />
          <BodyText weight="600" style={styles.activeStatusText}>
            Mainnet Active
          </BodyText>
        </View>
      </Card>

      {/* Search / URL Entry Bar */}
      <View style={styles.searchWrapper}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search or enter dApp URL..."
          shape="xl"
          onScanPress={() => router.push('/qr')}
        />
      </View>

      {/* Category Filter Chips */}
      <View style={styles.categories}>
        <SegmentedControlRow
          segments={CATEGORIES}
          value={category}
          onChange={setCategory}
        />
      </View>

      {/* Security Hub & Simulation Triggers */}
      <Card variant="low" style={styles.securityHubCard}>
        <View style={styles.securityHubHeader}>
          <View style={styles.securityHubTitleRow}>
            <Icon name={icons.shield} size={16} color={colors.primaryTint} />
            <HeadlineText weight="600" style={styles.securityHubTitle}>
              Security & Approvals
            </HeadlineText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Manage token approvals"
            onPress={() => router.push('/web3/approvals')}
            style={styles.manageApprovalsBtn}>
            <BodyText weight="600" style={styles.manageApprovalsText}>
              2 At Risk
            </BodyText>
            <Icon name={icons.chevronRight} size={14} color={colors.error} />
          </Pressable>
        </View>

        <View style={styles.securityActionsRow}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Test Connection Approval"
            onPress={() => router.push('/web3/connect')}
            style={({ pressed }) => [
              styles.securityActionChip,
              pressed && styles.securityActionChipPressed,
            ]}>
            <Icon name={icons.link} size={14} color={colors.brand} />
            <BodyText style={styles.securityActionText}>Connect</BodyText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Test Message Signing"
            onPress={() => router.push('/web3/sign')}
            style={({ pressed }) => [
              styles.securityActionChip,
              pressed && styles.securityActionChipPressed,
            ]}>
            <Icon name={icons.fingerprint} size={14} color={colors.success} />
            <BodyText style={styles.securityActionText}>Sign</BodyText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="View Token Approvals"
            onPress={() => router.push('/web3/approvals')}
            style={({ pressed }) => [
              styles.securityActionChip,
              pressed && styles.securityActionChipPressed,
            ]}>
            <Icon name={icons.bolt} size={14} color={colors.warning} />
            <BodyText style={styles.securityActionText}>Approvals</BodyText>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Test Phishing Warning"
            onPress={() => router.push('/web3/warning')}
            style={({ pressed }) => [
              styles.securityActionChip,
              styles.securityActionChipWarn,
              pressed && styles.securityActionChipPressed,
            ]}>
            <Icon name={icons.warning} size={14} color={colors.error} />
            <BodyText style={styles.securityActionWarnText}>Warning</BodyText>
          </Pressable>
        </View>
      </Card>

      {/* Recent dApps (Grid) */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <HeadlineText weight="600" style={styles.sectionTitle}>
            Recent dApps
          </HeadlineText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear recent dApps"
            onPress={() => setRecentDApps([])}>
            <BodyText style={styles.clearBtn}>Clear</BodyText>
          </Pressable>
        </View>

        <View style={styles.recentGrid}>
          {recentDApps.map((dapp) => (
            <Pressable
              key={dapp.id}
              accessibilityRole="button"
              accessibilityLabel={dapp.name}
              onPress={() => router.push('/web3/connect')}
              style={({ pressed }) => [
                styles.dappCard,
                pressed && styles.dappCardPressed,
              ]}>
              <View style={styles.dappIconWrap}>
                <Icon
                  name={dapp.icon as any}
                  size={22}
                  color={dapp.iconColor}
                />
                {dapp.active ? <View style={styles.dappActiveDot} /> : null}
              </View>
              <BodyText weight="500" style={styles.dappName} numberOfLines={1}>
                {dapp.name}
              </BodyText>
              <BodyText style={styles.dappMeta}>{dapp.time}</BodyText>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Popular / Featured dApps List */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <HeadlineText weight="600" style={styles.sectionTitle}>
            Popular dApps
          </HeadlineText>
          <BodyText style={styles.verifiedSub}>Curated &amp; Verified</BodyText>
        </View>

        <View style={styles.featuredList}>
          {filteredProtocols.map((protocol) => (
            <Pressable
              key={protocol.id}
              accessibilityRole="button"
              accessibilityLabel={`Open ${protocol.name}`}
              onPress={() => router.push('/web3/connect')}
              style={({ pressed }) => [
                styles.protocolCard,
                pressed && styles.protocolCardPressed,
              ]}>
              <View style={styles.protocolRow}>
                <View style={styles.protocolLeft}>
                  <View
                    style={[
                      styles.protocolIcon,
                      { backgroundColor: `${protocol.iconColor}15` },
                    ]}>
                    <Icon
                      name={protocol.icon as any}
                      size={22}
                      color={protocol.iconColor}
                    />
                  </View>
                  <View style={styles.protocolMeta}>
                    <View style={styles.protocolNameRow}>
                      <HeadlineText weight="600" style={styles.protocolName}>
                        {protocol.name}
                      </HeadlineText>
                      <View style={styles.categoryBadge}>
                        <BodyText style={styles.categoryBadgeText}>
                          {protocol.categoryLabel}
                        </BodyText>
                      </View>
                      {protocol.active ? (
                        <View style={styles.protocolActiveDot} />
                      ) : null}
                    </View>
                    <BodyText style={styles.protocolDesc} numberOfLines={1}>
                      {protocol.desc}
                    </BodyText>
                  </View>
                </View>
                <View style={styles.chevronWrap}>
                  <Icon
                    name={icons.chevronRight}
                    size={18}
                    color={colors.outline}
                  />
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  networkPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  networkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  networkText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  sessionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  sessionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  linkIconWrap: {
    width: 32,
    height: 32,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  sessionCaption: {
    fontSize: 11,
    color: colors.outline,
  },
  sessionAddress: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  activeStatusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(14, 203, 129, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.25)',
  },
  pulsingGreenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  activeStatusText: {
    fontSize: 11,
    color: colors.success,
  },
  searchWrapper: {
    position: 'relative',
  },
  categories: {
    marginTop: -spacing.xs,
  },
  securityHubCard: {
    padding: 12,
    gap: 10,
    backgroundColor: 'rgba(35, 74, 213, 0.05)',
    borderColor: 'rgba(35, 74, 213, 0.2)',
  },
  securityHubHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  securityHubTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityHubTitle: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  manageApprovalsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(246, 70, 93, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(246, 70, 93, 0.3)',
  },
  manageApprovalsText: {
    fontSize: 11,
    color: colors.error,
  },
  securityActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  securityActionChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: 6,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  securityActionChipWarn: {
    borderColor: 'rgba(246, 70, 93, 0.3)',
  },
  securityActionChipPressed: {
    backgroundColor: colors.surfaceHigh,
  },
  securityActionText: {
    fontSize: 11,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  securityActionWarnText: {
    fontSize: 11,
    color: colors.error,
    fontWeight: '600',
  },
  section: {
    gap: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  clearBtn: {
    ...typography.caption,
    color: colors.primaryTint,
  },
  verifiedSub: {
    ...typography.caption,
    color: colors.outline,
  },
  recentGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dappCard: {
    flex: 1,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    borderRadius: radii.xl,
    padding: spacing.sm,
    alignItems: 'center',
    gap: 4,
  },
  dappCardPressed: {
    backgroundColor: colors.surface,
  },
  dappIconWrap: {
    width: 44,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    position: 'relative',
  },
  dappActiveDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    borderWidth: 1,
    borderColor: colors.background,
  },
  dappName: {
    ...typography.caption,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  dappMeta: {
    fontSize: 10,
    lineHeight: 12,
    color: colors.outline,
  },
  featuredList: {
    gap: spacing.sm,
  },
  protocolCard: {
    padding: 14,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  protocolCardPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  protocolRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  protocolLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  protocolIcon: {
    width: 42,
    height: 42,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  protocolMeta: {
    flex: 1,
    gap: 2,
  },
  protocolNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  protocolName: {
    fontSize: 15,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  categoryBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceHigh,
  },
  categoryBadgeText: {
    fontSize: 10,
    color: colors.outline,
  },
  protocolActiveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  protocolDesc: {
    ...typography.caption,
    color: colors.outline,
  },
  chevronWrap: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
