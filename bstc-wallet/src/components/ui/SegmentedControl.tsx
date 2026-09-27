import { Pressable, ScrollView, StyleSheet } from 'react-native';

import { BodyText } from '@/components/ui/Icon';
import { colors, radii, spacing, typography } from '@/theme';

type Segment = {
  key: string;
  label: string;
};

type SegmentedControlProps = {
  segments: Segment[];
  value: string;
  onChange: (key: string) => void;
  scrollable?: boolean;
};

export function SegmentedControl({
  segments,
  value,
  onChange,
  scrollable = false,
}: SegmentedControlProps) {
  const content = segments.map((seg) => {
    const active = seg.key === value;
    return (
      <Pressable
        key={seg.key}
        onPress={() => onChange(seg.key)}
        accessibilityRole="button"
        accessibilityState={{ selected: active }}
        accessibilityLabel={seg.label}
        style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}>
        <BodyText
          weight={active ? '600' : '500'}
          style={[styles.label, active ? styles.labelActive : styles.labelIdle]}>
          {seg.label}
        </BodyText>
      </Pressable>
    );
  });

  if (scrollable) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}>
        {content}
      </ScrollView>
    );
  }

  return <>{content}</>;
}

/** Non-scrolling inline row wrapper used on Wallet Home */
export function SegmentedControlRow(props: SegmentedControlProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.row}>
      {props.segments.map((seg) => {
        const active = seg.key === props.value;
        return (
          <Pressable
            key={seg.key}
            onPress={() => props.onChange(seg.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
            style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}>
            <BodyText
              weight={active ? '600' : '500'}
              style={[
                styles.label,
                active ? styles.labelActive : styles.labelIdle,
              ]}>
              {seg.label}
            </BodyText>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radii.full,
  },
  chipActive: {
    backgroundColor: colors.primaryTint,
  },
  chipIdle: {
    backgroundColor: 'transparent',
  },
  label: {
    ...typography.bodySecondary,
    fontSize: 13,
  },
  labelActive: {
    color: colors.textOnPrimaryFixed,
  },
  labelIdle: {
    color: colors.outline,
  },
});
