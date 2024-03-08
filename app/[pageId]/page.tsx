import styles from './page.module.css';
import { getPage, visit } from '@/app/action/page-action';
import Preview from '@/app/[pageId]/preview';
import { Empty } from 'antd';
import Script from 'next/script';
import { JsonArray } from '@prisma/client/runtime/binary';
import { Mate } from 'next/dist/compiled/@next/font/dist/google';

export default async function Home({ params }: any) {
  const page = await getPage(params.pageId);
  if (!page) return <Empty />;
  visit(params.pageId).then();
  return (
    <>
      <title>{page.title}</title>
      <meta></meta>
      {(page.script_links as JsonArray | undefined)?.map((link: any) => (
        <Script
          key={link.link}
          src={link.link}
          id={link.link}
          strategy='beforeInteractive'></Script>
      ))}
      <Script
        id={params.pageId}
        dangerouslySetInnerHTML={{ __html: page.extra_script || '' }}></Script>
      <main className={styles.main}>
        {page ? <Preview params={params} data={page}></Preview> : <Empty />}
      </main>
    </>
  );
}
