import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Screen, ScreenHeader, Toggle, Icon, IconButton } from '@/components/ui';
import { colors, spacing, typography } from '@/theme';
import { icons } from '@/theme/icons';

export default function NotificationsScreen() {
  const router = useRouter();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [txEnabled, setTxEnabled] = useState(true);
  const [swapEnabled, setSwapEnabled] = useState(true);
  const [buyEnabled, setBuyEnabled] = useState(true);
  const [securityEnabled, setSecurityEnabled] = useState(true);

  return (
    <Screen style={styles.container}>
      <ScreenHeader
        title="Notifications"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Notification info"
            size={36}
            shape="circle"
            variant="ghost"
            icon={<Icon name={icons.info} size={20} color={colors.outline} />}
            onPress={() => {}}
          />
        }
      />

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.subtitleContainer}>
          <Text style={styles.subtitle}>Choose which wallet updates you receive</Text>
        </View>

        <View style={styles.list}>
          {/* Master Switch */}
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Allow Push Notifications</Text>
              <Text style={styles.rowDescription}>Receive push alerts on this device</Text>
            </View>
            <Toggle
              value={pushEnabled}
              onValueChange={setPushEnabled}
              accessibilityLabel="Allow Push Notifications"
            />
          </View>

          {/* Transactions */}
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Transactions</Text>
              <Text style={styles.rowDescription}>Transfers, incoming deposits, and confirmations</Text>
            </View>
            <Toggle
              value={pushEnabled && txEnabled}
              disabled={!pushEnabled}
              onValueChange={setTxEnabled}
              accessibilityLabel="Transaction Notifications"
            />
          </View>

          {/* Swap Updates */}
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Swap Updates</Text>
              <Text style={styles.rowDescription}>DEX routing, slippage notices, and completed swaps</Text>
            </View>
            <Toggle
              value={pushEnabled && swapEnabled}
              disabled={!pushEnabled}
              onValueChange={setSwapEnabled}
              accessibilityLabel="Swap Updates Notifications"
            />
          </View>

          {/* Buy & Fiat Orders */}
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Buy & Fiat Orders</Text>
              <Text style={styles.rowDescription}>Purchase status, delivery, and provider receipts</Text>
            </View>
            <Toggle
              value={pushEnabled && buyEnabled}
              disabled={!pushEnabled}
              onValueChange={setBuyEnabled}
              accessibilityLabel="Buy & Fiat Orders Notifications"
            />
          </View>

          {/* Security Alerts */}
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>Security Alerts</Text>
              <Text style={styles.rowDescription}>New logins, suspicious signature requests, and approvals</Text>
            </View>
            <Toggle
              value={pushEnabled && securityEnabled}
              disabled={!pushEnabled}
              onValueChange={setSecurityEnabled}
              accessibilityLabel="Security Alerts Notifications"
            />
          </View>
        </View>

        <View style={styles.securityNote}>
          <Icon name={icons.lock} size={18} color={colors.textSecondary} />
          <Text style={styles.noteText}>
            Alert settings sync automatically across secure enclave instances. Signature requests always trigger immediate priority delivery.
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  subtitleContainer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  subtitle: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
  },
  list: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
    minHeight: 72,
  },
  rowText: {
    flex: 1,
    marginRight: spacing.md,
  },
  rowTitle: {
    ...typography.bodyDefault,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  rowDescription: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    marginTop: 2,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingTop: spacing.sm,
  },
  noteText: {
    flex: 1,
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 18,
  },
});
