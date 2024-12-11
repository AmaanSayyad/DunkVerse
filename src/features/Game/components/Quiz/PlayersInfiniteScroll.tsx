import React from 'react';

import clsxm from '@/lib/clsxm';

import PlayerCard from '@/components/Player/PlayerCard';

import { countryFlagsMapping } from '@/features/Game/constants/countryFlagsMapping';

import { Player } from '@/types/types';

type Props = {
  players: Player[];
  className?: string;
};

const PlayersInfiniteScroll = ({ players, className }: Props) => {
  return (
    <div className='overflow-x-hidden'>
      <div
        className={clsxm([
          'hover:pause relative flex animate-auto-friends-slider gap-2.5',
          className,
        ])}
      >
        {[...players, ...players].map((player, index) => {
          return (
            <PlayerCard
              key={index}
              profileImage={player.profileImage}
              handle={player.handle}
              points={player.points}
              countryImage={
                countryFlagsMapping[
                  player.country as keyof typeof countryFlagsMapping
                ]
              }
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayersInfiniteScroll;
