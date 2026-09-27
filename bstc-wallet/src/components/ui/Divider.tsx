import { StyleSheet, View, ViewStyle } from 'react-native';

import { colors, spacing } from '@/theme';

type DividerProps = {
  style?: ViewStyle;
  inset?: boolean;
};

export function Divider({ style, inset = false }: DividerProps) {
  return (
    <View
      style={[
        styles.line,
        inset && { marginHorizontal: spacing.margin },
        style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  line: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.divider,
  },
});
