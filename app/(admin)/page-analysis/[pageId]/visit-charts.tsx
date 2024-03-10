import VisitLineChart from '@/app/(admin)/page-analysis/[pageId]/visit-line-chart';
import { Card } from 'antd';

const VisitCharts = ({ pageId }: { pageId: string }) => {
  return (
    <div className=' grid col-span-6  '>
      <Card className='col-span-12' title='访问时序图'>
        <VisitLineChart pageId={pageId} />
      </Card>
    </div>
  );
};

export default VisitCharts;
