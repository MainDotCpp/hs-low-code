import Image from 'next/image';
import styles from './page.module.css';
import Render from '@/app/components/render';
import { getPage } from '@/app/action/page-action';
import Preview from '@/app/[pageId]/preview';
import { Empty } from 'antd';

export default async function Home({ params }: any) {
  const page = await getPage(params.pageId);
  if (!page) return <Empty />;
  return (
    <>
      <title>{page.title}</title>
      <main className={styles.main}>
        {page ? <Preview data={page.content as any}></Preview> : <Empty />}
      </main>
    </>
  );
}
