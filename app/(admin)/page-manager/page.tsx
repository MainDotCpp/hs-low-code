'use server';
import PageManager from '@/app/(admin)/page-manager/page-manager';
import { getPages } from '@/app/action/page-action';

const Page = async () => {
  return (
    <>
      <PageManager></PageManager>
    </>
  );
};

export default Page;
