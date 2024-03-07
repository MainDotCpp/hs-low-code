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

const animatedMapping = [
  {
    value: 'wow animate__animated animate__bounce',
    label: '弹跳，反弹，弹起',
  },
  {
    value: 'wow animate__animated animate__flash               ',
    label: '闪现，一瞬间，反射',
  },
  {
    value: 'wow animate__animated animate__pulse            ',
    label: '跳动，脉冲，脉跳',
  },
  {
    value: 'wow animate__animated animate__rubberBand    ',
    label: '橡皮圈，橡皮带',
  },
  { value: 'wow animate__animated animate__shake      ', label: '摇动，震动' },
  {
    value: 'wow animate__animated animate__swing   ',
    label: '旋转，悬挂，摇摆',
  },
  { value: 'wow animate__animated animate__tada ', label: '时间，波幅范围' },
  {
    value: 'wow animate__animated animate__wobble                 ',
    label: '摆动， 摇晃，不稳定',
  },
  {
    value: 'wow animate__animated animate__jello              ',
    label: '凝聚',
  },
  {
    value: 'wow animate__animated animate__bounceIn        ',
    label: '放大弹跳，',
  },
  {
    value: 'wow animate__animated animate__bounceInDown             ',
    label: '从上面跳跳来',
  },
  {
    value: 'wow animate__animated animate__bounceInLeft             ',
    label: '从左边出现',
  },
  {
    value: 'wow animate__animated animate__bounceInRight            ',
    label: '从右边出现',
  },
  {
    value: 'wow animate__animated animate__bounceInUp               ',
    label: '从下面上来',
  },
  {
    value: 'wow animate__animated animate__bounceOut                ',
    label: '从上面下去',
  },
  {
    value: 'wow animate__animated animate__bounceOutDown            ',
    label: '从原来的位置跳下去',
  },
  {
    value: 'wow animate__animated animate__bounceOutLeft            ',
    label: '从原来的位置跳到左边去',
  },
  {
    value: 'wow animate__animated animate__bounceOutRight           ',
    label: '从原来的位置跳到右边去',
  },
  {
    value: 'wow animate__animated animate__bounceOutUp              ',
    label: '从原来的位置跳到上面去',
  },
  {
    value: 'wow animate__animated animate__fadeIn                ',
    label: '整体渐入，淡淡的隐现',
  },
  {
    value: 'wow animate__animated animate__fadeInDown               ',
    label: '从上向下渐入',
  },
  {
    value: 'wow animate__animated animate__fadeInDownBig            ',
    label: '从上向下直接滑动下来',
  },
  {
    value: 'wow animate__animated animate__fadeInLeft               ',
    label: '从左向右渐入',
  },
  {
    value: 'wow animate__animated animate__fadeInLeftBig            ',
    label: '从左向右直接滑动',
  },
  {
    value: 'wow animate__animated animate__fadeInRight              ',
    label: '从右向左渐入',
  },
  {
    value: 'wow animate__animated animate__fadeInRightBig           ',
    label: '从右向左直接滑动',
  },
  {
    value: 'wow animate__animated animate__fadeInUp                 ',
    label: '从下向上渐入',
  },
  {
    value: 'wow animate__animated animate__fadeInUpBig              ',
    label: '从下向上直接滑动',
  },
  {
    value: 'wow animate__animated animate__fadeOut                  ',
    label: '渐出',
  },
  {
    value: 'wow animate__animated animate__fadeOutDown              ',
    label: '从上向下渐出',
  },
  {
    value: 'wow animate__animated animate__fadeOutDownBig           ',
    label: '从上向下直接滑动出去',
  },
  {
    value: 'wow animate__animated animate__fadeOutLeft              ',
    label: '从左向右渐出',
  },
  {
    value: 'wow animate__animated animate__fadeOutLeftBig           ',
    label: '从左向右直接滑动出去',
  },
  {
    value: 'wow animate__animated animate__fadeOutRight             ',
    label: '从右向左渐出',
  },
  {
    value: 'wow animate__animated animate__fadeOutRightBig          ',
    label: '从右向左直接滑动出去',
  },
  {
    value: 'wow animate__animated animate__fadeOutUp                ',
    label: '从下向上渐出',
  },
  {
    value: 'wow animate__animated animate__fadeOutUpBig             ',
    label: '从下向上直接滑动出去',
  },
  {
    value: 'wow animate__animated animate__flipInX                  ',
    label: '水平翻转呈现',
  },
  {
    value: 'wow animate__animated animate__flipInY                  ',
    label: '垂直翻转呈现',
  },
  {
    value: 'wow animate__animated animate__flipOutX                 ',
    label: '水平翻转消失',
  },
  {
    value: 'wow animate__animated animate__flipOutY                 ',
    label: '垂直翻转消失',
  },
  {
    value: 'wow animate__animated animate__lightSpeedIn             ',
    label: '轻轻的呈现',
  },
  {
    value: 'wow animate__animated animate__lightSpeedOut            ',
    label: '轻轻的消失',
  },
  {
    value: 'wow animate__animated animate__rotateIn                 ',
    label: '旋转呈现',
  },
  {
    value: 'wow animate__animated animate__rotateInDownLeft         ',
    label: '从左向右转动渐入 从上向下转动            转动:没有旋转到一周',
  },
  {
    value: 'wow animate__animated animate__rotateInDownRight        ',
    label: '从右向左转动渐入 从上向下转动            转动:没有旋转到一周',
  },
  {
    value: 'wow animate__animated animate__rotateInUpLeft           ',
    label: '从右向左转动渐入 从下向上转动',
  },
  {
    value: 'wow animate__animated animate__rotateInUpRight          ',
    label: '从左向右转动渐入 从下向上转动            转动:没有旋转到一周',
  },
  {
    value: 'wow animate__animated animate__rotateOut                ',
    label: '旋转消失',
  },
  {
    value: 'wow animate__animated animate__rotateOutDownLeft        ',
    label: '从左向右转动渐出 从上向下转动            转动:没有旋转到一周',
  },
  {
    value: 'wow animate__animated animate__rotateOutDownRight       ',
    label: '从右向左转动渐出 从上向下转动            转动:没有旋转到一周',
  },
  {
    value: 'wow animate__animated animate__rotateOutUpLeft          ',
    label: '从右向左转动渐出 从下向上转动            转动:没有旋转到一周',
  },
  {
    value: 'wow animate__animated animate__rotateOutUpRight         ',
    label: '从左向右转动渐出 从下向上转动            转动:没有旋转到一周',
  },
  {
    value: 'wow animate__animated animate__hinge                    ',
    label: '定点转动',
  },
  {
    value: 'wow animate__animated animate__rollIn                   ',
    label: '旋转渐入                              旋转：转动一周',
  },
  {
    value: 'wow animate__animated animate__rollOut                  ',
    label: '旋转渐出                              旋转：转动一周',
  },
  {
    value: 'wow animate__animated animate__zoomIn                   ',
    label: '放大渐入',
  },
  {
    value: 'wow animate__animated animate__zoomInDown               ',
    label: '从上向下出现同时放大',
  },
  {
    value: 'wow animate__animated animate__zoomInLeft               ',
    label: '从右向左出现同时放大',
  },
  {
    value: 'wow animate__animated animate__zoomInRight              ',
    label: '从左向右出现同时放大',
  },
  {
    value: 'wow animate__animated animate__zoomInUp                 ',
    label: '从下想上出现同时放大',
  },
  {
    value: 'wow animate__animated animate__zoomOut                  ',
    label: '缩小渐出',
  },
  {
    value: 'wow animate__animated animate__zoomOutDown              ',
    label: '从上向下消失同时缩小',
  },
  {
    value: 'wow animate__animated animate__zoomOutLeft              ',
    label: '从右向左消失同时缩小',
  },
  {
    value: 'wow animate__animated animate__zoomOutRight             ',
    label: '从左向右消失同时缩小',
  },
  {
    value: 'wow animate__animated animate__zoomOutUp                ',
    label: '从下向上消失同时缩小',
  },
  {
    value: 'wow animate__animated animate__slideInDown              ',
    label: '从上向下滑动',
  },
  {
    value: 'wow animate__animated animate__slideInLeft              ',
    label: '从右向左滑动',
  },
  {
    value: 'wow animate__animated animate__slideInRight             ',
    label: '从左向右滑动',
  },
  {
    value: 'wow animate__animated animate__slideInUp                ',
    label: '从下向上滑动',
  },
  {
    value: 'wow animate__animated animate__slideOutDown             ',
    label: '从原来的位置向下滑动',
  },
  {
    value: 'wow animate__animated animate__slideOutLeft             ',
    label: '从原来的位置从左滑动',
  },
  {
    value: 'wow animate__animated animate__slideOutRight            ',
    label: '从原来的位置向右滑动',
  },
  {
    value: 'wow animate__animated animate__slideOutUp               ',
    label: '从原来的位置向上滑动',
  },
];
const StyleConfig = () => {
  return (
    <>
      <ProFormColorPicker
        label='背景颜色'
        transform={(v: Color) => {
          if (typeof v === 'string') return;
          return {
            style: {
              backgroundColor: `#${v.toHex()}`,
            },
          };
        }}
        name={['style', 'backgroundColor']}></ProFormColorPicker>
      <ProFormGroup grid>
        <Col span={12}>
          <ProFormText name={['style', 'width']} label='宽度'></ProFormText>
        </Col>
        <Col span={12}>
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
      <ProFormGroup>
        <ProFormSelect
          colProps={{ span: 12 }}
          label='动画'
          name='animated'
          options={animatedMapping}></ProFormSelect>
        <ProFormCheckbox
          colProps={{ span: 12 }}
          name={'animatedInfinite'}
          label='循环'></ProFormCheckbox>
      </ProFormGroup>
    </>
  );
};

export default StyleConfig;
