'use client';
import { ActionType, ProTable } from '@ant-design/pro-components';
import Link from 'next/link';
import PageUpdateModal from '@/app/(admin)/page-manager/page-update-modal';
import { Button, message } from 'antd';
import { useRef } from 'react';
import { getPages } from '@/app/(admin)/page-manager/page';
import { useRouter } from 'next/navigation';
import { copyPage } from '@/app/action/page-action';
import LinkCopy from '@/app/(admin)/components/link-copy';

const PageManager = () => {
  const tableRef = useRef<ActionType>();
  const router = useRouter();
  const onUpdatePage = () => {
    tableRef.current?.reload();
  };
  return (
    <>
      <div>
        <ProTable
          actionRef={tableRef}
          scroll={{ x: 1300 }}
          search={false}
          toolbar={{
            actions: [
              <PageUpdateModal key='1' id={undefined} onSuccess={onUpdatePage}>
                <Button type='primary'>创建</Button>
              </PageUpdateModal>,
            ],
          }}
          request={async () => {
            const pages = await getPages();
            return {
              data: pages,
              success: true,
            };
          }}
          columns={[
            { dataIndex: 'id', title: 'ID', width: 300, hideInSearch: true },
            {
              dataIndex: 'name',
              title: '名称',
              width: 200,
              hideInSearch: true,
            },
            {
              dataIndex: 'title',
              title: '页面标题',
              width: 200,
              hideInSearch: true,
              render: (_text, record) => {
                return (
                  <>
                    <LinkCopy id={record.id} name={record.title} />
                  </>
                );
              },
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
              width: 300,
              title: '操作',
              fixed: 'right',
              valueType: 'option',
              render: (_, record) => {
                return (
                  <>
                    <Link href={`/design/${record.id}`}>
                      <Button type='link'>设计</Button>
                    </Link>
                    <Button
                      type='link'
                      onClick={async () => {
                        await copyPage(record.id);
                        message.success('复制成功');
                        tableRef.current?.reload();
                      }}>
                      复制
                    </Button>
                    <Button
                      type='link'
                      onClick={() => {
                        router.push(`/${record.id}`);
                      }}>
                      预览
                    </Button>
                    <Button type='link' danger>
                      删除
                    </Button>
                  </>
                );
              },
            },
          ]}></ProTable>
      </div>
    </>
  );
};

export default PageManager;
