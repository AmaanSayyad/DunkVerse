import { Capacitor } from '@capacitor/core';

declare global {
  interface Window {
    ethereum: any;
  }
}
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineSetting } from 'react-icons/ai';
import { ethers } from 'ethers';
import { useAccount } from 'wagmi';

import Menu from '@/components/menu/Menu';
import MoneyBag from '@/components/SVGs/MoneyBag';
import Tab from '@/components/tabs/Tab';
import TabGroup from '@/components/tabs/TabGroup';
import TabPanel from '@/components/tabs/TabPanel';
import TabPanels from '@/components/tabs/TabPanels';
import Tabs from '@/components/tabs/Tabs';

import Currency from '@/features/Game/components/currency/Currency';
import InputSvg from '@/features/Game/components/payment/InputSVG';
import OutputSVG from '@/features/Game/components/payment/OutputSVG';
import PaymentTypes from '@/features/Game/components/payment/PaymentTypes';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';

// New TransactionHistory component
const TransactionHistory = () => {
  const { address } = useAccount();
  interface Transaction {
    hash: string;
    timestamp: Date;
    value: string;
    from: string;
    to: string | undefined;
  }
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!address) {
        setError("Please connect your wallet");
        setLoading(false);
        return;
      }

      try {
        // Check if MetaMask is available
        if (!window.ethereum) {
          throw new Error("MetaMask not detected");
        }

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        console.log("Provider connected:", provider);

        // Get recent blocks
        const currentBlock = await provider.getBlockNumber();
        const fromBlock = currentBlock - 100; // Last 100 blocks

        // Get transaction logs
        const logs = await provider.getLogs({
          fromBlock,
          toBlock: currentBlock,
          topics: [
            null,
            ethers.utils.hexZeroPad(address, 32)
          ]
        });
        console.log("Found logs:", logs);

        const formattedTxs = await Promise.all(logs.map(async (log) => {
          const tx = await provider.getTransaction(log.transactionHash);
          return {
            hash: tx.hash,
            timestamp: tx.blockNumber ? new Date((await provider.getBlock(tx.blockNumber)).timestamp * 1000) : new Date(),
            value: ethers.utils.formatEther(tx.value || '0'),
            from: tx.from,
            to: tx.to
          };
        }));

        setTransactions(formattedTxs);
        setError(null);
      } catch (err) {
        console.error("Transaction fetch error:", err);
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError(String(err));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [address]);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {transactions.length > 0 ? (
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.hash} className="bg-dark rounded-xl p-4 border border-primary-500/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-primary-500 font-medium">
                    {address && tx.from.toLowerCase() === address.toLowerCase() ? 'Sent' : 'Received'}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {tx.timestamp.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gradient-primary text-lg font-bold">
                    {Number(tx.value).toFixed(4)} FTO
                  </p>
                  <p className="text-xs text-gray-400 mt-1 truncate w-32">
                    {address && tx.from.toLowerCase() === address.toLowerCase() ? 
                      `To: ${tx.to?.slice(0,6)}...${tx.to?.slice(-4)}` : 
                      `From: ${tx.from?.slice(0,6)}...${tx.from?.slice(-4)}`
                    }
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No transactions found in recent blocks
        </div>
      )}
    </div>
  );
};

const Payment = () => {
  const { userTokenBalance, userDepositedBalance, poolBalance } = useQuizContext();
  
  return (
    <div>
      {Capacitor.getPlatform() == 'ios' ? (
        <div
          className='sticky top-0 z-[999] flex w-full bg-dark pb-4'
          style={{
            paddingTop: 'calc(2px + env(safe-area-inset-top))',
          }}
        >
          <div className='flex w-full items-center justify-between'>
            <span className='text-2xl text-primary-500'>
              <AiOutlineSetting></AiOutlineSetting>
            </span>
            <div className='flex items-center gap-2'>
              <span className='text-primary-500'>
                <MoneyBag />
              </span>
              <span className='text-lg text-primary-500'>Balance</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex items-center justify-between'>
          <span className='text-2xl text-primary-500'>
            <AiOutlineSetting></AiOutlineSetting>
          </span>
          <div className='flex items-center gap-2'>
            <span className='text-primary-500'>
              <MoneyBag />
            </span>
            <span className='text-lg text-primary-500'>Wallet</span>
          </div>
        </div>
      )}
      {createPortal(<Menu />, document.body)}
      {Capacitor.getPlatform() == 'ios' ? (
        <div className='text-gradient-primary mt-6 flex items-center justify-center gap-2'>
          <h2 className='!h1'>$12,58</h2>
          <span>MNT</span>
        </div>
      ) : (
        <div className='text-gradient-primary mt-10 flex items-center justify-center gap-2'>
          <h2 className='!h3'>{userTokenBalance}</h2>
          <span>FTO</span>
        </div>
      )}
      <TabGroup>
        <Tabs className='m-10 mx-auto w-full'>
          <Tab>
            <div className='flex items-center justify-center gap-2'>
              <span className='text-xl'>
                <InputSvg />
              </span>
              <span className='font-bold'>Wallet Balance</span>
            </div>
          </Tab>
          <Tab>
            <div className='flex items-center justify-center gap-2'>
              <span className='text-3xl'>
                <OutputSVG />
              </span>
              <span className='font-bold'>Txn History</span>
            </div>
          </Tab>
        </Tabs>
        <TabPanels>
          <TabPanel>
            <PaymentTypes />
          </TabPanel>
          <TabPanel>
            <TransactionHistory />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Payment;