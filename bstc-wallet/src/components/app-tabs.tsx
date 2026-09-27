import { NativeTabs } from 'expo-router/unstable-native-tabs';

import { colors, resolveFontFamily } from '@/theme';

/**
 * Final bottom navigation: Wallet · History · Web3 · Settings
 */
export default function AppTabs() {
  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.surface}
      iconColor={{
        default: colors.tabInactive,
        selected: colors.tabActive,
      }}
      labelStyle={{
        default: {
          color: colors.tabInactive,
          fontSize: 11,
          fontFamily: resolveFontFamily('Manrope', '500'),
        },
        selected: {
          color: colors.tabActive,
          fontSize: 11,
          fontFamily: resolveFontFamily('Manrope', '600'),
        },
      }}>
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Wallet</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/wallet.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="history">
        <NativeTabs.Trigger.Label>History</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/history.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="web3">
        <NativeTabs.Trigger.Label>Web3</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/web3.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          src={require('@/assets/images/tabIcons/settings.png')}
          renderingMode="template"
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
