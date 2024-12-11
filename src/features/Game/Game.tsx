import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { useAccount } from 'wagmi';

import Carousel from '@/components/carousel/Carousel';
import Menu from '@/components/menu/Menu';
import Profile from '@/components/profiles/Profile';
import TabGroup from '@/components/tabs/TabGroup';
import TabPanel from '@/components/tabs/TabPanel';

import LeaderBoard from '@/features/Game/components/leader-board/LeaderBoard';
import Payment from '@/features/Game/components/payment/Payment';
import InviteFriends from '@/features/Game/components/Quiz/InviteFriends';
import PlayersInfiniteScroll from '@/features/Game/components/Quiz/PlayersInfiniteScroll';
import Quiz from '@/features/Game/components/Quiz/Quiz';
import QuizCard from '@/features/Game/components/Quiz/QuizCard';
import { NFTs } from '@/features/Game/constants/NFTs';
import { players } from '@/features/Game/constants/players';
import { questions } from '@/features/Game/constants/questions';
import {
  tierQuizzes,
  trendingQuizzes,
} from '@/features/Game/constants/quizzes';
import { useQuizContext } from '@/features/Game/contexts/QuizContext';
import { useTabsContext } from '@/features/Game/contexts/TabsContext';

const Game = () => {
  useAccount();
  const {
    setActiveStep: setActiveQuizStep,
    setPreQuestions,
    setQuestions,
    setActiveQuiz,
    activeQuiz,
  } = useQuizContext();
  const [showInviteFriends, setShowInviteFriends] = useState(false); // Track invite modal
  const { selectedTab } = useTabsContext();

  const handleTrendingQuizClick = (quizIdentifier: string) => {
    setActiveQuiz(true);
    setActiveQuizStep('pre-questions');

    const category = trendingQuizzes[quizIdentifier].category;
    const NFTInfo =
      NFTs[category.player?.name || category.team?.name || 'LeBron James'];

    setPreQuestions({
      NFTFlowId: NFTInfo[Math.floor(Math.random() * NFTInfo.length)],
      players: players,
      requiredBet: trendingQuizzes[quizIdentifier].entryPrice,
      categoryImage: trendingQuizzes[quizIdentifier].image,
    });

    setQuestions(
      questions[category.player?.name || category.team?.name || 'LeBron James']
    );
  };

  const handleTierQuizClick = (quizIdentifier: string) => {
    setActiveQuiz(true);
    setActiveQuizStep('pre-questions');

    const category = tierQuizzes[quizIdentifier].category;
    const NFTInfo =
      NFTs[category.player?.name || category.team?.name || 'Lebron James'];

    setPreQuestions({
      NFTFlowId: NFTInfo[Math.floor(Math.random() * NFTInfo.length)],
      players: players,
      requiredBet: tierQuizzes[quizIdentifier].entryPrice,
      categoryImage: tierQuizzes[quizIdentifier].image,
    });

    setQuestions(
      questions[category.player?.name || category.team?.name || 'Lebron James']
    );
  };

  const home = () => {
    return (
      <>
        <section className='mb-3 max-w-[95vw] space-y-9 mobile-demo:w-[450px]'>
me
          {/* Trending and Tier Quizzes */}
          <TabPanel className='space-y-9'>
            <div>
              <h2>Trending Quiz Bets</h2>
              <Carousel
                indicators={false}
                className='left-2/4 w-screen -translate-x-2/4 items-center justify-center child:gap-2 mobile-demo:w-[500px]'
              >
                {Object.keys(trendingQuizzes).map((quizIdentifier, index) => (
                  <QuizCard
                    key={index}
                    players={trendingQuizzes[quizIdentifier].players}
                    title={trendingQuizzes[quizIdentifier].title}
                    image={trendingQuizzes[quizIdentifier].image}
                    onClick={() => handleTrendingQuizClick(quizIdentifier)}
                  />
                ))}
              </Carousel>
            </div>
            <div>
              <h2>By Tier Quiz Bets</h2>
              <Carousel
                indicators={false}
                className='left-2/4 w-screen -translate-x-2/4 items-center justify-center child:gap-2 mobile-demo:w-[500px]'
              >
                {Object.keys(tierQuizzes).map((quizIdentifier, index) => (
                  <QuizCard
                    key={index}
                    players={tierQuizzes[quizIdentifier].players}
                    title={tierQuizzes[quizIdentifier].title}
                    type={tierQuizzes[quizIdentifier].type}
                    image={tierQuizzes[quizIdentifier].image}
                    onClick={() => handleTierQuizClick(quizIdentifier)}
                  />
                ))}
              </Carousel>
            </div>

            {/* Invite Friends Section */}
            <div>
              <div className='flex items-center justify-between gap-3'>
                <h2 className='text-lg font-bold text-primary-500'>
                  Invite Friends
                </h2>
                <button
                  onClick={() => setShowInviteFriends(true)}
                  className='text-gradient-primary text-sm font-bold'
                >
                  + Invite Friends
                </button>
              </div>
              <PlayersInfiniteScroll players={players} className='mt-6' />
            </div>
          </TabPanel>
        </section>

        {/* Modal for Invite Friends */}
        {showInviteFriends && <InviteFriends setOpen={setShowInviteFriends} />}

        {createPortal(<Menu />, document.body)}
      </>
    );
  };

  const renderGame = () => {
    if (activeQuiz) return <Quiz />;
    if (showInviteFriends)
      return <InviteFriends setOpen={setShowInviteFriends} />;
    if (selectedTab === 'home') return <LeaderBoard />;
    if (selectedTab === 'leader-board') return home();
    if (selectedTab === 'payment') return <Payment />;
    if (selectedTab === 'profile') return <Profile />;
    return null;
  };

  return <TabGroup>{renderGame()}</TabGroup>;
};

export default Game;
