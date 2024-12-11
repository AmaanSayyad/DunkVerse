import clsx from 'clsx';
import React, { useEffect } from 'react';

// use npm published version
import clsxm from '@/lib/clsxm';

import { NFTMedia } from '@/features/Game/constants/NFTs';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';

type Props = {
  className?: string;
  NFTFlowId: string;
  showPrice?: boolean;
} & React.ComponentPropsWithRef<'div'>;

const NFTThumbnail = ({ NFTFlowId, showPrice, className, ...rest }: Props) => {
  const { NFTInfo, setNFTInfo, poolBalance } = useQuizContext();

  useEffect(() => {
    setNFTInfo({
      ...NFTInfo,
      NFTVideoSrc: NFTMedia(NFTFlowId, 'video'),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [NFTFlowId, setNFTInfo]);

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
          <span className='h2'>
            {NFTInfo.NFTName ? NFTInfo.NFTName : 'Loading...'}
          </span>
          <p className='text-center text-[10px]'>
            {NFTInfo.NFTDescription ? NFTInfo.NFTDescription : 'Loading...'}
          </p>
          <video
            webkit-playsinline={true}
            playsInline
            className='mt-2 h-full w-full'
            src={NFTInfo.NFTVideoSrc}
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
