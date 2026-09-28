# Graph Report - BSTC  (2026-09-28)

## Corpus Check
- 187 files · ~114,439 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 45 file(s) not represented in the graph (top: .xml 12, .ttf 11, (none) 7)

## Summary
- 642 nodes · 2182 edges · 52 communities (35 shown, 17 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 36 edges (avg confidence: 0.88)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Buy Flow Screens
- Transaction History Screen
- Native Wallet Bridge
- Web3 Payment Flows
- App Configuration
- Core Dependencies
- Settings & PIN
- Wallet Onboarding Backup
- iOS AppDelegate
- Wallet Management
- UI Components (Icons)
- Android Adaptive Icons
- Project Metadata
- Splash Screens & Agent Rules
- Wallet Home Screen
- Android MainApplication
- Android MainActivity
- QR Scanner Screen
- Reset Project Script
- App Tabs Navigation
- UI Components (Cards)
- Tab Navigation Icons
- Native Module Implementations
- Root Layout & Theme
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
- Dev Dependencies
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

## God Nodes (most connected - your core abstractions)
1. `BodyText()` - 110 edges
2. `Icon()` - 100 edges
3. `HeadlineText()` - 80 edges
4. `Screen()` - 80 edges
5. `react-native` - 79 edges
6. `ScreenHeader()` - 78 edges
7. `colors` - 70 edges
8. `Card()` - 65 edges
9. `spacing` - 62 edges
10. `MonoText()` - 60 edges

## Surprising Connections (you probably didn't know these)
- `BSTC Splash Screen Logo (hdpi) - White Chevron/Caret on Dark` --conceptually_related_to--> `Obsidian Terminal Design System`  [INFERRED]
  bstc-wallet/android/app/src/main/res/drawable-hdpi/splashscreen_logo.png → README.md
- `Ponytail Lazy Senior Dev Principle` --semantically_similar_to--> `Decoupled Mock Data Architecture (UI/State Separation)`  [INFERRED] [semantically similar]
  bstc-wallet/AGENTS.md → README.md
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
- **Android Adaptive Launcher Icon Density Set (hdpi/mdpi)** — bstc_wallet_android_ic_launcher_hdpi, bstc_wallet_android_ic_launcher_foreground_hdpi, bstc_wallet_android_ic_launcher_background_hdpi [INFERRED 0.90]
- **Non-Custodial Security Model: Hardware Enclave + Web3 Approvals + Biometrics** — non_custodial_security_model, web3_dapp_approval_workflow, trust_wallet_core_integration [INFERRED 0.85]

## Communities (52 total, 17 thin omitted)

### Community 0 - "Buy Flow Screens"
Cohesion: 0.12
Nodes (78): BuyCompletedScreen(), styles, BuyScreen(), styles, PaymentMethodScreen(), BuyProcessingScreen(), styles, BuyReviewScreen() (+70 more)

### Community 1 - "Transaction History Screen"
Cohesion: 0.07
Nodes (41): DateGroup, FILTER_SEGMENTS, HistoryScreen(), MOCK_HISTORY, styles, SelectTokenScreen(), styles, Badge() (+33 more)

### Community 2 - "Native Wallet Bridge"
Cohesion: 0.12
Nodes (24): BstcWalletModule, BstcWalletModule, HintRow(), HintRowProps, styles, styles, ThemedText(), ThemedTextProps (+16 more)

### Community 3 - "Web3 Payment Flows"
Cohesion: 0.08
Nodes (28): styles, CATEGORIES, styles, styles, NetworkBadge(), TokenRowData, BuyQuote, ContactData (+20 more)

### Community 4 - "App Configuration"
Cohesion: 0.07
Nodes (26): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, package, predictiveBackGestureEnabled, reactCompiler (+18 more)

### Community 5 - "Core Dependencies"
Cohesion: 0.08
Nodes (25): dependencies, expo, expo-constants, expo-dev-client, expo-device, expo-font, expo-glass-effect, expo-image (+17 more)

### Community 6 - "Settings & PIN"
Cohesion: 0.17
Nodes (13): styles, styles, styles, styles, styles, ListRowProps, styles, IconName (+5 more)

### Community 7 - "Wallet Onboarding Backup"
Cohesion: 0.12
Nodes (14): styles, ImportWalletScreen(), styles, styles, INITIAL_NETWORKS, NetworkItem, styles, Input() (+6 more)

### Community 8 - "iOS AppDelegate"
Cohesion: 0.12
Nodes (17): Any, Bool, AppDelegate, ReactNativeDelegate, Expo, ExpoAppDelegate, ExpoReactNativeFactoryDelegate, NSUserActivity (+9 more)

### Community 9 - "Wallet Management"
Cohesion: 0.13
Nodes (14): INITIAL_WALLETS, styles, WalletItem, styles, SettingRow(), SettingRowProps, SettingSection(), SettingSectionProps (+6 more)

### Community 10 - "UI Components (Icons)"
Cohesion: 0.12
Nodes (14): AvatarProps, styles, IconProps, styles, NetworkBadgeProps, styles, ScreenHeaderProps, styles (+6 more)

### Community 11 - "Android Adaptive Icons"
Cohesion: 0.13
Nodes (20): Android Adaptive Icon Design (foreground + background layers), Android App Icon Background (xhdpi), Android App Icon Foreground (xhdpi), Android App Icon Monochrome (xhdpi), Android App Icon Round (xhdpi), Android App Icon (xhdpi), Android App Icon Background (xxhdpi), Android App Icon Foreground (xxhdpi) (+12 more)

### Community 12 - "Project Metadata"
Cohesion: 0.11
Nodes (18): main, name, private, version, expo-constants, expo-dev-client, expo-device, expo-glass-effect (+10 more)

### Community 13 - "Splash Screens & Agent Rules"
Cohesion: 0.15
Nodes (18): BSTC Wallet AGENTS.md (Ponytail Dev Rules), BSTC Splash Screen Logo (hdpi) - White Chevron/Caret on Dark, BSTC Splash Screen Logo (mdpi), BSTC Splash Screen Logo (xhdpi), BSTC Splash Screen Logo (xxhdpi), BSTC Splash Screen Logo (xxxhdpi), BSTC Wallet CLAUDE.md (Ponytail Dev Rules Mirror), BSTC Wallet (Non-Custodial Crypto Wallet App) (+10 more)

### Community 14 - "Wallet Home Screen"
Cohesion: 0.17
Nodes (14): styles, WalletHomeScreen(), QuickAction(), QuickActionProps, styles, PortfolioHeader(), PortfolioHeaderProps, styles (+6 more)

### Community 15 - "Android MainApplication"
Cohesion: 0.17
Nodes (12): Application, applicationlifecycledispatcher, MainApplication, Configuration, defaultnewarchitectureentrypoint, exporeacthostfactory, loadreactnative, packagelist (+4 more)

### Community 16 - "Android MainActivity"
Cohesion: 0.19
Nodes (9): MainActivity, DefaultReactActivityDelegate, build, Bundle, fabricenabled, ReactActivity, ReactActivityDelegate, reactactivitydelegatewrapper (+1 more)

### Community 17 - "QR Scanner Screen"
Cohesion: 0.16
Nodes (10): QRScannerScreen(), styles, { width }, styles, TabLayout(), ScreenProps, styles, shadows (+2 more)

### Community 18 - "Reset Project Script"
Cohesion: 0.17
Nodes (10): exampleDirPath, fs, oldDirs, path, readline, rl, root, ref_fs (+2 more)

### Community 19 - "App Tabs Navigation"
Cohesion: 0.20
Nodes (8): AppTabs(), AppTabs(), styles, WebTabButton(), styles, SearchBarProps, styles, resolveFontFamily()

### Community 20 - "UI Components (Cards)"
Cohesion: 0.18
Nodes (8): CardProps, CardVariant, styles, Segment, SegmentedControlProps, styles, radii, RadiusToken

### Community 21 - "Tab Navigation Icons"
Cohesion: 0.20
Nodes (10): Explore Tab Icon 2x (High-DPI), Explore Tab Icon 3x (High-DPI), Explore Tab Icon (Small black compass/book silhouette, navigation), History Tab Icon (White/transparent clock or list silhouette, transaction history navigation), Home Tab Icon 2x (High-DPI), Home Tab Icon 3x (High-DPI), Home Tab Icon (Small black house silhouette, home navigation), Settings Tab Icon (White/transparent gear or cogwheel silhouette, settings navigation) (+2 more)

### Community 22 - "Native Module Implementations"
Cohesion: 0.22
Nodes (6): BstcWalletModule, Module, BstcWalletModule, ExpoModulesCore, Module, ModuleDefinition

### Community 23 - "Root Layout & Theme"
Cohesion: 0.27
Nodes (8): bstcDarkTheme, RootLayout(), RootNavigation(), WalletProvider(), loadAppFonts(), expo-font, expo-splash-screen, expo-status-bar

### Community 24 - "Branding Assets"
Cohesion: 0.22
Nodes (9): App Favicon (Blue rounded-square with white A chevron logo), BSTC Wallet App Icon (Blue background, white A-shaped chevron logo, grid pattern), Logo Glow Effect (Soft blue radial glow, decorative background element), Splash Screen Icon (White A-shaped chevron logo on transparent background), Tutorial Web Screenshot (Expo starter app running on localhost:8081, showing Home/Explore/Doc tabs and app icon), Grid Pattern PNG (White grid overlay texture for iOS icon background), iOS Splash Screen Logo 2x (High-DPI, white A-shaped chevron), iOS Splash Screen Logo 3x (High-DPI, white A-shaped chevron) (+1 more)

### Community 25 - "Animated Splash Overlay"
Cohesion: 0.22
Nodes (6): glowKeyframe, keyframe, logoKeyframe, styles, expo-image, react-native-worklets

### Community 26 - "Animated Splash Overlay (Web)"
Cohesion: 0.22
Nodes (6): bstc_wallet_src_components_animated_icon_module, glowKeyframe, keyframe, logoKeyframe, styles, react-native-reanimated

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

### Community 31 - "Token Management"
Cohesion: 0.50
Nodes (3): INITIAL_TOKENS, ManagedToken, styles

### Community 33 - "Graphify Agent Rules"
Cohesion: 0.67
Nodes (3): Graphify Agent Rule (always-on), Graphify Workflow, Graphify Knowledge Graph

### Community 34 - "React Logos"
Cohesion: 0.67
Nodes (3): React Logo 2x (High-DPI cyan atom icon), React Logo 3x (High-DPI cyan atom icon), React Logo (Cyan atom icon, React Native branding)

### Community 35 - "Dev Dependencies"
Cohesion: 0.67
Nodes (3): devDependencies, @types/react, typescript

## Knowledge Gaps
- **266 isolated node(s):** `name`, `slug`, `version`, `orientation`, `icon` (+261 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 312 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react-native` connect `QR Scanner Screen` to `Buy Flow Screens`, `Transaction History Screen`, `Native Wallet Bridge`, `Web3 Payment Flows`, `Settings & PIN`, `Wallet Onboarding Backup`, `Wallet Management`, `UI Components (Icons)`, `Project Metadata`, `Wallet Home Screen`, `App Tabs Navigation`, `UI Components (Cards)`, `Root Layout & Theme`, `Animated Splash Overlay`, `Animated Splash Overlay (Web)`, `Token Management`?**
  _High betweenness centrality (0.137) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Core Dependencies` to `Project Metadata`?**
  _High betweenness centrality (0.051) - this node is a cross-community bridge._
- **Why does `react` connect `Wallet Management` to `Buy Flow Screens`, `Transaction History Screen`, `External Link Component`, `Web3 Payment Flows`, `Native Wallet Bridge`, `Settings & PIN`, `Wallet Onboarding Backup`, `UI Components (Icons)`, `Project Metadata`, `Wallet Home Screen`, `QR Scanner Screen`, `App Tabs Navigation`, `UI Components (Cards)`, `Root Layout & Theme`, `Animated Splash Overlay`, `Token Management`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **What connects `name`, `slug`, `version` to the rest of the system?**
  _266 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Buy Flow Screens` be split into smaller, more focused modules?**
  _Cohesion score 0.12183055040197897 - nodes in this community are weakly interconnected._
- **Should `Transaction History Screen` be split into smaller, more focused modules?**
  _Cohesion score 0.07102040816326531 - nodes in this community are weakly interconnected._
- **Should `Native Wallet Bridge` be split into smaller, more focused modules?**
  _Cohesion score 0.11942959001782531 - nodes in this community are weakly interconnected._