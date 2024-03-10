import {
  ProForm,
  ProFormCheckbox,
  ProFormColorPicker,
  ProFormGroup,
  ProFormItem,
  ProFormSelect,
  ProFormSlider,
  ProFormText,
} from '@ant-design/pro-components';
import { Col, ColorPicker, Progress } from 'antd';
import { Color } from 'antd/es/color-picker';
import AnimateSelect from '@/app/components/animate-select';
import { ProFormSwitch } from '@ant-design/pro-form';

const StyleConfig = () => {
  return (
    <>
      <ProFormColorPicker
        label='背景颜色'
        transform={(v: Color) => {
          if (typeof v === 'string') return;
          return {
            style: {
              backgroundColor: `#${v?.toHex?.()}`,
            },
          };
        }}
        name={['style', 'backgroundColor']}></ProFormColorPicker>
      <ProFormGroup grid>
        <Col span={8}>
          <ProFormSelect
            name={['style', 'justifySelf']}
            label='位置'
            initialValue='start'
            valueEnum={{
              start: '左',
              end: '右',
              center: '居中',
            }}></ProFormSelect>
        </Col>
        <Col span={8}>
          <ProFormText name={['style', 'width']} label='宽度'></ProFormText>
        </Col>
        <Col span={8}>
          <ProFormText name={['style', 'height']} label='高度'></ProFormText>
        </Col>
        <Col span={12}>
          <ProFormSlider
            name={['style', 'paddingBlock']}
            label='上下内边距'
            step={2}
            min={0}
            max={400}></ProFormSlider>
        </Col>
        <Col span={12}>
          <ProFormSlider
            min={0}
            step={2}
            max={400}
            name={['style', 'paddingInline']}
            label='左右内边距'></ProFormSlider>
        </Col>
        <Col span={12}>
          <ProFormSlider
            name={['style', 'marginBlock']}
            label='上下外边距'
            step={2}
            min={0}
            max={400}></ProFormSlider>
        </Col>
        <Col span={12}>
          <ProFormSlider
            min={0}
            step={2}
            max={400}
            name={['style', 'marginInline']}
            label='左右外边距'></ProFormSlider>
        </Col>
      </ProFormGroup>
      <ProFormSlider
        name={['style', 'borderRadius']}
        label='圆角'
        min={0}
        max={100}></ProFormSlider>
      <ProFormItem name='animated' wrapperCol={{ span: 12 }}>
        <AnimateSelect></AnimateSelect>
      </ProFormItem>
      <ProFormSwitch
        colProps={{ span: 12 }}
        name={'animatedInfinite'}
        label='循环动画'></ProFormSwitch>
    </>
  );
};

export default StyleConfig;
