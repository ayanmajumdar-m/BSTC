import { Pressable, StyleSheet, View } from 'react-native';

import {
  TransactionRow,
  TransactionRowData,
} from '@/components/ui/TransactionRow';
import { BodyText, HeadlineText } from '@/components/ui/Icon';
import { Divider } from '@/components/ui/Divider';
import { colors, radii, spacing, typography } from '@/theme';

type RecentActivityProps = {
  items: TransactionRowData[];
  onViewAll?: () => void;
  onItemPress?: (id: string) => void;
};

export function RecentActivity({
  items,
  onViewAll,
  onItemPress,
}: RecentActivityProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <HeadlineText weight="700" style={styles.title}>
          Recent Activity
        </HeadlineText>
        <Pressable
          onPress={onViewAll}
          accessibilityRole="button"
          accessibilityLabel="View all activity">
          <BodyText weight="500" style={styles.viewAll}>
            View All
          </BodyText>
        </Pressable>
      </View>

      <View style={styles.card}>
        {items.map((tx, index) => (
          <View key={tx.id}>
            {index > 0 ? <Divider /> : null}
            <TransactionRow
              tx={tx}
              embedded
              onPress={
                onItemPress ? () => onItemPress(tx.id) : undefined
              }
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  viewAll: {
    ...typography.bodySecondary,
    color: colors.primaryTint,
  },
  card: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
});
