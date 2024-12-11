import { Dialog } from '@headlessui/react';
import clsx from 'clsx';
import { AiOutlineClose } from 'react-icons/ai';

type Props = {
  onClose?: () => void;
  children?: React.ReactNode | React.ReactNode[];
  className?: string;
};

const DialogTitle = ({ onClose, className, children }: Props) => {
  const renderTitle = () => {
    if (onClose) {
      return (
        <>
          <div className='relative mb-4 flex w-full justify-end'>
            <span className='2xl' onClick={() => onClose()}>
              <AiOutlineClose />
            </span>
          </div>
          {children && (
            <Dialog.Title as='h3' className='h3 text-center'>
              {children}
            </Dialog.Title>
          )}
        </>
      );
    }
    return children ? (
      <Dialog.Title as='h3' className={(clsx('h3 text-center'), className)}>
        {children}
      </Dialog.Title>
    ) : (
      <></>
    );
  };

  return renderTitle();
};

export default DialogTitle;
