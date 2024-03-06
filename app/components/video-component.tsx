import React from 'react';
import FileUpload from '@/app/components/file-upload';
import { ProFormSwitch } from '@ant-design/pro-form';

const Component = ({ pageId, mode, ...props }: any) => {
  return <video {...props}></video>;
};

const Config = () => {
  return (
    <>
      <FileUpload name='src' label='视频' max={1} />
      <ProFormSwitch name='autoPlay' label='自动播放' />
      <ProFormSwitch name='loop' label='循环播放' />
      <ProFormSwitch name='controls' label='显示控制条' />
    </>
  );
};

export default {
  Component,
  Config,
};
