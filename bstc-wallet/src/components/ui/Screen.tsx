import { ReactNode } from 'react';
import {
  ScrollView,
  ScrollViewProps,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, spacing } from '@/theme';

type ScreenProps = ViewProps & {
  children: ReactNode;
  scroll?: boolean;
  padded?: boolean;
  /** Extra bottom padding for tab bar content */
  tabBarInset?: boolean;
  contentContainerStyle?: ViewStyle;
  scrollProps?: Omit<ScrollViewProps, 'contentContainerStyle' | 'style'>;
};

/**
 * Full-screen Obsidian canvas with safe-area and optional scroll.
 */
export function Screen({
  children,
  scroll = false,
  padded = true,
  tabBarInset = false,
  style,
  contentContainerStyle,
  scrollProps,
  ...rest
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const paddingStyle: ViewStyle = {
    paddingTop: insets.top,
    paddingLeft: Math.max(insets.left, padded ? spacing.margin : 0),
    paddingRight: Math.max(insets.right, padded ? spacing.margin : 0),
    paddingBottom: tabBarInset
      ? insets.bottom + spacing.xxl
      : Math.max(insets.bottom, spacing.sm),
  };

  if (scroll) {
    return (
      <View style={[styles.root, style]} {...rest}>
        <ScrollView
          {...scrollProps}
          style={styles.flex}
          contentContainerStyle={[paddingStyle, contentContainerStyle]}
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.root, paddingStyle, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
});
