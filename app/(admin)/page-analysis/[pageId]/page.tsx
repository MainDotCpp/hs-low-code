'use client';
import VisitTable from '@/app/(admin)/page-analysis/[pageId]/visit-table';
import VisitCharts from '@/app/(admin)/page-analysis/[pageId]/visit-charts';
import { Button, Divider } from 'antd';
import { LeftCircleFilled } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

export default function Page({ params }: any) {
  const router = useRouter();
  return (
    <>
      <div className='grid grid-cols-12  gap-2'>
        <div className='col-span-12  bg-white flex px-4 py-2  items-center shadow fixed w-full z-20 top-0 left-0'>
          <Button
            type='text'
            icon={<LeftCircleFilled />}
            onClick={() => router.back()}>
            返回
          </Button>
          <Divider type='vertical' />
          <div className='text-lg font-bold'>页面访问记录</div>
          <div className='text-xs self-end ml-2 text-black/80'>
            {params.pageId}
          </div>
        </div>
        <div className='col-span-12 h-8'></div>
        <div className='col-span-8 h-full w-full'>
          <VisitTable pageId={params.pageId} />
        </div>
        <div className='col-span-4'>
          <VisitCharts pageId={params.pageId} />
        </div>
      </div>
    </>
  );
}
