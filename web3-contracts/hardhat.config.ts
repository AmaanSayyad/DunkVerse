require('@nomicfoundation/hardhat-ethers');
require('@nomicfoundation/hardhat-verify');
require('dotenv').config();

const { 
  PRIVATE_KEY, 
  POLYGONSCAN_API_KEY,
  MANTLESCAN_API_KEY,
  SNOWTRACE_API_KEY,
  
  OPBNBSCAN_API_KEY,
  UNISCAN_API_KEY,
  BASESCAN_API_KEY
} = process.env;

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
    avalancheTestnet: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc', // Avalanche Testnet RPC
      chainId: 43113, // Chain ID for Avalanche Testnet
      accounts: [PRIVATE_KEY],
    },
    
    opbnbTestnet: {
      url: 'https://opbnb-testnet-rpc.bnbchain.org', // OPBNB Testnet RPC
      chainId: 5611, // Chain ID for OPBNB Testnet
      accounts: [PRIVATE_KEY],
    },
    unichainSepolia: {
      url: 'https://sepolia.unichain.org', // Unichain Sepolia Testnet RPC
      chainId: 1301, // Chain ID for Unichain Sepolia
      accounts: [PRIVATE_KEY],
    },
    baseSepolia: {
      url: 'https://sepolia.base.org/', // Base Sepolia Testnet RPC
      chainId: 84532, // Correct chain ID for Base Testnet
      accounts: [PRIVATE_KEY],
    },
    polygon: {
      url: 'https://polygon-mainnet.infura.io', // Replace with your Alchemy RPC
      chainId: 137,
      accounts: [PRIVATE_KEY],
    },
    // Add a fallback network configuration
    fallback: {
      url: 'https://polygon-mainnet.infura.io', 
      chainId: 137,
      accounts: [PRIVATE_KEY],
    },
  },
  etherscan: {
    apiKey: {
      polygon: POLYGONSCAN_API_KEY,
      mantleSepoliaTestnet: MANTLESCAN_API_KEY,
      avalancheTestnet: SNOWTRACE_API_KEY,
     
      opbnbTestnet: OPBNBSCAN_API_KEY,
      unichainSepolia: UNISCAN_API_KEY,
      baseSepolia: BASESCAN_API_KEY
    },
    customChains: [
      {
        network: 'mantleSepoliaTestnet',
        chainId: 5003,
        urls: {
          apiURL: 'https://api.sepolia.mantle.xyz',
          browserURL: 'https://sepolia.mantlescan.xyz'
        }
      },
      
      {
        network: 'opbnbTestnet',
        chainId: 5611,
        urls: {
          apiURL: 'https://api-testnet.opbnbscan.com',
          browserURL: 'https://testnet.opbnbscan.com'
        }
      },
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
          browserURL: 'https://sepolia-explorer.base.org', // Base Testnet Explorer
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
