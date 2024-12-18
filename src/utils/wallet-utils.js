import { getDefaultWallets } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig } from 'wagmi';
import { mantleSepoliaTestnet, baseSepolia, polygon, unichainSepolia } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

// Configure chains and providers
const { chains, publicClient } = configureChains(
  [mantleSepoliaTestnet, polygon, baseSepolia, unichainSepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id === mantleSepoliaTestnet.id) {
          // Mantle Sepolia Testnet
          return {
            http: 'https://rpc.sepolia.mantle.xyz',
          };
        } else if (chain.id === polygon.id) {
          // Polygon Mainnet
          return {
            http: 'https://polygon-mainnet.infura.io',
          };
        } else if (chain.id === baseSepolia.id) {
          // Base Sepolia
          return {
            http: 'https://rpc.base-sepolia.org',
          };
        } else if (chain.id === unichainSepolia.id) {
          // Unichain Sepolia
          return {
            http: 'https://sepolia.unichain.org',
          };
        }
      },
    }),
  ]
);

// Configure wallet connectors
const { connectors } = getDefaultWallets({
  appName: 'DunkVerse',
  projectId: '87106bd465234d097b8a51ba585bf799',
  chains,
});

// Create Wagmi configuration
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains, wagmiConfig };
