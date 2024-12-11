import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { AppProps } from 'next/app';
import { WagmiConfig } from 'wagmi';

import '@/styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import Layout from '@/components/layout/Layout';

import { chains, wagmiConfig } from '@/utils/wallet-utils';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains}>
            <Component {...pageProps} />
          </RainbowKitProvider>
        </WagmiConfig>
      </Layout>
    </>
  );
}

export default MyApp;
