import React, { useState } from 'react';
import { StyleSheet, Text, View, Pressable, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '@/components/ui';
import { colors, spacing, typography, radii } from '@/theme';
import { icons } from '@/theme/icons';

const { width } = Dimensions.get('window');
const RETICLE_SIZE = 260;

export default function QRScannerScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [torchActive, setTorchActive] = useState(false);

  return (
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      {/* Background simulated optical viewfinder */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        <View style={styles.darkBackground} />
        <View style={styles.ambientGlow} />
      </View>

      {/* Top Header */}
      <View style={styles.header}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={() => router.back()}
          style={styles.iconCircleButton}
        >
          <Icon name={icons.arrowBack} size={22} color={colors.textPrimary} />
        </Pressable>

        <View style={styles.telemetryBadge}>
          <View style={styles.telemetryDot} />
          <Text style={styles.telemetryText}>Scan QR Code</Text>
        </View>

        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Toggle flashlight"
          onPress={() => setTorchActive(!torchActive)}
          style={[
            styles.iconCircleButton,
            torchActive && styles.torchActiveButton,
          ]}
        >
          <Icon
            name={torchActive ? icons.flashlightOff : icons.flashlightOn}
            size={20}
            color={torchActive ? colors.brand : colors.textPrimary}
          />
        </Pressable>
      </View>

      {/* Center Reticle Viewfinder */}
      <View style={styles.centerContainer}>
        <View style={styles.viewfinderFrame}>
          {/* Reticle Corners */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          {/* Inner frame */}
          <View style={styles.innerFrame}>
            {/* Crosshairs watermark */}
            <View style={styles.crosshairH} />
            <View style={styles.crosshairV} />
            {/* Laser beam */}
            <View style={styles.laserBeam} />
          </View>
        </View>

        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Align QR code inside frame</Text>
          <Text style={styles.feedbackSubtitle}>
            Wallet addresses, ERC-681, or WalletConnect v2 session URIs
          </Text>
        </View>
      </View>

      {/* Bottom Controls */}
      <View style={styles.footer}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Upload from Gallery"
          onPress={() => {}}
          style={styles.galleryButton}
        >
          <Icon name={icons.image} size={20} color={colors.brand} />
          <Text style={styles.galleryButtonText}>Upload from Gallery</Text>
        </Pressable>

        <View style={styles.protocolBadge}>
          <Icon name={icons.hub} size={15} color={colors.cyan} />
          <Text style={styles.protocolText}>Supports EVM &amp; WalletConnect</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0e11',
    justifyContent: 'space-between',
  },
  darkBackground: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#111417',
    opacity: 0.95,
  },
  ambientGlow: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 320,
    height: 320,
    marginLeft: -160,
    marginTop: -160,
    backgroundColor: 'rgba(35, 74, 213, 0.15)',
    borderRadius: 160,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    zIndex: 10,
  },
  iconCircleButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(39, 42, 46, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(68, 70, 85, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  torchActiveButton: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.brand,
  },
  telemetryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: 'rgba(29, 32, 35, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(68, 70, 85, 0.3)',
  },
  telemetryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
  },
  telemetryText: {
    ...typography.caption,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
  },
  viewfinderFrame: {
    width: RETICLE_SIZE,
    height: RETICLE_SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  corner: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderColor: colors.brand,
  },
  cornerTL: {
    top: -1,
    left: -1,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 8,
  },
  cornerTR: {
    top: -1,
    right: -1,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 8,
  },
  cornerBL: {
    bottom: -1,
    left: -1,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 8,
  },
  cornerBR: {
    bottom: -1,
    right: -1,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 8,
  },
  innerFrame: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderColor: 'rgba(68, 70, 85, 0.25)',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  crosshairH: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 24,
    height: 1,
    marginLeft: -12,
    backgroundColor: colors.textSecondary,
    opacity: 0.3,
  },
  crosshairV: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: 1,
    height: 24,
    marginTop: -12,
    backgroundColor: colors.textSecondary,
    opacity: 0.3,
  },
  laserBeam: {
    position: 'absolute',
    top: '35%',
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: colors.cyan,
    shadowColor: colors.cyan,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 6,
  },
  feedbackContainer: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  feedbackTitle: {
    ...typography.bodyDefault,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  feedbackSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
    maxWidth: 240,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
  },
  galleryButton: {
    minHeight: 48,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm + 2,
    borderRadius: 100,
    backgroundColor: 'rgba(29, 32, 35, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(68, 70, 85, 0.4)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  galleryButtonText: {
    ...typography.bodyDefault,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  protocolBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radii.sm,
    backgroundColor: 'rgba(25, 28, 31, 0.8)',
    borderWidth: 1,
    borderColor: 'rgba(68, 70, 85, 0.2)',
  },
  protocolText: {
    ...typography.dataMonoSm,
    color: colors.textSecondary,
  },
});
