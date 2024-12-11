import { Capacitor } from '@capacitor/core';
import axios from 'axios';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { CiMedal } from 'react-icons/ci';
import { HiOutlineUserGroup } from 'react-icons/hi';

import Button from '@/components/buttons/Button';

import InviteFriends from '@/features/Game/components/Quiz/InviteFriends';
import NFTPreview from '@/features/Game/components/Quiz/NFTPreview';
import NFTThumbnail from '@/features/Game/components/Quiz/NFTThumbnail';
import PlayersInfiniteScroll from '@/features/Game/components/Quiz/PlayersInfiniteScroll';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';

const PreQuestions = () => {
  const { reset, preQuestions, setActiveStep, NFTInfo, setNFTInfo } =
    useQuizContext();
  const [showNFTPreview, setShowNFTPreview] = useState(false);
  const [showInviteFriends, setShowInviteFriends] = useState(false);

  const getNFTFlowIdInfo = useCallback(async () => {
    try {
      const apiEndpoint = '/api/graphql/minted-moment';
      const data = await axios
        .get(
          Capacitor.isNativePlatform()
            ? `https://fanbet.vercel.app${apiEndpoint}`
            : apiEndpoint,
          {
            params: { flowid: preQuestions.NFTFlowId },
          }
        )
        .then((res) => res.data.data);

      const NFTTotalPrice = data.getMintedMoment.data.price;

      setNFTInfo({
        NFTId: data.getMintedMoment.data.play.id,
        NFTName: data.getMintedMoment.data.play.headline,
        NFTDescription: data.getMintedMoment.data.play.shortDescription,
        NFTTotalPrice: NFTTotalPrice,
        maxBet: NFTTotalPrice
          ? (
              +NFTTotalPrice.split('.')[0] / preQuestions.players.length
            ).toString()
          : '',
        NFTVideoSrc: undefined,
        version: data.getMintedMoment.data.play.version,
      });
    } catch (e) {
      return e;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preQuestions.NFTFlowId, preQuestions.players.length, setNFTInfo]);

  useEffect(() => {
    getNFTFlowIdInfo();
  }, [getNFTFlowIdInfo]);

  const summary = () => {
    return (
      <div>
        <div
          className={clsx(
            Capacitor.getPlatform() === 'ios' &&
              'sticky top-0 z-[999] bg-dark pt-[calc(2px+env(safe-area-inset-top))] pb-4',
            'flex justify-between gap-2'
          )}
        >
          <div className={clsx('flex items-center gap-4')}>
            <span
              onClick={() => reset()}
              className='cursor-pointer text-2xl text-white'
            >
              <BsArrowLeft />
            </span>
            <span className='h2'>POOL BET</span>
          </div>
        </div>
        <div
          className={clsx([
            Capacitor.getPlatform() === 'ios' ? 'mt-2' : 'mt-6',
            'flex w-full flex-col items-center',
          ])}
        >
          <div className='text-gradient-primary mb-4 flex items-center gap-1'>
            <span className='text-2xl text-primary-500'>
              <CiMedal />
            </span>
            <span className='font-secondary text-lg'>REWARD</span>
          </div>
          <NFTThumbnail
            NFTFlowId={preQuestions.NFTFlowId}
            onClick={() => setShowNFTPreview(true)}
            showPrice={true}
          />
          <div className='relative -top-8 w-full'>
            <div className='h3 mx-auto w-9/12 rounded-full bg-gradient-primary py-3 px-2.5 text-black'>
              <div className='flex justify-center gap-1'>
                <span>
                  MAX BET{' '}
                  {NFTInfo
                    ? NFTInfo.NFTTotalPrice
                      ? `$${
                          +NFTInfo?.NFTTotalPrice.split('.')[0] /
                          preQuestions.players.length
                        }`
                      : "Can't calculate"
                    : 'Loading...'}
                </span>
                <span className='text-[10px]'>{NFTInfo && 'FTO'}</span>
              </div>
            </div>

            <div className='mt-10 flex w-full items-center justify-between gap-2'>
              <div className='flex items-center gap-2 text-xl'>
                <span className='text-2xl'>
                  <HiOutlineUserGroup />
                </span>
                <span>Players</span>
                <span>{preQuestions.players.length}</span>
              </div>
              <span
                onClick={() => setShowInviteFriends(true)}
                className='text-gradient-primary text-sm font-bold'
              >
                + Invite Friends
              </span>
            </div>

            <PlayersInfiniteScroll
              players={preQuestions.players}
              className='mt-8'
            />
            <Button
              onClick={() => setActiveStep('questions')}
              variant='outline'
              size='lg'
              className='mt-8 py-4'
            >
              Place Bet
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderPreQuestions = () => {
    if (showNFTPreview) {
      return <NFTPreview setShowNFTPreview={setShowNFTPreview} />;
    }
    if (showInviteFriends) {
      return <InviteFriends setOpen={setShowInviteFriends} />;
    }
    return summary();
  };

  return renderPreQuestions();
};

export default PreQuestions;
