import BigNumber from 'bignumber.js';
import { useState, useEffect } from 'react';

import { usePolkadotApi } from '../contexts/polkadot';

export const useGetBtcMarketCap = (): { data: string; loading: boolean } => {
  const { api, isApiReady } = usePolkadotApi();
  const [ data, setData ] = useState<string>('0');
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(() => {
    const getData = async() => {
      setLoading(true);
      /* eslint-disable */
      const res = await api.query.xBtcLedger.totalInComing();
      const num = new BigNumber(res?.toString() || 0).dividedBy(Math.pow(10, 18)).toString()
      setData(num)
      setLoading(false)
    }

    isApiReady && getData()
  }, [isApiReady])

  return { data, loading }
}
