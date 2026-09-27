import React, { createContext, useContext, useState, ReactNode } from 'react';

export type WalletContextType = {
  hasWallet: boolean;
  walletName: string;
  networkLabel: string;
  setHasWallet: (hasWallet: boolean) => void;
  setWalletName: (name: string) => void;
  setNetworkLabel: (network: string) => void;
  signOut: () => void;
  createWallet: (name?: string) => void;
};

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  // Mock state: Start with hasWallet=false so the app demonstrates the proper
  // Welcome/Onboarding launch decision. Completing onboarding or importing sets it to true.
  const [hasWallet, setHasWallet] = useState(false);
  const [walletName, setWalletName] = useState('Main Wallet 01');
  const [networkLabel, setNetworkLabel] = useState('All Networks');

  const signOut = () => {
    setHasWallet(false);
  };

  const createWallet = (name = 'Main Wallet 01') => {
    setWalletName(name);
    setHasWallet(true);
  };

  return (
    <WalletContext.Provider
      value={{
        hasWallet,
        walletName,
        networkLabel,
        setHasWallet,
        setWalletName,
        setNetworkLabel,
        signOut,
        createWallet,
      }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWalletState(): WalletContextType {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWalletState must be used within a WalletProvider');
  }
  return context;
}
