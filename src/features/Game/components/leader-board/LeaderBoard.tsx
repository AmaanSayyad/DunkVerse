import { Capacitor } from '@capacitor/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CiMedal } from 'react-icons/ci';
import { IoDiamondOutline } from 'react-icons/io5';
import { RiVipCrownLine } from 'react-icons/ri';
import { useAccount } from 'wagmi';

import Account from '@/components/account/Account';
import TextField from '@/components/inputs/TextField';
import Menu from '@/components/menu/Menu';
import NextImage from '@/components/NextImage';
import StoryBar from '@/components/story/StoryBar';
import Tab from '@/components/tabs/Tab';
import TabGroup from '@/components/tabs/TabGroup';
import TabPanel from '@/components/tabs/TabPanel';
import TabPanels from '@/components/tabs/TabPanels';
import Tabs from '@/components/tabs/Tabs';

import { storyData } from '@/constants/mocks/storiesMock';
import NFTS from '@/features/Game/components/leader-board/NFTS';
import NFTPreview from '@/features/Game/components/NFTpreview/NFTPreview';
import NFTThumbnail from '@/features/Game/components/NFTThumbnail';
import LeaderBoardTable from '@/features/Game/components/Quiz/leader-board-table/LeaderBoardTable';
import { categories } from '@/features/Game/constants/categories';

const LeaderBoard = () => {
  const [showNFTPreview, setShowNFTPreview] = useState(false);
  const [NFTFlowId, setNFTFlowId] = useState<string | undefined>();
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const { address, isConnected } = useAccount(); // Get the wallet address
  useEffect(() => {
    // Load previously uploaded videos for this wallet from localStorage
    const storedVideos = JSON.parse(
      localStorage.getItem('uploadedVideos') || '{}'
    );
    if (address && storedVideos[address]) {
      setUploadedVideos(storedVideos[address]);
    }
  }, [address]);

  const main = () => {
    return (
      <div>
        <div
          className={
            Capacitor.isNativePlatform()
              ? 'sticky top-0 z-[999] flex flex-col bg-dark pb-4'
              : 'flex flex-col gap-4 '
          }
        >
          <div className='flex items-center justify-between p-2'>
            {isConnected && (
              <NextImage
                src='/images/demo-profile.png'
                alt='Image placeholder'
                className='relative h-14 w-14 rounded-full border-2 border-primary-500'
                imgClassName='object-cover rounded-full'
                fill
              />
            )}

            <ConnectButton />
          </div>

          <div className='mx-auto w-[85vw] mobile-demo:w-[450px]'>
            <TextField
              startAdornment='search'
              placeHolder='Search by player or team'
            />
          </div>
        </div>

        {/* StoryBar below the search bar */}
        <StoryBar stories={storyData} />

        {/* Tab List */}
        <div className='!mt-5 flex flex-col items-center gap-4 overflow-hidden mobile-m:flex-row'>
          {categories.map((category, index) => (
            <Tab
              key={index}
              className='flex w-48 rounded-full border-2 border-primary-500 p-2 hover:bg-primary-500'
            >
              <div className='flex h-full w-full items-center justify-center'>
                {category.image}
              </div>
            </Tab>
          ))}
        </div>
        {/* {Capacitor.getPlatform() === 'ios' ? (
          <div
            className='sticky top-0 z-[999] flex w-full bg-dark pb-4'
            style={{
              paddingTop: 'calc(2px + env(safe-area-inset-top))',
            }}
          >
            <div className='w-[85vw] mobile-demo:w-[450px]'>
              <div className='flex w-full items-center justify-center gap-1'>
                <div className='flex w-full items-center justify-center gap-2'>
                  <span className='text-2xl text-primary-500'>
                    <CiMedal />
                  </span>
                  <span className='text-gradient-primary font-primary text-lg font-bold'>
                    REWARDS
                  </span>
                </div>
                <Currency />
              </div>
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-center gap-1 py-4'>
            <div className='flex w-full items-center justify-center gap-2'>
              <span className='text-2xl text-primary-500'>
                <CiMedal />
              </span>
              <span className='text-gradient-primary font-primary text-lg font-bold'>
                REWARDS
              </span>
            </div>
            <Currency />
          </div>
        )} */}

        <TabGroup>
          {Capacitor.getPlatform() === 'ios' ? (
            <Tabs className='m-6 mx-auto w-full'>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <IoDiamondOutline />
                  </span>
                  <span className='font-bold'>NFTs</span>
                </div>
              </Tab>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <RiVipCrownLine />
                  </span>
                  <span className='font-bold'>Leaderboard</span>
                </div>
              </Tab>
            </Tabs>
          ) : (
            <Tabs className='m-10 mx-auto w-full'>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <IoDiamondOutline />
                  </span>
                  <span className='font-bold'>NFTs</span>
                </div>
              </Tab>
              <Tab>
                <div className='flex justify-center gap-2'>
                  <span className='text-xl'>
                    <RiVipCrownLine />
                  </span>
                  <span className='font-bold'>Leaderboard</span>
                </div>
              </Tab>
            </Tabs>
          )}
          <TabPanels>
            <TabPanel>
              <NFTS
                setShowNFTPreview={setShowNFTPreview}
                setNFTFlowId={setNFTFlowId}
              />

              {/* Display Uploaded Videos */}
              {uploadedVideos.length > 0 && (
                <div className='mx-auto my-10 overflow-hidden rounded-2xl sm:w-[26rem] sm:max-w-lg'>
                  <div className='mt-4 flex flex-col items-center gap-6'>
                    {uploadedVideos.map((video, index) => (
                      // <video
                      //   key={index}
                      //   controls
                      //   autoPlay
                      //   src={video}
                      //   className='rounded-lg shadow-lg'
                      //   style={{
                      //     width: '80%',
                      //     maxWidth: '600px',
                      //     height: 'auto',
                      //   }}
                      // />

                      <NFTThumbnail
                        key={index}
                        NFTFlowId='3208'
                        showPrice={true}
                        // onClick={() => handleNFTThumbnailClick(NFTId)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </TabPanel>
            <TabPanel>
              <Account />
              <LeaderBoardTable
                className='mt-8'
                figureClassName='border-transparent'
              />
            </TabPanel>
          </TabPanels>
        </TabGroup>
        {createPortal(<Menu />, document.body)}
      </div>
    );
  };

  const renderLeaderBoard = () => {
    if (showNFTPreview && NFTFlowId) {
      return (
        <NFTPreview
          setShowNFTPreview={setShowNFTPreview}
          NFTFlowId={NFTFlowId}
        />
      );
    }
    return main();
  };

  return renderLeaderBoard();
};

export default LeaderBoard;
