# Graph Report - BSTC  (2026-09-29)

## Corpus Check
- 129 files · ~116,845 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 45 file(s) not represented in the graph (top: .xml 12, .ttf 11, (none) 7)

## Summary
- 658 nodes · 2250 edges · 54 communities (34 shown, 20 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `165660c9`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BodyText
- history.tsx
- collapsible.tsx
- mockWallet.ts
- App Configuration
- Core Dependencies
- theme/index.ts
- spacing
- iOS AppDelegate
- react
- animated-icon.tsx
- Android Adaptive Icons
- package.json
- Splash Screens & Agent Rules
- Badge.tsx
- Android MainApplication
- Android MainActivity
- SegmentedControl.tsx
- Reset Project Script
- devDependencies
- ui/index.ts
- Tab Navigation Icons
- Native Module Implementations
- (tabs)/index.tsx
- Branding Assets
- Animated Splash Overlay
- Animated Splash Overlay (Web)
- TypeScript Config
- NPM Scripts
- Gradle Wrapper
- Android Launcher Icons (hdpi)
- Token Management
- External Link Component
- Graphify Agent Rules
- React Logos
- Android Round Launcher Icon
- Expo Logo Assets
- Android Monochrome App Icon (xxhdpi)
- Android App Icon Round (xxhdpi)
- Android App Icon Monochrome (xxxhdpi)
- Android App Icon Round (xxxhdpi)
- Android Launcher Icon Background (mdpi)
- Android Launcher Foreground (mdpi)
- Android Launcher Icon Monochrome (hdpi)
- Android Launcher Icon Monochrome (mdpi)
- animated-icon.web.tsx
- typography
- colors

## God Nodes (most connected - your core abstractions)
1. `BodyText()` - 114 edges
2. `Icon()` - 104 edges
3. `HeadlineText()` - 82 edges
4. `Screen()` - 82 edges
5. `react-native` - 81 edges
6. `ScreenHeader()` - 80 edges
7. `colors` - 72 edges
8. `Card()` - 67 edges
9. `spacing` - 64 edges
10. `MonoText()` - 59 edges

## Surprising Connections (you probably didn't know these)
- `Ponytail Lazy Senior Dev Principle` --semantically_similar_to--> `Decoupled Mock Data Architecture (UI/State Separation)`  [INFERRED] [semantically similar]
  bstc-wallet/AGENTS.md → README.md
- `BSTC Splash Screen Logo (hdpi) - White Chevron/Caret on Dark` --conceptually_related_to--> `Obsidian Terminal Design System`  [INFERRED]
  bstc-wallet/android/app/src/main/res/drawable-hdpi/splashscreen_logo.png → README.md
- `BSTC Wallet Root README` --semantically_similar_to--> `BSTC Wallet README`  [EXTRACTED] [semantically similar]
  README.md → bstc-wallet/README.md
- `BSTC Splash Screen Logo (hdpi) - White Chevron/Caret on Dark` --semantically_similar_to--> `BSTC Splash Screen Logo (mdpi)`  [INFERRED] [semantically similar]
  bstc-wallet/android/app/src/main/res/drawable-hdpi/splashscreen_logo.png → bstc-wallet/android/app/src/main/res/drawable-mdpi/splashscreen_logo.png
- `BSTC Splash Screen Logo (hdpi) - White Chevron/Caret on Dark` --semantically_similar_to--> `BSTC Splash Screen Logo (xhdpi)`  [INFERRED] [semantically similar]
  bstc-wallet/android/app/src/main/res/drawable-hdpi/splashscreen_logo.png → bstc-wallet/android/app/src/main/res/drawable-xhdpi/splashscreen_logo.png

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Expo Native Module Bridge + Kotlin + Trust Wallet Core Stack** — expo_native_module_bridge, trust_wallet_core_integration, bstc_wallet_concept [EXTRACTED 0.95]
- **Non-Custodial Security Model: Hardware Enclave + Web3 Approvals + Biometrics** — non_custodial_security_model, web3_dapp_approval_workflow, trust_wallet_core_integration [INFERRED 0.85]
- **Android Adaptive Launcher Icon Density Set (hdpi/mdpi)** — bstc_wallet_android_ic_launcher_hdpi, bstc_wallet_android_ic_launcher_foreground_hdpi, bstc_wallet_android_ic_launcher_background_hdpi [INFERRED 0.90]

## Communities (54 total, 20 thin omitted)

### Community 0 - "BodyText"
Cohesion: 0.10
Nodes (94): BuyCompletedScreen(), styles, BuyScreen(), styles, PaymentMethodScreen(), BuyProcessingScreen(), styles, BuyReviewScreen() (+86 more)

### Community 1 - "history.tsx"
Cohesion: 0.14
Nodes (18): DateGroup, FILTER_SEGMENTS, HistoryScreen(), MOCK_HISTORY, styles, Divider(), DividerProps, styles (+10 more)

### Community 2 - "collapsible.tsx"
Cohesion: 0.12
Nodes (24): BstcWalletModule, BstcWalletModule, HintRow(), HintRowProps, styles, styles, ThemedText(), ThemedTextProps (+16 more)

### Community 3 - "mockWallet.ts"
Cohesion: 0.07
Nodes (38): styles, styles, CATEGORIES, styles, Web3Screen(), SelectTokenScreen(), styles, styles (+30 more)

### Community 4 - "App Configuration"
Cohesion: 0.07
Nodes (26): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, reactCompiler (+18 more)

### Community 5 - "Core Dependencies"
Cohesion: 0.08
Nodes (25): dependencies, expo, expo-constants, expo-dev-client, expo-device, expo-font, expo-glass-effect, expo-image (+17 more)

### Community 6 - "theme/index.ts"
Cohesion: 0.14
Nodes (14): QRScannerScreen(), styles, { width }, styles, styles, TabLayout(), QRCodeViewProps, styles (+6 more)

### Community 7 - "spacing"
Cohesion: 0.20
Nodes (7): ListRow(), ListRowProps, styles, styles, ToggleProps, spacing, SpacingToken

### Community 8 - "iOS AppDelegate"
Cohesion: 0.12
Nodes (17): Any, Bool, AppDelegate, ReactNativeDelegate, Expo, ExpoAppDelegate, ExpoReactNativeFactoryDelegate, NSUserActivity (+9 more)

### Community 9 - "react"
Cohesion: 0.10
Nodes (18): bstcDarkTheme, RootLayout(), RootNavigation(), CURRENCIES, LANGUAGES, styles, THEMES, INITIAL_TOKENS (+10 more)

### Community 10 - "animated-icon.tsx"
Cohesion: 0.22
Nodes (6): glowKeyframe, keyframe, logoKeyframe, styles, expo-splash-screen, react-native-worklets

### Community 11 - "Android Adaptive Icons"
Cohesion: 0.13
Nodes (20): Android Adaptive Icon Design (foreground + background layers), Android App Icon Background (xhdpi), Android App Icon Foreground (xhdpi), Android App Icon Monochrome (xhdpi), Android App Icon Round (xhdpi), Android App Icon (xhdpi), Android App Icon Background (xxhdpi), Android App Icon Foreground (xxhdpi) (+12 more)

### Community 12 - "package.json"
Cohesion: 0.09
Nodes (20): main, name, private, version, expo-constants, expo-dev-client, expo-device, expo-font (+12 more)

### Community 13 - "Splash Screens & Agent Rules"
Cohesion: 0.15
Nodes (17): BSTC Wallet AGENTS.md (Ponytail Dev Rules), BSTC Splash Screen Logo (hdpi) - White Chevron/Caret on Dark, BSTC Splash Screen Logo (mdpi), BSTC Splash Screen Logo (xhdpi), BSTC Splash Screen Logo (xxhdpi), BSTC Splash Screen Logo (xxxhdpi), BSTC Wallet (Non-Custodial Crypto Wallet App), BSTC Wallet README (+9 more)

### Community 14 - "Badge.tsx"
Cohesion: 0.33
Nodes (6): Badge(), BadgeProps, BadgeTone, StatusBadge(), styles, toneStyles

### Community 15 - "Android MainApplication"
Cohesion: 0.17
Nodes (12): Application, applicationlifecycledispatcher, MainApplication, Configuration, defaultnewarchitectureentrypoint, exporeacthostfactory, loadreactnative, packagelist (+4 more)

### Community 16 - "Android MainActivity"
Cohesion: 0.19
Nodes (9): MainActivity, DefaultReactActivityDelegate, build, Bundle, fabricenabled, ReactActivity, ReactActivityDelegate, reactactivitydelegatewrapper (+1 more)

### Community 17 - "SegmentedControl.tsx"
Cohesion: 0.40
Nodes (4): Segment, SegmentedControl(), SegmentedControlProps, styles

### Community 18 - "Reset Project Script"
Cohesion: 0.17
Nodes (10): exampleDirPath, fs, oldDirs, path, readline, rl, root, ref_fs (+2 more)

### Community 19 - "devDependencies"
Cohesion: 0.67
Nodes (3): devDependencies, @types/react, typescript

### Community 20 - "ui/index.ts"
Cohesion: 0.13
Nodes (17): ButtonProps, ButtonSize, ButtonVariant, DestructiveButton(), IconButtonProps, styles, CardProps, CardVariant (+9 more)

### Community 21 - "Tab Navigation Icons"
Cohesion: 0.20
Nodes (10): Explore Tab Icon 2x (High-DPI), Explore Tab Icon 3x (High-DPI), Explore Tab Icon (Small black compass/book silhouette, navigation), History Tab Icon (White/transparent clock or list silhouette, transaction history navigation), Home Tab Icon 2x (High-DPI), Home Tab Icon 3x (High-DPI), Home Tab Icon (Small black house silhouette, home navigation), Settings Tab Icon (White/transparent gear or cogwheel silhouette, settings navigation) (+2 more)

### Community 22 - "Native Module Implementations"
Cohesion: 0.22
Nodes (6): BstcWalletModule, Module, BstcWalletModule, ExpoModulesCore, Module, ModuleDefinition

### Community 23 - "(tabs)/index.tsx"
Cohesion: 0.17
Nodes (14): styles, WalletHomeScreen(), QuickAction(), QuickActionProps, styles, PortfolioHeader(), PortfolioHeaderProps, styles (+6 more)

### Community 24 - "Branding Assets"
Cohesion: 0.22
Nodes (9): App Favicon (Blue rounded-square with white A chevron logo), BSTC Wallet App Icon (Blue background, white A-shaped chevron logo, grid pattern), Logo Glow Effect (Soft blue radial glow, decorative background element), Splash Screen Icon (White A-shaped chevron logo on transparent background), Tutorial Web Screenshot (Expo starter app running on localhost:8081, showing Home/Explore/Doc tabs and app icon), Grid Pattern PNG (White grid overlay texture for iOS icon background), iOS Splash Screen Logo 2x (High-DPI, white A-shaped chevron), iOS Splash Screen Logo 3x (High-DPI, white A-shaped chevron) (+1 more)

### Community 25 - "Animated Splash Overlay"
Cohesion: 0.40
Nodes (4): Answer, Outcome, Q: How does the Native Wallet Bridge integrate with the Wallet Management system and Web3 Payment Flows?, Source Nodes

### Community 27 - "TypeScript Config"
Cohesion: 0.25
Nodes (7): compilerOptions, paths, strict, extends, include, @/assets/*, expo/tsconfig.base

### Community 28 - "NPM Scripts"
Cohesion: 0.29
Nodes (7): scripts, android, ios, lint, reset-project, start, web

### Community 29 - "Gradle Wrapper"
Cohesion: 0.83
Nodes (3): gradlew script, die(), warn()

### Community 30 - "Android Launcher Icons (hdpi)"
Cohesion: 0.50
Nodes (4): Android Launcher Icon Background hdpi - Light blue circular grid/safe zone guide, Android Launcher Foreground hdpi - Blue gradient upward chevron/caret logo mark, Android Launcher Icon hdpi - Blue sky background with white/blue upward chevron logo, Android Launcher Icon mdpi

### Community 34 - "React Logos"
Cohesion: 0.67
Nodes (3): React Logo 2x (High-DPI cyan atom icon), React Logo 3x (High-DPI cyan atom icon), React Logo (Cyan atom icon, React Native branding)

### Community 54 - "animated-icon.web.tsx"
Cohesion: 0.20
Nodes (7): bstc_wallet_src_components_animated_icon_module, glowKeyframe, keyframe, logoKeyframe, styles, expo-image, react-native-reanimated

### Community 57 - "typography"
Cohesion: 0.13
Nodes (12): styles, styles, styles, AvatarProps, styles, NetworkBadgeProps, styles, styles (+4 more)

### Community 58 - "colors"
Cohesion: 0.11
Nodes (17): AppTabs(), AppTabs(), styles, WebTabButton(), FeedbackModalProps, styles, IconProps, styles (+9 more)

## Knowledge Gaps
- **279 isolated node(s):** `name`, `slug`, `version`, `orientation`, `icon` (+274 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 326 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `theme/index.ts` to `BodyText`, `history.tsx`, `collapsible.tsx`, `mockWallet.ts`, `spacing`, `react`, `animated-icon.tsx`, `package.json`, `Badge.tsx`, `SegmentedControl.tsx`, `ui/index.ts`, `animated-icon.web.tsx`, `(tabs)/index.tsx`, `typography`, `colors`?**
  _High betweenness centrality (0.134) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `BodyText`, `history.tsx`, `External Link Component`, `mockWallet.ts`, `collapsible.tsx`, `theme/index.ts`, `spacing`, `animated-icon.tsx`, `package.json`, `ui/index.ts`, `(tabs)/index.tsx`, `typography`, `colors`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Core Dependencies` to `package.json`?**
  _High betweenness centrality (0.049) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _279 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BodyText` be split into smaller, more focused modules?**
  _Cohesion score 0.09689457550313207 - nodes in this community are weakly interconnected._
- **Should `history.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13852813852813853 - nodes in this community are weakly interconnected._
- **Should `collapsible.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.11942959001782531 - nodes in this community are weakly interconnected._