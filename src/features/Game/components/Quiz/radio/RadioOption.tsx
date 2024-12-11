import { RadioGroup } from '@headlessui/react';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

import clsxm from '@/lib/clsxm';

type Props = {
  value?: string | number;
  children?: string;
  correctAnswer?: boolean;
  showAnswers?: boolean;
  onClick: () => void;
};

const RadioOption = ({
  value,
  children,
  correctAnswer,
  showAnswers,
  onClick,
}: Props) => {
  return (
    <div onClick={() => onClick()}>
      <RadioGroup.Option
        disabled={showAnswers}
        value={value}
        className={({ checked }) =>
          clsxm(
            'bg-white text-lg font-bold text-black',
            'w-full cursor-pointer rounded-full p-4 text-left shadow-md focus:outline-none',
            correctAnswer && showAnswers && 'bg-[#17FF16]',
            showAnswers && checked && !correctAnswer && 'bg-red-500'
          )
        }
      >
        {({ checked }) => (
          <div className='relative flex items-center justify-between'>
            <div className='text-base'>{children}</div>
            {correctAnswer && showAnswers && (
              <div className='absolute right-4 shrink-0 text-4xl text-white'>
                <AiOutlineCheck />
              </div>
            )}
            {showAnswers && checked && !correctAnswer && (
              <div className='absolute right-4 shrink-0 text-4xl text-white'>
                <AiOutlineClose />
              </div>
            )}
          </div>
        )}
      </RadioGroup.Option>
    </div>
  );
};

export default RadioOption;
