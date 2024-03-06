import React from 'react';
import FileUpload from '@/app/components/file-upload';
import { Carousel } from 'antd';
import { ProFormSwitch } from '@ant-design/pro-form';
import {
  ProFormDigit,
  ProFormSelect,
  ProFormSlider,
} from '@ant-design/pro-components';

const Component = ({ mode, ...props }: any) => {
  return (
    <>
      <Carousel {...props}>
        {props.images.map((item: string, index: number) => {
          return <img key={index} src={item} alt='' />;
        })}
      </Carousel>
    </>
  );
};

const Config = () => {
  return (
    <>
      <FileUpload name='images' max={99} label='图片列表' />
      <ProFormSwitch name='autoplay' label='自动播放' />
      <ProFormSlider
        name='autoplaySpeed'
        label='自动播放速度'
        min={500}
        max={10000}
        step={500}
      />
      <ProFormSwitch name='dots' label='显示指示点' />
      <ProFormSelect
        name='dotPosition'
        label='指示点位置'
        options={[
          { label: '顶部', value: 'top' },
          { label: '底部', value: 'bottom' },
          { label: '左侧', value: 'left' },
          { label: '右侧', value: 'right' },
        ]}></ProFormSelect>
      <ProFormSwitch name='infinite' label='是否无限循环' />
      <ProFormSlider
        name='speed'
        label='切换动效时间'
        min={500}
        max={2000}
        step={100}
      />
    </>
  );
};

export default {
  Component,
  Config,
};
