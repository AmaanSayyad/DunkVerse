import { Tab } from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { BsCalendarCheck } from 'react-icons/bs';
import { RxCopy } from 'react-icons/rx';
import { useAccount } from 'wagmi';
import { ethers } from 'ethers';

import clsxm from '@/lib/clsxm';

import Button from '@/components/buttons/Button';
import Carousel from '@/components/carousel/Carousel';
import TextField from '@/components/inputs/TextField';
import NextImage from '@/components/NextImage';
import RadioGroup from '@/components/radio/RadioGroup';
import RadioOption from '@/components/radio/RadioOption';
import TabGroup from '@/components/tabs/TabGroup';
import TabPanel from '@/components/tabs/TabPanel';
import TabPanels from '@/components/tabs/TabPanels';
import Dialog from '@/dialog/Dialog';

import { paymentTypes } from '@/features/Game/constants/paymentTypes';
import { addressFormatter } from '@/features/Game/lib/addressFormatter';

const PaymentTypes = () => {
  const [selected, setSelected] = useState(0);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [loading, setLoading] = useState(false);
  const { address } = useAccount();
  const [tokenBalance, setTokenBalance] = useState<string>('0');
  const [totalInvested, setTotalInvested] = useState<string>('0');

  // Contract Addresses
  const DUNKVERSE_ADDRESS = '0xaF1968db67Dd7161D2AF04917b03240DE638ec15';
  const BETTING_POOL_ADDRESS = '0xaD488Cd332034434240828F987d6E6B991D48125';

  // Fetch the token balance
  const fetchTokenBalance = async () => {
    if (!address) return;
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const dunkVerseContract = new ethers.Contract(
        DUNKVERSE_ADDRESS,
        [
          'function balanceOf(address) view returns (uint256)',
          'function decimals() view returns (uint8)'
        ],
        provider
      );

      const balance = await dunkVerseContract.balanceOf(address);
      const decimals = await dunkVerseContract.decimals();
      const formattedBalance = ethers.utils.formatUnits(balance, decimals);
      setTokenBalance(formattedBalance);
    } catch (error) {
      console.error('Error fetching token balance:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total invested from BettingPool
  const fetchTotalInvested = async () => {
    if (!address) return;
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const bettingPoolContract = new ethers.Contract(
        BETTING_POOL_ADDRESS,
        [
          'function userInvested(address) view returns (uint256)'
        ],
        provider
      );

      const invested = await bettingPoolContract.userInvested(address);
      const formattedInvested = ethers.utils.formatEther(invested);
      setTotalInvested(formattedInvested);
    } catch (error) {
      console.error('Error fetching total invested:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle deposits
  const handleDeposit = async (amount: string) => {
    if (!address) return;
    try {
      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // First approve tokens
      const dunkVerseContract = new ethers.Contract(
        DUNKVERSE_ADDRESS,
        [
          'function approve(address spender, uint256 amount) returns (bool)'
        ],
        signer
      );

      const amountWei = ethers.utils.parseEther(amount);
      const approveTx = await dunkVerseContract.approve(BETTING_POOL_ADDRESS, amountWei);
      await approveTx.wait();

      // Then deposit
      const bettingPoolContract = new ethers.Contract(
        BETTING_POOL_ADDRESS,
        [
          'function deposit(uint256 amount, uint256 poolId) external'
        ],
        signer
      );

      const depositTx = await bettingPoolContract.deposit(amountWei, 0); // poolId 0 for default pool
      await depositTx.wait();

      // Refresh balances
      await fetchTokenBalance();
      await fetchTotalInvested();
    } catch (error) {
      console.error('Error depositing:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (address) {
      fetchTokenBalance();
      fetchTotalInvested();
    }
  }, [address]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(true);
    setTimeout(() => {
      setCopiedNotification(false);
    }, 900);
  };

  return (
    <>
      <TabGroup>
        {/* Tab Headers */}
        <Tab.List>
          <Carousel
            className='left-[50%] w-screen -translate-x-2/4 mobile-demo:w-[500px]'
            itemWrapperClassName='w-max'
            scrollContainerClassName='snap-none pl-[25px]'
            slide={false}
            indicators={false}
          >
            {paymentTypes.map((paymentType, index) => (
              <Tab
                key={index}
                className='pr-4'
                onClick={() => setSelected(index)}
              >
                <div
                  className={clsxm([
                    'flex h-full min-h-[127px] w-full min-w-[135px] flex-col rounded-2xl p-4',
                    selected === index ? 'bg-gradient-primary' : 'bg-white',
                  ])}
                >
                  <div className='flex items-center justify-between gap-2'>
                    <NextImage
                      src={paymentType.imgSrc}
                      alt='paymentType'
                      fill
                      className='relative h-6 w-6'
                      imgClassName='object-contain'
                    />
                  </div>
                  <div className='mt-auto h-full text-black'>
                    <span className='block text-sm font-bold'>
                      {paymentType.name}
                    </span>
                    <span className='text-2xs'>
                      Commission {paymentType.commission}%
                    </span>
                  </div>
                </div>
              </Tab>
            ))}
          </Carousel>
        </Tab.List>

        {/* Tab Panels */}
        <TabPanels className='mt-8'>
          {/* Panel 1: Wallet and Balance Info */}
          <TabPanel>
            <div className='space-y-6'>
              <div className='grid grid-cols-2 items-center justify-between gap-2'>
                <span className='text-sm'>My Wallet Address</span>
                <Button
                  variant='outline'
                  rightIcon={RxCopy}
                  rightIconClassName='text-primary-500 text-xl'
                  size='base'
                  className='w-full px-5 py-3 text-white'
                  onClick={() => handleCopy(address ?? '')}
                >
                  <span className='mx-auto w-full'>
                    {addressFormatter(address ?? '')}
                  </span>
                </Button>
              </div>
              <div className='grid grid-cols-2 items-center justify-between gap-2'>
                <span className='text-sm'>My Avail. Balance ($FTO)</span>
                <Button
  variant='outline'
  rightIcon={RxCopy}
  rightIconClassName='text-primary-500 text-xl'
  size='base'
  className='w-full px-5 py-3 text-white'
  onClick={() => handleCopy(`${Number(tokenBalance).toFixed(2)} $FTO`)}
  disabled={loading}
>
  <span className='mx-auto w-full'>
    {loading ? 'Loading...' : `${Number(tokenBalance).toFixed(2)} $FTO`}
  </span>
</Button>
              </div>
              <h2 className='!h2'>
  Bet Locked in BettingPool: {loading ? 'Loading...' : `${Number(totalInvested).toFixed(2)} $FTO`}
</h2>
              <Button 
                variant='outline' 
                size='lg' 
                className='!mt-2'
                onClick={() => handleDeposit('100')} // Example amount
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Deposit'}
              </Button>
            </div>
          </TabPanel>

          {/* Panel 2: Deposit Form */}
          <TabPanel>
            <form className='space-y-6'>
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white placeholder:text-gray-300'
                placeHolder='Card Number'
                type='number'
              />
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white placeholder:text-gray-300'
                placeHolder='CVV'
                type='number'
              />
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white invalid:text-gray-300'
                placeHolder='Expiry Date'
                type='month'
                endAdornment={<BsCalendarCheck />}
                endAdornmentClassName='cursor-pointer'
              />
              <TextField
                required={true}
                inputClassName='bg-transparent border-primary-500 rounded-full text-white placeholder:text-gray-300'
                placeholder='Amount'
              />
              <div className='flex items-center gap-4'>
                <RadioGroup>
                  <div className='flex items-center gap-4'>
                    <RadioOption
                      className='inline-block'
                      value="I agree to the terms of use of the 'One-click pay'"
                    />
                    <span className='text-2xs'>
                      I agree to the terms of use of the "One-click pay"
                    </span>
                  </div>
                </RadioGroup>
              </div>
              <Button variant='outline' size='lg' className='!mt-12'>
                Deposit
              </Button>
            </form>
          </TabPanel>

          {/* Panel 3: Coming Soon */}
          <TabPanel className='mt-20 flex w-full justify-center'>
            <span className='h2'>COMING SOON</span>
          </TabPanel>
        </TabPanels>
      </TabGroup>

      {/* Copy Notification Dialog */}
      <Dialog
        isOpen={copiedNotification}
        onClose={() => setCopiedNotification(false)}
        childrenClassName='text-center h3'
      >
        <span>Copied</span>
      </Dialog>
    </>
  );
};

export default PaymentTypes;