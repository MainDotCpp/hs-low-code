import { useRequest } from 'ahooks';
import { getLineChartData } from '@/app/action/visit-action';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { Spin } from 'antd';

export default function VisitLineChart({ pageId }: any) {
  const { loading, data } = useRequest(getLineChartData, {
    defaultParams: [pageId],
  });
  if (loading) return <Spin />;
  return (
    <>
      <ResponsiveContainer width='100%' height={400}>
        <BarChart data={data || []} title='访问时序图'>
          <Bar
            type='monotone'
            dataKey='ban_count'
            label='过滤次数'
            name='禁止访问次数'
            fill='#be6a15'
            stackId='a'
          />
          <Bar
            type='monotone'
            dataKey='offer_count'
            label='过滤次数'
            name='允许访问次数'
            fill='#88bef5'
            stackId='a'
          />
          <CartesianGrid stroke='#ccc' strokeDasharray='3 3' />
          <Tooltip />
          <Legend />
          <XAxis dataKey='date' />
          <Brush
            dataKey='date'
            height={30}
            startIndex={data?.length > 0 ? data?.length - 30 : 0}
            stroke='#8884d8'
          />
          <YAxis />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
