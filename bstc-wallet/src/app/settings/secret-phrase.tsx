import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

import {
  BodyText,
  Button,
  Card,
  Icon,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function SecretPhraseScreen() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name: string }>();
  const [revealed, setRevealed] = useState(false);

  // Mock phrase for UI demonstration
  const mockPhrase = [
    'ocean', 'sunset', 'breeze', 'mountain',
    'river', 'valley', 'forest', 'meadow',
    'crystal', 'shadow', 'echo', 'journey'
  ];

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Secret Phrase"
        onBack={() => router.back()}
      />

      <View style={styles.warningContainer}>
        <Icon name={icons.security} size={32} color={colors.warning} />
        <BodyText style={styles.warningTitle} weight="600">
          Never share your Secret Phrase
        </BodyText>
        <BodyText style={styles.warningText}>
          Anyone with this phrase has full access to {name || 'this wallet'} and all its funds. Store it securely offline.
        </BodyText>
      </View>

      <Card variant="low" padding={spacing.lg} style={styles.phraseCard}>
        {revealed ? (
          <View style={styles.grid}>
            {mockPhrase.map((word, i) => (
              <View key={i} style={styles.wordBadge}>
                <BodyText style={styles.wordIndex}>{i + 1}</BodyText>
                <BodyText style={styles.wordText} weight="500">{word}</BodyText>
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.hiddenState}>
            <Icon name={icons.lock} size={48} color={colors.outline} />
            <BodyText style={styles.hiddenText}>
              Tap below to reveal your 12-word secret phrase.
            </BodyText>
          </View>
        )}
      </Card>

      <View style={styles.actions}>
        <Button
          label={revealed ? 'Hide Phrase' : 'Reveal Secret Phrase'}
          variant={revealed ? 'secondary' : 'primary'}
          onPress={() => setRevealed(!revealed)}
          style={styles.actionBtn}
        />
        {revealed && (
          <Button
            label="Copy to Clipboard"
            variant="ghost"
            icon={<Icon name={icons.copy} size={18} color={colors.primaryTint} />}
            onPress={() => {}}
            style={styles.actionBtn}
          />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  warningContainer: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  warningTitle: {
    fontSize: 18,
    color: colors.warning,
    marginTop: spacing.xs,
  },
  warningText: {
    ...typography.bodyCompact,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  phraseCard: {
    minHeight: 240,
    justifyContent: 'center',
    backgroundColor: colors.surfaceContainer,
  },
  hiddenState: {
    alignItems: 'center',
    gap: spacing.md,
  },
  hiddenText: {
    color: colors.outline,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  wordBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceHigh,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    gap: 8,
    width: '45%',
  },
  wordIndex: {
    ...typography.caption,
    color: colors.outline,
    width: 20,
  },
  wordText: {
    color: colors.textPrimary,
    fontSize: 15,
  },
  actions: {
    gap: spacing.md,
  },
  actionBtn: {
    width: '100%',
  },
});
