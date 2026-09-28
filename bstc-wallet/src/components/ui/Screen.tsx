import { ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
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
  keyboardAvoiding?: boolean;
};

/**
 * Full-screen Obsidian canvas with safe-area and optional scroll.
 */
export function Screen({
  children,
  scroll = false,
  padded = true,
  tabBarInset = false,
  keyboardAvoiding = false,
  style,
  contentContainerStyle,
  scrollProps,
  ...rest
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const bottomInset = tabBarInset
    ? spacing.xl
    : Math.max(insets.bottom, spacing.md);

  const safeAreaStyle: ViewStyle = {
    paddingTop: insets.top,
    paddingBottom: bottomInset,
  };

  const horizontalPadding: ViewStyle = {
    paddingLeft: Math.max(insets.left, padded ? spacing.margin : 0),
    paddingRight: Math.max(insets.right, padded ? spacing.margin : 0),
  };

  const body = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      keyboardDismissMode="on-drag"
      {...scrollProps}
      style={styles.flex}
      contentContainerStyle={[horizontalPadding, contentContainerStyle]}
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, horizontalPadding, contentContainerStyle]}>
      {children}
    </View>
  );

  return (
    <View style={[styles.root, safeAreaStyle, style]} {...rest}>
      {keyboardAvoiding ? (
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}>
          {body}
        </KeyboardAvoidingView>
      ) : (
        body
      )}
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
