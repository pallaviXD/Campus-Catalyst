/**
 * Custom hook for Algorand blockchain interactions with Pera Wallet
 * Real Web3 implementation - No demos!
 */

import { useState, useEffect } from 'react';
import * as algorandService from '../services/algorand';

export function useAlgorand() {
  const [activeAddress, setActiveAddress] = useState<string>('');
  const [balance, setBalance] = useState<number>(0);
  const [isAppDeployed, setIsAppDeployed] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const connected = algorandService.isWalletConnected();
        setIsConnected(connected);
        
        if (connected) {
          // Reconnect to get accounts
          const accounts = await algorandService.peraWallet.reconnectSession();
          if (accounts && accounts.length > 0) {
            setActiveAddress(accounts[0]);
          }
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };
    
    checkConnection();
  }, []);

  // Check if app is deployed
  useEffect(() => {
    const checkApp = async () => {
      const deployed = await algorandService.isAppDeployed();
      setIsAppDeployed(deployed);
    };
    checkApp();
  }, []);

  // Get account balance when address changes
  useEffect(() => {
    const fetchBalance = async () => {
      if (activeAddress) {
        const bal = await algorandService.getAccountBalance(activeAddress);
        setBalance(bal);
      }
    };
    fetchBalance();
  }, [activeAddress]);

  // Listen for wallet disconnection
  useEffect(() => {
    algorandService.peraWallet.connector?.on('disconnect', () => {
      setActiveAddress('');
      setIsConnected(false);
      setBalance(0);
    });
  }, []);

  // Connect Pera Wallet
  const connectWallet = async () => {
    setIsLoading(true);
    try {
      const accounts = await algorandService.connectPeraWallet();
      if (accounts && accounts.length > 0) {
        setActiveAddress(accounts[0]);
        setIsConnected(true);
        return { success: true, address: accounts[0] };
      }
      return { success: false, error: 'No accounts found' };
    } catch (error) {
      console.error('Connect wallet error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  // Disconnect wallet
  const disconnectWallet = async () => {
    try {
      await algorandService.disconnectPeraWallet();
      setActiveAddress('');
      setIsConnected(false);
      setBalance(0);
    } catch (error) {
      console.error('Disconnect error:', error);
    }
  };

  // Create campaign - REAL BLOCKCHAIN TRANSACTION
  const createCampaign = async (campaignData: {
    title: string;
    description: string;
    goalAmount: number;
    durationDays: number;
    imageUrl: string;
  }) => {
    if (!activeAddress) {
      throw new Error('Wallet not connected');
    }

    if (!isAppDeployed) {
      throw new Error('Smart contract not deployed. Please deploy the contract first.');
    }

    setIsLoading(true);
    try {
      const campaignId = Date.now();
      const durationSeconds = campaignData.durationDays * 24 * 60 * 60;
      
      const result = await algorandService.createCampaign(
        activeAddress,
        {
          campaignId,
          title: campaignData.title,
          description: campaignData.description,
          goalAmount: campaignData.goalAmount,
          durationSeconds,
          imageUrl: campaignData.imageUrl,
        }
      );
      
      return { 
        success: true, 
        txId: result.txId, 
        campaignId: result.campaignId,
        explorerUrl: algorandService.getExplorerUrl(result.txId)
      };
    } catch (error) {
      console.error('Create campaign error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  // Contribute to campaign - REAL ALGO TRANSFER
  const contribute = async (campaignId: number, amount: number) => {
    if (!activeAddress) {
      throw new Error('Wallet not connected');
    }

    if (!isAppDeployed) {
      throw new Error('Smart contract not deployed');
    }

    setIsLoading(true);
    try {
      const txId = await algorandService.contributeToCampaign(
        activeAddress,
        campaignId,
        amount
      );
      
      return { 
        success: true, 
        txId,
        explorerUrl: algorandService.getExplorerUrl(txId)
      };
    } catch (error) {
      console.error('Contribute error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  // Withdraw funds - REAL TRANSACTION
  const withdrawFunds = async (campaignId: number) => {
    if (!activeAddress) {
      throw new Error('Wallet not connected');
    }

    if (!isAppDeployed) {
      throw new Error('Smart contract not deployed');
    }

    setIsLoading(true);
    try {
      const txId = await algorandService.withdrawFunds(
        activeAddress,
        campaignId
      );
      
      return { 
        success: true, 
        txId,
        explorerUrl: algorandService.getExplorerUrl(txId)
      };
    } catch (error) {
      console.error('Withdraw error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    // State
    activeAddress,
    balance,
    isAppDeployed,
    isLoading,
    isConnected,
    appId: algorandService.getAppId(),
    appExplorerUrl: algorandService.getAppExplorerUrl(),
    
    // Methods
    connectWallet,
    disconnectWallet,
    createCampaign,
    contribute,
    withdrawFunds,
    
    // Utilities
    formatAddress: algorandService.formatAddress,
    microAlgosToAlgos: algorandService.microAlgosToAlgos,
    algosToMicroAlgos: algorandService.algosToMicroAlgos,
    getExplorerUrl: algorandService.getExplorerUrl,
    hashData: algorandService.hashData,
  };
}
