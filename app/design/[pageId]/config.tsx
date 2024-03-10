'use client';
import { usePageStore } from '@/store/use-page-store';
import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { COMPONENT_MAPPING } from '@/app/components/component-mapping';
import { Button, Collapse, Empty, Typography } from 'antd';
import styles from './page.module.scss';
import StyleConfig from '@/app/design/[pageId]/style-config';
import { DeleteOutlined } from '@ant-design/icons';

const Config = () => {
  const updateComponent = usePageStore((state) => state.updateComponent);
  const currentComponent = usePageStore((state) => state.currentComponent);
  const removeComponent = usePageStore((state) => state.removeComponent);
  if (!currentComponent) {
    return <Empty description='请选择一个组件' />;
  }
  // @ts-ignore
  const { Config: ComponentConfig } = COMPONENT_MAPPING[currentComponent.type];
  const collapseItems = [
    {
      key: '1',
      label: (
        <Typography.Text color='' strong>
          组件配置
        </Typography.Text>
      ),
      children: <ComponentConfig />,
    },
    {
      key: '2',
      label: (
        <Typography.Text color='' strong>
          样式配置
        </Typography.Text>
      ),
      children: <StyleConfig />,
    },
  ];
  return (
    <>
      <ProForm
        initialValues={currentComponent}
        key={currentComponent?.id}
        onValuesChange={(value) => {
          console.log(value);
          updateComponent(currentComponent.id, value);
        }}
        submitter={false}>
        <div className={styles.configHeader}>
          <div>
            <div className='name'>{currentComponent.name}</div>
            <div className='id'>{currentComponent.id}</div>
          </div>
          <div>
            <Button
              size='small'
              danger
              shape='round'
              type='primary'
              onClick={removeComponent.bind(null, currentComponent.id)}
              icon={<DeleteOutlined />}>
              删除组件
            </Button>
          </div>
        </div>
        <ProFormText name='id' label='组件ID' hidden></ProFormText>
        <ProFormText name='type' hidden></ProFormText>
        <ProFormText name='name' hidden></ProFormText>
        <Collapse items={collapseItems} defaultActiveKey={['1', '2']} />
      </ProForm>
    </>
  );
};

export default Config;
