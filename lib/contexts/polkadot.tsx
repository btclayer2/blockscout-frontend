import { WsProvider, ApiPromise } from '@polkadot/api';
import React, { useEffect, useState, useContext } from 'react';

import { BEVM_TYPES } from '../../configs/app/polkadot/bevm_types';
import { TypeRegistry } from '@polkadot/types/create';

import { BEVM_RPC } from '../../configs/app/polkadot/bevm_rpc';

const BEVM_TESTNET_WSS = 'wss://testnet.bevm.io/ws';

interface ApiProps {
  api: ApiPromise | null;
  isApiReady: boolean;
}

export const PolkadotApiContext = React.createContext<ApiProps>({} as unknown as ApiProps);

export const PolkadotApiProvider = ({ children }: { children: React.ReactNode}) => {
  const [ isApiReady, setIsApiReady ] = useState<boolean>(false);
  const [ api, setApi ] = useState<ApiPromise | null>(null);

  useEffect(() => {
    const provider = new WsProvider(BEVM_TESTNET_WSS);

    const apiProvider = new ApiPromise({
      provider,
      registry: new TypeRegistry(),
      types: { ...BEVM_TYPES },
      rpc: BEVM_RPC,
    });
    apiProvider.on('connected', () => {
      // console.log('connect wss', BEVM_TESTNET_WSS)
    });
    apiProvider.on('disconnected', () => setIsApiReady(false));
    // apiProvider.on('error', (error: Error) => console.error(error.message))
    apiProvider.on('ready', (): void => {
      setApi(apiProvider);
      setIsApiReady(true);
    });
  }, []);

  return (
    <PolkadotApiContext.Provider value={{ api, isApiReady }}>
      { children }
    </PolkadotApiContext.Provider>
  );
};

export const usePolkadotApi = (): ApiPromise => {
  return useContext(PolkadotApiContext);
};
