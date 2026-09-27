import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  EmptyState,
  Screen,
  ScreenHeader,
  SearchBar,
  TokenRow,
} from '@/components/ui';
import { getPortfolioSnapshot } from '@/services/mockWallet';
import { colors, spacing } from '@/theme';

export default function SelectTokenScreen() {
  const router = useRouter();
  const { target } = useLocalSearchParams<{ target?: string }>();
  const [search, setSearch] = useState('');

  const { tokens } = getPortfolioSnapshot();

  const filteredTokens = tokens.filter((token) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (
      token.name.toLowerCase().includes(q) ||
      token.symbol.toLowerCase().includes(q) ||
      token.networkBadge?.toLowerCase().includes(q) ||
      token.networkLabel?.toLowerCase().includes(q)
    );
  });

  const handleSelectToken = (tokenId: string) => {
    if (target === 'send') {
      router.push({
        pathname: '/send',
        params: { tokenId },
      });
    } else if (target === 'receive') {
      router.push({
        pathname: '/receive',
        params: { tokenId },
      });
    } else {
      router.push({
        pathname: '/token/[id]',
        params: { id: tokenId },
      });
    }
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Select Asset"
        onBack={() => router.back()}
      />

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search name, symbol, or network"
        shape="xl"
      />

      <View style={styles.list}>
        {filteredTokens.length > 0 ? (
          filteredTokens.map((token) => (
            <TokenRow
              key={token.id}
              token={token}
              onPress={() => handleSelectToken(token.id)}
            />
          ))
        ) : (
          <View style={styles.empty}>
            <EmptyState
              title="No Assets Found"
              message={`No token matching "${search}"`}
              icon="search"
            />
          </View>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  list: {
    gap: spacing.sm,
  },
  empty: {
    paddingVertical: spacing.xxl,
  },
});
