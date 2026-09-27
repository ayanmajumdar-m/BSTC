import { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';

import { BodyText } from '@/components/ui/Icon';
import { colors, radii, spacing, typography } from '@/theme';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'destructive'
  | 'outline'
  | 'ghost';

export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  iconRight?: ReactNode;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  accessibilityLabel?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  iconRight,
  style,
  labelStyle,
  accessibilityLabel,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isSecondary = variant === 'secondary';
  const isDestructive = variant === 'destructive';
  const isOutline = variant === 'outline';
  const isGhost = variant === 'ghost';

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? label}
      style={({ pressed }) => [
        styles.base,
        size === 'sm' && styles.sizeSm,
        size === 'md' && styles.sizeMd,
        size === 'lg' && styles.sizeLg,
        isPrimary && styles.primary,
        isSecondary && styles.secondary,
        isDestructive && styles.destructive,
        isOutline && styles.outline,
        isGhost && styles.ghost,
        (disabled || loading) && styles.disabled,
        pressed && !disabled && (
          isPrimary
            ? styles.primaryPressed
            : isSecondary
            ? styles.secondaryPressed
            : isDestructive
            ? styles.destructivePressed
            : styles.ghostPressed
        ),
        style,
      ]}>
      {loading ? (
        <ActivityIndicator
          color={isPrimary || isDestructive ? colors.textOnPrimary : colors.textPrimary}
        />
      ) : (
        <View style={styles.contentRow}>
          {icon ? <View style={styles.iconSlot}>{icon}</View> : null}
          <BodyText
            weight="600"
            style={[
              styles.label,
              size === 'sm' && styles.labelSm,
              isPrimary && styles.primaryLabel,
              isSecondary && styles.secondaryLabel,
              isDestructive && styles.destructiveLabel,
              isOutline && styles.outlineLabel,
              isGhost && styles.ghostLabel,
              labelStyle,
            ]}>
            {label}
          </BodyText>
          {iconRight ? <View style={styles.iconRightSlot}>{iconRight}</View> : null}
        </View>
      )}
    </Pressable>
  );
}

export function PrimaryButton(props: ButtonProps) {
  return <Button {...props} variant="primary" />;
}

export function SecondaryButton(props: ButtonProps) {
  return <Button {...props} variant="secondary" />;
}

export function DestructiveButton(props: ButtonProps) {
  return <Button {...props} variant="destructive" />;
}

type IconButtonProps = {
  children?: ReactNode;
  icon?: ReactNode;
  onPress?: () => void;
  accessibilityLabel: string;
  style?: ViewStyle;
  size?: number;
  shape?: 'circle' | 'square';
  variant?: 'surface' | 'ghost' | 'primary';
};

export function IconButton({
  children,
  icon,
  onPress,
  accessibilityLabel,
  style,
  size = 44,
  shape = 'circle',
  variant = 'surface',
}: IconButtonProps) {
  const borderRadius = shape === 'circle' ? size / 2 : radii.lg;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      style={({ pressed }) => [
        styles.iconBtn,
        variant === 'surface' && styles.iconBtnSurface,
        variant === 'ghost' && styles.iconBtnGhost,
        variant === 'primary' && styles.iconBtnPrimary,
        { width: size, height: size, borderRadius },
        pressed && styles.iconPressed,
        style,
      ]}>
      {icon ?? children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: spacing.touch,
    borderRadius: radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
  },
  sizeSm: {
    minHeight: 36,
    paddingHorizontal: spacing.md,
    borderRadius: radii.md,
  },
  sizeMd: {
    minHeight: spacing.touch,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.lg,
  },
  sizeLg: {
    minHeight: 52,
    paddingHorizontal: spacing.xl,
    borderRadius: radii.xl,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  iconSlot: {
    marginRight: 2,
  },
  iconRightSlot: {
    marginLeft: 2,
  },
  primary: {
    backgroundColor: colors.brand,
  },
  primaryPressed: {
    backgroundColor: colors.brandHover,
  },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondaryPressed: {
    borderColor: colors.outline,
    backgroundColor: colors.surfaceElevated,
  },
  destructive: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.surfaceHigh,
    borderRadius: radii.xl,
  },
  destructivePressed: {
    backgroundColor: colors.errorMuted,
    borderColor: 'rgba(246, 70, 93, 0.4)',
    transform: [{ scale: 0.99 }],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  ghostPressed: {
    backgroundColor: colors.surfaceElevated,
  },
  disabled: {
    opacity: 0.5,
  },
  label: {
    ...typography.button,
  },
  labelSm: {
    fontSize: 14,
    lineHeight: 20,
  },
  primaryLabel: {
    color: colors.textOnPrimary,
  },
  secondaryLabel: {
    color: colors.textPrimary,
  },
  destructiveLabel: {
    color: colors.error,
  },
  outlineLabel: {
    color: colors.textPrimary,
  },
  ghostLabel: {
    color: colors.outline,
  },
  iconBtn: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnSurface: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  iconBtnGhost: {
    backgroundColor: 'transparent',
  },
  iconBtnPrimary: {
    backgroundColor: colors.brand,
  },
  iconPressed: {
    backgroundColor: colors.surfaceElevated,
    transform: [{ scale: 0.96 }],
  },
});
