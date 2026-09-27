import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
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
import { getMessageSigningRequest } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function MessageSigningScreen() {
  const router = useRouter();
  const req = getMessageSigningRequest();

  const [isRawExpanded, setIsRawExpanded] = useState(false);
  const [signed, setSigned] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSign = () => {
    setSigned(true);
    setTimeout(() => {
      router.back();
    }, 1200);
  };

  const handleReject = () => {
    router.back();
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Header */}
      <ScreenHeader
        title="Signature Request"
        onBack={handleReject}
        right={
          <IconButton
            accessibilityLabel="Close"
            size={36}
            shape="circle"
            variant="ghost"
            icon={<Icon name={icons.close} size={20} color={colors.outline} />}
            onPress={handleReject}
          />
        }
      />

      {/* dApp Identity Block */}
      <View style={styles.dappIdentity}>
        <View style={styles.dappAvatarContainer}>
          <View style={styles.dappAvatar}>
            <Icon
              name={icons.swap}
              size={32}
              color={colors.primaryTint}
            />
          </View>
          <View style={styles.verifiedBadgeWrap}>
            <Icon name={icons.verified} size={14} color={colors.success} />
          </View>
        </View>

        <HeadlineText weight="700" style={styles.dappTitle}>
          {req.dappName}
        </HeadlineText>

        <View style={styles.urlPill}>
          <View style={styles.greenPulseDot} />
          <MonoText style={styles.urlText}>{req.dappUrl}</MonoText>
          <BodyText weight="600" style={styles.verifiedText}>
            Verified
          </BodyText>
        </View>

        <BodyText style={styles.subDescription}>
          Signature request to authenticate your decentralized session.
        </BodyText>
      </View>

      {/* Key Signing Context Card */}
      <Card variant="low" style={styles.contextCard}>
        {/* Signing Account Row */}
        <View style={styles.contextRow}>
          <BodyText style={styles.contextLabel}>Signing Account</BodyText>
          <View style={styles.accountValueWrap}>
            <View style={styles.accountBadge}>
              <BodyText weight="700" style={styles.accountBadgeText}>
                {req.accountBadge}
              </BodyText>
            </View>
            <BodyText weight="500" style={styles.accountName}>
              {req.accountName}
            </BodyText>
            <MonoText style={styles.accountAddress}>
              {`${req.accountAddress.slice(0, 6)}...${req.accountAddress.slice(-4)}`}
            </MonoText>
            <IconButton
              accessibilityLabel="Copy address"
              size={24}
              shape="square"
              variant="ghost"
              icon={
                <Icon
                  name={copied ? icons.check : icons.copy}
                  size={12}
                  color={copied ? colors.success : colors.outline}
                />
              }
              onPress={handleCopy}
            />
          </View>
        </View>

        <View style={styles.cardDivider} />

        {/* Network & Standard Row */}
        <View style={styles.contextRow}>
          <BodyText style={styles.contextLabel}>Network</BodyText>
          <View style={styles.networkValueWrap}>
            <View style={styles.greenPulseDot} />
            <BodyText weight="500" style={styles.networkName}>
              {req.networkName}
            </BodyText>
            <View style={styles.standardPill}>
              <MonoText style={styles.standardText}>{req.standard}</MonoText>
            </View>
          </View>
        </View>
      </Card>

      {/* Message Content Card (Human-Readable Summary) */}
      <Card variant="low" style={styles.messageCard}>
        <View style={styles.messageCardHeader}>
          <View style={styles.messageTitleWrap}>
            <Icon name={icons.login} size={18} color={colors.primaryTint} />
            <HeadlineText weight="600" style={styles.messageTitle}>
              {req.title}
            </HeadlineText>
          </View>
          <View style={styles.decodedPill}>
            <Icon name={icons.checkCircle} size={12} color={colors.success} />
            <BodyText weight="600" style={styles.decodedText}>
              Decoded
            </BodyText>
          </View>
        </View>

        <View style={styles.messageFieldsList}>
          <View style={styles.messageFieldRow}>
            <BodyText style={styles.messageFieldLabel}>Purpose</BodyText>
            <BodyText weight="500" style={styles.messageFieldValue}>
              {req.purpose}
            </BodyText>
          </View>

          <View style={styles.messageFieldRow}>
            <BodyText style={styles.messageFieldLabel}>Nonce</BodyText>
            <MonoText style={styles.messageFieldMono}>{req.nonce}</MonoText>
          </View>

          <View style={styles.messageFieldRow}>
            <BodyText style={styles.messageFieldLabel}>Valid For</BodyText>
            <BodyText weight="500" style={styles.messageFieldValue}>
              {req.validFor}
            </BodyText>
          </View>
        </View>

        {/* Security Banner inside Card */}
        <View style={styles.securityBannerRow}>
          <View style={styles.securityBannerLeft}>
            <Icon name={icons.shield} size={14} color={colors.success} />
            <BodyText style={styles.securityBannerText}>
              {req.securityNote}
            </BodyText>
          </View>
          <Icon name={icons.lock} size={14} color={colors.success} />
        </View>
      </Card>

      {/* Collapsible Technical Details (Accordion) */}
      <Card variant="low" style={styles.techCard}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle technical payload"
          onPress={() => setIsRawExpanded((prev) => !prev)}
          style={styles.techHeader}>
          <View style={styles.techHeaderLeft}>
            <Icon name={icons.code} size={16} color={colors.outline} />
            <BodyText weight="500" style={styles.techHeaderText}>
              Raw Message & EIP-712
            </BodyText>
          </View>
          <View style={styles.techHeaderRight}>
            <MonoText style={styles.techBytesText}>248 bytes</MonoText>
            <Icon
              name={isRawExpanded ? icons.arrowUp : icons.expandMore}
              size={16}
              color={colors.outline}
            />
          </View>
        </Pressable>

        {isRawExpanded ? (
          <View style={styles.techPayloadWrap}>
            <MonoText style={styles.techPayloadCode}>{req.rawPayload}</MonoText>
          </View>
        ) : null}
      </Card>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <Button
          label="Reject"
          variant="outline"
          style={styles.rejectBtn}
          onPress={handleReject}
        />
        <PrimaryButton
          label={signed ? 'Signed!' : 'Sign'}
          icon={
            !signed ? (
              <Icon name={icons.fingerprint} size={18} color="#FFFFFF" />
            ) : (
              <Icon name={icons.check} size={18} color="#FFFFFF" />
            )
          }
          style={signed ? styles.signedBtn : styles.signBtn}
          onPress={handleSign}
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
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  shieldWrap: {
    width: 26,
    height: 26,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  dappIdentity: {
    alignItems: 'center',
    gap: 8,
  },
  dappAvatarContainer: {
    position: 'relative',
    marginBottom: 2,
  },
  dappAvatar: {
    width: 60,
    height: 60,
    borderRadius: radii.xl,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifiedBadgeWrap: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  dappTitle: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  urlPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  greenPulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  urlText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  verifiedText: {
    fontSize: 11,
    color: colors.success,
  },
  subDescription: {
    ...typography.caption,
    color: colors.outline,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 18,
  },
  contextCard: {
    padding: 14,
    gap: 12,
  },
  contextRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contextLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  accountValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  accountBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountBadgeText: {
    fontSize: 9,
    color: '#FFFFFF',
  },
  accountName: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  accountAddress: {
    fontSize: 11,
    color: colors.outline,
  },
  cardDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
  },
  networkValueWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  networkName: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  standardPill: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceHigh,
  },
  standardText: {
    fontSize: 10,
    color: colors.outline,
  },
  messageCard: {
    padding: 14,
    gap: 12,
  },
  messageCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(68, 70, 85, 0.2)',
  },
  messageTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  messageTitle: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  decodedPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(14, 203, 129, 0.12)',
  },
  decodedText: {
    fontSize: 11,
    color: colors.success,
  },
  messageFieldsList: {
    gap: 8,
  },
  messageFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  messageFieldLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  messageFieldValue: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  messageFieldMono: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  securityBannerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: 'rgba(68, 70, 85, 0.2)',
  },
  securityBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  securityBannerText: {
    fontSize: 11,
    color: colors.success,
    fontWeight: '500',
  },
  techCard: {
    padding: 12,
    gap: 8,
  },
  techHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  techHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  techHeaderText: {
    fontSize: 13,
    color: colors.textPrimary,
  },
  techHeaderRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  techBytesText: {
    fontSize: 11,
    color: colors.outline,
  },
  techPayloadWrap: {
    marginTop: 8,
    padding: 10,
    borderRadius: radii.md,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  techPayloadCode: {
    fontSize: 11,
    lineHeight: 16,
    color: colors.outline,
  },
  actionRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  rejectBtn: {
    flex: 1,
    height: 48,
  },
  signBtn: {
    flex: 1,
    height: 48,
  },
  signedBtn: {
    flex: 1,
    height: 48,
    backgroundColor: colors.success,
  },
});
