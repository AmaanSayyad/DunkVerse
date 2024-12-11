import React from 'react';

import clsxm from '@/lib/clsxm';

import NextImage from '@/components/NextImage';

import { players } from '@/features/Game/constants/players';

type Props = {
  className?: string;
  figureClassName?: string;
};

const LeaderBoardTable = ({ className, figureClassName }: Props) => {
  return (
    <div className={clsxm(['space-y-8', className])}>
      {players.map((player, index) => {
        return (
          <div
            key={index}
            className='flex w-full items-center justify-between gap-1'
          >
            <div className='flex items-center gap-4'>
              <span>{index + 1}</span>
              <NextImage
                src={player.profileImage}
                alt='Image placeholder'
                className={clsxm([
                  'relative h-12 w-12 rounded-full border-4 border-primary-500',
                  figureClassName,
                ])}
                imgClassName='object-cover rounded-full'
                fill
              />
              <span className='text-ellipsis'>{player.handle}</span>
            </div>
            <span>{player.points} pts</span>
          </div>
        );
      })}
    </div>
  );
};

export default LeaderBoardTable;
