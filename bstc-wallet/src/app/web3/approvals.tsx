import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
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
import { getMockTokenApprovals, TokenApproval } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function TokenApprovalsScreen() {
  const router = useRouter();
  const [approvals, setApprovals] = useState<TokenApproval[]>(() =>
    getMockTokenApprovals()
  );
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'unlimited' | 'limited'>('all');
  const [revokedIds, setRevokedIds] = useState<Set<string>>(new Set());

  // Active approvals (not yet revoked)
  const activeApprovals = useMemo(() => {
    return approvals.filter((a) => !revokedIds.has(a.id));
  }, [approvals, revokedIds]);

  const unlimitedCount = useMemo(() => {
    return activeApprovals.filter((a) => a.isUnlimited).length;
  }, [activeApprovals]);

  const limitedCount = useMemo(() => {
    return activeApprovals.filter((a) => !a.isUnlimited).length;
  }, [activeApprovals]);

  const filteredList = useMemo(() => {
    let list = activeApprovals;
    if (filter === 'unlimited') {
      list = list.filter((a) => a.isUnlimited);
    } else if (filter === 'limited') {
      list = list.filter((a) => !a.isUnlimited);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (a) =>
          a.dappName.toLowerCase().includes(q) ||
          a.tokenSymbol.toLowerCase().includes(q) ||
          a.spenderAddress.toLowerCase().includes(q)
      );
    }
    return list;
  }, [activeApprovals, filter, search]);

  const handleRevokeSingle = (id: string) => {
    setRevokedIds((prev) => new Set([...prev, id]));
  };

  const handleRevokeAllUnlimited = () => {
    const unlimitedIds = activeApprovals
      .filter((a) => a.isUnlimited)
      .map((a) => a.id);
    setRevokedIds((prev) => new Set([...prev, ...unlimitedIds]));
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Top Header */}
      <ScreenHeader
        title="Token Approvals"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Security status"
            size={36}
            shape="circle"
            variant="ghost"
            icon={<Icon name={icons.shield} size={20} color={colors.outline} />}
            onPress={() => {}}
          />
        }
      />

      {/* Risk Telemetry Bento Summary Card */}
      <Card variant="low" style={styles.summaryCard}>
        <View style={styles.summaryLeft}>
          <BodyText style={styles.summaryLabel}>Active Approvals</BodyText>
          <View style={styles.summaryNumbersRow}>
            <HeadlineText weight="700" style={styles.summaryCount}>
              {activeApprovals.length}
            </HeadlineText>
            {unlimitedCount > 0 ? (
              <MonoText style={styles.unlimitedRiskText}>
                {unlimitedCount} Unlimited / At Risk
              </MonoText>
            ) : (
              <MonoText style={styles.safeStatusText}>All Safe</MonoText>
            )}
          </View>
        </View>

        {unlimitedCount > 0 ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Revoke all unlimited token approvals"
            onPress={handleRevokeAllUnlimited}
            style={({ pressed }) => [
              styles.revokeAllBtn,
              pressed && styles.revokeAllBtnPressed,
            ]}>
            <Icon name={icons.bolt} size={16} color={colors.error} />
            <BodyText weight="600" style={styles.revokeAllText}>
              Revoke Unlimited
            </BodyText>
          </Pressable>
        ) : null}
      </Card>

      {/* Search & Filter Bar */}
      <View style={styles.filterSection}>
        <View style={styles.searchBar}>
          <Icon name={icons.search} size={18} color={colors.outline} />
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Search dApp or token..."
            placeholderTextColor="rgba(132, 142, 156, 0.5)"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.filterChipsRow}>
          <Pressable
            onPress={() => setFilter('all')}
            style={[
              styles.filterChip,
              filter === 'all' && styles.filterChipActive,
            ]}>
            <BodyText
              weight="500"
              style={[
                styles.filterChipText,
                filter === 'all' && styles.filterChipTextActive,
              ]}>
              All
            </BodyText>
            <MonoText style={styles.filterChipCount}>
              {activeApprovals.length}
            </MonoText>
          </Pressable>

          <Pressable
            onPress={() => setFilter('unlimited')}
            style={[
              styles.filterChip,
              filter === 'unlimited' && styles.filterChipWarnActive,
            ]}>
            <BodyText
              weight="500"
              style={[
                styles.filterChipWarnText,
                filter === 'unlimited' && styles.filterChipTextActive,
              ]}>
              Unlimited
            </BodyText>
            <MonoText style={styles.filterChipWarnCount}>
              {unlimitedCount}
            </MonoText>
          </Pressable>

          <Pressable
            onPress={() => setFilter('limited')}
            style={[
              styles.filterChip,
              filter === 'limited' && styles.filterChipActive,
            ]}>
            <BodyText
              weight="500"
              style={[
                styles.filterChipText,
                filter === 'limited' && styles.filterChipTextActive,
              ]}>
              Limited
            </BodyText>
            <MonoText style={styles.filterChipCount}>{limitedCount}</MonoText>
          </Pressable>
        </View>
      </View>

      {/* Approvals Cards Stream */}
      <View style={styles.approvalsList}>
        <View style={styles.listHeaderRow}>
          <BodyText style={styles.listHeaderLabel}>Allowances</BodyText>
          <BodyText style={styles.listHeaderSub}>By Risk Tier</BodyText>
        </View>

        {filteredList.map((item) => (
          <Card key={item.id} variant="low" style={styles.approvalCard}>
            <View style={styles.approvalTopRow}>
              <View style={styles.dappLeft}>
                <View style={styles.dappIconWrap}>
                  <Icon
                    name={item.icon as any}
                    size={20}
                    color={item.iconColor}
                  />
                </View>
                <View>
                  <HeadlineText weight="600" style={styles.dappName}>
                    {item.dappName}
                  </HeadlineText>
                  <BodyText style={styles.dappSpender}>
                    {item.network} • {item.spenderAddress}
                  </BodyText>
                </View>
              </View>

              <View
                style={[
                  styles.allowanceBadge,
                  item.isUnlimited
                    ? styles.allowanceBadgeUnlimited
                    : styles.allowanceBadgeLimited,
                ]}>
                <MonoText
                  style={
                    item.isUnlimited
                      ? styles.allowanceTextUnlimited
                      : styles.allowanceTextLimited
                  }>
                  {item.allowance}
                </MonoText>
              </View>
            </View>

            <View style={styles.approvalBottomRow}>
              <View style={styles.assetMetaRow}>
                <BodyText style={styles.assetLabel}>Asset:</BodyText>
                <MonoText weight="600" style={styles.assetSymbol}>
                  {item.tokenSymbol}
                </MonoText>
                <MonoText
                  style={
                    item.isUnlimited
                      ? styles.assetSubUnlimited
                      : styles.assetSubLimited
                  }>
                  • {item.isUnlimited ? 'Unlimited' : item.allowanceValue}
                </MonoText>
              </View>

              <Pressable
                accessibilityRole="button"
                accessibilityLabel={`Revoke allowance for ${item.dappName}`}
                onPress={() => handleRevokeSingle(item.id)}
                style={({ pressed }) => [
                  styles.revokeBtn,
                  pressed && styles.revokeBtnPressed,
                ]}>
                <BodyText weight="600" style={styles.revokeBtnText}>
                  Revoke
                </BodyText>
              </Pressable>
            </View>
          </Card>
        ))}

        {filteredList.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name={icons.checkCircle} size={36} color={colors.success} />
            <BodyText weight="600" style={styles.emptyTitle}>
              No active allowances found
            </BodyText>
            <BodyText style={styles.emptySub}>
              All requested contracts have been revoked or filtered out.
            </BodyText>
          </View>
        ) : null}
      </View>

      {/* Educational Security Note */}
      <View style={styles.securityNote}>
        <Icon name={icons.info} size={16} color={colors.outline} />
        <BodyText style={styles.securityNoteText}>
          Revoking stops contract access. Standard network gas fee applies.
        </BodyText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    gap: 12,
  },
  summaryLeft: {
    gap: 4,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.outline,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  summaryNumbersRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  summaryCount: {
    fontSize: 24,
    color: colors.textPrimary,
  },
  unlimitedRiskText: {
    fontSize: 12,
    color: colors.error,
  },
  safeStatusText: {
    fontSize: 12,
    color: colors.success,
  },
  revokeAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.md,
    backgroundColor: 'rgba(246, 70, 93, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(246, 70, 93, 0.35)',
  },
  revokeAllBtnPressed: {
    backgroundColor: 'rgba(246, 70, 93, 0.25)',
  },
  revokeAllText: {
    fontSize: 11,
    color: colors.error,
  },
  filterSection: {
    gap: spacing.sm,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    height: 44,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    ...typography.caption,
    fontSize: 13,
    color: colors.textPrimary,
    paddingVertical: 0,
  },
  filterChipsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  filterChipActive: {
    backgroundColor: colors.surfaceHigh,
    borderColor: colors.outline,
  },
  filterChipWarnActive: {
    backgroundColor: 'rgba(246, 70, 93, 0.15)',
    borderColor: colors.error,
  },
  filterChipText: {
    fontSize: 11,
    color: colors.outline,
  },
  filterChipTextActive: {
    color: colors.textPrimary,
  },
  filterChipCount: {
    fontSize: 10,
    color: colors.outline,
  },
  filterChipWarnText: {
    fontSize: 11,
    color: colors.error,
  },
  filterChipWarnCount: {
    fontSize: 10,
    color: colors.error,
  },
  approvalsList: {
    gap: spacing.sm,
  },
  listHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
    marginBottom: 2,
  },
  listHeaderLabel: {
    fontSize: 11,
    color: colors.outline,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  listHeaderSub: {
    fontSize: 11,
    color: colors.outline,
  },
  approvalCard: {
    padding: 14,
    gap: 12,
  },
  approvalTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dappLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  dappIconWrap: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dappName: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  dappSpender: {
    fontSize: 11,
    color: colors.outline,
  },
  allowanceBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
  },
  allowanceBadgeUnlimited: {
    backgroundColor: 'rgba(246, 70, 93, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(246, 70, 93, 0.3)',
  },
  allowanceBadgeLimited: {
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(14, 203, 129, 0.25)',
  },
  allowanceTextUnlimited: {
    fontSize: 10,
    color: colors.error,
  },
  allowanceTextLimited: {
    fontSize: 10,
    color: colors.success,
  },
  approvalBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(68, 70, 85, 0.15)',
  },
  assetMetaRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 6,
  },
  assetLabel: {
    fontSize: 11,
    color: colors.outline,
  },
  assetSymbol: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  assetSubUnlimited: {
    fontSize: 11,
    color: colors.error,
  },
  assetSubLimited: {
    fontSize: 11,
    color: colors.outline,
  },
  revokeBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  revokeBtnPressed: {
    backgroundColor: colors.surfaceHigh,
  },
  revokeBtnText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    gap: 8,
  },
  emptyTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  emptySub: {
    ...typography.caption,
    color: colors.outline,
    textAlign: 'center',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 6,
  },
  securityNoteText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
  },
});
