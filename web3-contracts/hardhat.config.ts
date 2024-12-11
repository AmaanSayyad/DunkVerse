require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

const { PRIVATE_KEY, POLYGONSCAN_API_KEY } = process.env;

// Validate environment variables
if (!PRIVATE_KEY) {
  console.error('Missing PRIVATE_KEY in .env file');
  process.exit(1);
}

if (!POLYGONSCAN_API_KEY) {
  console.warn('Missing POLYGONSCAN_API_KEY in .env file. Verification may fail.');
}

const config = {
  defaultNetwork: 'polygon',
  networks: {
    mantleSepoliaTestnet: {
      url: 'https://rpc.sepolia.mantle.xyz', // Mantle Sepolia Testnet RPC
      chainId: 5003, // Chain ID for Mantle Sepolia
      accounts: [PRIVATE_KEY],
    },
    unichainSepolia: {
      url: 'https://sepolia.unichain.org', // Unichain Sepolia Testnet RPC
      chainId: 1301, // Chain ID for Unichain Sepolia
      accounts: [PRIVATE_KEY],
    },
    baseSepolia: {
      url: 'https://sepolia.base.org/', // Base Sepolia Testnet RPC
      chainId: 84531, // Correct chain ID for Base Testnet
      accounts: [PRIVATE_KEY],
    },
    polygon: {
      url: 'https://polygon-mainnet.infura.io', // Replace with your Alchemy RPC
      chainId: 137,
      accounts: [PRIVATE_KEY],
    },
    // Add a fallback network configuration
    fallback: {
      url: 'https://rpc-mumbai.maticvigil.com', // Fallback RPC URL
      chainId: 80001, // Chain ID for Mumbai Testnet
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY, // API key for Polygon Mainnet
    },
    customChains: [
      {
        network: 'unichainSepolia',
        chainId: 1301,
        urls: {
          apiURL: 'https://api.sepolia.unichain.org', // xyz API URL
          browserURL: 'https://sepolia.uniscan.xyz', // Unichain Sepolia Explorer
        },
      },
      {
        network: 'baseSepolia',
        chainId: 84531,
        urls: {
          apiURL: 'https://api-sepolia.base.org', // xyz API URL
          browserURL: 'https://sepolia.base.org', // Base Testnet Explorer
        },
      },
    ],
  },
  solidity: {
    compilers: [
      {
        version: '0.8.20',
      },
    ],
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: 'berlin',
    },
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    artifacts: './artifacts',
  },
};

module.exports = config;
