// // quickstart.ts
// import { MetaMaskSDK } from '@metamask/sdk';
// import { Address, createPublicClient, http, parseEther } from 'viem';
// import { sepolia } from 'viem/chains';
// import { configureChains, createConfig } from 'wagmi';
// import { MetaMaskConnector } from 'wagmi/connectors/metaMask';

// const metaMaskSDK = new MetaMaskSDK({
//   dappMetadata: {
//     name: 'My Dapp',
//     url: window.location.href,
//   },
// });

// export const ethereum = metaMaskSDK.getProvider();

// const { chains, publicClient } = configureChains([sepolia], [
//   (chain) => ({
//     chain,
//     rpcUrls: {
//       http: {
//         http: chain.rpcUrls.default.http[0],
//       },
//       public: {
//         http: [chain.rpcUrls.default.http[0]],
//       },
//     },
//   }),
// ]);

// export const config = createConfig({
//   autoConnect: true,
//   connectors: [new MetaMaskConnector({ chains })],
//   publicClient,
// });

// export async function connectMetaMask() {
//   try {
//     const accounts = await ethereum.request({
//       method: 'eth_requestAccounts',
//     });
//     return accounts[0];
//   } catch (error) {
//     // console.error('Error connecting to MetaMask', error);
//     throw error;
//   }
// }

// export async function createDelegation(
//   delegator: Address,
//   delegateAddress: Address,
//   chainId: number
// ) {
//   createPublicClient({
//     chain: sepolia,
//     transport: http(),
//   });

//   // This is a simplified version - you'll need to implement your own delegation logic
//   // based on your smart contract
//   const delegation = {
//     delegator,
//     delegate: delegateAddress,
//     // delegator: Address;
//     permissions: {
//       value: parseEther('0'),
//       target: '0x0000000000000000000000000000000000000000' as Address,
//       data: '0x',
//     },
//     chainId,
//   };

//   return delegation;
// }

// export async function executeOnBehalfOfDelegator(
//   delegate: Address,
//   delegation: {
//     // nonce?: number
//     delegate: Address;
//     permissions: {
//       value: ReturnType<typeof parseEther>;
//       target: Address;
//       data: string;
//     };
//     chainId: number;
//   },
//   _nonce?: number
// ) {
//   const _client = createPublicClient({
//     chain: sepolia,
//     transport: http(),
//   });

//   // This would need to be implemented based on your smart contract's logic
//   // This is just a placeholder structure
//   return {
//     to: delegation.permissions.target,
//     value: delegation.permissions.value,
//     data: delegation.permissions.data,
//     delegate,
//     // delegator: delegation.delegator,
//   };
// }
