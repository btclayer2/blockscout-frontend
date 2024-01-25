import type { NextPage } from 'next';
import React from 'react';

import PageNextJs from 'nextjs/PageNextJs';

import UnverifiedEmail from 'ui/pages/UnverifiedEmail';
export const runtime = 'experimental-edge';
const Page: NextPage = () => {
  return (
    <PageNextJs pathname="/auth/unverified-email">
      <UnverifiedEmail/>
    </PageNextJs>
  );
};

export default Page;

export { account as getServerSideProps } from 'nextjs/getServerSideProps';
