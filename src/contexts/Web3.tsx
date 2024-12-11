/* eslint-disable @typescript-eslint/no-explicit-any */
/*TODO: resolve explicit any */
import { FlowExtension } from '@magic-ext/flow';
import { InstanceWithExtensions, SDKBase } from '@magic-sdk/provider';
import { LoginWithMagicLinkConfiguration } from '@magic-sdk/types';
import * as fcl from '@onflow/fcl';
import { init } from '@onflow/fcl-wc';
import { Magic } from 'magic-sdk';
import router from 'next/router';
import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { NETWORK } from '@/constants/networks';
import ROUTES from '@/constants/routes';

interface IWeb3Context {
  magicConnect: (configuration: LoginWithMagicLinkConfiguration) => void;
  magicLogout: () => void;
  fclConnect: () => void;
  fclLogout: () => void;
  executeTransaction: (cadence: string, args?: any, options?: any) => void;
  executeScript: (cadence: string, args?: any) => any;
  user: {
    magic: {
      loggedIn: boolean | null;
      addr: string;
      metadata: any;
    };
    fcl: {
      loggedIn: boolean | null;
      addr: string;
    };
  };
  transaction: {
    id: string | null;
    inProgress: boolean;
    status: number | null;
    errorMessage: string;
  };
}

export const Web3Context = createContext<IWeb3Context>({} as IWeb3Context);

export const useWeb3Context = () => {
  const context = useContext(Web3Context);
  if (context === undefined) {
    throw new Error('useWeb3Context must be used within a Web3ContextProvider');
  }
  return context;
};

export const Web3ContextProvider = ({
  children,
}: {
  children: ReactNode;
  network?: string;
}) => {
  const [user, setUser] = useState<IWeb3Context['user']>({
    magic: {
      loggedIn: false,
      addr: '',
      metadata: {},
    },
    fcl: {
      loggedIn: false,
      addr: '',
    },
  });
  const [fclUser, setFclUser] = useState<IWeb3Context['user']['fcl']>({
    loggedIn: false,
    addr: '',
  });
  const [transactionInProgress, setTransactionInProgress] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<number | null>(
    null
  );
  const [transactionError, setTransactionError] = useState('');
  const [txId, setTxId] = useState(null);
  const [client, setClient] = useState(null);
  const [magicIsLoggedIn, setMagicIsLoggedIn] = useState(false);

  const wcSetup = useCallback(async (appTitle: string, iconUrl: string) => {
    const DEFAULT_APP_METADATA = {
      name: appTitle,
      description: appTitle,
      url: window.location.origin,
      icons: [iconUrl],
    };

    const { FclWcServicePlugin, client } = await init({
      projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID, // required
      metadata: DEFAULT_APP_METADATA, // optional
      includeBaseWC: true, // optional, default: false
    });

    setClient(client);
    fcl.pluginRegistry.add(FclWcServicePlugin);
  }, []);

  const magic: MutableRefObject<
    InstanceWithExtensions<SDKBase, FlowExtension[]> | undefined
  > = useRef(undefined);

  // set magic once the window object is available
  useEffect(() => {
    magic.current = new Magic(
      process.env.NEXT_PUBLIC_MAGIC_TEST_API_KEY ?? '',
      {
        extensions: [
          new FlowExtension({
            rpcUrl: NETWORK.accessApi,
            network: process.env.NEXT_PUBLIC_FLOW_ENV ?? 'testnet',
          }),
        ],
      }
    );
  }, []);

  useEffect(() => {
    const {
      flowNetwork,
      accessApi,
      walletDiscovery,
      walletDiscoveryApi,
      walletDiscoveryInclude,
      addresses,
    } = NETWORK;
    const iconUrl = window.location.origin + '/images/fanbet-logo.webp';
    const appTitle = process.env.NEXT_PUBLIC_APP_NAME || 'DunkVerse';

    fcl.config({
      'app.detail.title': appTitle,
      'app.detail.icon': iconUrl,
      'accessNode.api': accessApi, // connect to Flow
      'flow.network': flowNetwork,
      'discovery.wallet': walletDiscovery, // use wallets on public discovery
      'discovery.authn.endpoint': walletDiscoveryApi, // public discovery api endpoint
      'discovery.authn.include': walletDiscoveryInclude, // opt-in wallets
      '0xFungibleToken': addresses.FungibleToken,
      '0xFlowToken': addresses.FlowToken,
      '0xNonFungibleToken': addresses.NonFungibleToken,
      '0xMetadataViews': addresses.MetadataViews,
    });

    if (!client) {
      wcSetup(appTitle, iconUrl);
    }
  }, [client, wcSetup]);

  //#region  //*=========== magic data setup ===========
  useEffect(() => {
    magic.current?.user.isLoggedIn().then(async (magicIsLoggedIn) => {
      setMagicIsLoggedIn(magicIsLoggedIn);
    });
  }, []);

  useEffect(() => {
    const setMagicData = async () => {
      const metadata = await magic.current?.user.getMetadata();
      setUser({
        ...user,
        magic: {
          loggedIn: magicIsLoggedIn,
          addr: metadata?.publicAddress ?? '',
          metadata: await magic.current?.user.getMetadata(),
        },
      });
    };

    if (magicIsLoggedIn) {
      setMagicData();
    } else {
      setUser({ ...user, magic: { loggedIn: false, addr: '', metadata: {} } });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [magicIsLoggedIn]);
  //#endregion  //*======== magic data setup ===========

  //#region  //*=========== fcl user setup ===========
  useEffect(() => {
    setUser({ ...user, fcl: fclUser });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fclUser]);

  useEffect(() => fcl.currentUser.subscribe(setFclUser), []);
  //#endregion  //*======== fcl user setup ===========

  const fclConnect = useCallback(() => {
    fcl.authenticate();
    fcl;
  }, []);

  const fclLogout = useCallback(async () => {
    await fcl.unauthenticate();
    router.push(ROUTES.HOME);
  }, []);

  const magicConnect = useCallback(
    async (configuration: LoginWithMagicLinkConfiguration) => {
      const email = configuration.email;
      await magic.current?.auth.loginWithMagicLink({
        email,
        showUI: false,
      });
      setMagicIsLoggedIn(true);
    },
    []
  );

  const magicLogout = useCallback(async () => {
    setMagicIsLoggedIn(false);
    await magic.current?.user.logout();
  }, []);

  const executeTransaction = useCallback(
    async (cadence: string, args: any = () => [], options: any = {}) => {
      setTransactionInProgress(true);
      setTransactionStatus(-1);

      const transactionId = await fcl
        .mutate({
          cadence,
          args,
          limit: options.limit || 50,
        })
        .catch((e: Error) => {
          setTransactionInProgress(false);
          setTransactionStatus(500);
          setTransactionError(String(e));
        });

      if (transactionId) {
        setTxId(transactionId);
        fcl.tx(transactionId).subscribe((res: any) => {
          setTransactionStatus(res.status);
          setTransactionInProgress(false);
        });
      }
    },
    []
  );

  const executeScript = useCallback(
    async (cadence: string, args: any = () => []) => {
      try {
        return await fcl.query({
          cadence: cadence,
          args,
        });
      } catch (error) {
        return error;
      }
    },
    []
  );

  const providerProps = useMemo(
    () => ({
      magicConnect,
      magicLogout,
      fclConnect,
      fclLogout,
      user,
      executeTransaction,
      executeScript,
      transaction: {
        id: txId,
        inProgress: transactionInProgress,
        status: transactionStatus,
        errorMessage: transactionError,
      },
    }),
    [
      magicConnect,
      magicLogout,
      fclConnect,
      fclLogout,
      txId,
      transactionInProgress,
      transactionStatus,
      transactionError,
      executeTransaction,
      executeScript,
      user,
    ]
  );

  return (
    <Web3Context.Provider
      value={{
        ...providerProps,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};
