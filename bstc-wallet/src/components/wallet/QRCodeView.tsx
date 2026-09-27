import { StyleSheet, View } from 'react-native';

import { HeadlineText } from '@/components/ui/Icon';
import { colors, radii } from '@/theme';

type QRCodeViewProps = {
  size?: number;
  badgeText?: string;
};

/**
 * High-contrast QR representation matching Obsidian Terminal Receive screen.
 * Encased in a pure white container with the centered BSTC shield badge.
 */
export function QRCodeView({ size = 192, badgeText = 'BSTC' }: QRCodeViewProps) {
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      {/* Top-Left Finder */}
      <View style={[styles.finderOuter, styles.posTopLeft]}>
        <View style={styles.finderMid}>
          <View style={styles.finderInner} />
        </View>
      </View>

      {/* Top-Right Finder */}
      <View style={[styles.finderOuter, styles.posTopRight]}>
        <View style={styles.finderMid}>
          <View style={styles.finderInner} />
        </View>
      </View>

      {/* Bottom-Left Finder */}
      <View style={[styles.finderOuter, styles.posBottomLeft]}>
        <View style={styles.finderMid}>
          <View style={styles.finderInner} />
        </View>
      </View>

      {/* Matrix Data Blocks */}
      {/* Top row blocks */}
      <View style={[styles.dataBlock, { top: 12, left: 74, width: 14, height: 10 }]} />
      <View style={[styles.dataBlock, { top: 12, left: 96, width: 10, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 12, left: 114, width: 16, height: 8 }]} />

      {/* Timing and alignment blocks */}
      <View style={[styles.dataBlock, { top: 32, left: 72, width: 12, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 32, left: 92, width: 16, height: 12 }]} />
      <View style={[styles.dataBlock, { top: 32, left: 116, width: 10, height: 16 }]} />

      {/* Left side data blocks */}
      <View style={[styles.dataBlock, { top: 72, left: 12, width: 12, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 92, left: 12, width: 14, height: 10 }]} />
      <View style={[styles.dataBlock, { top: 112, left: 12, width: 10, height: 16 }]} />
      <View style={[styles.dataBlock, { top: 74, left: 32, width: 14, height: 12 }]} />
      <View style={[styles.dataBlock, { top: 94, left: 34, width: 12, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 114, left: 32, width: 14, height: 10 }]} />

      {/* Right side data blocks */}
      <View style={[styles.dataBlock, { top: 72, left: 136, width: 14, height: 12 }]} />
      <View style={[styles.dataBlock, { top: 92, left: 142, width: 10, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 112, left: 136, width: 14, height: 10 }]} />
      <View style={[styles.dataBlock, { top: 74, left: 158, width: 12, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 94, left: 160, width: 10, height: 10 }]} />
      <View style={[styles.dataBlock, { top: 114, left: 158, width: 12, height: 12 }]} />

      {/* Bottom row blocks */}
      <View style={[styles.dataBlock, { top: 140, left: 74, width: 12, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 140, left: 94, width: 14, height: 10 }]} />
      <View style={[styles.dataBlock, { top: 140, left: 116, width: 10, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 160, left: 72, width: 16, height: 12 }]} />
      <View style={[styles.dataBlock, { top: 160, left: 96, width: 10, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 160, left: 114, width: 14, height: 10 }]} />
      <View style={[styles.dataBlock, { top: 140, left: 138, width: 12, height: 12 }]} />
      <View style={[styles.dataBlock, { top: 160, left: 140, width: 14, height: 10 }]} />
      <View style={[styles.dataBlock, { top: 140, left: 160, width: 10, height: 14 }]} />
      <View style={[styles.dataBlock, { top: 160, left: 162, width: 10, height: 10 }]} />

      {/* Center BSTC Security Shield Badge */}
      <View style={styles.badgeWrap}>
        <View style={styles.badgeBox}>
          <HeadlineText weight="700" style={styles.badgeText}>
            {badgeText}
          </HeadlineText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: 12,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
    elevation: 8,
  },
  finderOuter: {
    position: 'absolute',
    width: 48,
    height: 48,
    backgroundColor: '#0B0E11',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  posTopLeft: {
    top: 12,
    left: 12,
  },
  posTopRight: {
    top: 12,
    right: 12,
  },
  posBottomLeft: {
    bottom: 12,
    left: 12,
  },
  finderMid: {
    width: 34,
    height: 34,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  finderInner: {
    width: 20,
    height: 20,
    backgroundColor: '#0B0E11',
    borderRadius: 3,
  },
  dataBlock: {
    position: 'absolute',
    backgroundColor: '#0B0E11',
    borderRadius: 2,
  },
  badgeWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeBox: {
    width: 40,
    height: 40,
    borderRadius: radii.lg,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    lineHeight: 14,
    color: colors.brand,
    letterSpacing: -0.5,
  },
});
