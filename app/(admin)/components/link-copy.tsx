// @ts-nocheck
import { Dropdown, MenuProps, message, Space } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { t_domain } from 'prisma-client-1ce96e0fbe8c36aa31310b3a0d88982f3bbd2006586d0d486aea13ce697493d1';

const LinkCopy = ({
  id,
  name,
  domainList,
}: {
  id: string;
  name?: string | null;
  domainList?: t_domain[];
}) => {
  const onClick: MenuProps['onClick'] = async ({ key }) => {
    let link = `https://${key}/${id}`;
    await navigator.clipboard.writeText(link);
    message.success(`落地页链接[${link}]已复制到剪贴板`);
  };

  return (
    <Dropdown
      menu={{
        items:
          domainList?.map((domain) => ({
            key: domain.domain,
            label: domain.domain,
          })) || [],
        onClick,
      }}>
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
