import React from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import { BodyText } from './Icon'; // or wherever BodyText is. Wait, they are exported from index.
import { Icon } from './Icon';
import { colors, icons, radii, spacing } from '@/theme';

export interface FeedbackModalProps {
  status: 'idle' | 'success' | 'error';
  message: string;
}

export function FeedbackModal({ status, message }: FeedbackModalProps) {
  return (
    <Modal visible={status !== 'idle'} transparent animationType="fade">
      <View style={styles.floatingOverlay}>
        <View
          style={[
            styles.floatingMessage,
            status === 'success' ? styles.floatingSuccess : styles.floatingError,
          ]}>
          <Icon
            name={status === 'success' ? icons.checkCircle : icons.warning}
            size={28}
            color={status === 'success' ? colors.success : colors.error}
          />
          <BodyText style={styles.floatingText}>{message}</BodyText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  floatingOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  floatingMessage: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
    borderRadius: radii.lg,
    padding: spacing.xl,
    gap: spacing.md,
    maxWidth: 300,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
  },
  floatingSuccess: {
    borderColor: 'rgba(14, 203, 129, 0.3)',
  },
  floatingError: {
    borderColor: 'rgba(246, 70, 93, 0.3)',
  },
  floatingText: {
    fontSize: 16,
    color: colors.textPrimary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
