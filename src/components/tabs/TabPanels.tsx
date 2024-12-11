import { Tab } from '@headlessui/react';

type Props = {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
};

const TabPanels = ({ className, children }: Props) => {
  return <Tab.Panels className={className}>{children}</Tab.Panels>;
};

export default TabPanels;
