import { useMemo, useState } from 'react';

import {
  getPortfolioSnapshot,
  getSettingsProfile,
  PortfolioSnapshot,
  SettingsProfile,
} from '@/services/mockWallet';

/** Local UI-facing portfolio data. Replace with wallet service later. */
export function usePortfolio(): PortfolioSnapshot & {
  balanceHidden: boolean;
  toggleBalanceVisibility: () => void;
  assetTab: string;
  setAssetTab: (tab: string) => void;
} {
  const snapshot = useMemo(() => getPortfolioSnapshot(), []);
  const [balanceHidden, setBalanceHidden] = useState(false);
  const [assetTab, setAssetTab] = useState('tokens');

  return {
    ...snapshot,
    balanceHidden,
    toggleBalanceVisibility: () => setBalanceHidden((v) => !v),
    assetTab,
    setAssetTab,
  };
}

export function useSettingsProfile(): SettingsProfile {
  return useMemo(() => getSettingsProfile(), []);
}
