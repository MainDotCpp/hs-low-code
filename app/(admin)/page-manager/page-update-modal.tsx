import {
  ModalForm,
  ProFormDependency,
  ProFormSwitch,
} from '@ant-design/pro-form';
import React from 'react';
import { t_page } from '@prisma/client';
import {
  ProFormList,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { getPage, saveOrUpdatePage } from '@/app/action/page-action';
import { message } from 'antd';
import logger from '@/app/lib/logger';

const PageUpdateModal = ({
  id,
  children,
  onSuccess,
}: {
  id?: string;
  children: React.JSX.Element;
  onSuccess?: () => void;
}) => {
  const onFinish = async (page: t_page) => {
    await saveOrUpdatePage(page);
    message.success('保存成功');
    onSuccess && onSuccess();
    return true;
  };
  const getInitialValues = async () => {
    return id ? await getPage(id) : ({} as t_page);
  };
  return (
    <ModalForm<t_page>
      title='落地页配置'
      // @ts-ignore
      request={getInitialValues}
      initialValues={{}}
      trigger={children}
      onFinish={onFinish}>
      <ProFormText name='id' label='ID' hidden></ProFormText>
      <ProFormText name='name' label='落地页名称'></ProFormText>
      <ProFormText name='title' label='页面标题'></ProFormText>
      <ProFormSelect mode='tags' name='tags' label='标签'></ProFormSelect>
      <ProFormTextArea name='description' label='页面描述'></ProFormTextArea>
      <ProFormTextArea name='remark' label='备注'></ProFormTextArea>

      <ProFormSwitch name='use_cloak' label='使用斗蓬'></ProFormSwitch>
      <ProFormDependency name={['use_cloak']}>
        {({ use_cloak }) => {
          return use_cloak ? (
            <>
              <ProFormText
                name='cloak_label'
                label='斗蓬Flow标签'
                rules={[{ required: true }]}
                extra={
                  <a
                    href='https://cloaking.house/webmaster/streams'
                    target='_blank'>
                    斗蓬服务地址
                  </a>
                }></ProFormText>
              <ProFormText
                name='white_url'
                rules={[{ type: 'url', required: true }]}
                label='拦截后跳转路径'></ProFormText>
            </>
          ) : null;
        }}
      </ProFormDependency>
      <ProFormList
        name='script_links'
        label='额外JS脚本'
        creatorButtonProps={{
          creatorButtonText: '添加一个脚本链接',
        }}>
        <ProFormText name='link' width='lg'></ProFormText>
      </ProFormList>
      <ProFormTextArea name='extra_script' label='额外JS代码'></ProFormTextArea>
    </ModalForm>
  );
};

export default PageUpdateModal;
