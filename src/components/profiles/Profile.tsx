import { Capacitor } from '@capacitor/core';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAccount } from 'wagmi';

import Menu from '@/components/menu/Menu';
import NextImage from '@/components/NextImage';

const Profile = () => {
  const { address } = useAccount(); // Get the wallet address
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load previously uploaded videos for this wallet from localStorage
    const storedVideos = JSON.parse(
      localStorage.getItem('uploadedVideos') || '{}'
    );
    if (address && storedVideos[address]) {
      setUploadedVideos(storedVideos[address]);
    }
  }, [address]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setVideoFile(file);
  };

  const uploadToPinata = async () => {
    if (!videoFile || !address)
      return alert('Please select a file and connect your wallet.');

    const apiKey = '6adf22f6dd83ab814774';
    const apiSecret =
      '775e45eaadd7fb32554eabf4dd0e7090c70f79dbec51e99cc6fe121f26f270de';

    const formData = new FormData();
    formData.append('file', videoFile);

    try {
      setLoading(true);
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinFileToIPFS',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            pinata_api_key: apiKey,
            pinata_secret_api_key: apiSecret,
          },
        }
      );

      const fileHash = response.data.IpfsHash;
      const videoURL = `https://gateway.pinata.cloud/ipfs/${fileHash}`;

      // Save video URL and wallet address association in localStorage
      const storedVideos = JSON.parse(
        localStorage.getItem('uploadedVideos') || '{}'
      );
      if (!storedVideos[address]) storedVideos[address] = [];
      storedVideos[address].push(videoURL);
      localStorage.setItem('uploadedVideos', JSON.stringify(storedVideos));

      setUploadedVideos((prev) => [...prev, videoURL]);
      alert('File uploaded successfully!');
      setLoading(false);
    } catch (error) {
      if (error instanceof Error) {
        alert('Error uploading file: ' + error.message);
      } else {
        alert('Error uploading file');
      }
      alert('Failed to upload the file to Pinata.');
      setLoading(false);
    }
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}....${address.slice(-4)}`;
  };

  return (
    <div className='flex min-h-screen flex-col overflow-hidden text-white' style={{ backgroundColor: 'transparent' }}>
      {Capacitor.getPlatform() === 'ios' ? (
        <div style={{ paddingTop: 'calc(2px + env(safe-area-inset-top))' }}>
          <div className='absolute mt-6 flex flex-col items-center gap-3 mobile-demo:inset-center'>
            <NextImage
              src='/images/demo-profile.png'
              alt='Image placeholder'
              className='relative h-32 w-32 rounded-full border-4 border-primary-500'
              imgClassName='object-cover rounded-full'
              fill
            />
            <span className='block text-lg font-semibold'>{address ? formatAddress(address) : '.Dev'}</span>
            <ConnectButton />
          </div>
        </div>
      ) : (
        <div className='flex flex-grow flex-col items-center gap-3 overflow-y-auto px-4'>
          <NextImage
            src='/images/demo-profile.png'
            alt='Image placeholder'
            className='relative h-32 w-32 rounded-full border-4 border-primary-500'
            imgClassName='object-cover rounded-full'
            fill
          />
          <span className='block text-lg font-semibold'>{address ? formatAddress(address) : '.Dev'}</span>
          <ConnectButton showBalance={false} />
          <div className='space-y-6 px-6 py-8 w-full max-w-lg'>
            <div className='relative rounded bg-primary-500 py-5 pl-8 text-xl font-semibold uppercase tracking-wider text-white'>
              Upload Files
            </div>
            <div className='flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 px-6 py-8 bg-gray-800'>
              <input
                type='file'
                onChange={handleFileUpload}
                className='mb-4 cursor-pointer text-sm text-gray-500 file:mr-4 file:rounded-md file:border-none file:bg-gray-700 file:px-4 file:py-2 file:text-white hover:file:bg-gray-600'
              />
              <button
                onClick={uploadToPinata}
                className={`mt-4 w-full rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading ? 'cursor-not-allowed opacity-70' : ''
                }`}
                disabled={loading}
              >
                {loading ? 'Uploading...' : 'Mint NFT'}
              </button>
            </div>
          </div>

          {/* Display Uploaded Videos */}
          {uploadedVideos.length > 0 && (
            <div className='mx-auto my-10 overflow-hidden rounded-2xl sm:w-[26rem] sm:max-w-lg'>
              <div className='relative bg-primary-500 py-5 pl-8 text-center text-xl font-semibold uppercase tracking-wider text-white'>
                Uploaded Videos
              </div>
              <div className='mt-4 flex flex-col items-center gap-6'>
                {uploadedVideos.map((video, index) => (
                  <video
                    key={index}
                    controls
                    autoPlay
                    src={video}
                    className='rounded-lg shadow-lg'
                    style={{ width: '80%', maxWidth: '600px', height: 'auto' }}
                  ></video>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      {createPortal(<Menu />, document.body)}
    </div>
  );
};

export default Profile;