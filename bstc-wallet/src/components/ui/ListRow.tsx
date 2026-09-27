import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { BodyText, Icon } from '@/components/ui/Icon';
import { colors, icons, spacing, typography } from '@/theme';

type ListRowProps = {
  title: string;
  subtitle?: string;
  leading?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
};

export function ListRow({
  title,
  subtitle,
  leading,
  trailing,
  onPress,
  showChevron = false,
}: ListRowProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={title}
      style={({ pressed }) => [styles.row, pressed && onPress && styles.pressed]}>
      <View style={styles.left}>
        {leading}
        <View style={styles.textCol}>
          <BodyText weight="600" style={styles.title} numberOfLines={1}>
            {title}
          </BodyText>
          {subtitle ? (
            <BodyText style={styles.subtitle} numberOfLines={1}>
              {subtitle}
            </BodyText>
          ) : null}
        </View>
      </View>
      <View style={styles.right}>
        {trailing}
        {showChevron ? (
          <Icon name={icons.chevronRight} size={20} color={colors.outline} />
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: spacing.lg,
    minHeight: spacing.touch,
    gap: spacing.md,
  },
  pressed: {
    backgroundColor: colors.surfaceElevated,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    flex: 1,
  },
  textCol: {
    flex: 1,
    gap: 2,
  },
  title: {
    ...typography.bodyCompact,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
