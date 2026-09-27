import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Card,
  Icon,
  IconButton,
  Screen,
  ScreenHeader,
  Toggle,
} from '@/components/ui';
import { useWalletState } from '@/state/wallet-state';
import { colors, icons, radii, spacing, typography } from '@/theme';

type NetworkItem = {
  id: string;
  name: string;
  subtitle: string;
  symbol: string;
  color: string;
  enabled: boolean;
};

const INITIAL_NETWORKS: NetworkItem[] = [
  {
    id: 'all',
    name: 'All Networks',
    subtitle: 'Aggregate multi-chain view',
    symbol: '⚡',
    color: colors.cyan,
    enabled: true,
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    subtitle: 'BTC • Mainnet',
    symbol: '₿',
    color: colors.bitcoin,
    enabled: true,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    subtitle: 'ETH • ERC-20',
    symbol: 'Ξ',
    color: colors.ethereum,
    enabled: true,
  },
  {
    id: 'bnb',
    name: 'BNB Smart Chain',
    subtitle: 'BNB • BEP-20',
    symbol: 'B',
    color: colors.warning,
    enabled: true,
  },
  {
    id: 'sol',
    name: 'Solana',
    subtitle: 'SOL • SPL',
    symbol: 'S',
    color: colors.solana,
    enabled: true,
  },
  {
    id: 'poly',
    name: 'Polygon',
    subtitle: 'POL • PoS',
    symbol: 'P',
    color: colors.polygon,
    enabled: true,
  },
];

export default function NetworkManagementScreen() {
  const router = useRouter();
  const { networkLabel, setNetworkLabel } = useWalletState();
  const [networks, setNetworks] = useState<NetworkItem[]>(INITIAL_NETWORKS);

  const toggleNetwork = (id: string) => {
    setNetworks((prev) =>
      prev.map((net) =>
        net.id === id ? { ...net, enabled: !net.enabled } : net
      )
    );
  };

  const handleSelectNetwork = (net: NetworkItem) => {
    setNetworkLabel(net.name);
    router.back();
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Network Management"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="Network information"
            size={36}
            variant="ghost">
            <Icon name={icons.info} size={20} color={colors.outline} />
          </IconButton>
        }
      />

      <View style={styles.subtitleWrap}>
        <BodyText style={styles.subtitle}>
          Choose the networks available in your wallet or tap to select the active network.
        </BodyText>
      </View>

      <Card variant="low" padding="none" style={styles.cardGroup}>
        {networks.map((net, index) => {
          const isSelected = net.name === networkLabel;

          return (
            <View key={net.id}>
              {index > 0 ? <View style={styles.divider} /> : null}
              <Pressable
                onPress={() => handleSelectNetwork(net)}
                style={({ pressed }) => [
                  styles.networkRow,
                  pressed && styles.rowPressed,
                  isSelected && styles.rowSelected,
                ]}>
                <View style={styles.rowLeft}>
                  <View
                    style={[
                      styles.iconCircle,
                      { borderColor: net.color },
                    ]}>
                    <BodyText weight="700" style={[styles.symbolText, { color: net.color }]}>
                      {net.symbol}
                    </BodyText>
                  </View>
                  <View style={styles.rowMeta}>
                    <View style={styles.nameRow}>
                      <BodyText weight="600" style={styles.networkName}>
                        {net.name}
                      </BodyText>
                      {isSelected ? (
                        <View style={styles.activePill}>
                          <BodyText weight="600" style={styles.activeText}>
                            Active
                          </BodyText>
                        </View>
                      ) : null}
                    </View>
                    <BodyText style={styles.networkSub}>{net.subtitle}</BodyText>
                  </View>
                </View>

                {net.id !== 'all' ? (
                  <Toggle
                    value={net.enabled}
                    onValueChange={() => toggleNetwork(net.id)}
                    accessibilityLabel={`Toggle ${net.name} network`}
                  />
                ) : (
                  <Icon name={icons.check} size={18} color={colors.cyan} />
                )}
              </Pressable>
            </View>
          );
        })}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  subtitleWrap: {
    marginTop: -spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  subtitle: {
    ...typography.bodyCompact,
    color: colors.outline,
    lineHeight: 20,
  },
  cardGroup: {
    overflow: 'hidden',
  },
  networkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  rowPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  rowSelected: {
    backgroundColor: 'rgba(35, 74, 213, 0.08)',
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  symbolText: {
    fontSize: 16,
  },
  rowMeta: {
    flex: 1,
    gap: 2,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  networkName: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  activePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    backgroundColor: 'rgba(0, 198, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(0, 198, 255, 0.3)',
  },
  activeText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.cyan,
  },
  networkSub: {
    ...typography.caption,
    color: colors.outline,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
});
