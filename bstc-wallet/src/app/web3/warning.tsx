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
import { getMaliciousSignatureWarningData } from '@/services/mockWallet';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function MaliciousSignatureWarningScreen() {
  const router = useRouter();
  const data = getMaliciousSignatureWarningData();
  const [isTechExpanded, setIsTechExpanded] = useState(false);

  const handleReject = () => {
    router.back();
  };

  const handleProceed = () => {
    // Proceed with caution returns back to safety in mock flow
    router.back();
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      {/* Top Header */}
      <ScreenHeader
        title="Security Alert"
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

      {/* Streamlined Alert Hero */}
      <View style={styles.alertHero}>
        <View style={styles.alertHeroCircle}>
          <Icon name={icons.warning} size={32} color={colors.error} />
        </View>

        <HeadlineText weight="700" style={styles.alertHeroTitle}>
          {data.riskTitle}
        </HeadlineText>

        <BodyText style={styles.alertHeroSubtitle}>
          {data.riskSummary}
        </BodyText>
      </View>

      {/* Clean dApp & Request Summary Card */}
      <Card variant="low" style={styles.dappSummaryCard}>
        <View style={styles.dappDomainRow}>
          <View style={styles.domainLeft}>
            <Icon name={icons.language} size={18} color={colors.outline} />
            <HeadlineText
              weight="600"
              style={styles.domainText}
              numberOfLines={1}>
              {data.domain}
            </HeadlineText>
          </View>
          <View style={styles.unverifiedBadge}>
            <BodyText weight="600" style={styles.unverifiedText}>
              Unverified
            </BodyText>
          </View>
        </View>

        <View style={styles.dappSummaryDivider} />

        <View style={styles.dappMetaGrid}>
          <View style={styles.dappMetaCol}>
            <BodyText style={styles.metaLabel}>Account</BodyText>
            <View style={styles.metaValueRow}>
              <View style={styles.accountDot} />
              <BodyText weight="500" style={styles.metaValueText}>
                {data.accountName} • {`${data.accountAddress.slice(0, 6)}...`}
              </BodyText>
            </View>
          </View>

          <View style={styles.dappMetaCol}>
            <BodyText style={styles.metaLabel}>Network</BodyText>
            <View style={styles.metaValueRow}>
              <View style={styles.networkDot} />
              <BodyText weight="500" style={styles.metaValueText}>
                {data.networkName}
              </BodyText>
            </View>
          </View>
        </View>
      </Card>

      {/* Consolidated Detected Risks List */}
      <Card variant="low" style={styles.risksCard}>
        <BodyText weight="600" style={styles.risksHeader}>
          DETECTED RISKS
        </BodyText>

        <View style={styles.risksList}>
          {data.detectedRisks.map((risk) => (
            <View key={risk.id} style={styles.riskItem}>
              <View
                style={[
                  styles.riskIconWrap,
                  risk.isHighRisk
                    ? styles.riskIconHigh
                    : styles.riskIconMuted,
                ]}>
                <Icon
                  name={
                    risk.icon === 'lock_open'
                      ? icons.lockOpen
                      : risk.icon === 'shield'
                      ? icons.shield
                      : icons.code
                  }
                  size={16}
                  color={risk.isHighRisk ? colors.error : colors.outline}
                />
              </View>
              <BodyText
                style={[
                  styles.riskItemText,
                  risk.isHighRisk && styles.riskItemTextHighlight,
                ]}>
                {risk.text}
              </BodyText>
            </View>
          ))}
        </View>
      </Card>

      {/* Clean & Subtle Technical Accordion */}
      <Card variant="low" style={styles.techCard}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle technical payload"
          onPress={() => setIsTechExpanded((prev) => !prev)}
          style={styles.techToggleBtn}>
          <View style={styles.techToggleLeft}>
            <Icon name={icons.terminal} size={16} color={colors.outline} />
            <BodyText style={styles.techToggleText}>Technical Details</BodyText>
          </View>
          <Icon
            name={isTechExpanded ? icons.arrowUp : icons.expandMore}
            size={16}
            color={colors.outline}
          />
        </Pressable>

        {isTechExpanded ? (
          <View style={styles.techPayloadContent}>
            <View style={styles.techFieldRow}>
              <BodyText style={styles.techFieldLabel}>Signing Method:</BodyText>
              <MonoText style={styles.techFieldPrimary}>
                {data.signingMethod}
              </MonoText>
            </View>
            <View style={styles.techFieldRow}>
              <BodyText style={styles.techFieldLabel}>Spender Contract:</BodyText>
              <MonoText style={styles.techFieldValue}>
                {data.spenderContract}
              </MonoText>
            </View>
          </View>
        ) : null}
      </Card>

      {/* Streamlined Action Buttons */}
      <View style={styles.actionSection}>
        <PrimaryButton
          label="Reject & Disconnect"
          icon={<Icon name={icons.block} size={18} color="#FFFFFF" />}
          style={styles.rejectBtn}
          onPress={handleReject}
        />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Proceed with caution"
          onPress={handleProceed}
          style={({ pressed }) => [
            styles.proceedBtn,
            pressed && styles.proceedBtnPressed,
          ]}>
          <BodyText style={styles.proceedBtnText}>
            Proceed with Caution
          </BodyText>
        </Pressable>
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
  alertShieldWrap: {
    width: 26,
    height: 26,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(246, 70, 93, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 14,
    color: colors.error,
  },
  alertHero: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: spacing.xs,
  },
  alertHeroCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(246, 70, 93, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(246, 70, 93, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  alertHeroTitle: {
    fontSize: 20,
    color: colors.textPrimary,
  },
  alertHeroSubtitle: {
    ...typography.caption,
    color: colors.outline,
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 18,
  },
  dappSummaryCard: {
    padding: 14,
    gap: 12,
  },
  dappDomainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  domainLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  domainText: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  unverifiedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(246, 70, 93, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(246, 70, 93, 0.3)',
  },
  unverifiedText: {
    fontSize: 11,
    color: colors.error,
  },
  dappSummaryDivider: {
    height: 1,
    backgroundColor: 'rgba(68, 70, 85, 0.2)',
  },
  dappMetaGrid: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  dappMetaCol: {
    flex: 1,
    gap: 4,
  },
  metaLabel: {
    ...typography.caption,
    fontSize: 11,
    color: colors.outline,
  },
  metaValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  accountDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.success,
  },
  networkDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cyan,
  },
  metaValueText: {
    fontSize: 12,
    color: colors.textPrimary,
  },
  risksCard: {
    padding: 14,
    gap: 12,
  },
  risksHeader: {
    fontSize: 11,
    color: colors.outline,
    letterSpacing: 0.5,
  },
  risksList: {
    gap: 10,
  },
  riskItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  riskIconWrap: {
    width: 26,
    height: 26,
    borderRadius: radii.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
  riskIconHigh: {
    backgroundColor: 'rgba(246, 70, 93, 0.15)',
  },
  riskIconMuted: {
    backgroundColor: colors.surfaceContainer,
  },
  riskItemText: {
    ...typography.caption,
    fontSize: 12,
    color: colors.outline,
    flex: 1,
    lineHeight: 18,
  },
  riskItemTextHighlight: {
    color: colors.textPrimary,
  },
  techCard: {
    padding: 12,
    gap: 8,
  },
  techToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  techToggleLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  techToggleText: {
    ...typography.caption,
    color: colors.outline,
  },
  techPayloadContent: {
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(68, 70, 85, 0.2)',
  },
  techFieldRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  techFieldLabel: {
    ...typography.caption,
    color: colors.outline,
  },
  techFieldPrimary: {
    ...typography.dataMonoSm,
    color: colors.primaryTint,
  },
  techFieldValue: {
    ...typography.dataMonoSm,
    color: colors.textPrimary,
  },
  actionSection: {
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  rejectBtn: {
    width: '100%',
    height: 48,
    backgroundColor: colors.brand,
  },
  proceedBtn: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  proceedBtnPressed: {
    opacity: 0.7,
  },
  proceedBtnText: {
    ...typography.caption,
    color: colors.outline,
    fontSize: 12,
  },
});
