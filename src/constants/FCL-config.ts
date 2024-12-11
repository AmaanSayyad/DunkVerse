import { NETWORKS } from '@/constants/networks';

const {
  flowNetwork: flowNetworkMainnet,
  accessApi: accessApiMainnet,
  walletDiscovery: walletDiscoveryMainnet,
  walletDiscoveryApi: walletDiscoveryApiMainnet,
  walletDiscoveryInclude: walletDiscoveryIncludeMainnet,
  addresses: addressesMainnet,
} = NETWORKS['mainnet' as keyof typeof NETWORKS];

const {
  flowNetwork: flowNetworkTestnet,
  accessApi: accessApiTestnet,
  walletDiscovery: walletDiscoveryTestnet,
  walletDiscoveryApi: walletDiscoveryApiTestnet,
  walletDiscoveryInclude: walletDiscoveryIncludeTestnet,
  addresses: addressesTestnet,
} = NETWORKS['testnet' as keyof typeof NETWORKS];

// const iconUrl = window.location.origin + '/images/image-placeholder.png';
const appTitle = process.env.NEXT_PUBLIC_APP_NAME || 'DunkVerse';

export const mainnetConfig = {
  'app.detail.title': appTitle,
  // 'app.detail.icon': iconUrl,
  'accessNode.api': accessApiMainnet, // connect to Flow
  'flow.network': flowNetworkMainnet,
  'discovery.wallet': walletDiscoveryMainnet, // use wallets on public discovery
  'discovery.authn.endpoint': walletDiscoveryApiMainnet, // public discovery api endpoint
  'discovery.authn.include': walletDiscoveryIncludeMainnet, // opt-in wallets
  '0xFungibleToken': addressesMainnet.FungibleToken,
  '0xFlowToken': addressesMainnet.FlowToken,
  '0xNonFungibleToken': addressesMainnet.NonFungibleToken,
  '0xMetadataViews': addressesMainnet.MetadataViews,
};

export const testnetConfig = {
  'app.detail.title': appTitle,
  // 'app.detail.icon': iconUrl,
  'accessNode.api': accessApiTestnet, // connect to Flow
  'flow.network': flowNetworkTestnet,
  'discovery.wallet': walletDiscoveryTestnet, // use wallets on public discovery
  'discovery.authn.endpoint': walletDiscoveryApiTestnet, // public discovery api endpoint
  'discovery.authn.include': walletDiscoveryIncludeTestnet, // opt-in wallets
  '0xFungibleToken': addressesTestnet.FungibleToken,
  '0xFlowToken': addressesTestnet.FlowToken,
  '0xNonFungibleToken': addressesTestnet.NonFungibleToken,
  '0xMetadataViews': addressesTestnet.MetadataViews,
};
