import type { NextPage } from 'next';
export const runtime = 'experimental-edge';
const Page: NextPage = () => {
  return null;
};

export default Page;

export async function getServerSideProps() {
  return {
    notFound: true,
  };
}
