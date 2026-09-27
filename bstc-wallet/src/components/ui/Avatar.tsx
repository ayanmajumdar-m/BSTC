import { StyleSheet, View } from 'react-native';

import { HeadlineText } from '@/components/ui/Icon';
import { colors, radii, typography } from '@/theme';

type AvatarProps = {
  initials: string;
  size?: number;
};

export function Avatar({ initials, size = 48 }: AvatarProps) {
  return (
    <View
      style={[
        styles.avatar,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}>
      <HeadlineText
        weight="600"
        style={[
          styles.text,
          { fontSize: size * 0.375, lineHeight: size * 0.45 },
        ]}>
        {initials}
      </HeadlineText>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.surfaceHigh,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    ...typography.sectionTitle,
    color: colors.primaryTint,
  },
});
