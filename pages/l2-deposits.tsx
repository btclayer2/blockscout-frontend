import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';
export const runtime = 'experimental-edge';
const L2Deposits = dynamic(() => import('ui/pages/L2Deposits'), { ssr: false });

const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/l2-deposits">
      <L2Deposits/>
    </PageNextJs>
  );
};

export default Page;

export { L2 as getServerSideProps } from 'nextjs/getServerSideProps';
