import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  Icon,
  Input,
  Screen,
  ScreenHeader,
  SegmentedControl,
  Toggle,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography, resolveFontFamily } from '@/theme';

export default function ImportWalletScreen() {
  const router = useRouter();
  const [wordMode, setWordMode] = useState<'12' | '24'>('12');
  const [phrase, setPhrase] = useState('');
  const [walletName, setWalletName] = useState('BSTC Wallet 01');
  const [biometricsEnabled, setBiometricsEnabled] = useState(true);

  const targetWordCount = wordMode === '12' ? 12 : 24;
  const words = phrase.trim().split(/\s+/).filter(Boolean);
  const wordCount = phrase.trim() === '' ? 0 : words.length;

  const handlePaste = () => {
    // Demo mock paste words
    const sampleWords = [
      'glance', 'matrix', 'velvet', 'rocket', 'canyon', 'harbor',
      'timber', 'whisper', 'fossil', 'shield', 'quantum', 'beacon',
    ];
    if (wordMode === '24') {
      sampleWords.push(
        'galaxy', 'orbit', 'stellar', 'plasma', 'cosmic', 'zenith',
        'nova', 'nebula', 'gravity', 'pulsar', 'vortex', 'meteor'
      );
    }
    setPhrase(sampleWords.join(' '));
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader title="Import Wallet" onBack={() => router.back()} />

      {/* Word Count Segmented Control */}
      <SegmentedControl
        segments={[
          { key: '12', label: '12 words' },
          { key: '24', label: '24 words' },
        ]}
        value={wordMode}
        onChange={(key: string) => setWordMode(key as '12' | '24')}
      />

      {/* Secret Phrase Textarea Card */}
      <Card variant="low" style={styles.phraseCard}>
        <View style={styles.phraseHeader}>
          <BodyText weight="600" style={styles.inputLabel}>
            Secret Recovery Phrase
          </BodyText>
          <Pressable
            onPress={handlePaste}
            style={({ pressed }) => [styles.pasteBtn, pressed && styles.btnPressed]}>
            <Icon name={icons.copy} size={14} color={colors.primaryTint} />
            <BodyText weight="600" style={styles.pasteText}>
              Paste
            </BodyText>
          </Pressable>
        </View>

        <TextInput
          multiline
          numberOfLines={4}
          value={phrase}
          onChangeText={setPhrase}
          placeholder="Enter your words separated by spaces..."
          placeholderTextColor={colors.outline}
          autoCapitalize="none"
          autoCorrect={false}
          style={styles.textArea}
        />

        <View style={styles.phraseFooter}>
          <View style={styles.wordCounter}>
            <View
              style={[
                styles.dot,
                {
                  backgroundColor:
                    wordCount === targetWordCount
                      ? colors.success
                      : colors.outline,
                },
              ]}
            />
            <BodyText style={styles.counterText}>
              {wordCount}/{targetWordCount} words detected
            </BodyText>
          </View>
          {phrase.length > 0 ? (
            <Pressable onPress={() => setPhrase('')}>
              <BodyText style={styles.clearText}>Clear</BodyText>
            </Pressable>
          ) : null}
        </View>
      </Card>

      {/* Wallet Name */}
      <View style={styles.fieldSection}>
        <Input
          label="Wallet Name"
          value={walletName}
          onChangeText={setWalletName}
          placeholder="e.g. My Primary Wallet"
        />
      </View>

      {/* Biometric Toggle Card */}
      <Card variant="low" style={styles.settingCard}>
        <View style={styles.settingLeft}>
          <View style={styles.settingIconWrap}>
            <Icon name={icons.fingerprint} size={22} color={colors.primaryTint} />
          </View>
          <View style={styles.settingMeta}>
            <BodyText weight="600" style={styles.settingTitle}>
              Biometric Authentication
            </BodyText>
            <BodyText style={styles.settingDesc}>
              Sign transactions with Face ID / fingerprint
            </BodyText>
          </View>
        </View>
        <Toggle
          value={biometricsEnabled}
          onValueChange={setBiometricsEnabled}
          accessibilityLabel="Toggle biometric authentication"
        />
      </Card>

      {/* Warning Callout */}
      <Card variant="low" style={styles.warningCard}>
        <Icon name={icons.warning} size={20} color={colors.warning} />
        <BodyText style={styles.warningText}>
          Never share your secret recovery phrase. Anyone with this phrase can
          steal all your assets.
        </BodyText>
      </Card>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <Button
          label="Import Wallet"
          variant="primary"
          iconRight={<Icon name={icons.arrowForward} size={18} color={colors.textOnPrimary} />}
          onPress={() => router.push('/onboarding/account-created')}
          style={styles.primaryBtn}
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
  phraseCard: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  phraseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLabel: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.4,
  },
  pasteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.sm,
    backgroundColor: colors.surfaceContainer,
  },
  btnPressed: {
    opacity: 0.7,
  },
  pasteText: {
    ...typography.caption,
    color: colors.primaryTint,
  },
  textArea: {
    minHeight: 96,
    padding: spacing.sm,
    backgroundColor: colors.background,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    color: colors.textPrimary,
    fontFamily: resolveFontFamily('JetBrainsMono', '400'),
    fontSize: 14,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
  phraseFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  wordCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  counterText: {
    ...typography.caption,
    color: colors.outline,
  },
  clearText: {
    ...typography.caption,
    color: colors.error,
  },
  fieldSection: {
    gap: 6,
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  settingIconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingMeta: {
    flex: 1,
    gap: 2,
  },
  settingTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  settingDesc: {
    ...typography.caption,
    color: colors.outline,
  },
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.warningMuted,
    borderColor: 'rgba(243, 186, 47, 0.25)',
  },
  warningText: {
    ...typography.caption,
    color: colors.warning,
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    paddingTop: spacing.md,
  },
  primaryBtn: {
    width: '100%',
    minHeight: 50,
  },
});
