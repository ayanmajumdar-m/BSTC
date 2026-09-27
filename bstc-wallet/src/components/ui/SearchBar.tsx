import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Icon } from '@/components/ui/Icon';
import { colors, icons, radii, spacing, typography, resolveFontFamily } from '@/theme';

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onScanPress?: () => void;
  autoFocus?: boolean;
  shape?: 'full' | 'xl';
};

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
  onScanPress,
  autoFocus,
  shape = 'full',
}: SearchBarProps) {
  return (
    <View style={[styles.wrap, shape === 'xl' && styles.wrapXl]}>
      <Icon name={icons.search} size={20} color={colors.outline} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
        accessibilityLabel={placeholder}
      />
      {onScanPress ? (
        <Pressable
          onPress={onScanPress}
          accessibilityRole="button"
          accessibilityLabel="Scan QR code"
          hitSlop={8}>
          <Icon name={icons.qrScanner} size={20} color={colors.outline} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: colors.surface,
    borderRadius: radii.full,
    paddingHorizontal: spacing.lg,
    minHeight: spacing.touch,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  wrapXl: {
    borderRadius: radii.xl,
  },
  input: {
    flex: 1,
    ...typography.bodyCompact,
    fontFamily: resolveFontFamily('Manrope', '400'),
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
});
