import clsx from 'clsx';

type Props = {
  name?: string;
  percentage: number;
  showPercentage?: boolean;
  gradient?: boolean;
  className?: string;
};

const PercentageBar = ({
  name,
  percentage,
  showPercentage,
  className,
}: Props) => {
  return (
    <div className={clsx('space-y-1', className)}>
      <div className='mt-1 flex justify-between gap-4 text-sm'>
        <span className='text-right'>{name}</span>
        {showPercentage && (
          <span className='text-blue-gray w-10 text-right'>{percentage}%</span>
        )}
      </div>
      <div className='relative'>
        <div className='absolute h-2.5 w-full rounded-xl bg-white opacity-20'></div>
        <div
          className='absolute h-2.5 rounded-xl bg-gradient-primary'
          style={{
            width: `${
              percentage > 100 ? 100 : percentage === 0 ? 0 : percentage + 3
            }%`,
            transitionProperty: 'width',
            transitionDuration: `${percentage <= 1 ? '1ms' : '1000ms'}`,
            transitionTimingFunction: 'linear',
          }}
        ></div>
        <div className='h-2.5'></div>
      </div>
    </div>
  );
};

export default PercentageBar;
