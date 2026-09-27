import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { BodyText, HeadlineText, Icon } from '@/components/ui/Icon';
import { PrimaryButton } from '@/components/ui/Button';
import { colors, spacing, typography } from '@/theme';

type StateProps = {
  title: string;
  message?: string;
  icon?: string;
};

export function EmptyState({ title, message, icon = 'inbox' }: StateProps) {
  return (
    <View style={styles.wrap}>
      <Icon name={icon} size={40} color={colors.outline} />
      <HeadlineText weight="600" style={styles.title}>
        {title}
      </HeadlineText>
      {message ? <BodyText style={styles.message}>{message}</BodyText> : null}
    </View>
  );
}

export function LoadingState({ message = 'Loading…' }: { message?: string }) {
  return (
    <View style={styles.wrap}>
      <ActivityIndicator size="large" color={colors.brand} />
      <BodyText style={styles.message}>{message}</BodyText>
    </View>
  );
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
}: StateProps & { onRetry?: () => void }) {
  return (
    <View style={styles.wrap}>
      <Icon name="error_outline" size={40} color={colors.error} />
      <HeadlineText weight="600" style={styles.title}>
        {title}
      </HeadlineText>
      {message ? <BodyText style={styles.message}>{message}</BodyText> : null}
      {onRetry ? (
        <PrimaryButton
          label="Try again"
          onPress={onRetry}
          style={styles.retry}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    gap: spacing.sm,
  },
  title: {
    ...typography.sectionTitle,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  message: {
    ...typography.bodySecondary,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  retry: {
    marginTop: spacing.md,
    alignSelf: 'stretch',
  },
});
