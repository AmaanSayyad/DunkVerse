// components/Hero.tsx
import React from 'react';

const Hero = () => {
  return (
    <div className='bg-gradient-to-r from-black to-gray-900 py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center'>
          <h1 className='mb-4 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-4xl font-bold text-transparent md:text-6xl'>
            MetaMask Delegation Toolkit
          </h1>
          <p className='mb-8 text-lg text-gray-300 md:text-xl'>
            Explore the power of smart account delegation with MetaMask
          </p>
          <div className='flex justify-center space-x-4'>
            <a
              href='https://docs.gator.metamask.io'
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-lg bg-green-500 px-6 py-2 font-bold text-white transition duration-300 hover:bg-green-600'
            >
              Documentation
            </a>
            <a
              href='https://github.com/MetaMask/metamask-sdk'
              target='_blank'
              rel='noopener noreferrer'
              className='rounded-lg bg-gray-700 px-6 py-2 font-bold text-white transition duration-300 hover:bg-gray-600'
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
