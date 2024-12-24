import { BigNumber, ethers } from 'ethers';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useAccount, useNetwork } from 'wagmi';

import {
  mainContractABI,
  tokenAbi,
} from '@/contract-constant';
import {
  NFTInfo,
  PreQuestions,
  Question,
  Quiz,
} from '@/features/Game/types/Types';
import { useEthersSigner } from '@/utils/signer';

import { PostQuestions } from '../types/Types';

interface DepositFundsParams {
  amount: BigNumber;
  poolId: number;
}

interface WithdrawFundsParams {
  amount: BigNumber;
  poolId: number;
}

type QuizContext = {
  activeQuiz: boolean;
  setActiveQuiz: React.Dispatch<React.SetStateAction<boolean>>;
  activeStep: 'pre-questions' | 'questions' | 'post-questions';
  setActiveStep: React.Dispatch<
    React.SetStateAction<'pre-questions' | 'questions' | 'post-questions'>
  >;
  preQuestions: PreQuestions;
  setPreQuestions: React.Dispatch<React.SetStateAction<PreQuestions>>;
  questions: Question[];
  setQuestions: React.Dispatch<React.SetStateAction<Question[]>>;
  postQuestions: PostQuestions;
  setPostQuestions: React.Dispatch<React.SetStateAction<PostQuestions>>;

  NFTInfo: NFTInfo;
  setNFTInfo: React.Dispatch<React.SetStateAction<NFTInfo>>;

  reset: () => void;
  depositFunds: (params: DepositFundsParams) => Promise<ethers.ContractTransaction | undefined>;
  userTokenBalance: string;
  userDepositedBalance: string;
  poolBalance: string;
  makeRefferal: () => Promise<ethers.ContractTransaction | undefined>;
  withdrawlFunds: (params: WithdrawFundsParams) => Promise<ethers.ContractTransaction | undefined>;
};

export const QuizContext = React.createContext<QuizContext>({} as QuizContext);

export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuizContext must be used within a QuizContextProvider');
  }
  return context;
};

const contractAddresses = {
  5003: { token: '0xaF1968db67Dd7161D2AF04917b03240DE638ec15', main: '0xaD488Cd332034434240828F987d6E6B991D48125' }, // Mantle Sepolia Testnet
  43113: { token: '0xC24A824A3e1636247deA0E427b849d8Fa05dB022', main: '0x9434F069F57CD2084e3864C4DB5598835b6F6F18' }, // Avalanche Testnet
  5611: { token: '0x8ee64A53C83C52c4eCDDB4cE946ED37928D9Ab61', main: '0x6a07aEBE95e24b3c16862741dbCe13B14546860D' }, // OPBNB Testnet
  137: { token: '0xPolygonTokenAddress', main: '0xPolygonBettingPoolAddress' }, // Polygon Mainnet
  80001: { token: '0xBaseSepoliaTokenAddress', main: '0xBaseSepoliaBettingPoolAddress' }, // Base Sepolia
  1301: { token: '0xUnichainSepoliaTokenAddress', main: '0xUnichainSepoliaBettingPoolAddress' }, // Unichain Sepolia
};

const QuizContextProvider = ({ children }: { children: ReactNode }) => {
  const { address } = useAccount();
  const { chains, chain } = useNetwork();
  const [activeChain, setActiveChainId] = useState<keyof typeof contractAddresses | undefined>(chain?.id as keyof typeof contractAddresses | undefined);
  const [userTokenBalance, setUserTokenBalance] = useState<string>('0');
  const [userDepositedBalance, setUserDepositedBalance] = useState<string>('0');
  const [poolBalance, setPoolBalance] = useState<string>('0');

  useEffect(() => {
    setActiveChainId(chain?.id as keyof typeof contractAddresses);
  }, [chain?.id]);

  const signer = useEthersSigner({ chainId: activeChain });

  useEffect(() => {
    if (!signer) return;
    if (address) {
      const fetchBalance = async () => {
        try {
          const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
          if (!contractAddress) {
            throw new Error('Unsupported chain');
          }

          const degoTokenContract = new ethers.Contract(
            contractAddress.token,
            tokenAbi,
            signer
          );

          const balance = await degoTokenContract.balanceOf(address);
          console.log('balance', ethers.utils.formatEther(balance));
          setUserTokenBalance(ethers.utils.formatEther(balance));

          const contractInstance = new ethers.Contract(
            contractAddress.main,
            mainContractABI,
            signer
          );

          const depositedBalance = await contractInstance.userBalance(address);
          console.log('depositedBalance', ethers.utils.formatEther(depositedBalance));

          const poolBalance = await contractInstance.poolAmount(1);
          console.log('poolBalance', ethers.utils.formatEther(poolBalance));
          setPoolBalance(ethers.utils.formatEther(poolBalance));
          setUserDepositedBalance(ethers.utils.formatEther(depositedBalance));
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      };
      fetchBalance();
    }
  }, [address, signer, activeChain]);

  const makeRefferal = async () => {
    try {
      const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }

      const contractInstance = new ethers.Contract(
        contractAddress.main,
        mainContractABI,
        signer
      );

      const tx = await contractInstance.createUser();
      await tx.wait();
      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const depositFunds = async ({
    amount,
    poolId,
  }: DepositFundsParams): Promise<ethers.ContractTransaction | undefined> => {
    try {
      const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }

      const degoTokenContract = new ethers.Contract(
        contractAddress.token,
        tokenAbi,
        signer
      );

      // Make amount as per decimals
      amount = BigNumber.from(amount).mul(
        BigNumber.from(10).pow(await degoTokenContract.decimals())
      );
      const approvetx = await degoTokenContract.approve(
        contractAddress.main,
        amount,
        { from: address }
      );

      await approvetx.wait();

      const contractInstance = new ethers.Contract(
        contractAddress.main,
        mainContractABI,
        signer
      );

      const tx = await contractInstance.deposit(amount, poolId, {
        from: address,
      });
      await tx.wait();

      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const withdrawlFunds = async ({
    amount,
    poolId,
  }: WithdrawFundsParams): Promise<ethers.ContractTransaction | undefined> => {
    try {
      const contractAddress = activeChain ? contractAddresses[activeChain] : undefined;
      if (!contractAddress) {
        throw new Error('Unsupported chain');
      }

      const contractInstance = new ethers.Contract(
        contractAddress.main,
        mainContractABI,
        signer
      );

      const tx = await contractInstance.withdraw(amount, poolId, {
        from: address,
      });
      await tx.wait();

      return tx;
    } catch (error) {
      console.log(error);
    }
  };

  const [activeQuiz, setActiveQuiz] = useState(false);
  const [activeStep, setActiveStep] =
    useState<Quiz['activeStep']>('pre-questions');
  const [preQuestions, setPreQuestions] = useState<PreQuestions>({
    NFTFlowId: '',
    players: [{ profileImage: '', handle: '', points: 0, countryImage: '' }],
    categoryImage: <></>,
    requiredBet: '',
  });
  const [questions, setQuestions] = useState<Question[]>({} as Question[]);
  const [postQuestions, setPostQuestions] = useState<PostQuestions>(
    {} as PostQuestions
  );
  const [NFTInfo, setNFTInfo] = useState<NFTInfo>({
    NFTId: '',
    NFTName: '',
    NFTDescription: '',
    NFTTotalPrice: '',
    NFTVideoSrc: '',
    maxBet: '',
    version: '',
  });

  const reset = () => {
    setNFTInfo({
      NFTId: '',
      NFTName: '',
      NFTDescription: '',
      NFTTotalPrice: '',
      NFTVideoSrc: '',
      maxBet: '',
      version: '',
    });

    setPreQuestions({
      NFTFlowId: '',
      players: [{ profileImage: '', handle: '', points: 0, countryImage: '' }],
      categoryImage: <></>,
      requiredBet: '',
    });
    setActiveQuiz(false);
    setActiveStep('pre-questions');
    setQuestions({} as Question[]);
    setPostQuestions({} as PostQuestions);
  };

  return (
    <QuizContext.Provider
      value={{
        activeQuiz,
        setActiveQuiz,
        activeStep,
        setActiveStep,
        preQuestions,
        setPreQuestions,
        questions,
        setQuestions,
        postQuestions,
        setPostQuestions,
        NFTInfo,
        setNFTInfo,
        reset,
        depositFunds,
        userTokenBalance,
        userDepositedBalance,
        poolBalance,
        makeRefferal,
        withdrawlFunds,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export default QuizContextProvider;