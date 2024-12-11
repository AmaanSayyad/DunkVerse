import { Capacitor } from '@capacitor/core';
import { RadioGroup } from '@headlessui/react';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import Countdown, { CountdownApi } from 'react-countdown';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { RiTimerFlashLine } from 'react-icons/ri';

import PercentageBar from '@/components/percentages/PercentageBar';

import QuizCard from '@/features/Game/components/Quiz/QuizCard';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';

import RadioOption from './radio/RadioOption';

const Questions = () => {
  const [questionNumber, setQuestionNumber] = useState(0);
  const { preQuestions, questions, setActiveStep } = useQuizContext();
  const [showAnswers, setShowAnswers] = useState(false);

  const countdown: React.MutableRefObject<CountdownApi | null> = useRef(null);

  const handleNextQuestion = () => {
    if (questionNumber + 1 === questions?.length) {
      setActiveStep('post-questions');
    } else {
      setShowAnswers(false);
      countdown.current?.start();
      setQuestionNumber((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (showAnswers) {
      countdown.current?.stop();
      setTimeout(() => {
        handleNextQuestion();
      }, 850);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAnswers]);

  return (
    <section
      className={clsx(
        Capacitor.getPlatform() === 'ios' &&
          'mt-8 pt-[calc(env(safe-area-inset-bottom))]'
      )}
    >
      <div className='flex w-full items-center gap-8'>
        <div className='flex items-center gap-2'>
          <span className='text-2xl text-primary-500'>
            <HiOutlineUserGroup />
          </span>
          <span className='text-gradient-primary'>
            {preQuestions.players.length}
          </span>
        </div>
        <span className='w-full'>
          <PercentageBar
            percentage={(questionNumber * 100) / questions?.length}
            name={`Question ${questionNumber + 1} of ${questions?.length}`}
          />
        </span>
      </div>
      <QuizCard
        title='Lebron James'
        image={preQuestions.categoryImage}
        className='mt-8'
      />

      <div className='my-8 flex w-full items-center justify-center gap-2 text-2xl'>
        <span className='text-primary-500'>
          <RiTimerFlashLine />
        </span>
        <Countdown
          ref={(countdownRef) => {
            countdown.current = countdownRef;
          }}
          date={Date.now() + 15000}
          onComplete={() => setShowAnswers(true)}
          zeroPadTime={1}
          renderer={(props) => (
            <>
              <div className='text-gradient-primary flex text-xl'>
                <span className='block w-6'>{props.seconds}</span>{' '}
                <span>sec</span>
              </div>
            </>
          )}
        />
      </div>

      <p className='text-xl'>
        {questions && questions[questionNumber].question}
      </p>
      <RadioGroup
        name='options'
        className='mt-8 space-y-4'
        disabled={showAnswers}
      >
        {questions &&
          questions[questionNumber].options.map((option: string) => {
            return (
              <RadioOption
                key={option}
                value={option}
                onClick={() => setShowAnswers(true)}
                showAnswers={showAnswers}
                correctAnswer={questions[questionNumber].answer === option}
              >
                {option}
              </RadioOption>
            );
          })}
      </RadioGroup>
    </section>
  );
};

export default Questions;
