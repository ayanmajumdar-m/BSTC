import { ReactNode, useState } from 'react';
import {
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { BodyText, MonoText } from '@/components/ui/Icon';
import { colors, radii, spacing, typography, resolveFontFamily } from '@/theme';

export type InputProps = {
  value: string;
  onChangeText: (text: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  helper?: string;
  leftAccessory?: ReactNode;
  rightAccessory?: ReactNode;
  mono?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  editable?: boolean;
  autoFocus?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  autoCorrect?: boolean;
  style?: ViewStyle;
  inputStyle?: TextStyle;
  accessibilityLabel?: string;
};

/**
 * Standard input field adhering to Stitch Obsidian Terminal aesthetics.
 * Uses 1px border (#2A303A), focus cyan highlight (#00C6FF), and JetBrains Mono for addresses/numbers.
 */
export function Input({
  value,
  onChangeText,
  label,
  placeholder,
  error,
  helper,
  leftAccessory,
  rightAccessory,
  mono = false,
  secureTextEntry = false,
  keyboardType = 'default',
  editable = true,
  autoFocus = false,
  autoCapitalize = 'none',
  autoCorrect = false,
  style,
  inputStyle,
  accessibilityLabel,
}: InputProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {label ? (
        <View style={styles.labelRow}>
          <BodyText weight="500" style={styles.label}>
            {label}
          </BodyText>
        </View>
      ) : null}

      <View
        style={[
          styles.fieldWrap,
          focused && styles.fieldFocused,
          error ? styles.fieldError : null,
          !editable && styles.fieldDisabled,
        ]}>
        {leftAccessory ? (
          <View style={styles.accessoryLeft}>{leftAccessory}</View>
        ) : null}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.outline}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={autoCorrect}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={accessibilityLabel ?? label ?? placeholder}
          style={[
            styles.input,
            mono ? styles.inputMono : styles.inputStandard,
            inputStyle,
          ]}
        />

        {rightAccessory ? (
          <View style={styles.accessoryRight}>{rightAccessory}</View>
        ) : null}
      </View>

      {error ? (
        <BodyText style={styles.errorText}>{error}</BodyText>
      ) : helper ? (
        <BodyText style={styles.helperText}>{helper}</BodyText>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 2,
  },
  label: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.4,
  },
  fieldWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: spacing.touch,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
  },
  fieldFocused: {
    borderColor: colors.cyan,
  },
  fieldError: {
    borderColor: colors.error,
  },
  fieldDisabled: {
    opacity: 0.6,
  },
  accessoryLeft: {
    marginRight: spacing.sm,
  },
  accessoryRight: {
    marginLeft: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
    minHeight: spacing.touch,
  },
  inputStandard: {
    ...typography.bodyCompact,
    fontFamily: resolveFontFamily('Manrope', '400'),
  },
  inputMono: {
    ...typography.dataMono,
    fontFamily: resolveFontFamily('JetBrainsMono', '500'),
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
    paddingHorizontal: 2,
  },
  helperText: {
    ...typography.caption,
    color: colors.outline,
    paddingHorizontal: 2,
  },
});
