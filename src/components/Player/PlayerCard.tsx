import React from 'react';

import NextImage from '@/components/NextImage';

import { Player } from '@/types/types';

const FriendCard = ({ profileImage, handle, points, countryImage }: Player) => {
  return (
    <div className='over flex h-[100px] items-center bg-transparent'>
      <div className='flex h-[63px] w-[135px] flex-col justify-between space-y-1.5 rounded-lg bg-white p-1.5'>
        <div className='flex gap-2'>
          <NextImage
            src={profileImage}
            fill
            className='absolute -top-[0.05rem] aspect-square h-8 w-8 rounded-full'
            imgClassName='rounded-full'
            alt={`${handle} profile image`}
          />
          <span className='ml-auto text-ellipsis text-[10px] text-black'>
            {handle}
          </span>
        </div>
        <div className='mt-auto flex items-center justify-between gap-2'>
          <NextImage
            src={countryImage ?? '/images/image-placeholder.png'}
            className='relative aspect-square h-6 w-6 rounded-full'
            fill
            imgClassName='rounded-full object-cover'
            alt={`${handle} profile image`}
          />
          <div className='rounded-full bg-dark p-1.5 text-[10px]'>
            {points} POINTS
          </div>
        </div>
      </div>
    </div>
  );
};

export default FriendCard;
