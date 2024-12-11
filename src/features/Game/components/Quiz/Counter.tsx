import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

type Props = {
  onCountEnd?: () => void;
  active?: boolean;
  setActive?: React.Dispatch<React.SetStateAction<boolean>>;
  initialValue?: number;
};

const Counter = ({ onCountEnd, initialValue = 30 }: Props) => {
  const [counter, setCounter] = useState(0);

  const countInterval: MutableRefObject<NodeJS.Timeout | undefined> =
    useRef(undefined);

  const startCount = useCallback(() => {
    countInterval.current = setInterval(() => {
      if (counter <= 0) {
        clearInterval(countInterval.current as NodeJS.Timeout);
        return;
      }
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);
  }, [counter]);

  const stopCount = () => {
    if (countInterval) {
      clearInterval(countInterval.current);
    }
  };

  useEffect(() => {
    setCounter(initialValue);
    startCount();
  }, [initialValue, startCount]);

  useEffect(() => {
    if (counter <= 0) {
      stopCount();
      onCountEnd?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter]);

  return <>{counter}</>;
};

export default Counter;
