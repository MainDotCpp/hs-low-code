import React from 'react';
import { ProFormDigit, ProFormText } from '@ant-design/pro-components';
import styles from './image-component.module.scss';

const Component = ({ mode, ...props }: any) => {
  return (
    <>
      {mode === 'edit' && props.link && (
        <div className={styles.label}>点击图片跳转: {props.link}</div>
      )}
      <img
        {...props}
        style={{
          display: 'block',
          cursor: props.link ? 'pointer' : 'default',
          ...props.style,
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
  return (
    <>
      <ProFormText name='src' label='图片地址' />
      <ProFormText name='link' label='跳转地址' />
    </>
  );
};

export default {
  Component,
  Config,
};
