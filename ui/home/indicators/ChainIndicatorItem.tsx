import { Text, Flex, Box, Skeleton, useColorModeValue } from '@chakra-ui/react';
import type { UseQueryResult } from '@tanstack/react-query';
import React from 'react';

import type { HomeStats } from 'types/api/stats';
import type { ChainIndicatorId } from 'types/homepage';

import type { ResourceError } from 'lib/api/resources';
import useIsMobile from 'lib/hooks/useIsMobile';

import { useGetBtcMarketCap } from '../../../lib/web3/useGetBtcMarketCap';

interface Props {
  id: ChainIndicatorId;
  title: string;
  value: (stats: HomeStats) => string;
  icon: React.ReactNode;
  isSelected: boolean;
  onClick: (id: ChainIndicatorId) => void;
  stats: UseQueryResult<HomeStats, ResourceError<unknown>>;
}

const ChainIndicatorItem = ({ id, title, value, icon, isSelected, onClick, stats }: Props) => {
  const isMobile = useIsMobile();
  const { data: btcMarketCap, loading: loadingBtcMarketCap } = useGetBtcMarketCap();

  const activeBgColorDesktop = useColorModeValue('white', 'gray.900');
  const activeBgColorMobile = useColorModeValue('white', 'black');
  const activeBgColor = isMobile ? activeBgColorMobile : activeBgColorDesktop;

  const handleClick = React.useCallback(() => {
    if (id === 'market_cap') {
      return;
    }
    onClick(id);
  }, [ id, onClick ]);

  const valueContent = (() => {
    if (isMobile) {
      return null;
    }

    if (stats.isPending || (id === 'market_cap' && loadingBtcMarketCap)) {
      return (
        <Skeleton
          h={ 3 }
          w="70px"
          my={ 1.5 }
          // ssr: isMobile = undefined, isLoading = true
          display={{ base: 'none', lg: 'block' }}
        />
      );
    }

    if (stats.isError) {
      return <Text variant="secondary" fontWeight={ 400 }>no data</Text>;
    }

    if (id === 'market_cap') {
      const formatBtcMarketCap = Number(btcMarketCap) < 1 ?
        btcMarketCap :
        Number(btcMarketCap).toLocaleString(undefined, { maximumFractionDigits: 8, notation: 'compact' });
      return <Text variant="secondary" fontWeight={ 600 }>{ formatBtcMarketCap } BTC</Text>;
    }

    return <Text variant="secondary" fontWeight={ 600 }>{ value(stats.data) }</Text>;
  })();

  return (
    <Flex
      alignItems="center"
      columnGap={ 3 }
      p={ 4 }
      as="li"
      borderRadius="md"
      cursor={ id === 'market_cap' ? 'not-allowed' : 'pointer' }
      onClick={ handleClick }
      bgColor={ isSelected ? activeBgColor : 'inherit' }
      boxShadow={ isSelected ? 'lg' : 'none' }
      zIndex={ isSelected ? 1 : 'initial' }
      _hover={{
        activeBgColor,
        zIndex: 1,
      }}
    >
      { icon }
      <Box>
        <Text fontFamily="heading" fontWeight={ 500 }>{ title }</Text>
        { valueContent }
      </Box>
    </Flex>
  );
};

export default React.memo(ChainIndicatorItem);
