import PostQuestions from '@/features/Game/components/Quiz/PostQuestions';

import { Player } from '@/types/types';

// NFTInfo it's a type for the quiz
export type NFTInfo = {
  NFTId: string;
  NFTName: string;
  NFTDescription: string;
  NFTTotalPrice: string | undefined;
  NFTVideoSrc: string | undefined;
  maxBet?: string;
  version?: string;
};

export type PreQuestions = {
  NFTFlowId: string;
  categoryImage: JSX.Element;
  requiredBet: string;
  players: Player[];
};

export type Quiz = {
  activeStep: 'pre-questions' | 'questions' | 'post-questions';
  preQuestions: PreQuestions;
  // TODO: Move the questions to a DB
  questions: Question[];

  PostQuestions?: PostQuestions;
};

export type Question = {
  question: string;
  options: string[];
  answer: string;
};

export type PostQuestions = {
  placeholder: undefined;
};
