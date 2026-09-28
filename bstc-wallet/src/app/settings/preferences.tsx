import { useState, useMemo } from 'react';
import { Pressable, StyleSheet, View, Modal, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  BodyText,
  Card,
  Icon,
  Screen,
  ScreenHeader,
  HeadlineText,
  Button,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

const CURRENCIES = [
  'USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)',
  'CAD ($)', 'AUD ($)', 'CHF (Fr)', 'CNY (¥)'
];

const LANGUAGES = [
  'English (US)', 'Español', 'Français', 'Deutsch',
  '日本語', '한국어', '中文 (简体)', 'Italiano'
];

const THEMES = [
  'System Default', 'Obsidian Dark', 'Midnight Black'
];

export default function PreferencesScreen() {
  const router = useRouter();
  const [currency, setCurrency] = useState('USD ($)');
  const [language, setLanguage] = useState('English (US)');
  const [theme, setTheme] = useState('System Default');

  const [activeSelector, setActiveSelector] = useState<'currency' | 'language' | 'theme' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOptions = useMemo(() => {
    let list: string[] = [];
    if (activeSelector === 'currency') list = CURRENCIES;
    if (activeSelector === 'language') list = LANGUAGES;
    if (activeSelector === 'theme') list = THEMES;

    if (!searchQuery.trim() || activeSelector === 'theme') return list;
    return list.filter(item => item.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [activeSelector, searchQuery]);

  const handleSelect = (val: string) => {
    if (activeSelector === 'currency') setCurrency(val);
    if (activeSelector === 'language') setLanguage(val);
    if (activeSelector === 'theme') setTheme(val);
    closeModal();
  };

  const closeModal = () => {
    setActiveSelector(null);
    setSearchQuery('');
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

      <Card variant="low" padding="none" style={styles.optionsCard}>
        <Pressable
          onPress={() => setActiveSelector('currency')}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <Icon name={icons.payments} size={20} color={colors.primaryTint} />
            </View>
            <BodyText weight="500" style={styles.rowTitle}>Currency</BodyText>
          </View>
          <View style={styles.rowRight}>
            <BodyText style={styles.rowValue}>{currency}</BodyText>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </View>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          onPress={() => setActiveSelector('language')}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <Icon name={icons.language} size={20} color={colors.primaryTint} />
            </View>
            <BodyText weight="500" style={styles.rowTitle}>Language</BodyText>
          </View>
          <View style={styles.rowRight}>
            <BodyText style={styles.rowValue}>{language}</BodyText>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </View>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          onPress={() => setActiveSelector('theme')}
          style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}>
          <View style={styles.rowLeft}>
            <View style={styles.iconWrap}>
              <Icon name={icons.darkMode} size={20} color={colors.primaryTint} />
            </View>
            <BodyText weight="500" style={styles.rowTitle}>Theme</BodyText>
          </View>
          <View style={styles.rowRight}>
            <BodyText style={styles.rowValue}>{theme}</BodyText>
            <Icon name={icons.chevronRight} size={18} color={colors.outline} />
          </View>
        </Pressable>
      </Card>

      <View style={styles.footerNote}>
        <BodyText style={styles.footerText}>
          Preferences apply across all linked wallets and devices.
        </BodyText>
      </View>

      <Modal visible={!!activeSelector} transparent animationType="slide">
        <SafeAreaView style={styles.modalOverlay} edges={['top', 'bottom']}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
            style={styles.keyboardAvoiding}
          >
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <HeadlineText style={styles.modalTitle}>
                  Select {activeSelector === 'currency' ? 'Currency' : activeSelector === 'language' ? 'Language' : 'Theme'}
                </HeadlineText>
                <Pressable onPress={closeModal} style={styles.closeBtn}>
                  <Icon name={icons.close} size={24} color={colors.outline} />
                </Pressable>
              </View>

              {activeSelector !== 'theme' && (
                <View style={styles.searchContainer}>
                  <Icon name={icons.search} size={18} color={colors.textPrimary} />
                  <TextInput
                    style={styles.searchInput}
                    placeholder={`Search ${activeSelector}...`}
                    placeholderTextColor={colors.outline}
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                  />
                </View>
              )}

              <FlatList
                data={filteredOptions}
                keyExtractor={(item) => item}
                style={styles.list}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => {
                  const isSelected = item === (
                    activeSelector === 'currency' ? currency :
                    activeSelector === 'language' ? language : theme
                  );
                  return (
                    <Pressable
                      style={({ pressed }) => [styles.optionRow, pressed && styles.rowPressed]}
                      onPress={() => handleSelect(item)}
                    >
                      <BodyText style={[styles.optionText, isSelected && { color: colors.primaryTint, fontWeight: '600' }]}>
                        {item}
                      </BodyText>
                      {isSelected && <Icon name={icons.check} size={20} color={colors.primaryTint} />}
                    </Pressable>
                  );
                }}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  keyboardAvoiding: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    maxHeight: '80%',
    minHeight: '40%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSubtle,
  },
  modalTitle: {
    fontSize: 18,
    color: colors.textPrimary,
  },
  closeBtn: {
    padding: spacing.xs,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceContainer,
    margin: spacing.lg,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
    height: 44,
    gap: spacing.sm,
  },
  searchInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.xxl,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: radii.md,
  },
  optionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },
});
