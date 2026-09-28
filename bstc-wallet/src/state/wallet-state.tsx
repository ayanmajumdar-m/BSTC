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
  restoreWallet: (password: string) => Promise<void>;
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

  const restoreWallet = async (password: string) => {
    // Mock decryption and restoration process
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (password.length < 6) {
          reject(new Error('Decryption failed: Invalid password format'));
        } else if (password === 'wrongpassword') {
          reject(new Error('Decryption failed: Incorrect password or corrupted backup'));
        } else {
          setWalletName('Personal Vault (Restored)');
          setHasWallet(true);
          resolve();
        }
      }, 1200);
    });
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
        restoreWallet,
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
