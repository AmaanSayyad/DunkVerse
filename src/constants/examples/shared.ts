// // examples/shared.ts
// import { Chain } from 'viem';

// export const chain: Chain = {
//   id: 11155111, // Sepolia testnet
//   name: 'Sepolia',
//   nativeCurrency: {
//     decimals: 18,
//     name: 'Sepolia Ether',
//     symbol: 'SEP',
//   },
//   rpcUrls: {
//     default: {
//       http: ['https://rpc.sepolia.org'],
//     },
//     public: {
//       http: ['https://rpc.sepolia.org'],
//     },
//   },
//   blockExplorers: {
//     default: {
//       name: 'Sepolia Etherscan',
//       url: 'https://sepolia.etherscan.io',
//     },
//   },
//   testnet: true,
// };

// export const getExplorerUserOperationLink = (userOpHash: string): string => {
//   return chain.blockExplorers
//     ? `${chain.blockExplorers.default.url}/tx/${userOpHash}`
//     : '';
// };

// export const getExplorerTransactionLink = (txHash: string): string => {
//   return chain.blockExplorers
//     ? `${chain.blockExplorers.default.url}/tx/${txHash}`
//     : '';
// };

// export const getExplorerAddressLink = (address: string): string => {
//   return chain.blockExplorers
//     ? `${chain.blockExplorers.default.url}/address/${address}`
//     : '';
// };
