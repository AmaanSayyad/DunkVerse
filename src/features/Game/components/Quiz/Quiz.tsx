import React from 'react';

import PostQuestions from '@/features/Game/components/Quiz/PostQuestions';
import PreQuestions from '@/features/Game/components/Quiz/PreQuestions';
import Questions from '@/features/Game/components/Quiz/Questions';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';

const Quiz = () => {
  const { activeStep } = useQuizContext();

  const renderQuizStep = () => {
    if (activeStep === 'pre-questions') {
      return <PreQuestions />;
    }
    if (activeStep === 'questions') {
      return <Questions />;
    }
    if (activeStep === 'post-questions') {
      return <PostQuestions />;
    } else return <div></div>;
  };

  return renderQuizStep();
};

export default Quiz;
