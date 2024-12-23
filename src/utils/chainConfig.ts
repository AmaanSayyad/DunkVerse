export const ChainId = {
  MANTLE_TESTNET: 5003,
  AVALANCHE_TESTNET: 43113,
  OPBNB_TESTNET: 5611,
  POLYGON_MAINNET: 137,
  BASE_TESTNET: 84532,
  UNICHAIN_SEPOLIA: 1301, 
};

export const supportedChains = [
  ChainId.MANTLE_TESTNET,
  ChainId.AVALANCHE_TESTNET,
  ChainId.OPBNB_TESTNET,
  ChainId.POLYGON_MAINNET,
  ChainId.BASE_TESTNET,
  ChainId.UNICHAIN_SEPOLIA, 
];

export const getRPCProvider = (chainId: number): string => {
  switch (chainId) {
    case ChainId.MANTLE_TESTNET:
      return "https://rpc.sepolia.mantle.xyz";
    case ChainId.AVALANCHE_TESTNET:
      return "https://api.avax-test.network/ext/bc/C/rpc";
    case ChainId.OPBNB_TESTNET:
      return "https://opbnb-testnet-rpc.bnbchain.org";
    case ChainId.POLYGON_MAINNET:
      return "https://polygon-mainnet.infura.io";
    case ChainId.BASE_TESTNET:
      return "https://sepolia.base.org";
    case ChainId.UNICHAIN_SEPOLIA:
      return "https://sepolia.unichain.org";
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};

export const getExplorer = (chainId: number): string => {
  switch (chainId) {
    case ChainId.MANTLE_TESTNET:
      return "https://sepolia.mantlescan.xyz/";
    case ChainId.AVALANCHE_TESTNET:
      return "https://testnet.snowscan.xyz";
    case ChainId.OPBNB_TESTNET:
      return "https://testnet.opbnbscan.com";
    case ChainId.POLYGON_MAINNET:
      return "https://polygonscan.com";
    case ChainId.BASE_TESTNET:
      return "https://sepolia-explorer.base.org";
    case ChainId.UNICHAIN_SEPOLIA:
      return "https://sepolia.uniscan.xyz";
    default:
      throw new Error(`Unsupported chain ID: ${chainId}`);
  }
};