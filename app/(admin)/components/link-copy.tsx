// @ts-nocheck
import { Dropdown, MenuProps, message, Space, Spin } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getDomainList } from '@/app/action/domain-action';
import { useRequest } from 'ahooks';

const LinkCopy = ({ id, name }: { id: string; name?: string | null }) => {
  const { data: items, loading } = useRequest(
    async () => {
      let domainList = await getDomainList();
      return domainList.map((domain) => ({
        key: domain.id,
        label: <div>{domain.domain}</div>,
      }));
    },
    {
      cacheKey: 'domainList',
      cacheTime: 1000 * 60 * 60 * 24,
    },
  );
  const onClick: MenuProps['onClick'] = async ({ key }) => {
    const item = items.find((item) => item.key === key);
    let link = `http://${item?.label}/${id}`;
    await navigator.clipboard.writeText(link);
    message.success(`落地页链接[${link}]已复制到剪贴板`);
  };
  if (loading) {
    return <Spin />;
  }

  return (
    <Dropdown menu={{ items: items || [], onClick }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          {name || '未设置标题'}
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default LinkCopy;
