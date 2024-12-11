import React from 'react';

import NextImage from '@/components/NextImage';

const OnDarkLogo = () => {
  return (
    <div className='relative z-50 flex flex-col items-center gap-2'>
      <NextImage
        src='/images/fanbet-logo.gif'
        alt='Top Shot Logo'
        width={253}
        height={45}
      />
    </div>
  );
};

export default OnDarkLogo;
