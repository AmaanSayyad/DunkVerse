import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';

type Props = {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
};

const Tabs = ({ className, children }: Props) => {
  return (
    <Tab.List
      className={clsx(
        'grid grid-cols-2 items-center justify-center gap-1 rounded-full bg-white p-3 capitalize text-black mobile-m:gap-4 mobile-demo:gap-8',
        className
      )}
    >
      {children}
    </Tab.List>
  );
};

export default Tabs;
