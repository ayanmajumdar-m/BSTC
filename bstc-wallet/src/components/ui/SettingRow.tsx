import { Children, ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText, Icon } from '@/components/ui/Icon';
import { colors, icons, radii, spacing, typography } from '@/theme';

type SettingRowProps = {
  label: string;
  icon?: string;
  onPress?: () => void;
  right?: ReactNode;
  showChevron?: boolean;
  destructive?: boolean;
};

/**
 * Navigation row used on Settings hub and similar lists.
 * Does not embed detailed controls — only hub navigation.
 */
export function SettingRow({
  label,
  icon,
  onPress,
  right,
  showChevron = true,
  destructive = false,
}: SettingRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={label}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}>
      <View style={styles.left}>
        {icon ? (
          <Icon
            name={icon}
            size={20}
            color={destructive ? colors.error : colors.outline}
          />
        ) : null}
        <BodyText
          weight="400"
          style={[
            styles.label,
            destructive && { color: colors.error },
          ]}>
          {label}
        </BodyText>
      </View>
      <View style={styles.right}>
        {right}
        {showChevron && onPress ? (
          <Icon name={icons.chevronRight} size={20} color={colors.outline} />
        ) : null}
      </View>
    </Pressable>
  );
}

type SettingSectionProps = {
  title?: string;
  children: ReactNode;
};

export function SettingSection({ title, children }: SettingSectionProps) {
  const childArray = Children.toArray(children);
  return (
    <View style={styles.section}>
      {title ? (
        <BodyText weight="600" style={styles.sectionTitle}>
          {title}
        </BodyText>
      ) : null}
      <View style={styles.card}>
        {childArray.map((child, index) => (
          <View key={index}>
            {index > 0 ? <View style={styles.divider} /> : null}
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    gap: 6,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.outline,
    letterSpacing: 0.8,
    paddingHorizontal: spacing.xs,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: colors.surfaceLow,
    borderRadius: radii.xl,
    overflow: 'hidden',
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(39, 42, 46, 0.6)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: 14,
    minHeight: spacing.touch,
  },
  pressed: {
    backgroundColor: colors.surfaceContainer,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  label: {
    ...typography.bodyCompact,
    color: colors.textPrimary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
