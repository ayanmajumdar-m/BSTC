import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, resolveFontFamily, spacing } from '@/theme';

/**
 * Web fallback tab bar — same four destinations as native.
 */
export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ flex: 1 }} />
      <TabList style={styles.list}>
        <TabTrigger name="wallet" href="/" asChild>
          <WebTabButton label="Wallet" />
        </TabTrigger>
        <TabTrigger name="history" href="/history" asChild>
          <WebTabButton label="History" />
        </TabTrigger>
        <TabTrigger name="web3" href="/web3" asChild>
          <WebTabButton label="Web3" />
        </TabTrigger>
        <TabTrigger name="settings" href="/settings" asChild>
          <WebTabButton label="Settings" />
        </TabTrigger>
      </TabList>
    </Tabs>
  );
}

function WebTabButton({
  label,
  isFocused,
  ...props
}: {
  label: string;
  isFocused?: boolean;
  [key: string]: unknown;
}) {
  return (
    <Pressable {...props} style={styles.tab}>
      <Text
        style={[
          styles.label,
          { color: isFocused ? colors.tabActive : colors.tabInactive },
        ]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingVertical: spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: spacing.touch,
  },
  label: {
    fontSize: 12,
    fontFamily: resolveFontFamily('Manrope', '600'),
  },
});
