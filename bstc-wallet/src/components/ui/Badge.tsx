import { StyleSheet, View, ViewStyle } from 'react-native';

import { BodyText } from '@/components/ui/Icon';
import { colors, radii, typography } from '@/theme';

type BadgeTone = 'neutral' | 'success' | 'error' | 'warning' | 'brand' | 'cyan';

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  style?: ViewStyle;
};

const toneStyles: Record<
  BadgeTone,
  { bg: string; border: string; text: string }
> = {
  neutral: {
    bg: colors.surface,
    border: colors.borderSubtle,
    text: colors.textSecondary,
  },
  success: {
    bg: colors.successMuted,
    border: 'rgba(14, 203, 129, 0.2)',
    text: colors.success,
  },
  error: {
    bg: colors.errorMuted,
    border: 'rgba(246, 70, 93, 0.2)',
    text: colors.error,
  },
  warning: {
    bg: colors.warningMuted,
    border: 'rgba(243, 186, 47, 0.2)',
    text: colors.warning,
  },
  brand: {
    bg: 'rgba(35, 74, 213, 0.2)',
    border: 'rgba(35, 74, 213, 0.3)',
    text: colors.primaryTint,
  },
  cyan: {
    bg: 'rgba(0, 198, 255, 0.12)',
    border: 'rgba(0, 198, 255, 0.25)',
    text: colors.cyan,
  },
};

export function Badge({ label, tone = 'neutral', style }: BadgeProps) {
  const t = toneStyles[tone];
  return (
    <View
      style={[
        styles.badge,
        { backgroundColor: t.bg, borderColor: t.border },
        style,
      ]}>
      <BodyText weight="600" style={[styles.text, { color: t.text }]}>
        {label}
      </BodyText>
    </View>
  );
}

/** Alias for status chips used in activity / tx rows */
export function StatusBadge({
  label,
  tone = 'success',
}: {
  label: string;
  tone?: BadgeTone;
}) {
  return <Badge label={label} tone={tone} />;
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.sm,
    borderWidth: 1,
  },
  text: {
    ...typography.caption,
    fontSize: 10,
    lineHeight: 14,
  },
});
