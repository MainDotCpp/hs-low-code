import { ModalForm, ProFormSwitch } from '@ant-design/pro-form';
import React from 'react';
import { t_page } from '@prisma/client';
import {
  ProFormList,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { getPage, saveOrUpdatePage } from '@/app/action/page-action';
import { message } from 'antd';

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
      // @ts-ignore
      request={getInitialValues}
      initialValues={{}}
      trigger={children}
      onFinish={onFinish}>
      <ProFormText name='id' label='ID' hidden></ProFormText>
      <ProFormText name='name' label='落地页名称'></ProFormText>
      <ProFormText name='title' label='页面标题'></ProFormText>

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
