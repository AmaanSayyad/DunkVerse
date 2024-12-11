import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useState } from 'react';

import Button from '@/components/buttons/Button';
import OnDarkLogo from '@/components/logos/OnDarkLogo';
import NextImage from '@/components/NextImage';
import Loading from '@/components/SVGs/Loading';

import Dialog from '@/dialog/Dialog';
import DialogTitle from '@/dialog/DialogTitle';

type Props = {
  setSelectedAuth: React.Dispatch<
    React.SetStateAction<'login' | 'registration' | undefined>
  >;
};

export default function Login({ setSelectedAuth }: Props) {
  const [email, setEmail] = useState('');
  const [showDialog, setShowDialog] = useState(false);

  return (
    <>
      <form className='flex h-full flex-col'>
        <OnDarkLogo />
        <div>
          <NextImage
            src='/images/ufc.png'
            alt='loading app'
            fill
            className='absolute left-2/4 top-0 min-h-screen w-screen -translate-x-1/2 mobile-demo:w-[500px]'
            imgClassName='object-cover object-left-top opacity-50'
          />
          <div className='mobile-demo:min-w-auto min-w-screen absolute flex h-full w-full max-w-[90vw] flex-col items-center inset-center mobile-demo:w-[450px]'>
            <div className='absolute flex h-full w-full flex-col items-center pt-24'>
              <div className='flex h-full w-full flex-col items-center justify-center'>
                <span className='h2 text-center text-xl font-normal text-primary-500'>
                  👋 Register Now
                </span>
                <ConnectButton />
                <span className='mt-6'>Or use email </span>
                <input
                  className='mt-6 w-full rounded-full px-4 py-3.5 text-black hover:border-primary-500'
                  type='email'
                  name='email'
                  required
                  placeholder='Email'
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
              </div>
              <div className='relative bottom-20 w-full space-y-8'>
                <Button type='submit' variant='outlined-shadow' size='lg'>
                  Register
                </Button>
                <span className='block text-center text-sm'>
                  Already have an account?{' '}
                  <span
                    className='cursor-pointer text-primary-500'
                    onClick={() => setSelectedAuth('login')}
                  >
                    Login Now
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </form>

      <Dialog isOpen={showDialog} onClose={() => setShowDialog(false)}>
        <div className='flex flex-col items-center text-center'>
          <DialogTitle className='text-gradient-primary text-2xl'>
            Check your email
          </DialogTitle>
          <div className='mt-8'>
            <p>We emailed a magic link to {email}.</p>
            <p className='mb-6'>Click the link to log in or sign up.</p>
            <Loading />
            <p className='mt-6 text-xs'>
              (Once confirmed it might take a few moments)
            </p>
          </div>
        </div>
      </Dialog>
    </>
  );
}
