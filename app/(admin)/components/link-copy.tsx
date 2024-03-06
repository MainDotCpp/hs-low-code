// @ts-nocheck
import { Dropdown, MenuProps, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { getDomainList } from '@/app/action/domain-action';
import { useRequest } from 'ahooks';

const LinkCopy = ({ id, name }: { id: string; name?: string | null }) => {
  const { data: items } = useRequest(async () => {
    let domainList = await getDomainList();
    return domainList.map((domain) => ({
      key: domain.id,
      label: domain.domain,
    }));
  });
  const onClick: MenuProps['onClick'] = async ({ key }) => {
    const item = items.find((item) => item.key === key);
    let link = `http://${item?.label}/${id}`;
    await navigator.clipboard.writeText(link);
    message.success(`落地页链接[${link}]已复制到剪贴板`);
  };

  return (
    <Dropdown menu={{ items, onClick }}>
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
