import { Tab } from '@headlessui/react';

type Props = {
  children: React.ReactNode | React.ReactNode[];
  className?: string;
};

const TabGroup = ({ children, className }: Props) => {
  return (
    <>
      {className ? (
        <div className={className}>
          <Tab.Group>{children}</Tab.Group>
        </div>
      ) : (
        <Tab.Group>{children}</Tab.Group>
      )}
    </>
  );
};

export default TabGroup;
