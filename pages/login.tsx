import type { NextPage } from 'next';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

import Login from 'ui/pages/Login';
export const runtime = 'experimental-edge';
const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/login">
      <Login/>
    </PageNextJs>
  );
};

export default Page;

export { base as getServerSideProps } from 'nextjs/getServerSideProps';
