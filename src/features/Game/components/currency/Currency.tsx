import { Switch } from '@headlessui/react';
import { useState } from 'react';

import NextImage from '@/components/NextImage';

const Currency = () => {
  const [enabled, setEnabled] = useState(false);

  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={`${
        enabled ? 'bg-primary-700' : 'bg-primary-400'
      } relative inline-flex h-7 w-[61px] items-center rounded-full`}
    >
      <div
        className={`${
          enabled ? 'translate-x-7' : 'translate-x-0'
        } relative inline-block aspect-square h-full transform rounded-full bg-white transition`}
      ></div>
      <div className='absolute aspect-square h-full rounded-full'>
        <NextImage
          src='/images/flow-logo.png'
          alt='flow token'
          width={23}
          height={23}
          className='absolute z-30 aspect-square w-10/12 rounded-full inset-center'
          imgClassName='object-cover rounded-full'
        />
      </div>
      <div className='absolute right-0 aspect-square h-full rounded-full'>
        <NextImage
          src='/images/usdc-logo.png'
          alt='flow token'
          width={16}
          height={16}
          className='absolute z-30 aspect-square rounded-full inset-center'
          imgClassName='object-cover rounded-full'
        />
      </div>
    </Switch>
  );
};

export default Currency;
