import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';

import { usePolkadotApi } from '../contexts/polkadot';

/* eslint-disable */
const BTC_DECIMAL = process.env.BTC_DECIMAL || 8;

export const useGetBtcMarketCap = (): { data: string; loading: boolean } => {
  const { api, isApiReady } = usePolkadotApi();
  const [ data, setData ] = useState<string>('0');
  const [ loading, setLoading ] = useState<boolean>(true);

  useEffect(() => {
    const getData = async() => {
      setLoading(true);
      /* eslint-disable */
      const res = await api?.query.xBtcLedger.totalInComing();
      const num = new BigNumber(res?.toString() || 0).dividedBy(Math.pow(10, Number(BTC_DECIMAL))).toString()
      setData(num)
      setLoading(false)
    }

    isApiReady && getData()
  }, [isApiReady])

  return { data, loading }
}
