'use client';
import { t_page } from '@prisma/client';
import { ProTable } from '@ant-design/pro-components';
import Link from 'next/link';

const PageManager = ({ pages }: { pages: t_page[] }) => {
  return (
    <>
      <div>
        <ProTable
          dataSource={pages}
          columns={[
            { dataIndex: 'id', title: 'ID', width: 300, hideInSearch: true },
            {
              dataIndex: 'title',
              title: '名称',
              width: 200,
              hideInSearch: true,
            },
            { dataIndex: 'ban_count', title: '阻止进入', hideInSearch: true },
            {
              dataIndex: 'access_count',
              title: '访问数量',
              hideInSearch: true,
            },
            {
              dataIndex: 'click_link_count',
              title: '点击链接数量',
              hideInSearch: true,
            },
            { dataIndex: 'status', title: '状态', hideInSearch: true },
            { dataIndex: 'create_at', title: '创建时间', hideInSearch: true },
            {
              dataIndex: 'id',
              title: '操作',
              valueType: 'option',
              render: (_, record) => {
                return <Link href={`/design/${record.id}`}>编辑</Link>;
              },
            },
          ]}></ProTable>
      </div>
    </>
  );
};

export default PageManager;
