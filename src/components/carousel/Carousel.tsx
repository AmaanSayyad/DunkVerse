import clsx from 'clsx';
import type {
  ComponentProps,
  FC,
  PropsWithChildren,
  ReactElement,
  ReactNode,
} from 'react';
import {
  Children,
  cloneElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';

import clsxm from '@/lib/clsxm';
import { windowExists } from '@/lib/window';

export interface CarouselProps
  extends PropsWithChildren<ComponentProps<'div'>> {
  indicators?: boolean;
  controllers?: boolean;
  leftControl?: ReactNode;
  rightControl?: ReactNode;
  slide?: boolean;
  slideInterval?: number;
  children: ReactNode | ReactNode[];
  scrollContainerClassName?: string;
  itemWrapperClassName?: string;
  initialScrollPosition?: number;
}

const Carousel: FC<CarouselProps> = ({
  children,
  indicators = true,
  controllers,
  leftControl,
  rightControl,
  slide = true,
  slideInterval,
  className,
  scrollContainerClassName,
  itemWrapperClassName,
  initialScrollPosition = 0,
  ...props
}): JSX.Element => {
  const isDeviceMobile =
    windowExists() && navigator.userAgent.indexOf('IEMobile') !== -1;

  const carouselContainer = useRef<HTMLDivElement>(null);
  const [activeItem, setActiveItem] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const items = useMemo(
    () =>
      Children.map(children as ReactElement[], (child: ReactElement) =>
        cloneElement(child, {
          className: clsx(styles.item.base, child.props.className),
        })
      ),
    [children]
  );

  useEffect(() => {
    if (carouselContainer.current) {
      carouselContainer.current.scrollLeft = initialScrollPosition;
    }
  }, [initialScrollPosition]);

  const navigateTo = useCallback(
    (item: number) => () => {
      item = (item + items.length) % items.length;
      if (carouselContainer.current) {
        carouselContainer.current.scrollLeft =
          carouselContainer.current.clientWidth * item;
      }
      setActiveItem(item);
    },
    [items.length]
  );

  useEffect(() => {
    if (carouselContainer.current && !isDragging) {
      setActiveItem(
        Math.round(
          carouselContainer.current.scrollLeft /
            carouselContainer.current.clientWidth
        )
      );
    }
  }, [isDragging]);

  useEffect(() => {
    if (slide) {
      const intervalId = setInterval(
        () => !isDragging && navigateTo(activeItem + 1)(),
        slideInterval ?? 3000
      );

      return () => clearInterval(intervalId);
    }
  }, [activeItem, isDragging, navigateTo, slide, slideInterval]);

  const handleDragging = (dragging: boolean) => () => setIsDragging(dragging);

  return (
    <div
      className={clsxm(styles.base, className)}
      data-testid='carousel'
      {...props}
    >
      <ScrollContainer
        className={clsxm(
          styles.scrollContainer.base,
          (isDeviceMobile || !isDragging) && styles.scrollContainer.snap,
          scrollContainerClassName
        )}
        draggingClassName='cursor-grab'
        innerRef={carouselContainer}
        onEndScroll={handleDragging(false)}
        onStartScroll={handleDragging(true)}
        vertical={false}
      >
        {items?.map(
          (item, index): JSX.Element => (
            <div
              key={index}
              className={clsxm(styles.item.wrapper, itemWrapperClassName)}
              data-active={activeItem === index}
              data-testid='carousel-item'
            >
              {item}
            </div>
          )
        )}
      </ScrollContainer>
      {indicators && (
        <div className={styles.indicators.wrapper}>
          {items.map(
            (_, index): JSX.Element => (
              <button
                key={index}
                className={clsx(
                  styles.indicators.base,
                  styles.indicators.active[index === activeItem ? 'on' : 'off']
                )}
                onClick={navigateTo(index)}
                data-testid='carousel-indicator'
              />
            )
          )}
        </div>
      )}
      <div className={styles.leftControl}>
        <button
          className='group'
          data-testid='carousel-left-control'
          onClick={navigateTo(activeItem - 1)}
          type='button'
        >
          {controllers ? (
            leftControl ? (
              leftControl
            ) : (
              <DefaultLeftControl />
            )
          ) : null}
        </button>
      </div>
      <div className={styles.rightControl}>
        <button
          className='group'
          data-testid='carousel-right-control'
          onClick={navigateTo(activeItem + 1)}
          type='button'
        >
          {controllers ? (
            rightControl ? (
              rightControl
            ) : (
              <DefaultRightControl />
            )
          ) : null}
        </button>
      </div>
    </div>
  );
};

const DefaultLeftControl: FC = () => {
  return (
    <span className={styles.control.base}>
      <svg
        aria-hidden='true'
        className='h-5 w-5 text-white sm:h-6 sm:w-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M15 19l-7-7 7-7'
        ></path>
      </svg>
    </span>
  );
};

const DefaultRightControl: FC = () => {
  return (
    <span className={styles.control.base}>
      <svg
        aria-hidden='true'
        className='h-5 w-5 text-white sm:h-6 sm:w-6'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='2'
          d='M9 5l7 7-7 7'
        ></path>
      </svg>
    </span>
  );
};

const styles = {
  base: 'relative w-full',
  indicators: {
    active: {
      off: 'bg-gray-400 hover:bg-gray-500',
      on: 'bg-gradient-primary',
    },
    base: 'h-3 w-3 rounded-full mt-4',
    wrapper: 'w-full flex gap-4 justify-center ',
  },
  item: {
    base: '',
    wrapper: 'w-full flex-shrink-0 transform cursor-grab snap-center',
  },
  control: {
    base: 'inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 group-hover:bg-gray-400 group-focus:outline-none group-focus:ring-4 group-focus:ring-white sm:h-10 sm:w-10',
    icon: 'h-5 w-5 text-white sm:h-6 sm:w-6',
  },
  leftControl:
    'absolute top-0 left-0 flex h-full items-center justify-center px-4 focus:outline-none',
  rightControl:
    'absolute top-0 right-0 flex h-full items-center justify-center px-4 focus:outline-none',
  scrollContainer: {
    base: 'flex h-full snap-mandatory overflow-y-hidden overflow-x-scroll scroll-smooth rounded-lg',
    snap: 'snap-x',
  },
};

export default Carousel;
