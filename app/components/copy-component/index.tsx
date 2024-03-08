'use client';
import React, { useEffect, useRef, useState } from 'react';
import FileUpload from '@/app/components/file-upload';
import styles from './index.module.scss';
import {
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { message } from 'antd';

const Component = ({ mode, copyText, delay, link, ...props }: any) => {
  return (
    <>
      <img
        {...props}
        alt=''
        onClick={async () => {
          await navigator.clipboard.writeText(copyText);
          setTimeout(() => {
            window.open(link);
          }, delay);
        }}
      />
    </>
  );
};

const Config = () => {
  return (
    <>
      <FileUpload name='src' max={1} label='图片' />
      <ProFormTextArea name='copyText' label='点击后复制内容'></ProFormTextArea>
      <ProFormText name='link' label='跳转地址'></ProFormText>
      <ProFormDigit name='delete' label='复制后跳转延时' initialValue={0} />
    </>
  );
};

export default {
  Component,
  Config,
};
