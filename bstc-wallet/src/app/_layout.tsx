import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { DarkTheme, ThemeProvider, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { WalletProvider, useWalletState } from '@/state/wallet-state';
import { colors, loadAppFonts } from '@/theme';

SplashScreen.preventAutoHideAsync();

const bstcDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: colors.brand,
    background: colors.background,
    card: colors.surface,
    text: colors.textPrimary,
    border: colors.divider,
    notification: colors.brand,
  },
};

function RootNavigation() {
  const { hasWallet } = useWalletState();
  const segments = useSegments();
  const router = useRouter();
  const [navReady, setNavReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setNavReady(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!navReady) return;
    const rootSegment = segments[0] as string | undefined;
    const isWelcomeOrOnboarding = rootSegment === 'welcome' || rootSegment === 'onboarding';

    if (!hasWallet && !isWelcomeOrOnboarding) {
      router.replace('/welcome');
    } else if (hasWallet && rootSegment === 'welcome') {
      router.replace('/(tabs)');
    }
  }, [hasWallet, navReady, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: false }} />
      <Stack.Screen name="qr" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await loadAppFonts();
      } finally {
        if (mounted) {
          setFontsLoaded(true);
          await SplashScreen.hideAsync();
        }
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.background }} />;
  }

  return (
    <SafeAreaProvider>
      <WalletProvider>
        <ThemeProvider value={bstcDarkTheme}>
          <StatusBar style="light" />
          <RootNavigation />
        </ThemeProvider>
      </WalletProvider>
    </SafeAreaProvider>
  );
}
