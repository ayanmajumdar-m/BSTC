import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import {
  Avatar,
  BodyText,
  Button,
  Card,
  HeadlineText,
  Icon,
  IconButton,
  MonoText,
  PrimaryButton,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { getRecentContacts, getTokenDetail } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function RecipientAddressScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ tokenId?: string }>();
  const token = getTokenDetail(params.tokenId);
  const contacts = getRecentContacts();

  const [address, setAddress] = useState('');

  const isValid = address.trim().startsWith('0x') && address.trim().length >= 10;

  const handlePaste = () => {
    setAddress('0x71C2a8d10b7849204b77f48107764fbc3b413a9');
  };

  const handleSelectRecipient = (selectedAddress: string) => {
    router.navigate({
      pathname: '/send',
      params: {
        tokenId: token.id,
        recipient: selectedAddress,
      },
    });
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Recipient Address"
        onBack={() => router.back()}
      />

      {/* Network / Token Context */}
      <View style={styles.contextBanner}>
        <View style={styles.contextLeft}>
          <View style={styles.tokenDot} />
          <BodyText weight="500" style={styles.contextText}>
            Sending {token.name} on {token.networkBadge ?? 'Mainnet'}
          </BodyText>
        </View>
      </View>

      {/* Address Input Box */}
      <View style={styles.inputSection}>
        <View style={styles.inputCard}>
          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="0x... or ENS domain"
            placeholderTextColor="rgba(132, 142, 156, 0.5)"
            autoCapitalize="none"
            autoCorrect={false}
            multiline
            numberOfLines={2}
            style={styles.addressInput}
          />
          <View style={styles.inputActions}>
            <Pressable
              onPress={handlePaste}
              accessibilityRole="button"
              accessibilityLabel="Paste address"
              style={({ pressed }) => [
                styles.pasteBtn,
                pressed && styles.pasteBtnPressed,
              ]}>
              <BodyText weight="600" style={styles.pasteText}>
                Paste
              </BodyText>
            </Pressable>
            <IconButton
              accessibilityLabel="Scan QR code"
              size={36}
              shape="square"
              variant="ghost"
              icon={
                <Icon
                  name={icons.qrScanner}
                  size={20}
                  color={colors.outline}
                />
              }
              onPress={() => {
                setAddress('0x8f2a63B19E47c0F198e3bF41065c71d02E244b9c');
              }}
            />
          </View>
        </View>

        {isValid ? (
          <View style={styles.validationRow}>
            <Icon name={icons.check} size={14} color={colors.success} />
            <BodyText style={styles.validationText}>
              Valid {token.name} format address
            </BodyText>
          </View>
        ) : null}
      </View>

      {/* Recent Contacts List */}
      <View style={styles.contactsSection}>
        <HeadlineText weight="700" style={styles.sectionTitle}>
          Recent Contacts
        </HeadlineText>

        <View style={styles.contactsCard}>
          {contacts.map((contact, idx) => (
            <Pressable
              key={contact.id}
              onPress={() => handleSelectRecipient(contact.address)}
              accessibilityRole="button"
              accessibilityLabel={`Select ${contact.name}`}
              style={({ pressed }) => [
                styles.contactRow,
                idx > 0 && styles.contactDivider,
                pressed && styles.contactRowPressed,
              ]}>
              <Avatar initials={contact.name.slice(0, 2).toUpperCase()} size={40} />
              <View style={styles.contactMeta}>
                <HeadlineText weight="600" style={styles.contactName}>
                  {contact.name}
                </HeadlineText>
                <MonoText style={styles.contactAddress}>
                  {contact.ens ? `${contact.ens} • ` : ''}
                  {`${contact.address.slice(0, 6)}...${contact.address.slice(-4)}`}
                </MonoText>
              </View>
              <Icon
                name={icons.chevronRight}
                size={18}
                color={colors.outline}
              />
            </Pressable>
          ))}
        </View>
      </View>

      {/* Confirm Button */}
      <View style={styles.bottomAction}>
        <PrimaryButton
          label="Use Address"
          disabled={!address.trim()}
          onPress={() => handleSelectRecipient(address.trim())}
          style={styles.useBtn}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  contextBanner: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  contextLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tokenDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cyan,
  },
  contextText: {
    ...typography.caption,
    color: colors.textPrimary,
  },
  inputSection: {
    gap: spacing.xs,
  },
  inputCard: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    padding: 12,
    gap: spacing.sm,
  },
  addressInput: {
    fontFamily: typography.dataMono.fontFamily,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
    minHeight: 52,
    textAlignVertical: 'top',
  },
  inputActions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(68, 70, 85, 0.2)',
    paddingTop: 8,
  },
  pasteBtn: {
    backgroundColor: colors.surfaceHigh,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.sm,
  },
  pasteBtnPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  pasteText: {
    ...typography.caption,
    fontWeight: '600',
    color: colors.primaryTint,
  },
  validationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 4,
    paddingTop: 2,
  },
  validationText: {
    ...typography.caption,
    color: colors.success,
  },
  contactsSection: {
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  sectionTitle: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
  },
  contactsCard: {
    backgroundColor: colors.surfaceContainer,
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    overflow: 'hidden',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    gap: 12,
  },
  contactDivider: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(68, 70, 85, 0.2)',
  },
  contactRowPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  contactMeta: {
    flex: 1,
    gap: 2,
  },
  contactName: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  contactAddress: {
    ...typography.dataMonoSm,
    color: colors.outline,
  },
  bottomAction: {
    marginTop: spacing.md,
  },
  useBtn: {
    width: '100%',
    height: 48,
  },
});
