import type { NextPage } from 'next';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

import MyProfile from 'ui/pages/MyProfile';
export const runtime = 'experimental-edge';
const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/auth/profile">
      <MyProfile/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps';
