import React from 'react';

import NFTThumbnail from '@/features/Game/components/NFTThumbnail';
import { user } from '@/features/Game/constants/user';

type Props = {
  setShowNFTPreview: React.Dispatch<React.SetStateAction<boolean>>;
  setNFTFlowId: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const NFTS = ({ setShowNFTPreview, setNFTFlowId }: Props) => {
  const handleNFTThumbnailClick = (NFTFlowId: string) => {
    setShowNFTPreview(true);
    setNFTFlowId(NFTFlowId);
  };

  return (
    <div className='space-y-0'>
      {user.NFTsEarned.map((NFTId, index) => {
        return (
          <NFTThumbnail
            key={index}
            NFTFlowId={NFTId}
            showPrice={true}
            onClick={() => handleNFTThumbnailClick(NFTId)}
          />
        );
      })}
    </div>
  );
};

export default NFTS;
