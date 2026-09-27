import React from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui';
import { colors, resolveFontFamily } from '@/theme';
import { icons } from '@/theme/icons';

/**
 * Obsidian Terminal Bottom Navigation
 * Wallet · History · Web3 · Settings
 */
export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      backBehavior="firstRoute"
      screenOptions={{
        headerShown: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 56 + Math.max(insets.bottom, 10),
            paddingBottom: Math.max(insets.bottom, 6),
          },
        ],
        tabBarActiveTintColor: colors.brand,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Wallet',
          tabBarIcon: ({ color }) => (
            <Icon name={icons.wallet} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <Icon name={icons.history} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="web3"
        options={{
          title: 'Web3',
          tabBarIcon: ({ color }) => (
            <Icon name={icons.explore} size={22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <Icon name={icons.settings} size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#191c1f', // colors.surfaceContainerLow
    borderTopColor: 'rgba(68, 70, 85, 0.3)', // border-outline-variant/30
    borderTopWidth: 1,
    paddingTop: 6,
    elevation: 0,
  },
  tabBarLabel: {
    fontSize: 11,
    fontFamily: resolveFontFamily('Manrope', '500'),
    marginTop: 2,
  },
  tabBarItem: {
    paddingVertical: 2,
  },
});
