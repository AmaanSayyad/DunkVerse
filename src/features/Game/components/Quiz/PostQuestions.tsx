import { Capacitor } from '@capacitor/core';
import clsx from 'clsx';
import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { CiMedal } from 'react-icons/ci';
import { ethers } from 'ethers';

import Account from '@/components/account/Account';
import Button from '@/components/buttons/Button';

import LeaderBoardTable from '@/features/Game/components/Quiz/leader-board-table/LeaderBoardTable';
import NFTThumbnail from '@/features/Game/components/Quiz/NFTThumbnail';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';
import { useEthersSigner } from '@/utils/signer';
import { nftContractABI } from '@/contract-constant';

const PostQuestions = () => {
  const { preQuestions, reset } = useQuizContext();
  const [quizPoints, setQuizPoints] = useState(0);
  const signer = useEthersSigner();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Generate random points between 0 and 4999
    const points = Math.floor(Math.random() * 5000);
    setQuizPoints(points);
  }, []);

  const handleQuizDone = async () => {
    reset();
  };

  const claimReward = async () => {
    if (!signer) return;
    setLoading(true);
    try {
      const nftContractAddress = '0xEa8860639d003c9B746B94d077D6dD5052e7cF5d'; // AIGeneratedNFT contract address
      const nftContractInstance = new ethers.Contract(nftContractAddress, nftContractABI, signer);

      const nftId = preQuestions.NFTFlowId; // Assuming NFTFlowId is the nftId
      if (!nftId) {
        throw new Error('NFTFlowId is not defined');
      }

      const tx = await nftContractInstance['safeTransferFrom(address,address,uint256)'](
        '0x8Cd99CEA8e595FdDbE7859Ff00A1c255f84621d4', // Replace with the actual address holding the NFT
        await signer.getAddress(),
        nftId,
        { gasLimit: 1000000 } // Set a manual gas limit
      );
      await tx.wait();

      alert('Reward claimed successfully!');
    } catch (error) {
      console.error('Error claiming reward:', error);
      if (error instanceof Error) {
        alert(`Error claiming reward. Please try again. ${error.message}`);
      } else {
        alert('Error claiming reward. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={clsx(
        Capacitor.getPlatform() === 'ios' &&
          'mt-8 pt-[calc(env(safe-area-inset-bottom))]',
        'relative flex flex-col'
      )}
    >
      <span
        className='absolute right-0 top-0 text-3xl'
        onClick={() => handleQuizDone()}
      >
        <AiOutlineClose />
      </span>
      <div className='text-gradient-primary flex w-full flex-col items-center gap-1'>
        <span className='h2 block font-secondary'>Good Job!</span>
        <span className='font-secondary'>You Get +{quizPoints} Quiz Points</span>
      </div>

      <NFTThumbnail className='mt-6' NFTFlowId={preQuestions.NFTFlowId} />
      <div className='relative -top-9 mx-auto flex w-3/5 items-center justify-center'>
        <div className='text-gradient-primary mb-4 flex items-center gap-1'>
          <span className='text-3xl text-primary-500'>
            <CiMedal />
          </span>
          <span className='font-primary text-lg'>REWARD</span>
        </div>
      </div>

      <>
        <Account />
        <LeaderBoardTable className='mt-6' />
      </>

      <Button
        onClick={claimReward}
        variant='outline'
        className='mt-8 py-5'
        disabled={loading}
      >
        {loading ? 'Claiming...' : 'Claim Reward'}
      </Button>
    </div>
  );
};

export default PostQuestions;