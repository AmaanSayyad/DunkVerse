import { Capacitor } from '@capacitor/core';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import Carousel from '@/components/carousel/Carousel';
import OnDarkLogo from '@/components/logos/OnDarkLogo';
import NextImage from '@/components/NextImage';
import Seo from '@/components/Seo';

import Login from '@/features/auth/Login';
import Registration from '@/features/auth/Registration';

const Authentication = () => {
  const [selectedAuth, setSelectedAuth] = useState<
    'login' | 'registration' | undefined
  >(undefined);

  const slides = [
    {
      image: (
        <NextImage
          src='/images/fanbet-logo.png'
          alt='FanFusion Logo'
          width={359}
          height={359}
          className='mx-auto'
        />
      ),
      description:
        'Bet against your friends on your favorite sports and win NFTs',
    },
    {
      image: (
        <NextImage
          src='/images/players-running.png'
          alt='3 players running'
          width={310}
          height={310}
          className='mx-auto flex h-[359px] w-[359px] items-center justify-center'
        />
      ),
      description:
        'Join the betting pool and compete for the NFTs of your favorite sports',
    },
    {
      image: (
        <NextImage
          src='/images/phone-app.png'
          alt='phone app'
          width={359}
          height={359}
          className='mx-auto flex h-[359px] w-[359px] items-center justify-center'
        />
      ),
      description: 'Are you ready to win big? Our AI will test your knowledge',
    },
  ];

  const renderAuthentication = () => {
    if (selectedAuth === 'login') {
      return <Login setSelectedAuth={setSelectedAuth} />;
    }
    if (selectedAuth === 'registration') {
      return <Registration setSelectedAuth={setSelectedAuth} />;
    } else {
      return <AuthSelection />;
    }
  };

  const AuthSelection = () => {
    return (
      <>
        {/* <Seo templateTitle='Home' /> */}
        <Seo />

        <section className='flex flex-col items-center '>
          <OnDarkLogo />
          <Carousel
            className='w-screen mobile-demo:w-[500px]'
            slideInterval={3000}
          >
            {slides.map((slide, index) => (
              <div key={index}>
                {slide.image}
                <p className='mx-auto max-w-[95vw] text-center text-lg mobile-demo:max-w-[475px]'>
                  {slide.description}
                </p>
              </div>
            ))}
          </Carousel>
          <div className='mt-20 w-full space-y-4'>
            <Button
              onClick={() => setSelectedAuth('login')}
              variant='outline'
              className='w-full'
              size='lg'
            >
              Login
            </Button>
            <Button
              onClick={() => setSelectedAuth('registration')}
              variant='outline'
              className='w-full'
              size='lg'
            >
              Create Account
            </Button>
          </div>
        </section>
      </>
    );
  };

  return (
    <div
      className='flex h-full w-full flex-col px-0'
      style={{
        paddingTop: `${
          Capacitor.getPlatform() == 'ios'
            ? 'calc(2px + env(safe-area-inset-top))'
            : '0px'
        }`,
      }}
    >
      {renderAuthentication()}
    </div>
  );
};

export default Authentication;
