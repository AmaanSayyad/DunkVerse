import React, { useState, useEffect } from 'react';
import NextImage from '@/components/NextImage';

const Account = () => {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Generate random points between 0 and 4999
    const randomPoints = Math.floor(Math.random() * 20000);
    setPoints(randomPoints);
  }, []);

  return (
    <>
      <div className='mt-6 flex flex-col items-center gap-3'>
        <NextImage
          src='/images/demo-profile.png'
          alt='Image placeholder'
          className='relative h-32 w-32 rounded-full border-4 border-primary-500'
          imgClassName='object-cover rounded-full'
          fill
        />
        <span className='block'>IamjackRider</span>
        <span className='text-gradient-primary block'>{points} pts.</span>
      </div>
    </>
  );
};

export default Account;