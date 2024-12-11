import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
  value?: string | number;
  children?: string;
  className?: string;
};

const RadioOption = ({ value, children, className }: Props) => {
  return (
    <RadioGroup.Option
      value={value}
      className={({ checked }) =>
        clsx(
          checked ? 'bg-gradient-primary text-white' : 'bg-white',
          'relative h-6 w-6 cursor-pointer rounded-lg shadow-md focus:outline-none',
          className
        )
      }
    >
      {({ checked }) => (
        <div className='absolute flex justify-between inset-center'>
          {checked && (
            <div className='shrink-0 text-white'>
              <CheckIcon className='h-6 w-6' />
            </div>
          )}
          <div className='mx-auto'>{children}</div>
        </div>
      )}
    </RadioGroup.Option>
  );
};

type IconProps = {
  className?: string;
};

function CheckIcon({ className }: IconProps) {
  return (
    <svg viewBox='0 0 24 24' fill='none' className={className}>
      <path
        d='M7 13l3 3 7-7'
        stroke='#000'
        strokeWidth={2.3}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}

export default RadioOption;
