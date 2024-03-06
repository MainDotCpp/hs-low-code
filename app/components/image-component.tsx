import React from 'react';
import {
  ProForm,
  ProFormDigit,
  ProFormGroup,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import styles from './image-component.module.scss';
import FileUpload from '@/app/components/file-upload';
import { Col, Grid, Row } from 'antd';
import useFormInstance = ProForm.useFormInstance;

const Component = ({ mode, ...props }: any) => {
  return (
    <>
      {mode === 'edit' && props.link && (
        <div className={styles.label}>点击图片跳转: {props.link}</div>
      )}
      {mode === 'edit' && props.position === 'fixed' && (
        <div className={styles.label}>固定定位</div>
      )}
      <img
        {...props}
        style={{
          display: 'block',
          cursor: props.link ? 'pointer' : 'default',
          ...props.style,
          ...(mode === 'edit' ? { position: 'static' } : {}),
          maxWidth: '430px',
        }}
        alt=''
        onClick={() => {
          if (mode === 'edit') {
            return;
          }
          window.open(props.link);
        }}
      />
    </>
  );
};

const Config = () => {
  const form = useFormInstance();
  return (
    <>
      <Row gutter={4}>
        <Col span={6}>
          <ProFormSelect
            name={['style', 'position']}
            label='图片位置'
            valueEnum={{
              static: '默认',
              fixed: '固定',
            }}></ProFormSelect>
        </Col>
        <Col span={6}>
          <ProFormDigit
            tooltip='如果有遮挡请把层级调大'
            name={['style', 'zIndex']}
            label='层级'></ProFormDigit>
        </Col>
        <Col span={6}>
          <ProFormDigit
            tooltip='距离顶部和距离底部只有一个会生效'
            name={['style', 'top']}
            label='距离顶部'></ProFormDigit>
        </Col>
        <Col span={6}>
          <ProFormDigit
            tooltip='距离顶部和距离底部只有一个会生效'
            name={['style', 'bottom']}
            label='距离底部'></ProFormDigit>
        </Col>
      </Row>
      <FileUpload name='src' max={1} label='图片' />
      <ProFormText name='link' label='点击图片跳转地址' />
    </>
  );
};

export default {
  Component,
  Config,
};
