import React from 'react';
import {
  ProForm,
  ProFormDigit,
  ProFormList,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import FileUpload from '@/app/components/file-upload';
import { Col, Row } from 'antd';
import { COMPONENT_MAPPING } from '@/app/components/component-mapping';
import useFormInstance = ProForm.useFormInstance;
import styles from './comment-component.module.scss';

const Component = ({ pageId, mode, ...props }: any) => {
  return (
    <div className={styles.comments} {...props}>
      {props.comments.map((item: any, index: number) => {
        return (
          <div key={index} className={styles.comment}>
            <img className='avatar' src={item.avatar} alt='' />
            <div className='body'>
              <div className='name'>{item.name}</div>
              <div className='content'>{item.content}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const Config = () => {
  return (
    <>
      <ProFormList
        name='comments'
        copyIconProps={false}
        deleteIconProps={false}
        creatorButtonProps={false}>
        <ProForm.Group>
          <Row gutter={4}>
            <Col span={12}>
              <FileUpload
                btn
                name='avatar'
                label='头像'
                max={1}
                fieldProps={{
                  listType: 'text',
                }}></FileUpload>
            </Col>
            <Col span={6}>
              <ProFormText name='name' label='姓名'></ProFormText>
            </Col>
            <Col span={6}>
              <ProFormText name='content' label='内容'></ProFormText>
            </Col>
          </Row>
        </ProForm.Group>
      </ProFormList>
    </>
  );
};

export default {
  Component,
  Config,
};
