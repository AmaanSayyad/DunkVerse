import { Capacitor } from '@capacitor/core';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import SlideUp from '@/components/modals/SlideUp';
import NextImage from '@/components/NextImage';
import PercentageBar from '@/components/percentages/PercentageBar';

import { NFTMedia } from '@/features/Game/constants/NFTs';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';
import { NFTInfo } from '@/features/Game/types/Types';

type Props = {
  setShowNFTPreview: React.Dispatch<React.SetStateAction<boolean>>;
  NFTFlowId: string;
};

const NFTPreview = ({ NFTFlowId, setShowNFTPreview }: Props) => {
  const [showInfo, setShowInfo] = useState(false);

  const [NFTInfo, setNFTInfo] = useState<NFTInfo | undefined>();
  const { poolBalance } = useQuizContext();
  //#region  //*=========== video state ===========
  const videoRef: React.MutableRefObject<HTMLVideoElement | null> =
    useRef(null);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  //#endregion  //*======== video state ===========

  const getNFTFlowIdInfo = useCallback(async () => {
    try {
      const apiEndpoint = '/api/graphql/minted-moment';
      const data = await axios
        .get(
          Capacitor.isNativePlatform()
            ? `https://fanbet.vercel.app${apiEndpoint}}`
            : apiEndpoint,
          {
            params: { flowid: NFTFlowId },
          }
        )
        .then((res) => res.data.data);

      setNFTInfo((prev) => ({
        NFTId: data.getMintedMoment.data.play.id,
        NFTName: data.getMintedMoment.data.play.headline,
        NFTDescription: data.getMintedMoment.data.play.shortDescription,
        NFTTotalPrice: data.getMintedMoment.data.price,
        NFTVideoSrc: prev?.NFTVideoSrc ?? NFTMedia(NFTFlowId, 'video-tall'),
        version: data.getMintedMoment.data.play.version,
      }));
    } catch (e) {
      return e;
    }
  }, [NFTFlowId]);

  useEffect(() => {
    getNFTFlowIdInfo();
  }, [getNFTFlowIdInfo]);

  const handleClose = () => {
    setShowNFTPreview(false);
    setNFTInfo(undefined);
    setShowInfo(false);
  };

  return (
    <>
      <div className='absolute left-2/4 top-0 h-full max-h-screen w-full -translate-x-2/4 overflow-hidden mobile-demo:max-w-[500px]'>
        <video
          webkit-playsinline={true}
          playsInline
          ref={videoRef}
          onClick={() => setShowInfo(true)}
          className='h-full w-full scale-110 object-cover'
          src={NFTInfo?.NFTVideoSrc}
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
        <div className='flex w-full items-center gap-2'>
          <div className='rounded-full bg-gradient-primary'>
            <NextImage
              src='/images/prem.png'
              alt=''
              fill
              className='relative h-8 w-8 rounded-full'
              imgClassName='rounded-full p-1'
            />
          </div>
          <span className='text-se block text-base'>
            <div>
              <span className='text-se block text-base'>
                {NFTInfo ? NFTInfo.NFTName ?? 'Not Registered' : 'Loading...'}
              </span>
              <span className='text-xs'>
                Serial:{' '}
                {NFTInfo
                  ? NFTInfo.version
                    ? NFTInfo.version
                    : 'unknown'
                  : '...'}
              </span>
            </div>
          </span>
        </div>
        <span className='text-2xl' onClick={() => handleClose()}>
          <AiOutlineClose />
        </span>
      </div>
      {showInfo && (
        <SlideUp open={showInfo} setOpen={setShowInfo}>
          <div className='flex w-full flex-col items-center justify-between space-y-5 text-black'>
            <span className='text-3xl font-bold'>
              {NFTInfo ? NFTInfo.NFTName ?? 'Not Registered' : 'Loading...'}
            </span>
            <p className='!mt-2.5 text-center text-2xs'>
              {NFTInfo
                ? NFTInfo.NFTDescription ?? 'No description'
                : 'Loading...'}
            </p>
            <div className='flex w-full items-center justify-center gap-10'>
              <div className='flex h-10 w-24 flex-col items-center justify-center rounded-full bg-black px-3 py-1 text-2xs text-white'>
                <span className='block text-center'>SOLD BY</span>
                <span>39 collectors</span>
              </div>
              <div className='my-auto flex h-10 w-24 flex-col items-center justify-center rounded-full bg-black px-3 py-1 text-2xs text-white'>
                <span className='block text-center'>42 FOR SALE</span>
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <span className='text-3xl font-bold'>
                {poolBalance ? Number(poolBalance).toFixed(2) : 'Loading...'}
              </span>
              <div className='text-[10px]'>
                <span className='block'>$FTO</span>
                <span>Avg. Sale</span>
              </div>
            </div>
          </div>
        </SlideUp>
      )}
    </>
  );
};

export default NFTPreview;
