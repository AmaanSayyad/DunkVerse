import NextImage from '@/components/NextImage';

export const trendingQuizzes: {
  [key: string]: {
    title: string;
    category: { player?: { name: string }; team?: { name: string } };
    players: string;
    entryPrice: string;
    image: JSX.Element;
  };
} = {
  '#1208': {
    title: 'Lebron James',
    category: { player: { name: 'Lebron James' } },
    players: '20',
    entryPrice: '2.25',
    image: (
      <NextImage
        src='/images/lebron-james.png'
        alt='Lebron James'
        className='relative !top-1 h-full w-[280px]'
        imgClassName='object-contain'
        fill
      />
    ),
  },

  '#3892': {
    title: 'Giannis Antetokounmpo',
    category: { player: { name: 'Giannis Antetokounmpo' } },
    players: '5',
    entryPrice: '5.3',
    image: (
      <NextImage
        src='/images/giannis-antetokounmpo.png'
        alt='Giannis Antetokounmpo'
        fill
        className='relative h-full w-[200px]'
        imgClassName='object-contain'
      />
    ),
  },
};

export const tierQuizzes: {
  [key: string]: {
    title: string;
    category: { player?: { name: string }; team?: { name: string } };
    type: 'legendary' | 'epic' | 'rare' | 'common';
    players: string;
    entryPrice: string;
    image: JSX.Element;
  };
} = {
  // '#3298': {
  //   title: 'Magic',
  //   category: { player: { name: 'Magic' } },
  //   type: 'legendary',
  //   players: '20',
  //   entryPrice: '20.05',
  //   image: (
  //     <NextImage
  //       src='/images/magic.png'
  //       alt='Magic'
  //       fill
  //       className='!top-2 h-full w-[290px]'
  //       imgClassName='object-contain'
  //     />
  //   ),
  // },

  '#3429': {
    title: 'Devin Booker',
    category: { player: { name: 'Devin Booker' } },
    type: 'legendary',
    players: '20',
    entryPrice: '20.05',
    image: (
      <NextImage
        src='/images/devin-booker.png'
        alt='Devin Booker'
        fill
        className='!top-2 h-full w-[290px]'
        imgClassName='object-contain'
      />
    ),
  },

  '#9832': {
    title: 'Kevin Durant',
    category: { player: { name: 'Kevin Durant' } },
    type: 'rare',
    players: '5',
    entryPrice: '35.3',
    image: (
      <NextImage
        src='/images/kevin-duran.png'
        alt='Kevin Duran'
        fill
        className='!top-2 h-full w-[200px]'
        imgClassName='object-contain'
      />
    ),
  },
};
