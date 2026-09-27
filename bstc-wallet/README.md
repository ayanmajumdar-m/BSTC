# BSTC Wallet

> **Institutional-grade, non-custodial mobile cryptocurrency wallet built with React Native, Expo SDK 57, and the Obsidian Terminal fintech design system.**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](bstc-wallet/LICENSE)
[![Platform](https://img.shields.io/badge/Platform-Android%20%7C%20iOS%20%7C%20Web-lightgrey.svg)](#platform-support)
[![React Native](https://img.shields.io/badge/React%20Native-0.86.3-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-57.0.24-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict%20Mode-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Wallet Core](https://img.shields.io/badge/Trust%20Wallet%20Core-v4.7.3-0500FF)](https://github.com/trustwallet/wallet-core)
[![Hermes](https://img.shields.io/badge/Engine-Hermes-F3C640)](https://hermesengine.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-New%20Arch%20(Fabric%20%2B%20TurboModules)-purple)](https://reactnative.dev/docs/the-new-architecture/landing-page)

---

## Overview

**BSTC Wallet** is a cross-platform, non-custodial cryptocurrency mobile application designed with the **Obsidian Terminal** fintech aesthetic. It offers an institutional terminal experience tailored for tracking multi-chain assets, executing token swaps, onboarding fiat liquidity, managing Web3 dApp permissions, and securing cryptographic keys.

The project is architected with modern React Native and Expo (SDK 57, React 19, React Native 0.86.3), utilizing file-based routing via Expo Router, and includes custom native scaffolding to interface directly with [Trust Wallet Core](https://github.com/trustwallet/wallet-core).

### Current Development Status

- **Design System & Reusable UI Kit**: **100% Implemented**. Complete implementation of the Obsidian Terminal design system, typography tokens (Space Grotesk, Manrope, JetBrains Mono), theme colors, and component library.
- **Navigation & Screen Flows**: **100% Implemented**. 42+ distinct screens and modals across onboarding, wallet management, send/receive, token swaps, fiat purchase, history, Web3 security, and preferences.
- **Interactive State Layer**: **100% Functional Mock & UI State**. Fully wired navigation, state machines, input validation, and interactive simulations for all user flows.
- **Native Wallet Core Integration**: **Scaffolding Configured**. The Android native module (`modules/bstc-wallet`) configures Trust Wallet Core (`v4.7.3`) via GitHub Packages Maven repository and declares the Expo Native Module bridge (`BstcWalletModule`). Cryptographic functions (seed derivation, transaction signing, and node RPC calls) are prepared in the native layer to replace the mock data layer in subsequent milestones.

---

## Visual Design & Theme: Obsidian Terminal

The application strictly implements the **Google Stitch Obsidian Terminal** design language:

| Design Dimension | Specification | Implementation |
| :--- | :--- | :--- |
| **Color Palette** | Pitch black base with glowing brand accents | `#111417` (Surface), `#191c1f` (Surface Low), `#b8c3ff` (Brand Indigo), `#3be194` (Terminal Green), `#92dbff` (Cyan) |
| **Typography** | Tri-font hierarchy | **Space Grotesk** (Display/Headers), **Manrope** (Body/UI), **JetBrains Mono** (Financial/Crypto Telemetry) |
| **Iconography** | Local font ligature renderer | **Material Symbols Outlined** (10.7 MB TTF with zero external network requests) |
| **Radii & Borders** | Angular & subtle pill contours | 4px, 8px, 12px, 16px, 9999px (full pill); 1px subtle borders (`rgba(68, 70, 85, 0.3)`) |
| **Viewport Target** | Standard mobile canvas | 390 × 844 pt (iPhone 14/15/16 standard baseline) with full responsive flex layouts |

---

## Implemented Features

### 1. Wallet & Portfolio Management
- **Balance Telemetry & Privacy**: Total portfolio balance display with one-tap balance hide/reveal privacy mode.
- **Wallet Switcher**: Active wallet indicator with instant navigation to Multi-Wallet Management (`/settings/wallet-management`).
- **Network Selector**: Network status badge with navigation to Network Management (`/settings/network-management`).
- **Asset Categories**: Segmented navigation between Tokens, NFTs, and DeFi positions.
- **Token Management**: Dedicated management screen (`/token/manage`) with live filtering by symbol, contract, and network, alongside individual visibility toggles.
- **Token Details**: Dedicated asset detail screen (`/token/[id]`) showing balance, 24h market stats, price changes, and token-specific transaction activity.

### 2. Send & Receive Flows
- **Send Asset** (`/send`):
  - Token switcher with balance display.
  - Recipient address input supporting 0x hex addresses and ENS domains.
  - Quick-paste clipboard shortcut.
  - Recent contacts row with quick-select avatar chips.
  - Percentage shortcuts (25%, 50%, 75%, MAX).
  - Dual fiat/crypto unit toggle.
  - Simulated network fee calculation and broadcast feedback.
- **Recipient Address Selector** (`/send/recipient`):
  - Network context banner.
  - Address validation and contact book search.
- **Receive Asset** (`/receive`):
  - Reticle QR code view (`QRCodeView`) customized for the Obsidian Terminal dark theme.
  - One-tap address copying with timeout confirmation.
  - Native system share sheet trigger.
- **Optical QR Scanner** (`/qr`):
  - 260 × 260 pt viewfinder HUD with institutional corner reticle brackets.
  - Center optical crosshair and glowing animated scan laser beam.
  - Telemetry badge and flashlight/torch state toggle.
  - Photo gallery upload button.

### 3. Swap & Fiat On-Ramp Flows
- **Token Swap** (`/swap`):
  - Dual-card "You Pay" and "You Receive" token input fields with token inversion action.
  - Slippage tolerance configuration modal (0.1%, 0.5%, 1.0%, custom).
  - Quick balance percentage pills (50%, MAX).
- **Swap Review & Processing** (`/swap/review`, `/swap/processing`, `/swap/completed`):
  - Detailed quote breakdown: exchange rate, routing provider, network fee, price impact, and minimum output.
  - Simulated multi-step DEX transaction processing states.
  - Transaction completed receipt with copyable transaction hash.
- **Buy Crypto** (`/buy`):
  - Fiat amount selector ($USD) with preset buttons ($100, $250, $500, $1,000).
  - Real-time crypto conversion quote.
- **Payment Method & Settlement** (`/buy/payment`, `/buy/review`, `/buy/processing`, `/buy/completed`):
  - Payment rails: Apple Pay, Google Pay, Credit/Debit Card, Bank Transfer (ACH/SEPA).
  - Comprehensive fee disclosure and receipt generation.

### 4. Web3 & Security Hub
- **Explore dApps** (`/web3`):
  - URL and dApp search bar with integrated QR scanner shortcut.
  - Active session banner displaying connected address and live network status dot.
  - Category filters: All, DeFi, NFTs, Bridges, Gaming, Social.
  - Recent dApps grid with active session indicators.
  - Curated protocol catalog with metadata tags.
- **Security Approval Workflows**:
  - **Connection Approval** (`/web3/connect`): Domain origin inspection, account permissions request, cancel and approve controls.
  - **Message Signing** (`/web3/sign`): EIP-712 structured data and raw message inspection, address binding verification, cryptographic sign action.
  - **Token Approvals Manager** (`/web3/approvals`): Displays token allowances categorized by risk level (At Risk, Moderate, Safe) with simulated single-tap revoke.
  - **Phishing Warning** (`/web3/warning`): Threat detection alert banner for flagged domains, highlighting malicious contract patterns with safety overrides.

### 5. Onboarding & Key Management UI
- **Welcome Screen** (`/welcome`): Terminal aesthetic launchpad offering "Create a New Wallet" and "I already have a wallet".
- **Wallet Creation** (`/onboarding/create`): Security briefing, seed phrase generation steps.
- **Recovery Phrase** (`/onboarding/recovery-phrase`): Numbered 12-word seed phrase grid with copy shortcut and offline backup warning.
- **Backup Confirmation** (`/onboarding/backup-confirmation`): Interactive word puzzle verification requiring selection of words at specific positions.
- **Cloud & Offline Backup** (`/onboarding/cloud-backup`, `/onboarding/restore-backup`): Google Drive encrypted backup and recovery flow.
- **Account Created Confirmation** (`/onboarding/account-created`): Hardware enclave protection confirmation and onboarding completion gate.
- **Import Wallet** (`/onboarding/import`): 12-word or 24-word mode toggle, paste recovery phrase, live word count detector, wallet naming, and biometric toggle.

### 6. Settings & Security Configuration
- **Security Settings** (`/settings/security`): Biometrics (Face ID/Fingerprint), auto-lock duration selector, private key export safeguards.
- **PIN / Passcode** (`/settings/pin`): 6-digit PIN input with masked dots and custom terminal keypad.
- **Account Details** (`/settings/account`): Public key display, verified enclave badge, connected identity, and session sign out.
- **Notifications** (`/settings/notifications`): Master toggle and category alerts (Transactions, Swap Updates, Buy Orders, Security Alerts).
- **Preferences** (`/settings/preferences`): Currency switcher (USD, EUR, GBP, JPY), language switcher, and theme settings.

---

## Tech Stack

| Domain | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Mobile Core** | React Native | `0.86.3` | Mobile application runtime framework |
| **Framework** | Expo SDK | `~57.0.24` | Native development platform & build tooling |
| **Language** | TypeScript | `~6.0.3` | Strict static type safety across the entire application |
| **UI Runtime** | React | `19.2.3` | Concurrent rendering engine |
| **JS Engine** | Hermes | N/A | High-performance mobile JS engine with bytecode precompilation |
| **Native Arch** | React Native New Architecture | Enabled | TurboModules and Fabric native rendering pipeline |
| **Routing** | Expo Router | `~57.0.22` | Typed, file-based routing architecture with route groups |
| **Gestures** | React Native Gesture Handler | `~2.32.0` | Native touch-driven gesture interaction |
| **Animations** | React Native Reanimated | `4.5.1` | Native thread UI animations |
| **Safe Areas** | React Native Safe Area Context | `~5.7.0` | Device bezel, notch, and navigation bar insets |
| **Native Module** | Expo Modules API | `~57.0.24` | Kotlin / Swift bridge to native platform libraries |
| **Android Layer** | Kotlin / Gradle | Gradle 9.2.0 | Android native module implementation |
| **iOS Layer** | Swift / CocoaPods | iOS 16.4+ | iOS native module implementation |
| **Wallet Engine** | Trust Wallet Core (Android) | `4.7.3` | Native cryptographic engine for multi-chain key management |

---

## Architecture

### System Layering

```text
┌────────────────────────────────────────────────────────────────────────┐
│                        React Native Application                        │
│                                                                        │
│   ┌─────────────────────┐  ┌─────────────────────┐  ┌──────────────┐   │
│   │   Expo Router App   │  │  Reusable UI Kit    │  │ Theme Tokens │   │
│   │ (src/app/(tabs)/..) │  │ (src/components/ui) │  │ (src/theme)  │   │
│   └──────────┬──────────┘  └──────────┬──────────┘  └──────┬───────┘   │
│              │                        │                    │           │
│              ▼                        ▼                    ▼           │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 Application State & Services                   │   │
│   │    - src/state/wallet-state.tsx (Session & Auth Gating)        │   │
│   │    - src/services/mockWallet.ts (Portfolio & Flow Data)        │   │
│   └───────────────────────────────┬────────────────────────────────┘   │
└───────────────────────────────────┼────────────────────────────────────┘
                                    │
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                       Expo Native Module Bridge                        │
│          modules/bstc-wallet/src/BstcWalletModule.ts                   │
│               requireNativeModule('BstcWallet')                        │
└───────────────────┬────────────────────────────────┬───────────────────┘
                    │ (Android)                      │ (iOS)
                    ▼                                ▼
┌──────────────────────────────────────┐ ┌───────────────────────────────┐
│         Kotlin Native Layer          │ │      Swift Native Layer       │
│  modules/bstc-wallet/android/.../    │ │  modules/bstc-wallet/ios/     │
│       BstcWalletModule.kt            │ │     BstcWalletModule.swift    │
└───────────────────┬──────────────────┘ └───────────────┬───────────────┘
                    │                                │
                    ▼                                ▼
┌──────────────────────────────────────┐ ┌───────────────────────────────┐
│     Trust Wallet Core (AAR)          │ │     Trust Wallet Core (Pod)   │
│  com.trustwallet:wallet-core:4.7.3   │ │          [Planned]            │
│    (GitHub Packages Maven Repo)      │ │                               │
└───────────────────┬──────────────────┘ └───────────────┬───────────────┘
                    │                                │
                    ▼                                ▼
┌────────────────────────────────────────────────────────────────────────┐
│                 Wallet Core Native Engine (C++ Core)                   │
│                                                                        │
│  - HDWallet & BIP-39 Mnemonic Generation                               │
│  - BIP-44 Derivation Paths (m/44'/60'/0'/0/0, m/44'/0'/0'/0/0)         │
│  - Multi-Chain Keypair Derivation (Ethereum, Bitcoin, Solana)          │
│  - Offline Transaction Signing & Hash Digest Verification              │
└────────────────────────────────────────────────────────────────────────┘
```

### Native Module Implementation Details

1. **Expo Native Module Definition** (`modules/bstc-wallet/expo-module.config.json`):
   ```json
   {
     "platforms": ["apple", "android", "web"],
     "apple": {
       "modules": ["BstcWalletModule"]
     },
     "android": {
       "modules": ["expo.modules.bstcwallet.BstcWalletModule"]
     }
   }
   ```
2. **Android Dependency Management** (`modules/bstc-wallet/android/build.gradle`):
   - Authenticated Maven repository configured for GitHub Packages:
     ```groovy
     repositories {
       maven {
         url = uri("https://maven.pkg.github.com/trustwallet/wallet-core")
         credentials {
           username = System.getenv("GITHUB_USER")
           password = System.getenv("GITHUB_TOKEN")
         }
       }
     }
     dependencies {
       implementation("com.trustwallet:wallet-core:4.7.3")
     }
     ```
3. **Android Top-level Project Integration** (`android/build.gradle`):
   - Global repository declaration in `allprojects` ensures `trustwallet/wallet-core` resolution is available during Gradle dependency analysis.
4. **Decoupled Architecture**:
   - The UI layer currently interfaces with `src/state/wallet-state.tsx` and `src/services/mockWallet.ts`.
   - This design ensures the entire user interface and interaction flows can be developed, tested, and visually validated without requiring real blockchain transactions or live private keys.

---

## Directory Structure

```text
bstc-wallet/
├── android/                    # Android native project (New Architecture / Hermes)
│   ├── app/
│   ├── build.gradle            # Top-level Gradle config (Trust Wallet Core repo)
│   └── gradle.properties       # newArchEnabled=true, hermesEnabled=true
├── assets/
│   ├── fonts/                  # JetBrains Mono, Manrope, Space Grotesk, Material Symbols
│   └── images/                 # App icon, splash screen, branded graphics
├── ios/                        # iOS native project (CocoaPods, deployment target 16.4+)
│   ├── bstcwallet/
│   └── Podfile
├── modules/
│   └── bstc-wallet/            # Custom Expo Native Module
│       ├── android/            # Kotlin implementation (BstcWalletModule.kt)
│       │   └── build.gradle    # com.trustwallet:wallet-core:4.7.3 dependency
│       ├── ios/                # Swift implementation (BstcWalletModule.swift)
│       ├── src/                # TypeScript bridge (BstcWalletModule.ts)
│       └── expo-module.config.json
├── src/
│   ├── app/                    # Expo Router route definitions
│   │   ├── (tabs)/             # Tab group: / (Wallet), /history, /web3, /settings
│   │   ├── buy/                # Fiat buy flows (index, payment, review, processing, completed)
│   │   ├── history/            # Transaction details (/history/[id])
│   │   ├── onboarding/         # Create, import, seed phrase, backup verification
│   │   ├── receive/            # Receive address & QR display
│   │   ├── send/               # Send flow & recipient selector
│   │   ├── settings/           # Account, security, networks, wallets, notifications, PIN
│   │   ├── swap/               # DEX token swap flows
│   │   ├── token/              # Token details & token management
│   │   ├── web3/               # dApp connect, signing, approvals, warnings
│   │   ├── _layout.tsx         # Root stack layout & wallet presence gating
│   │   ├── qr.tsx              # QR scanner HUD screen
│   │   └── welcome.tsx         # Welcome / onboarding entry point
│   ├── components/
│   │   ├── ui/                 # Reusable UI component kit (Button, Card, Input, Icon, etc.)
│   │   └── wallet/             # Domain components (PortfolioHeader, RecentActivity, etc.)
│   ├── hooks/                  # Custom React hooks (usePortfolio, useColorScheme)
│   ├── services/               # Mock wallet data and protocol models (mockWallet.ts)
│   ├── state/                  # Global wallet state context (wallet-state.tsx)
│   └── theme/                  # Design tokens (colors, typography, spacing, radii, icons)
├── app.json                    # Expo project configuration
├── package.json                # Project dependencies and run scripts
└── tsconfig.json               # TypeScript strict configuration with path aliases
```

---

## Getting Started

### Prerequisites

- **Node.js**: `v20.x` or `v22.x` (LTS recommended)
- **Package Manager**: `npm` (v10+)
- **Mobile SDKs** (for native builds):
  - **Android**: Android Studio Hedgehog / Iguana / Jellyfish, Android SDK 35, NDK, JDK 17.
  - **iOS**: macOS, Xcode 16+, CocoaPods 1.14+.
- **GitHub Token** (for building Android native module with Trust Wallet Core):
  A personal access token (`read:packages`) exported in your environment:
  ```bash
  export GITHUB_USER="your-github-username"
  export GITHUB_TOKEN="your-github-personal-access-token"
  ```

### Installation

1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <repository-url>
   cd bstc-wallet
   ```

2. Install JavaScript/TypeScript dependencies:
   ```bash
   npm install
   ```

3. Verify TypeScript type checking:
   ```bash
   npx tsc --noEmit
   ```

---

## Running the Application

### Development Server (Metro)

Start the Expo development server:

```bash
npm start
# or
npx expo start
```

### Running on Android

To run the native Android build with TurboModules and Trust Wallet Core dependencies:

```bash
npm run android
# or
npx expo run:android
```

### Running on iOS

To run the native iOS build in the iOS Simulator:

```bash
npm run ios
# or
npx expo run:ios
```

### Running on Web

To run the browser-targeted preview:

```bash
npm run web
# or
npx expo start --web
```

---

## Design System Tokens & Usage

The application uses a centralized token system located in `src/theme/`:

```typescript
import { colors, spacing, typography, radii } from '@/theme';
import { Icon, Button, Card, Screen } from '@/components/ui';
import { icons } from '@/theme/icons';

export function ExampleWidget() {
  return (
    <Card variant="low" style={{ padding: spacing.lg, borderRadius: radii.xl }}>
      <Icon name={icons.shield} size={20} color={colors.brand} />
      <Button
        label="Confirm Transaction"
        variant="primary"
        onPress={() => {}}
      />
    </Card>
  );
}
```

---

## Security Model & Non-Custodial Architecture

- **Private Key Sovereignty**: Private keys and mnemonic recovery phrases are strictly non-custodial and intended to reside solely within the device's secure hardware enclave (Android Keystore / iOS Keychain).
- **Zero Remote Key Storage**: No telemetry, API, or analytics service ever receives or transmits cryptographic seed words, private keys, or PIN credentials.
- **Biometric Enforcement**: Native biometrics (Face ID, Touch ID, Android BiometricPrompt) protect transaction authorization and seed phrase display.
- **Approval Lifecycle**: Web3 dApp integrations include visual transaction decoding, spending cap limiters, and proactive phishing domain interception before payload signatures occur.

---

## Roadmap

- [x] **Phase 1**: Design System Tokens & Institutional Typography Architecture.
- [x] **Phase 2**: Reusable Obsidian Terminal UI Component Kit.
- [x] **Phase 3**: App Navigation, Bottom Tab Bar, and Expo Router Stack Grouping.
- [x] **Phase 4**: Wallet Home & Settings Stitch Refinement.
- [x] **Phase 5A**: Token Details, Send/Receive Flow, and QR Viewfinder Reticle.
- [x] **Phase 5B**: DEX Token Swap & Fiat On-Ramp Workflows.
- [x] **Phase 5C**: Web3 Hub, dApp Approvals, and Malicious Signature Safeguards.
- [x] **Phase 5D**: Onboarding, 12/24-Word Recovery Phrase, and Security Configurations.
- [x] **Phase 6**: Interactive Interaction Layer & Gated Onboarding Decision State.
- [ ] **Phase 7 (Planned)**: Native Kotlin/Swift Trust Wallet Core Method Bindings (BIP-39 mnemonic generation, key derivation, and transaction signing).
- [ ] **Phase 8 (Planned)**: Blockchain RPC Client Integration (EVM, Bitcoin, Solana node providers).

---

## License

This project is open-source software licensed under the [MIT License](bstc-wallet/LICENSE).
