import React from 'react';
import { BsFillShareFill } from 'react-icons/bs';

import Button from '@/components/buttons/Button';
import NextImage from '@/components/NextImage';

const QRCodeInvitation = () => {
  return (
    <div className='absolute top-0 left-2/4 h-full max-h-screen w-screen -translate-x-2/4 overflow-hidden mobile-demo:w-[500px]'>
      <NextImage
        src='/images/ufc.png'
        fill
        className='relative h-full w-full'
        imgClassName='object-cover object-right'
        alt='ufc strike'
      />

      <div className='absolute top-0 flex h-full w-full max-w-[90vw] flex-col items-center justify-center inset-x-center mobile-demo:max-w-[450px]'>
        <div className='flex h-full w-full flex-col items-center justify-center'>
          <NextImage
            src='/images/qr-code.png'
            fill
            className='relative aspect-square w-full max-w-[85vw] inset-x-center  mobile-demo:max-w-[425px]'
            imgClassName='object-cover'
            alt='qr-code'
          />
          <h1 className='text-gradient-primary track-wide mt-10'>DunkVerse</h1>
          <span className='mt-12'>Tap to copy link to download app</span>
          <div className='mt-8 h-[1px] w-full bg-gradient-primary' />
        </div>

        <div className='relative bottom-6 w-full'>
          <Button
            variant='outline'
            size='lg'
            leftIcon={BsFillShareFill}
            leftIconClassName='text-xl text-primary-500'
            className='flex justify-center gap-4'
          >
            <span className='text-gradient-primary'>Share</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QRCodeInvitation;
