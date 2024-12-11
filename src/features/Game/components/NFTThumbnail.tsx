import { Capacitor } from '@capacitor/core';
import axios from 'axios';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

// use npm published version
import clsxm from '@/lib/clsxm';

import { NFTMedia } from '@/features/Game/constants/NFTs';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';
import { NFTInfo } from '@/features/Game/types/Types';

type Props = {
  className?: string;
  NFTFlowId: string;
  showPrice?: boolean;
} & React.ComponentPropsWithRef<'div'>;

const NFTThumbnail = ({ NFTFlowId, showPrice, className, ...rest }: Props) => {
  const [NFTInfo, setNFTInfo] = useState<NFTInfo | undefined>();
  const { poolBalance } = useQuizContext();
  const getNFTFlowIdInfo = useCallback(async () => {
    try {
      const apiEndpoint = '/api/graphql/minted-moment';
      const data = await axios
        .get(
          Capacitor.isNativePlatform()
            ? `https://fanbet.vercel.app${apiEndpoint}`
            : apiEndpoint,
          {
            params: { flowid: NFTFlowId },
          }
        )
        .then((res) => res.data.data);

      setNFTInfo({
        NFTId: data.getMintedMoment.data.play.id,
        NFTName: data.getMintedMoment.data.play.headline,
        NFTDescription: data.getMintedMoment.data.play.shortDescription,
        NFTTotalPrice: data.getMintedMoment.data.price,
        NFTVideoSrc: NFTMedia(NFTFlowId, 'video'),
        version: data.getMintedMoment.data.play.version,
      });
    } catch (e) {
      return e;
    }
  }, [NFTFlowId]);

  useEffect(() => {
    getNFTFlowIdInfo();
  }, [getNFTFlowIdInfo]);

  return (
    <div>
      <div
        {...rest}
        className={clsxm([
          'relative w-full rounded-3xl border-2 border-primary-500 p-3 pb-[75px]',
          className,
        ])}
      >
        <div className='absolute -bottom-1 left-2/4 h-2 w-8/12 -translate-x-2/4 bg-dark'></div>
        <div className='absolute -bottom-0 left-2/4 h-16 w-[calc(66.66666%+4px)] -translate-x-2/4 rounded-t-3xl border-2 border-b-0  border-primary-500'></div>
        <div className='flex w-full flex-col items-center self-start'>
          <span className='h2'>{NFTInfo?.NFTName ?? 'loading...'}</span>
          <p className='text-center text-[10px]'>
            {NFTInfo?.NFTDescription ?? 'loading...'}
          </p>
          <video
            webkit-playsinline={true}
            playsInline
            className='mt-2 h-full w-full'
            src={NFTInfo?.NFTVideoSrc}
            autoPlay
            loop
            muted
          />
        </div>
      </div>
      {showPrice && (
        <div className='flex w-full justify-center'>
          <div className='relative -top-14 flex w-3/5 items-center justify-center rounded-3xl bg-white py-5'>
            <div className='flex gap-1 text-black'>
              <span
                className={clsx([
                  'h1 my-auto w-full break-all text-center',
                  NFTInfo == undefined && 'text-sm',
                  !NFTInfo?.NFTTotalPrice && 'text-sm',
                ])}
              >
                {poolBalance ? Number(poolBalance).toFixed(2) : 'loading...'}
              </span>
              {NFTInfo?.NFTTotalPrice ? (
                <div className='my-auto text-[10px]'>
                  <span className='block'>$FTO</span>
                  <span>Avg Sale</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NFTThumbnail;
