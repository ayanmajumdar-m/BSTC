import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  Icon,
  Screen,
  ScreenHeader,
  SearchBar,
  Toggle,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

type ManagedToken = {
  id: string;
  name: string;
  symbol: string;
  network: string;
  color: string;
  enabled: boolean;
};

const INITIAL_TOKENS: ManagedToken[] = [
  {
    id: 'bstc',
    name: 'BSTC Native',
    symbol: 'BSTC',
    network: 'BSTC Mainnet',
    color: colors.brand,
    enabled: true,
  },
  {
    id: 'btc',
    name: 'Bitcoin',
    symbol: 'BTC',
    network: 'Bitcoin Mainnet',
    color: colors.bitcoin,
    enabled: true,
  },
  {
    id: 'eth',
    name: 'Ethereum',
    symbol: 'ETH',
    network: 'Ethereum Mainnet',
    color: colors.ethereum,
    enabled: true,
  },
  {
    id: 'usdt',
    name: 'Tether USD',
    symbol: 'USDT',
    network: 'Tron / Ethereum',
    color: colors.usdt,
    enabled: true,
  },
  {
    id: 'sol',
    name: 'Solana',
    symbol: 'SOL',
    network: 'Solana Mainnet',
    color: colors.solana,
    enabled: true,
  },
  {
    id: 'matic',
    name: 'Polygon',
    symbol: 'POL',
    network: 'Polygon PoS',
    color: colors.polygon,
    enabled: false,
  },
];

export default function TokenManagementScreen() {
  const router = useRouter();
  const [tokens, setTokens] = useState<ManagedToken[]>(INITIAL_TOKENS);
  const [query, setQuery] = useState('');

  const filtered = tokens.filter(
    (t) =>
      t.name.toLowerCase().includes(query.toLowerCase()) ||
      t.symbol.toLowerCase().includes(query.toLowerCase())
  );

  const toggleToken = (id: string) => {
    setTokens((prev) =>
      prev.map((t) => (t.id === id ? { ...t, enabled: !t.enabled } : t))
    );
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Token Management"
        onBack={() => router.back()}
      />

      <SearchBar
        value={query}
        onChangeText={setQuery}
        placeholder="Search tokens or contract..."
      />

      <Card variant="low" padding="none" style={styles.cardGroup}>
        {filtered.map((t, index) => (
          <View key={t.id}>
            {index > 0 ? <View style={styles.divider} /> : null}
            <View style={styles.tokenRow}>
              <View style={styles.tokenLeft}>
                <View style={[styles.tokenIconCircle, { borderColor: t.color }]}>
                  <BodyText weight="700" style={[styles.symbolText, { color: t.color }]}>
                    {t.symbol.slice(0, 3)}
                  </BodyText>
                </View>
                <View style={styles.tokenMeta}>
                  <BodyText weight="600" style={styles.tokenName}>
                    {t.name}
                  </BodyText>
                  <BodyText style={styles.tokenSub}>
                    {t.symbol} • {t.network}
                  </BodyText>
                </View>
              </View>

              <Toggle
                value={t.enabled}
                onValueChange={() => toggleToken(t.id)}
                accessibilityLabel={`Toggle visibility for ${t.name}`}
              />
            </View>
          </View>
        ))}
      </Card>

      <View style={styles.footer}>
        <Button
          label="Add Custom Token"
          variant="outline"
          icon={<Icon name={icons.add} size={18} color={colors.textPrimary} />}
          onPress={() => router.push('/token/select')}
          style={styles.addBtn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  cardGroup: {
    overflow: 'hidden',
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  tokenLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  tokenIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  symbolText: {
    fontSize: 12,
  },
  tokenMeta: {
    flex: 1,
    gap: 2,
  },
  tokenName: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  tokenSub: {
    ...typography.caption,
    color: colors.outline,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  footer: {
    paddingTop: spacing.xs,
  },
  addBtn: {
    width: '100%',
  },
});
