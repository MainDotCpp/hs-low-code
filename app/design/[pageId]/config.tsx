'use client';
import { usePageStore } from '@/store/use-page-store';
import { ProForm, ProFormGroup, ProFormText } from '@ant-design/pro-components';
import { COMPONENT_MAPPING } from '@/app/components/component-mapping';
import { Collapse, Empty, Typography } from 'antd';
import styles from './page.module.scss';
import StyleConfig from '@/app/design/[pageId]/style-config';

const Config = () => {
  const updateComponent = usePageStore((state) => state.updateComponent);
  const currentComponent = usePageStore((state) => state.currentComponent);
  if (!currentComponent) {
    return <Empty />;
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
          <div className='name'>{currentComponent.name}</div>
          <div className='id'>{currentComponent.id}</div>
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
