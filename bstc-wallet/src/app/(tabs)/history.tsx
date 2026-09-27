import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Divider,
  Screen,
  ScreenHeader,
  SegmentedControlRow,
  TransactionRow,
  TransactionRowData,
} from '@/components/ui';
import { colors, radii, spacing, typography } from '@/theme';

type DateGroup = {
  date: string;
  items: TransactionRowData[];
};

const MOCK_HISTORY: DateGroup[] = [
  {
    date: 'Today',
    items: [
      {
        id: 'tx-1',
        kind: 'received',
        title: 'Received Ethereum',
        subtitle: 'Mainnet • 0x8e2a...d791',
        primaryAmount: '+0.45 ETH',
        secondaryAmount: '+$1,552.59',
        amountPositive: true,
      },
      {
        id: 'tx-2',
        kind: 'swap',
        title: 'Swapped USDT → ETH',
        subtitle: 'Uniswap v3 • ERC-20',
        primaryAmount: '3,200 USDT',
        secondaryAmount: 'For 0.928 ETH',
      },
      {
        id: 'tx-3',
        kind: 'sent',
        title: 'Sent Bitcoin',
        subtitle: 'Native SegWit • bc1q9v...4kpt',
        primaryAmount: '-0.12 BTC',
        secondaryAmount: '2/3 Confirmations',
        amountPositive: false,
      },
    ],
  },
  {
    date: 'Yesterday',
    items: [
      {
        id: 'tx-4',
        kind: 'failed',
        title: 'Approve Spending Cap',
        subtitle: 'Arbitrum One • Out of Gas',
        primaryAmount: '0 USDT',
        secondaryAmount: 'Failed (Gas Exceeded)',
        amountPositive: false,
      },
      {
        id: 'tx-5',
        kind: 'received',
        title: 'Received Solana',
        subtitle: 'Mainnet-Beta • 7xKQ...9mLp',
        primaryAmount: '+14.2 SOL',
        secondaryAmount: '+$2,104.14',
        amountPositive: true,
      },
    ],
  },
  {
    date: 'Oct 24, 2023',
    items: [
      {
        id: 'tx-6',
        kind: 'sent',
        title: 'Sent Ethereum',
        subtitle: 'Mainnet • 0x33f1...b98c',
        primaryAmount: '-1.00 ETH',
        secondaryAmount: 'Confirmed • Block #18420192',
        amountPositive: false,
      },
    ],
  },
];

const FILTER_SEGMENTS = [
  { key: 'all', label: 'All' },
  { key: 'sent', label: 'Sent' },
  { key: 'received', label: 'Received' },
  { key: 'swap', label: 'Swaps' },
];

/**
 * Transaction History screen — Stitch Obsidian Terminal
 */
export default function HistoryScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('all');

  const filteredGroups = MOCK_HISTORY.map((group) => {
    if (filter === 'all') return group;
    return {
      date: group.date,
      items: group.items.filter((item) => item.kind === filter),
    };
  }).filter((group) => group.items.length > 0);

  return (
    <Screen scroll tabBarInset contentContainerStyle={styles.content}>
      <ScreenHeader title="History" />

      {/* Filter Row */}
      <View style={styles.filterWrap}>
        <SegmentedControlRow
          segments={FILTER_SEGMENTS}
          value={filter}
          onChange={setFilter}
        />
      </View>

      {/* Date-grouped transaction feed */}
      <View style={styles.feed}>
        {filteredGroups.map((group) => (
          <View key={group.date} style={styles.group}>
            <BodyText weight="600" style={styles.dateHeader}>
              {group.date}
            </BodyText>
            <View style={styles.groupCard}>
              {group.items.map((tx, idx) => (
                <View key={tx.id}>
                  {idx > 0 ? <Divider /> : null}
                  <TransactionRow
                    tx={tx}
                    embedded
                    onPress={() => router.push(`/history/${tx.id}`)}
                  />
                </View>
              ))}
            </View>
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <BodyText style={styles.footerText}>
          Showing transactions from last 30 days
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
  filterWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  feed: {
    gap: spacing.lg,
  },
  group: {
    gap: spacing.xs,
  },
  dateHeader: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    paddingHorizontal: spacing.xs,
    paddingBottom: 2,
  },
  groupCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  footerText: {
    ...typography.caption,
    color: colors.outline,
  },
});
