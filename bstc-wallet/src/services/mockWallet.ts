import type { TokenRowData } from '@/components/ui/TokenRow';
import type { TransactionRowData } from '@/components/ui/TransactionRow';
import { colors } from '@/theme';

export type PortfolioSnapshot = {
  walletName: string;
  networkLabel: string;
  totalBalance: string;
  changeLabel: string;
  tokens: TokenRowData[];
  recentActivity: TransactionRowData[];
};

export type SettingsProfile = {
  initials: string;
  name: string;
  email: string;
  appVersion: string;
};

/** Mock portfolio matching Stitch Wallet Home content. */
export function getPortfolioSnapshot(): PortfolioSnapshot {
  return {
    walletName: 'Main Wallet 01',
    networkLabel: 'All Networks',
    totalBalance: '$24,582.40',
    changeLabel: '+$1,248.65 (+5.35%)',
    tokens: [
      {
        id: 'btc',
        name: 'Bitcoin',
        symbol: 'BTC',
        networkLabel: 'BTC',
        priceLabel: '$64,250.00',
        changeLabel: '+2.4%',
        changePositive: true,
        balanceUsd: '$15,741.25',
        balanceAmount: '0.245 BTC',
        iconGlyph: '₿',
        iconColor: colors.bitcoin,
      },
      {
        id: 'eth',
        name: 'Ethereum',
        symbol: 'ETH',
        networkBadge: 'Mainnet',
        priceLabel: '$3,450.20',
        changeLabel: '+4.1%',
        changePositive: true,
        balanceUsd: '$6,382.87',
        balanceAmount: '1.850 ETH',
        iconGlyph: 'Ξ',
        iconColor: colors.ethereum,
      },
      {
        id: 'usdt-erc20',
        name: 'Tether USD',
        symbol: 'USDT',
        networkBadge: 'ERC-20',
        priceLabel: '$1.00',
        changeLabel: '0.0%',
        changePositive: true,
        balanceUsd: '$1,500.00',
        balanceAmount: '1,500.00 USDT',
        iconGlyph: '₮',
        iconColor: colors.usdt,
      },
      {
        id: 'usdt-trc20',
        name: 'Tether USD',
        symbol: 'USDT',
        networkBadge: 'TRC-20',
        priceLabel: '$1.00',
        changeLabel: '0.0%',
        changePositive: true,
        balanceUsd: '$958.28',
        balanceAmount: '958.28 USDT',
        iconGlyph: '₮',
        iconColor: colors.usdtTron,
      },
    ],
    recentActivity: [
      {
        id: 'tx-1',
        kind: 'received',
        title: 'Received ETH',
        subtitle: 'From 0x71a...92b • Today, 10:24 AM',
        primaryAmount: '+0.45 ETH',
        secondaryAmount: '+$1,552.59',
        statusLabel: 'Completed',
        statusTone: 'success',
        amountPositive: true,
      },
      {
        id: 'tx-2',
        kind: 'swap',
        title: 'Swapped USDT to ETH',
        subtitle: 'Yesterday',
        primaryAmount: '0.289 ETH',
        secondaryAmount: '1,000 USDT',
        statusLabel: 'Completed',
        statusTone: 'success',
      },
      {
        id: 'tx-3',
        kind: 'sent',
        title: 'Sent BTC',
        subtitle: 'To 3FZb...81x • May 12',
        primaryAmount: '-0.015 BTC',
        secondaryAmount: '-$963.75',
        statusLabel: 'Completed',
        statusTone: 'success',
        amountPositive: false,
      },
    ],
  };
}

export function getSettingsProfile(): SettingsProfile {
  return {
    initials: 'AV',
    name: 'Alex Vance',
    email: 'alex.vance@example.com',
    appVersion: 'BSTC Wallet v2.4.0 (Build 302)',
  };
}

export const MOCK_WALLET_ADDRESS =
  '0x8f2a63B19E47c0F198e3bF41065c71d02E244b9c';

export type TokenDetailData = TokenRowData & {
  balanceRaw: string;
  marketCap: string;
  high24h: string;
  low24h: string;
  protocol: string;
  contractAddress: string;
  recentTransactions: TransactionRowData[];
};

export function getTokenDetail(id?: string): TokenDetailData {
  const snapshot = getPortfolioSnapshot();
  const token =
    snapshot.tokens.find((t) => t.id === id) ?? snapshot.tokens[1]; // default to eth

  if (token.id === 'btc') {
    return {
      ...token,
      balanceRaw: '0.245',
      marketCap: '$1,265.40B',
      high24h: '$65,420.00',
      low24h: '$63,110.00',
      protocol: 'Bitcoin PoW',
      contractAddress: 'Native Network',
      recentTransactions: [
        {
          id: 'tx-3',
          kind: 'sent',
          title: 'Sent',
          subtitle: 'To: 3FZb...81x • May 12',
          primaryAmount: '-0.015 BTC',
          secondaryAmount: '-$963.75',
          statusLabel: 'Completed',
          statusTone: 'neutral',
          amountPositive: false,
        },
      ],
    };
  }

  // default / eth
  return {
    ...token,
    balanceRaw: '1.850',
    marketCap: '$415.20B',
    high24h: '$3,492.10',
    low24h: '$3,308.50',
    protocol: 'Ethereum POS',
    contractAddress: '0x71C2a8d10b7849204b77f48107764fbc3b413a9',
    recentTransactions: [
      {
        id: 'tx-1',
        kind: 'received',
        title: 'Received',
        subtitle: 'From: 0x89a...4b1 • Today, 14:23',
        primaryAmount: '+0.45 ETH',
        secondaryAmount: '+$1,552.59',
        statusLabel: 'Completed',
        statusTone: 'success',
        amountPositive: true,
      },
      {
        id: 'tx-2',
        kind: 'sent',
        title: 'Sent',
        subtitle: 'To: 0x3f2...99c • Yesterday',
        primaryAmount: '-0.12 ETH',
        secondaryAmount: '-$414.02',
        statusLabel: 'Completed',
        statusTone: 'neutral',
        amountPositive: false,
      },
      {
        id: 'tx-3',
        kind: 'swap',
        title: 'Swapped',
        subtitle: 'To: USDT • May 18, 09:12',
        primaryAmount: '-0.50 ETH',
        secondaryAmount: '≈ $1,725.10',
        statusLabel: 'Completed',
        statusTone: 'neutral',
        amountPositive: false,
      },
    ],
  };
}

export type TransactionDetailData = {
  id: string;
  status: 'Completed' | 'Pending' | 'Failed';
  kind: 'received' | 'sent' | 'swap';
  asset: string;
  assetSymbol: string;
  primaryAmount: string;
  secondaryAmount: string;
  network: string;
  fromAddress: string;
  toAddress: string;
  networkFee: string;
  gasPrice: string;
  nonce: number;
  blockNumber: number;
  timestamp: string;
  txHash: string;
  explorerUrl: string;
};

export function getTransactionDetail(id?: string): TransactionDetailData {
  if (id === 'tx-2') {
    return {
      id: 'tx-2',
      status: 'Completed',
      kind: 'swap',
      asset: 'Ethereum',
      assetSymbol: 'ETH',
      primaryAmount: '0.289 ETH',
      secondaryAmount: '1,000 USDT',
      network: 'Ethereum Mainnet',
      fromAddress: '0x8f2a63B19E47c0F198e3bF41065c71d02E244b9c',
      toAddress: 'Uniswap V3 Router (0x68b3...a42)',
      networkFee: '0.0012 ETH ($4.14)',
      gasPrice: '14 Gwei',
      nonce: 41,
      blockNumber: 19826100,
      timestamp: 'May 19, 2026 at 04:15 PM',
      txHash: '0x9a8b7c6d5e4f3a2b1c0d9e8f7a6b5c4d3e2f1a0b9c8d7e6f5a4b3c2d1e0f9a8b',
      explorerUrl: 'https://etherscan.io',
    };
  }

  if (id === 'tx-3') {
    return {
      id: 'tx-3',
      status: 'Completed',
      kind: 'sent',
      asset: 'Bitcoin',
      assetSymbol: 'BTC',
      primaryAmount: '-0.015 BTC',
      secondaryAmount: '-$963.75',
      network: 'Bitcoin Mainnet',
      fromAddress: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
      toAddress: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
      networkFee: '0.00004 BTC ($2.57)',
      gasPrice: '18 sat/vB',
      nonce: 18,
      blockNumber: 845210,
      timestamp: 'May 12, 2026 at 11:42 AM',
      txHash: '0x3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a',
      explorerUrl: 'https://mempool.space',
    };
  }

  // default / tx-1
  return {
    id: id || 'tx-1',
    status: 'Completed',
    kind: 'received',
    asset: 'Ethereum',
    assetSymbol: 'ETH',
    primaryAmount: '+0.45 ETH',
    secondaryAmount: '+$1,552.59',
    network: 'Ethereum Mainnet',
    fromAddress: '0x71a418C047d86f7849204b77f48107764fbc92b4',
    toAddress: '0x8f2a63B19E47c0F198e3bF41065c71d02E244b9c',
    networkFee: '0.00042 ETH ($1.45)',
    gasPrice: '12 Gwei',
    nonce: 42,
    blockNumber: 19827364,
    timestamp: 'Today, 10:24 AM',
    txHash: '0x4a9b6c1234567890abcdef1234567890abcdef1234567890abcdef1234567890',
    explorerUrl: 'https://etherscan.io',
  };
}

export type ContactData = {
  id: string;
  name: string;
  address: string;
  ens?: string;
};

export function getRecentContacts(): ContactData[] {
  return [
    {
      id: 'c-1',
      name: 'Alex Vance',
      address: '0x71C2a8d10b7849204b77f48107764fbc3b413a9',
      ens: 'alex.eth',
    },
    {
      id: 'c-2',
      name: 'Treasury Vault',
      address: '0x89a12b34c56d78e9f0123456789abcdef0123456',
      ens: 'treasury.eth',
    },
    {
      id: 'c-3',
      name: 'Satoshi Nakamoto',
      address: '3FZbgi29cpjq2GjdwV8eyHuJJnkLtktZc5',
    },
  ];
}

export type SwapQuote = {
  payToken: string;
  paySymbol: string;
  payAmount: string;
  payBalance: string;
  payFiat: string;
  receiveToken: string;
  receiveSymbol: string;
  receiveAmount: string;
  receiveBalance: string;
  receiveFiat: string;
  exchangeRate: string;
  priceImpact: string;
  networkGas: string;
  gasCrypto: string;
  protocolFee: string;
  slippage: string;
  minReceived: string;
  routing: string;
};

export function getSwapQuote(
  payAmount = '0.85',
  slippage = '0.5%'
): SwapQuote {
  const payVal = parseFloat(payAmount) || 0.85;
  const rate = 3444.88;
  const receiveVal = (payVal * rate).toFixed(2);
  const minVal = (payVal * rate * 0.995).toFixed(2);
  const fiatVal = (payVal * 3450.0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return {
    payToken: 'Ethereum',
    paySymbol: 'ETH',
    payAmount: payAmount,
    payBalance: '1.45 ETH',
    payFiat: `≈ $${fiatVal} USD`,
    receiveToken: 'Tether USD',
    receiveSymbol: 'USDT',
    receiveAmount: Number(receiveVal).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }),
    receiveBalance: '4,120.50 USDT',
    receiveFiat: `≈ $${Number(receiveVal).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USD`,
    exchangeRate: '1 ETH ≈ 3,444.88 USDT',
    priceImpact: '< 0.15%',
    networkGas: '~$3.20',
    gasCrypto: '0.0009 ETH',
    protocolFee: '$0.00 (Promo Free)',
    slippage: `${slippage} (Dynamic)`,
    minReceived: `${Number(minVal).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })} USDT`,
    routing: 'BSTC DEX Aggregator • Best Rate',
  };
}

export type PaymentMethod = {
  id: string;
  name: string;
  provider: string;
  feePercentage: string;
  feeEstimated: string;
  speed: string;
  badge?: string;
  recommended?: boolean;
};

export function getPaymentMethods(): PaymentMethod[] {
  return [
    {
      id: 'apple_pay',
      name: 'Apple Pay / Google Pay',
      provider: 'MoonPay',
      feePercentage: '2.1%',
      feeEstimated: '~$10.50',
      speed: 'Instant',
      badge: 'POPULAR',
      recommended: true,
    },
    {
      id: 'debit_card',
      name: 'Debit Card (Visa / Mastercard)',
      provider: 'Stripe / Ramp',
      feePercentage: '2.4%',
      feeEstimated: '~$12.00',
      speed: '~2 min',
    },
    {
      id: 'bank_transfer',
      name: 'Instant Bank Transfer',
      provider: 'Plaid / Banxa',
      feePercentage: '0.75%',
      feeEstimated: '~$3.75',
      speed: '~15 min',
      badge: 'LOW FEE',
    },
    {
      id: 'wire',
      name: 'Wire / Standard ACH',
      provider: 'Direct Clearing',
      feePercentage: '0.1%',
      feeEstimated: '~$0.50',
      speed: '1-2 days',
    },
  ];
}

export type BuyQuote = {
  fiatAmount: string;
  fiatCurrency: string;
  cryptoSymbol: string;
  cryptoName: string;
  cryptoAmount: string;
  exchangeRate: string;
  networkFee: string;
  processingFee: string;
  totalCharged: string;
  destinationAddress: string;
  destinationName: string;
};

export function getBuyQuote(fiatAmount = '500'): BuyQuote {
  const fiat = parseFloat(fiatAmount) || 500;
  const rate = 3214.5;
  const cryptoAmt = (fiat / rate).toFixed(4);

  return {
    fiatAmount: fiat.toFixed(2),
    fiatCurrency: 'USD',
    cryptoSymbol: 'ETH',
    cryptoName: 'Ethereum',
    cryptoAmount: cryptoAmt,
    exchangeRate: `1 ETH ≈ $${rate.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`,
    networkFee: '~$1.42',
    processingFee: '$0.00 (Promo Free)',
    totalCharged: `$${fiat.toFixed(2)} USD`,
    destinationAddress: MOCK_WALLET_ADDRESS,
    destinationName: 'Personal Vault',
  };
}

// ----------------------------------------------------
// Web3 & dApp Security Flow Mock Data
// ----------------------------------------------------

export type Web3DApp = {
  id: string;
  name: string;
  category: 'defi' | 'nfts' | 'bridges' | 'gaming' | 'social';
  categoryLabel: string;
  desc: string;
  url: string;
  icon: string;
  iconColor: string;
  time?: string;
  tvl?: string;
  verified: boolean;
  active?: boolean;
};

export function getRecentDApps(): Web3DApp[] {
  return [
    {
      id: 'uniswap',
      name: 'Uniswap',
      category: 'defi',
      categoryLabel: 'DEX',
      desc: 'Swap tokens and provide decentralized liquidity',
      url: 'https://app.uniswap.org',
      icon: 'currency_exchange',
      iconColor: '#FF007A',
      time: '2h ago',
      verified: true,
      active: true,
    },
    {
      id: 'opensea',
      name: 'OpenSea',
      category: 'nfts',
      categoryLabel: 'NFT Marketplace',
      desc: 'Discover, collect, and sell non-fungible tokens',
      url: 'https://opensea.io',
      icon: 'token',
      iconColor: colors.cyan,
      time: '1d ago',
      verified: true,
    },
    {
      id: 'aave',
      name: 'Aave',
      category: 'defi',
      categoryLabel: 'Lending',
      desc: 'Earn interest, borrow assets, and build applications',
      url: 'https://app.aave.com',
      icon: 'account_balance',
      iconColor: colors.primaryTint,
      time: '3d ago',
      verified: true,
    },
    {
      id: '1inch',
      name: '1inch',
      category: 'defi',
      categoryLabel: 'Aggregator',
      desc: 'DEX aggregator offering the best swap rates',
      url: 'https://app.1inch.io',
      icon: 'hub',
      iconColor: colors.error,
      time: '5d ago',
      verified: true,
    },
  ];
}

export function getFeaturedProtocols(): Web3DApp[] {
  return [
    {
      id: 'uniswap-v3',
      name: 'Uniswap',
      category: 'defi',
      categoryLabel: 'DEX',
      desc: 'Swap tokens and provide decentralized liquidity',
      url: 'https://app.uniswap.org',
      icon: 'currency_exchange',
      iconColor: '#FF007A',
      tvl: '$5.84B TVL',
      verified: true,
      active: true,
    },
    {
      id: 'curve-finance',
      name: 'Curve Finance',
      category: 'defi',
      categoryLabel: 'Stable Swap',
      desc: 'Deep liquidity decentralized exchange for pegged assets',
      url: 'https://curve.fi',
      icon: 'swap_calls',
      iconColor: colors.cyan,
      tvl: '$2.15B TVL',
      verified: true,
    },
    {
      id: 'compound-v3',
      name: 'Compound V3',
      category: 'defi',
      categoryLabel: 'Lending',
      desc: 'Earn algorithmic interest and borrow major collateral',
      url: 'https://compound.finance',
      icon: 'account_balance',
      iconColor: colors.success,
      tvl: '$3.40B TVL',
      verified: true,
    },
    {
      id: 'blur',
      name: 'Blur',
      category: 'nfts',
      categoryLabel: 'NFT Marketplace',
      desc: 'High-speed professional trading terminal for digital assets',
      url: 'https://blur.io',
      icon: 'token',
      iconColor: '#FF8300',
      tvl: '$420M TVL',
      verified: true,
    },
    {
      id: 'lido',
      name: 'Lido',
      category: 'defi',
      categoryLabel: 'Staking',
      desc: 'Liquid staking solution with daily stETH reward distributions',
      url: 'https://lido.fi',
      icon: 'hub',
      iconColor: colors.primaryTint,
      tvl: '$32.10B TVL',
      verified: true,
    },
    {
      id: 'stargate',
      name: 'Stargate Finance',
      category: 'bridges',
      categoryLabel: 'Bridge',
      desc: 'Native cross-chain liquidity and instant settlement',
      url: 'https://stargate.finance',
      icon: 'swap_calls',
      iconColor: colors.brand,
      tvl: '$480M TVL',
      verified: true,
    },
  ];
}

export type DAppConnectionRequest = {
  dappName: string;
  dappUrl: string;
  dappIcon: string;
  dappIconColor: string;
  verified: boolean;
  accountName: string;
  accountBadge: string;
  accountAddress: string;
  networkName: string;
  chainId: number;
  permissions: {
    id: string;
    title: string;
    desc: string;
    icon: string;
    tone: 'success' | 'brand';
  }[];
  securityNote: string;
};

export function getDAppConnectionRequest(): DAppConnectionRequest {
  return {
    dappName: 'Uniswap Interface',
    dappUrl: 'https://app.uniswap.org',
    dappIcon: 'currency_exchange',
    dappIconColor: '#FF007A',
    verified: true,
    accountName: 'Main Trading Vault',
    accountBadge: 'M1',
    accountAddress: MOCK_WALLET_ADDRESS,
    networkName: 'Ethereum Mainnet',
    chainId: 1,
    permissions: [
      {
        id: 'view_balance',
        title: 'View wallet balances & transactions',
        desc: 'Permits reading historical activity, asset holdings, and token allowances.',
        icon: 'visibility',
        tone: 'success',
      },
      {
        id: 'request_signature',
        title: 'Request approval for signatures',
        desc: 'Can initiate approval requests. Every transaction requires your explicit confirmation.',
        icon: 'touch_app',
        tone: 'brand',
      },
    ],
    securityNote:
      'This dApp cannot execute transfers or move funds without your explicit confirmation.',
  };
}

export type MessageSigningRequest = {
  dappName: string;
  dappUrl: string;
  dappIcon: string;
  verified: boolean;
  accountName: string;
  accountBadge: string;
  accountAddress: string;
  networkName: string;
  standard: string;
  title: string;
  purpose: string;
  nonce: string;
  validFor: string;
  securityNote: string;
  rawPayload: string;
};

export function getMessageSigningRequest(): MessageSigningRequest {
  return {
    dappName: 'Uniswap Interface',
    dappUrl: 'app.uniswap.org',
    dappIcon: 'currency_exchange',
    verified: true,
    accountName: 'Main Trading Vault',
    accountBadge: 'M1',
    accountAddress: MOCK_WALLET_ADDRESS,
    networkName: 'Ethereum Mainnet',
    standard: 'EIP-712',
    title: 'Welcome to Uniswap',
    purpose: 'Log in & authenticate wallet session',
    nonce: '0x8a92f4e1',
    validFor: '24 hours',
    securityNote: 'No gas fees • Cannot transfer assets',
    rawPayload: JSON.stringify(
      {
        domain: {
          name: 'Uniswap',
          version: '1',
          chainId: 1,
          verifyingContract: '0x000000000022d473030f116ddee9f6b43ac78ba3',
        },
        message: {
          action: 'Sign-In',
          nonce: '0x8a92f4e1',
          timestamp: 1716301200,
        },
      },
      null,
      2
    ),
  };
}

export type TokenApproval = {
  id: string;
  dappName: string;
  spenderAddress: string;
  network: string;
  tokenSymbol: string;
  tokenName: string;
  allowance: string;
  allowanceValue?: string;
  isUnlimited: boolean;
  lastUpdated: string;
  icon: string;
  iconColor: string;
};

export function getMockTokenApprovals(): TokenApproval[] {
  return [
    {
      id: 'appr-1',
      dappName: 'Uniswap V3',
      spenderAddress: '0x68b3...65c3',
      network: 'Ethereum',
      tokenSymbol: 'USDT',
      tokenName: 'Tether USD',
      allowance: 'Unlimited',
      isUnlimited: true,
      lastUpdated: 'May 12, 2026',
      icon: 'swap_calls',
      iconColor: colors.primary,
    },
    {
      id: 'appr-2',
      dappName: '1inch Aggregator',
      spenderAddress: '0x1111...1111',
      network: 'Ethereum',
      tokenSymbol: 'USDC',
      tokenName: 'USD Coin',
      allowance: 'Unlimited',
      isUnlimited: true,
      lastUpdated: 'Apr 28, 2026',
      icon: 'hub',
      iconColor: colors.cyan,
    },
    {
      id: 'appr-3',
      dappName: 'OpenSea Seaport',
      spenderAddress: '0x0000...0001',
      network: 'Ethereum',
      tokenSymbol: 'WETH',
      tokenName: 'Wrapped Ether',
      allowance: '1.50 WETH',
      allowanceValue: '$4,875',
      isUnlimited: false,
      lastUpdated: 'May 18, 2026',
      icon: 'token',
      iconColor: colors.primaryTint,
    },
    {
      id: 'appr-4',
      dappName: 'Aave V3',
      spenderAddress: '0x794a...ef6e',
      network: 'Arbitrum',
      tokenSymbol: 'DAI',
      tokenName: 'Dai Stablecoin',
      allowance: '500.00 DAI',
      allowanceValue: '$500',
      isUnlimited: false,
      lastUpdated: '3 days ago',
      icon: 'account_balance',
      iconColor: colors.primaryTint,
    },
    {
      id: 'appr-5',
      dappName: 'Curve Finance',
      spenderAddress: '0xdc24...3a71',
      network: 'Ethereum',
      tokenSymbol: 'stETH',
      tokenName: 'Lido Staked ETH',
      allowance: '2.00 stETH',
      allowanceValue: '$6,500',
      isUnlimited: false,
      lastUpdated: '1 week ago',
      icon: 'swap_calls',
      iconColor: colors.brand,
    },
  ];
}

export type MaliciousSignatureWarningData = {
  domain: string;
  riskTitle: string;
  riskSummary: string;
  accountName: string;
  accountAddress: string;
  networkName: string;
  detectedRisks: {
    id: string;
    text: string;
    icon: string;
    isHighRisk: boolean;
  }[];
  signingMethod: string;
  spenderContract: string;
};

export function getMaliciousSignatureWarningData(): MaliciousSignatureWarningData {
  return {
    domain: 'uniswap-airdrop-claim.eth.limo',
    riskTitle: 'Potential Phishing Risk',
    riskSummary:
      'This request may allow an unverified third party unrestricted access to drain your wallet balance.',
    accountName: 'Vault 01',
    accountAddress: MOCK_WALLET_ADDRESS,
    networkName: 'Ethereum',
    detectedRisks: [
      {
        id: 'r1',
        text: 'Unlimited token allowance requested (USDT, USDC)',
        icon: 'lock_open',
        isHighRisk: true,
      },
      {
        id: 'r2',
        text: 'Domain flagged on phishing blocklist',
        icon: 'shield',
        isHighRisk: true,
      },
      {
        id: 'r3',
        text: 'Unverified smart contract source code',
        icon: 'code',
        isHighRisk: false,
      },
    ],
    signingMethod: 'eth_signTypedData_v4',
    spenderContract: '0x0000...deAd09',
  };
}


