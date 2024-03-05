import { mainDb } from '@/prisma/main-db';
import { PAGES_MANIFEST } from 'next/constants';
import PageManager from '@/app/(admin)/page-manager/page-manager';

const getPages = async () => {
  'use server';
  return mainDb.t_page.findMany();
};
const Page = async () => {
  const pages = await getPages();
  return (
    <>
      <PageManager pages={pages}></PageManager>
    </>
  );
};

export default Page;
