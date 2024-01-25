import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

export const runtime = 'experimental-edge';

import PageNextJs from 'nextjs/PageNextJs';
export const runtime = 'experimental-edge';
const CustomAbi = dynamic(() => import('ui/pages/CustomAbi'), { ssr: false });

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/account/custom-abi">
      <CustomAbi/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps';
