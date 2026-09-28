import { useState } from 'react';
import { Pressable, StyleSheet, View, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Card,
  HeadlineText,
  Icon,
  IconButton,
  MonoText,
  Screen,
  ScreenHeader,
  Button,
} from '@/components/ui';
import { useWalletState } from '@/state/wallet-state';
import { colors, icons, radii, spacing, typography } from '@/theme';

type WalletItem = {
  id: string;
  name: string;
  address: string;
  chains: string;
};

const INITIAL_WALLETS: WalletItem[] = [
  {
    id: 'wallet-1',
    name: 'Main Wallet',
    address: '0x71C...3a9F',
    chains: 'BSC / ETH',
  },
  {
    id: 'wallet-2',
    name: 'Trading Vault',
    address: '0x48A...9F21',
    chains: 'Polygon / Arbitrum',
  },
];

export default function WalletManagementScreen() {
  const router = useRouter();
  const { walletName, setWalletName } = useWalletState();
  const [wallets, setWallets] = useState<WalletItem[]>(INITIAL_WALLETS);

  const [activeMenuWallet, setActiveMenuWallet] = useState<WalletItem | null>(null);
  const [renameWallet, setRenameWallet] = useState<WalletItem | null>(null);
  const [deleteWallet, setDeleteWallet] = useState<WalletItem | null>(null);
  const [newName, setNewName] = useState('');

  const handleSelectWallet = (wallet: WalletItem) => {
    setWalletName(wallet.name);
  };

  const handleSaveRename = () => {
    if (renameWallet && newName.trim()) {
      setWallets((prev) =>
        prev.map((w) =>
          w.id === renameWallet.id ? { ...w, name: newName.trim() } : w
        )
      );
      // Update global wallet name if it's active
      if (
        renameWallet.name.toLowerCase() === walletName.toLowerCase() ||
        (renameWallet.id === 'wallet-1' &&
          (walletName === 'Main Wallet 01' || walletName === 'Main Wallet'))
      ) {
        setWalletName(newName.trim());
      }
    }
    setRenameWallet(null);
  };

  const handleConfirmDelete = () => {
    if (deleteWallet) {
      setWallets((prev) => prev.filter((w) => w.id !== deleteWallet.id));
    }
    setDeleteWallet(null);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Wallet Management"
        onBack={() => router.back()}
      />

      <View style={styles.subtitleWrap}>
        <BodyText style={styles.subtitle}>
          Manage your seed phrases, private keys, and connected accounts.
        </BodyText>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <BodyText weight="600" style={styles.sectionHeader}>
            YOUR WALLETS
          </BodyText>
          <MonoText style={styles.sectionCount}>
            {wallets.length} Connected
          </MonoText>
        </View>

        <Card variant="low" padding="none" style={styles.walletCardGroup}>
          {wallets.map((wallet, index) => {
            const isActive =
              wallet.name.toLowerCase() === walletName.toLowerCase() ||
              (wallet.id === 'wallet-1' &&
                (walletName === 'Main Wallet 01' || walletName === 'Main Wallet'));

            return (
              <View key={wallet.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <Pressable
                  onPress={() => handleSelectWallet(wallet)}
                  style={({ pressed }) => [
                    styles.walletRow,
                    pressed && styles.rowPressed,
                  ]}>
                  <View style={styles.walletLeft}>
                    <View style={styles.walletIconWrap}>
                      <Icon
                        name={icons.wallet}
                        size={20}
                        color={colors.primaryTint}
                      />
                    </View>
                    <View style={styles.walletMeta}>
                      <View style={styles.nameRow}>
                        <BodyText weight="600" style={styles.walletName}>
                          {wallet.name}
                        </BodyText>
                        {isActive ? (
                          <View style={styles.activePill}>
                            <BodyText weight="600" style={styles.activeText}>
                              Active
                            </BodyText>
                          </View>
                        ) : null}
                      </View>
                      <View style={styles.addressRow}>
                        <MonoText style={styles.addressText}>
                          {wallet.address}
                        </MonoText>
                        <View style={styles.chainDot} />
                        <BodyText style={styles.chainText}>
                          {wallet.chains}
                        </BodyText>
                      </View>
                    </View>
                  </View>

                  <IconButton
                    accessibilityLabel="More options"
                    size={36}
                    variant="ghost"
                    onPress={() => setActiveMenuWallet(wallet)}>
                    <Icon
                      name={icons.moreVert}
                      size={20}
                      color={colors.outline}
                    />
                  </IconButton>
                </Pressable>
              </View>
            );
          })}
        </Card>
      </View>

      <View style={styles.section}>
        <BodyText weight="600" style={styles.sectionHeader}>
          ADD & CONNECT
        </BodyText>

        <Card variant="low" padding="none" style={styles.actionCardGroup}>
          <Pressable
            onPress={() => router.push('/onboarding/create')}
            style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIconWrap}>
                <Icon name={icons.add} size={20} color={colors.primaryTint} />
              </View>
              <View style={styles.actionMeta}>
                <BodyText weight="600" style={styles.actionTitle}>
                  Create New Wallet
                </BodyText>
                <BodyText style={styles.actionDesc}>
                  Generate a new multi-chain seed address
                </BodyText>
              </View>
            </View>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            onPress={() => router.push('/onboarding/import')}
            style={({ pressed }) => [styles.actionRow, pressed && styles.rowPressed]}>
            <View style={styles.actionLeft}>
              <View style={styles.actionIconWrap}>
                <Icon name={icons.download} size={20} color={colors.cyan} />
              </View>
              <View style={styles.actionMeta}>
                <BodyText weight="600" style={styles.actionTitle}>
                  Import Existing Wallet
                </BodyText>
                <BodyText style={styles.actionDesc}>
                  Restore from seed phrase or private key
                </BodyText>
              </View>
            </View>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </Pressable>
        </Card>
      </View>

      {/* Floating Menu Modal */}
      <Modal visible={!!activeMenuWallet} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setActiveMenuWallet(null)}>
          <View style={styles.modalMenu}>
            <BodyText weight="600" style={styles.modalHeader}>
              {activeMenuWallet?.name} Options
            </BodyText>
            <View style={styles.divider} />
            <Pressable
              style={styles.modalMenuItem}
              onPress={() => {
                const w = activeMenuWallet;
                setActiveMenuWallet(null);
                setNewName(w?.name || '');
                setRenameWallet(w);
              }}>
              <Icon name={icons.edit} size={20} color={colors.textPrimary} />
              <BodyText style={styles.modalMenuText}>Rename Wallet</BodyText>
            </Pressable>
            <Pressable
              style={styles.modalMenuItem}
              onPress={() => {
                const w = activeMenuWallet;
                setActiveMenuWallet(null);
                router.push({ pathname: '/settings/secret-phrase' as any, params: { id: w?.id, name: w?.name } });
              }}>
              <Icon name={icons.security} size={20} color={colors.textPrimary} />
              <BodyText style={styles.modalMenuText}>Show Secret Phrase</BodyText>
            </Pressable>
            <Pressable
              style={styles.modalMenuItem}
              onPress={() => {
                const w = activeMenuWallet;
                setActiveMenuWallet(null);
                setDeleteWallet(w);
              }}>
              <Icon name={icons.close} size={20} color={colors.error} />
              <BodyText style={[styles.modalMenuText, { color: colors.error }]}>Delete Wallet</BodyText>
            </Pressable>
          </View>
        </Pressable>
      </Modal>

      {/* Rename Modal */}
      <Modal visible={!!renameWallet} transparent animationType="fade">
        <View style={styles.modalOverlayCenter}>
          <View style={styles.dialog}>
            <HeadlineText style={styles.dialogTitle}>Rename Wallet</HeadlineText>
            <TextInput
              style={styles.input}
              value={newName}
              onChangeText={setNewName}
              placeholder="Wallet Name"
              placeholderTextColor={colors.outline}
              autoFocus
            />
            <View style={styles.dialogActions}>
              <Button label="Cancel" variant="ghost" onPress={() => setRenameWallet(null)} style={{ flex: 1 }} />
              <Button label="Save" variant="primary" onPress={handleSaveRename} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>

      {/* Delete Modal */}
      <Modal visible={!!deleteWallet} transparent animationType="fade">
        <View style={styles.modalOverlayCenter}>
          <View style={styles.dialog}>
            <HeadlineText style={styles.dialogTitle}>Delete Wallet</HeadlineText>
            <BodyText style={styles.dialogBody}>
              Are you sure you want to delete {deleteWallet?.name}?
            </BodyText>
            <View style={styles.dialogActions}>
              <Button label="Cancel" variant="ghost" onPress={() => setDeleteWallet(null)} style={{ flex: 1 }} />
              <Button label="Delete" variant="destructive" onPress={handleConfirmDelete} style={{ flex: 1 }} />
            </View>
          </View>
        </View>
      </Modal>
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
  section: {
    gap: spacing.xs,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xs,
    marginBottom: 2,
  },
  sectionHeader: {
    ...typography.caption,
    color: colors.outline,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCount: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
  },
  walletCardGroup: {
    overflow: 'hidden',
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  rowPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  walletLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  walletIconWrap: {
    width: 42,
    height: 42,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  walletMeta: {
    flex: 1,
    gap: 3,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  walletName: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  activePill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.full,
    backgroundColor: 'rgba(35, 74, 213, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(35, 74, 213, 0.4)',
  },
  activeText: {
    ...typography.caption,
    fontSize: 10,
    color: colors.primaryTint,
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  addressText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
  },
  chainDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.success,
  },
  chainText: {
    ...typography.caption,
    fontSize: 11,
    color: colors.success,
  },
  actionCardGroup: {
    overflow: 'hidden',
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  actionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionMeta: {
    flex: 1,
    gap: 2,
  },
  actionTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  actionDesc: {
    ...typography.caption,
    color: colors.outline,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalOverlayCenter: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  modalMenu: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    paddingBottom: spacing.xxl,
  },
  modalHeader: {
    padding: spacing.lg,
    fontSize: 16,
    textAlign: 'center',
    color: colors.outline,
  },
  modalMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    gap: spacing.md,
  },
  modalMenuText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  dialog: {
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.xl,
    width: '100%',
    gap: spacing.lg,
  },
  dialogTitle: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  dialogBody: {
    color: colors.textSecondary,
    fontSize: 15,
  },
  input: {
    backgroundColor: colors.surfaceContainer,
    color: colors.textPrimary,
    padding: spacing.md,
    borderRadius: radii.md,
    fontSize: 16,
  },
  dialogActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
});
