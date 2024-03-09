import VisitTable from '@/app/(admin)/page-analysis/[pageId]/visit-table';

export default function Page() {
  return (
    <>
      <div className='grid grid-cols-12 h-full gap-2'>
        <div className='col-span-3 h-full w-full'>
          <VisitTable />
        </div>
      </div>
    </>
  );
}
