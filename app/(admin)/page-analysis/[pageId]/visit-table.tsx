'use client';
import { ProTable } from '@ant-design/pro-components';
import { visitPage } from '@/app/action/visit-action';

export default function VisitTable({ pageId }: { pageId: string }) {
  return (
    <>
      <ProTable
        size='small'
        toolbar={{
          settings: false,
        }}
        search={false}
        request={visitPage}
        params={{ pageId }}
        scroll={{ x: 1300 }}
        columns={[
          {
            title: 'ID',
            hideInSearch: true,
            dataIndex: 'id',
            hidden: true,
          },
          ,
          {
            title: '访问时间',
            width: 150,
            hideInSearch: true,
            dataIndex: 'createAt',
            renderText: (text: string) => {
              return <span>{new Date(text).toLocaleString()}</span>;
            },
          },
          {
            title: '是否使用cloak',
            hideInSearch: true,
            width: 150,
            dataIndex: 'useCloak',
            valueEnum: {
              true: { text: '使用', status: 'Success' },
              false: { text: '未使用', status: 'Error' },
            },
          },
          {
            title: 'cloak过滤状态',
            hideInSearch: true,
            filtered: true,
            width: 150,
            filters: true,
            dataIndex: 'filterType',
            valueEnum: {
              success: { text: '放行', status: 'Success' },
              browser: { text: '浏览器异常', status: 'Error' },
              black_ip: { text: '黑名单ip', status: 'Error' },
              os: { text: '操作系统异常', status: 'Error' },
              device: { text: '设备异常', status: 'Error' },
              vpn_proxy: { text: 'vpn代理', status: 'Error' },
              country: { text: '地区异常', status: 'Error' },
              ip_clicks_per_day: { text: 'ip点击量限制', status: 'Error' },
              bot: { text: '机器人', status: 'Error' },
            },
          },
          {
            dataIndex: 'filterPage',
            filters: true,
            title: '实际访问页面',
            hideInSearch: true,
            valueEnum: {
              WHITE: { text: '白页', status: 'error' },
              OFFER: { text: '落地页', status: 'success' },
            },
          },
          {
            title: 'IP地址',
            width: 150,
            dataIndex: 'ipAddress',
          },
          {
            title: 'UserAgent',
            hideInSearch: true,
            ellipsis: true,
            dataIndex: 'userAgent',
          },
        ]}
      />
    </>
  );
}
