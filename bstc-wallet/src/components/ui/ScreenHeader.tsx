import { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Icon, HeadlineText } from '@/components/ui/Icon';
import { colors, icons, spacing, typography } from '@/theme';

type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
  /** Large left-aligned title without back (Settings hub style) */
  large?: boolean;
};

export function ScreenHeader({
  title,
  onBack,
  right,
  large = false,
}: ScreenHeaderProps) {
  if (large) {
    return (
      <View style={styles.largeRow}>
        <HeadlineText weight="600" style={styles.largeTitle}>
          {title}
        </HeadlineText>
        {right}
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={styles.left}>
        {onBack ? (
          <Pressable
            onPress={onBack}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            hitSlop={8}
            style={styles.backBtn}>
            <Icon name={icons.arrowBack} size={24} color={colors.textPrimary} />
          </Pressable>
        ) : (
          <View style={styles.backSpacer} />
        )}
        <HeadlineText weight="600" style={styles.title} numberOfLines={1}>
          {title}
        </HeadlineText>
      </View>
      {right ? <View style={styles.right}>{right}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    marginBottom: spacing.sm,
  },
  largeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 56,
    marginBottom: spacing.sm,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  backBtn: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backSpacer: {
    width: 0,
  },
  title: {
    ...typography.screenTitle,
    color: colors.textPrimary,
    flexShrink: 1,
  },
  largeTitle: {
    ...typography.screenTitle,
    color: colors.textPrimary,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
