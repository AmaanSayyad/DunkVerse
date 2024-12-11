import { Tab } from '@headlessui/react';
import React from 'react';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const TabPanel = ({ className, children }: Props) => {
  return <Tab.Panel className={className}>{children}</Tab.Panel>;
};

export default TabPanel;
