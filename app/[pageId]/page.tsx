import styles from './page.module.css';
import { getPage, visit } from '@/app/action/page-action';
import Preview from '@/app/[pageId]/preview';
import { Empty } from 'antd';
import Script from 'next/script';

export default async function Home({ params }: any) {
  const page = await getPage(params.pageId);
  if (!page) return <Empty />;
  visit(params.pageId).then();
  return (
    <>
      <title>{page.title}</title>
      <Script
        id={params.pageId}
        dangerouslySetInnerHTML={{ __html: page.script || '' }}></Script>
      <main className={styles.main}>
        {page ? <Preview params={params} data={page}></Preview> : <Empty />}
      </main>
    </>
  );
}
