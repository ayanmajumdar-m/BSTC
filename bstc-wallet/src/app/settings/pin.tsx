import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useRouter } from 'expo-router';

import {
  BodyText,
  HeadlineText,
  Icon,
  IconButton,
  Screen,
  ScreenHeader,
} from '@/components/ui';
import { colors, icons, radii, spacing, typography } from '@/theme';

export default function PinScreen() {
  const router = useRouter();
  const [stage, setStage] = useState<1 | 2 | 3>(1); // 1: Create, 2: Confirm, 3: Success
  const [firstPin, setFirstPin] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleKeyPress = (val: string) => {
    if (stage === 3 || enteredPin.length >= 6) return;
    const nextPin = enteredPin + val;
    setEnteredPin(nextPin);
    setErrorMessage('');

    if (nextPin.length === 6) {
      setTimeout(() => {
        if (stage === 1) {
          setFirstPin(nextPin);
          setEnteredPin('');
          setStage(2);
        } else if (stage === 2) {
          if (nextPin === firstPin) {
            setStage(3);
            setTimeout(() => {
              router.back();
            }, 1200);
          } else {
            setErrorMessage('PINs do not match. Please try again.');
            setEnteredPin('');
          }
        }
      }, 150);
    }
  };

  const handleDelete = () => {
    if (enteredPin.length > 0) {
      setEnteredPin(enteredPin.slice(0, -1));
      setErrorMessage('');
    }
  };

  const handleReset = () => {
    setStage(1);
    setFirstPin('');
    setEnteredPin('');
    setErrorMessage('');
  };

  const keys = [
    { num: '1', sub: ' ' },
    { num: '2', sub: 'ABC' },
    { num: '3', sub: 'DEF' },
    { num: '4', sub: 'GHI' },
    { num: '5', sub: 'JKL' },
    { num: '6', sub: 'MNO' },
    { num: '7', sub: 'PQRS' },
    { num: '8', sub: 'TUV' },
    { num: '9', sub: 'WXYZ' },
  ];

  return (
    <Screen contentContainerStyle={styles.content}>
      <ScreenHeader
        title="PIN & Passcode"
        onBack={() => router.back()}
        right={
          <IconButton
            accessibilityLabel="PIN information"
            size={36}
            variant="ghost">
            <Icon name={icons.info} size={20} color={colors.outline} />
          </IconButton>
        }
      />

      {/* Step Badge */}
      <View style={styles.topSection}>
        <View
          style={[
            styles.stepBadge,
            stage === 3 && styles.stepBadgeSuccess,
          ]}>
          <View
            style={[
              styles.stepDot,
              stage === 3 && { backgroundColor: colors.success },
            ]}
          />
          <BodyText
            weight="600"
            style={[
              styles.stepBadgeText,
              stage === 3 && { color: colors.success },
            ]}>
            {stage === 1
              ? 'Step 1 of 2 : Create PIN'
              : stage === 2
              ? 'Step 2 of 2 : Confirm PIN'
              : 'Security Verified'}
          </BodyText>
        </View>

        <HeadlineText weight="600" style={styles.heading}>
          {stage === 1
            ? 'Create Passcode'
            : stage === 2
            ? 'Confirm Passcode'
            : 'PIN Configured'}
        </HeadlineText>

        <BodyText style={styles.subheading}>
          {stage === 1
            ? 'Set a secure 6-digit numeric PIN to protect your wallet and confirm transactions'
            : stage === 2
            ? 'Re-enter your 6-digit PIN to ensure accuracy'
            : 'Your BSTC Wallet is now encrypted and secured'}
        </BodyText>
      </View>

      {/* PIN Indicator Dots */}
      <View style={styles.indicatorContainer}>
        <View style={styles.dotsRow}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < enteredPin.length || stage === 3;
            const isError = Boolean(errorMessage);
            const isSuccess = stage === 3;

            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  isFilled && styles.dotFilled,
                  isSuccess && styles.dotSuccess,
                  isError && styles.dotError,
                ]}
              />
            );
          })}
        </View>

        {errorMessage ? (
          <View style={styles.errorRow}>
            <Icon name={icons.error} size={14} color={colors.error} />
            <BodyText style={styles.errorText}>{errorMessage}</BodyText>
          </View>
        ) : (
          <View style={styles.errorSpacer} />
        )}
      </View>

      {/* 3x4 Numeric Keypad */}
      <View style={styles.keypad}>
        {keys.map((k) => (
          <Pressable
            key={k.num}
            onPress={() => handleKeyPress(k.num)}
            accessibilityRole="button"
            accessibilityLabel={`Digit ${k.num}`}
            style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>
            <HeadlineText weight="600" style={styles.keyNum}>
              {k.num}
            </HeadlineText>
            <BodyText style={styles.keySub}>{k.sub}</BodyText>
          </Pressable>
        ))}

        {/* Bottom Row */}
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Biometric login"
          onPress={() => {}}
          style={({ pressed }) => [styles.actionKey, pressed && styles.keyPressed]}>
          <Icon name={icons.fingerprint} size={26} color={colors.outline} />
        </Pressable>

        <Pressable
          onPress={() => handleKeyPress('0')}
          accessibilityRole="button"
          accessibilityLabel="Digit 0"
          style={({ pressed }) => [styles.key, pressed && styles.keyPressed]}>
          <HeadlineText weight="600" style={styles.keyNum}>
            0
          </HeadlineText>
          <BodyText style={styles.keySub}>+</BodyText>
        </Pressable>

        <Pressable
          onPress={handleDelete}
          accessibilityRole="button"
          accessibilityLabel="Backspace"
          style={({ pressed }) => [styles.actionKey, pressed && styles.keyPressed]}>
          <Icon name={icons.backspace} size={24} color={colors.outline} />
        </Pressable>
      </View>

      {/* Footer Reset Button */}
      <View style={styles.footer}>
        <Pressable onPress={handleReset} style={styles.resetBtn}>
          <BodyText style={styles.resetText}>Reset PIN Setup</BodyText>
        </Pressable>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: spacing.xl,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  topSection: {
    alignItems: 'center',
    textAlign: 'center',
    gap: spacing.xs,
    paddingTop: spacing.xs,
  },
  stepBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceContainer,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    marginBottom: spacing.xs,
  },
  stepBadgeSuccess: {
    borderColor: 'rgba(14, 203, 129, 0.3)',
    backgroundColor: colors.successMuted,
  },
  stepDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
  },
  stepBadgeText: {
    ...typography.caption,
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    color: colors.primaryTint,
  },
  heading: {
    ...typography.screenTitle,
    fontSize: 22,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subheading: {
    ...typography.bodyCompact,
    color: colors.outline,
    textAlign: 'center',
    maxWidth: 290,
    lineHeight: 20,
  },
  indicatorContainer: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
    gap: spacing.md,
  },
  dotsRow: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.surfaceHigh,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
  },
  dotFilled: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 4,
  },
  dotSuccess: {
    backgroundColor: colors.success,
    borderColor: colors.success,
    shadowColor: colors.success,
  },
  dotError: {
    backgroundColor: colors.error,
    borderColor: colors.error,
    shadowColor: colors.error,
  },
  errorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    height: 20,
  },
  errorText: {
    ...typography.caption,
    color: colors.error,
  },
  errorSpacer: {
    height: 20,
  },
  keypad: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 24,
    rowGap: 14,
    paddingHorizontal: spacing.lg,
    maxWidth: 320,
    alignSelf: 'center',
  },
  key: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.surfaceLow,
    borderWidth: 1,
    borderColor: colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionKey: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyPressed: {
    backgroundColor: colors.surfaceContainer,
    transform: [{ scale: 0.94 }],
  },
  keyNum: {
    fontSize: 22,
    color: colors.textPrimary,
    lineHeight: 26,
  },
  keySub: {
    ...typography.caption,
    fontSize: 9,
    color: colors.outline,
    letterSpacing: 1.5,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  resetBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetText: {
    ...typography.caption,
    color: colors.outline,
  },
});
