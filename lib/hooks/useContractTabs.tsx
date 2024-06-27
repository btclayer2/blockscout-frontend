import React from 'react';

import type { Address } from 'types/api/address';

import ContractCode from 'ui/address/contract/ContractCode';
import ContractRead from 'ui/address/contract/ContractRead';
import ContractWrite from 'ui/address/contract/ContractWrite';

import { CUSTOM_ABI } from '../../stubs/account';
import { divideAbiIntoMethodTypes } from '../../ui/address/contract/divideAbiIntoMethodTypes';
import useApiQuery from '../api/useApiQuery';

export default function useContractTabs(data: Address | undefined) {
  const contractQuery = useApiQuery('contract', {
    pathParams: { hash: data?.hash },
    queryOptions: {
      enabled: Boolean(data?.hash),
    },
  });

  const customAbiQuery = useApiQuery('custom_abi', {
    queryOptions: {
      placeholderData: Array(3).fill(CUSTOM_ABI),
    },
  });

  const methods = React.useMemo(() => divideAbiIntoMethodTypes(contractQuery.data?.abi ?? []), [ contractQuery.data?.abi ]);

  const verifiedImplementations = React.useMemo(() => {
    return data?.implementations?.filter(({ name, address }) => name && address && address !== data?.hash) || [];
  }, [ data?.hash, data?.implementations ]);

  const methodsCustomAbi = React.useMemo(() => {
    return divideAbiIntoMethodTypes(
      customAbiQuery.data
        ?.find((item) => data && item.contract_address_hash.toLowerCase() === data.hash.toLowerCase())
        ?.abi ??
      [],
    );
  }, [ customAbiQuery.data, data ]);

  return React.useMemo(() => {
    return [
      { id: 'contact_code', title: 'Code', component: <ContractCode addressHash={ data?.hash }/> },
      // this is not implemented in api yet
      // data?.has_decompiled_code ?
      //   { id: 'contact_decompiled_code', title: 'Decompiled code', component: <div>Decompiled code</div> } :
      //   undefined,
      methods.read.length > 0 ?
        { id: 'read_contract', title: 'Read contract', component: <ContractRead/> } :
        undefined,
      verifiedImplementations.length > 0 ?
        { id: 'read_proxy', title: 'Read proxy', component: <ContractRead/> } :
        undefined,
      methodsCustomAbi.read.length > 0 ?
        { id: 'read_custom_methods', title: 'Read custom', component: <ContractRead/> } :
        undefined,
      methods.write.length > 0 ?
        { id: 'write_contract', title: 'Write contract', component: <ContractWrite/> } :
        undefined,
      verifiedImplementations.length > 0 ?
        { id: 'write_proxy', title: 'Write proxy', component: <ContractWrite/> } :
        undefined,
      methodsCustomAbi.write.length > 0 ?
        { id: 'write_custom_methods', title: 'Write custom', component: <ContractWrite/> } :
        undefined,
    ].filter(Boolean);
  }, [ data?.hash, verifiedImplementations, methods.read, methods.write, methodsCustomAbi.read, methodsCustomAbi.write ]);
}
