import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  Card,
  HeadlineText,
  Icon,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function PreferencesScreen() {
  const router = useRouter();
  const [currency, setCurrency] = useState('USD ($)');
  const [language, setLanguage] = useState('English (US)');
  const [theme, setTheme] = useState('System Default');

  const cycleCurrency = () => {
    const list = ['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'];
    const idx = list.indexOf(currency);
    setCurrency(list[(idx + 1) % list.length]);
  };

  const cycleLanguage = () => {
    const list = ['English (US)', 'Español', 'Français', 'Deutsch', '日本語'];
    const idx = list.indexOf(language);
    setLanguage(list[(idx + 1) % list.length]);
  };

  const cycleTheme = () => {
    const list = ['System Default', 'Obsidian Dark', 'Midnight Black'];
    const idx = list.indexOf(theme);
    setTheme(list[(idx + 1) % list.length]);
  };

  return (
    <Screen scroll contentContainerStyle={styles.content}>
      <ScreenHeader
        title="Preferences"
        onBack={() => router.back()}
      />

      <View style={styles.headerSubtitleWrap}>
        <BodyText style={styles.subtitle}>
          Customize your wallet experience
        </BodyText>
      </View>

      {/* Options Surface */}
      <Card variant="low" padding="none" style={styles.optionsCard}>
        {/* Row 1: Currency */}
        <Pressable
          onPress={cycleCurrency}
          accessibilityRole="button"
          accessibilityLabel={`Currency: ${currency}`}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <Icon name={icons.payments} size={20} color={colors.primaryTint} />
            </View>
            <BodyText weight="500" style={styles.rowTitle}>
              Currency
            </BodyText>
          </View>
          <View style={styles.rowRight}>
            <BodyText style={styles.rowValue}>{currency}</BodyText>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </View>
        </Pressable>

        <View style={styles.divider} />

        {/* Row 2: Language */}
        <Pressable
          onPress={cycleLanguage}
          accessibilityRole="button"
          accessibilityLabel={`Language: ${language}`}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <Icon name={icons.language} size={20} color={colors.primaryTint} />
            </View>
            <BodyText weight="500" style={styles.rowTitle}>
              Language
            </BodyText>
          </View>
          <View style={styles.rowRight}>
            <BodyText style={styles.rowValue}>{language}</BodyText>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </View>
        </Pressable>

        <View style={styles.divider} />

        {/* Row 3: Theme */}
        <Pressable
          onPress={cycleTheme}
          accessibilityRole="button"
          accessibilityLabel={`Theme: ${theme}`}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <Icon name={icons.darkMode} size={20} color={colors.primaryTint} />
            </View>
            <BodyText weight="500" style={styles.rowTitle}>
              Theme
            </BodyText>
          </View>
          <View style={styles.rowRight}>
            <BodyText style={styles.rowValue}>{theme}</BodyText>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </View>
        </Pressable>
      </Card>

      {/* Discreet Footer Note */}
      <View style={styles.footerNote}>
        <BodyText style={styles.footerText}>
          Preferences apply across all linked wallets and devices.
        </BodyText>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  headerSubtitleWrap: {
    marginTop: -spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  subtitle: {
    ...typography.bodyCompact,
    color: colors.outline,
  },
  optionsCard: {
    overflow: 'hidden',
    borderRadius: radii.xl,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: 16,
    minHeight: 56,
  },
  rowPressed: {
    backgroundColor: colors.surfaceContainer,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  rowTitle: {
    fontSize: 15,
    color: colors.textPrimary,
  },
  rowRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rowValue: {
    ...typography.bodyCompact,
    color: colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderSubtle,
  },
  footerNote: {
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    paddingTop: spacing.md,
  },
  footerText: {
    ...typography.caption,
    color: colors.outline,
    textAlign: 'center',
    lineHeight: 18,
  },
});
