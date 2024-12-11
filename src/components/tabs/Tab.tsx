import { Tab as HeadlessTab } from '@headlessui/react';
import clsx from 'clsx';

type Props = {
  underline?: boolean;
  className?: string;
  children: React.ReactNode | React.ReactNode[];
};

const Tab = ({ underline = true, className, children }: Props) => {
  return (
    <HeadlessTab
      className={({ selected }) =>
        clsx(
          selected
            ? 'rounded-full bg-black text-white'
            : 'bg-transparent text-black',
          'relative block py-2 px-2 outline-none mobile-s:py-3 mobile-s:px-4',
          className
        )
      }
    >
      {({ selected }) => (
        <>
          {children}
          {selected && underline && (
            <span className='bg-mainHorizontal absolute mt-3 block h-[3px] w-full'></span>
          )}
        </>
      )}
    </HeadlessTab>
  );
};
export default Tab;
