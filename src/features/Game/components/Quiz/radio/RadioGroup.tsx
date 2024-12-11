import { RadioGroup as HeadlessRadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';

type Props = {
  className?: string;
  children?: React.ReactNode | React.ReactNode[];
  name?: string;
};

const RadioGroup = ({ children, className, name }: Props) => {
  const [selected, setSelected] = useState();

  return (
    <div className={clsx('flex w-full flex-col', className)}>
      <HeadlessRadioGroup value={selected} onChange={setSelected} name={name}>
        <HeadlessRadioGroup.Label className='sr-only'>
          Value
        </HeadlessRadioGroup.Label>
        <div className='w-full space-y-10'>{children}</div>
      </HeadlessRadioGroup>
    </div>
  );
};

export default RadioGroup;
