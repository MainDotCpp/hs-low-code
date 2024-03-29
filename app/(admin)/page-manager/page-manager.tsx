'use client';
import { ActionType, ProTable } from '@ant-design/pro-components';
import Link from 'next/link';
import PageUpdateModal from '@/app/(admin)/page-manager/page-update-modal';
import { Button, message, Tag } from 'antd';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { copyPage, getPages, saveOrUpdatePage } from '@/app/action/page-action';
import LinkCopy from '@/app/(admin)/components/link-copy';
import { useRequest } from 'ahooks';
import { getDomainList } from '@/app/action/domain-action';

const PageManager = () => {
  const tableRef = useRef<ActionType>();
  const router = useRouter();
  const { data: domainList } = useRequest(getDomainList);
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
              render: (_text, record) => {
                return (
                  <>
                    <LinkCopy
                      domainList={domainList}
                      name={record.name}
                      id={record.id}
                    />
                  </>
                );
              },
            },
            {
              dataIndex: 'title',
              title: '页面标题',
              width: 200,
              ellipsis: true,
              hideInSearch: true,
            },
            {
              title: '标签',
              width: 150,
              dataIndex: 'tags',
              render: (_, record) =>
                (record.tags as string[])?.map((tag) => (
                  <Tag key={tag}>{tag}</Tag>
                )),
            },
            {
              title: '备注',
              dataIndex: 'remark',
              width: 200,
              ellipsis: true,
            },
            {
              dataIndex: 'ban_count',
              title: '阻止进入',
              width: 80,
              hideInSearch: true,
            },
            {
              dataIndex: 'access_count',
              width: 80,
              title: '访问数量',
              hideInSearch: true,
            },
            {
              dataIndex: 'click_link_count',
              width: 100,
              title: '点击链接数量',
              hideInSearch: true,
            },
            {
              width: 400,
              title: '操作',
              fixed: 'right',
              valueType: 'option',
              render: (_, record) => {
                return (
                  <>
                    <PageUpdateModal id={record.id} onSuccess={onUpdatePage}>
                      <Button type='link'>编辑</Button>
                    </PageUpdateModal>
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
                    <Button
                      type='link'
                      onClick={() => {
                        router.push(`/page-analysis/${record.id}`);
                      }}>
                      访问记录
                    </Button>
                    <Button
                      type='link'
                      danger
                      onClick={async () => {
                        await saveOrUpdatePage({ id: record.id, status: 0 });
                        tableRef.current?.reload();
                      }}>
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
