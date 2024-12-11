import { Capacitor } from '@capacitor/core';
import clsx from 'clsx';
import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { ethers } from 'ethers';

import Button from '@/components/buttons/Button';
import SlideUp from '@/components/modals/SlideUp';
import NextImage from '@/components/NextImage';
import PercentageBar from '@/components/percentages/PercentageBar';

import { NFTMedia } from '@/features/Game/constants/NFTs';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';

type Props = {
  setShowNFTPreview: React.Dispatch<React.SetStateAction<boolean>>;
};

const NFTPreview = ({ setShowNFTPreview }: Props) => {
  const { preQuestions, NFTInfo, depositFunds, poolBalance } = useQuizContext();
  const [showInfo, setShowInfo] = useState(false);
  const [makeBet, setMakeBet] = useState(0);
  const [collectors, setCollectors] = useState(0);
  const [forSale, setForSale] = useState(0);
  const [loading, setLoading] = useState(false);

  //#region  //*=========== video state ===========
  const videoRef: React.MutableRefObject<HTMLVideoElement | null> =
    useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  //#endregion  //*======== video state ===========

  useEffect(() => {
    setCollectors(Math.floor(Math.random() * 1000) + 1); 
    setForSale(Math.floor(Math.random() * 500) + 1); 
  }, []);

  const handleBetClick = async (amount: number) => {
    await depositFunds({ amount: ethers.BigNumber.from(amount), poolId: 1 });
    setShowNFTPreview(false);
  };

  const handleMakeBet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMakeBet(Number(e.target.value));
  };

  return (
    <div
      className={clsx([
        Capacitor.getPlatform() === 'ios' &&
          'pt-[calc(2px+env(safe-area-inset-top))]',
      ])}
    >
      <div className='absolute left-2/4 top-0 h-full max-h-screen w-full -translate-x-2/4 overflow-hidden mobile-demo:max-h-[844px] mobile-demo:w-[500px]'>
        <video
          webkit-playsinline={true}
          playsInline
          ref={videoRef}
          onClick={() => setShowInfo(true)}
          className='h-full w-full scale-110 object-cover'
          src={NFTMedia(preQuestions.NFTFlowId, 'video-tall')}
          autoPlay
          loop
          muted
          onLoadedMetadata={(e: React.SyntheticEvent<HTMLVideoElement>) => {
            setDuration(e.currentTarget.duration);
          }}
          onTimeUpdate={(e: React.SyntheticEvent<HTMLVideoElement>) => {
            setCurrentTime(e.currentTarget.currentTime);
          }}
        />
      </div>
      <PercentageBar percentage={(currentTime / duration) * 100} />
      <div className='z-40 mt-6 flex w-full items-center justify-between'>
        <div className='z-40 flex w-full items-center gap-2'>
          <div className='rounded-full bg-gradient-primary'>
            <NextImage
              src='/images/prem.png'
              alt=''
              fill
              className='relative h-8 w-8 rounded-full'
              imgClassName='object-contain object-center rounded-full p-1'
            />
          </div>
          <div>
            <span className='text-se z-40 block text-base'>
              {NFTInfo.NFTName}
            </span>
            <span className='z-40 text-xs'>Serial: {NFTInfo.version}</span>
          </div>
        </div>
        <span
          className='z-40 text-2xl'
          onClick={() => setShowNFTPreview(false)}
        >
          <AiOutlineClose />
        </span>
      </div>
      {showInfo && (
        <SlideUp open={showInfo} setOpen={setShowInfo}>
          <div className='space-y-4 text-black'>
            <div className='flex w-full items-center justify-between'>
              <div className='flex items-center gap-1'>
                <span className='text-3xl font-bold'>
                  {poolBalance ? Number(poolBalance).toFixed(2) : 'loading...'}
                </span>
                <div className='text-[10px]'>
                  <span className='block'>$FTO</span>
                  <span>Avg. Sale</span>
                </div>
              </div>
              <div className='flex h-10 w-24 flex-col items-center justify-center rounded-full bg-black px-3 py-1 text-2xs text-white'>
                <span className='block text-center'>SOLD BY</span>
                <span>{collectors} collectors</span>
              </div>
            </div>
            <div className='flex justify-between gap-1'>
              <span className='w-min text-3xl font-bold'>
                {NFTInfo.NFTName}
              </span>
              <div className='my-auto flex h-10 w-24 flex-col items-center justify-center rounded-full bg-black px-3 py-1 text-2xs text-white'>
                <span className='block text-center'>{forSale} FOR SALE</span>
              </div>
            </div>
            <div className='grid grid-cols-2 items-center justify-between gap-4 '>
              <p className='text-2xs'>{NFTInfo.NFTDescription}</p>
              <div className='w-full items-center rounded-full bg-gradient-primary px-1.5 py-1.5 text-black'>
                <div className='col-span-3 flex w-full flex-col justify-center'>
                  <input
                    placeholder='Enter Bet'
                    name='bet'
                    type='number'
                    className='rounded-full px-3 py-3'
                    onChange={handleMakeBet}
                  />
                </div>
              </div>
            </div>
            <Button
              variant='dark'
              size='lg'
              onClick={() => handleBetClick(makeBet)}
              className='!mt-8'
            >
              Enter to Pool Bet
            </Button>
          </div>
        </SlideUp>
      )}
    </div>
  );
};

export default NFTPreview;