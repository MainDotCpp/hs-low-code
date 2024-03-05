import Component from '@/app/components/component';
import ImageComponent from '@/app/components/image-component';
import RichTextComponent from '@/app/components/rich-text-component';

export const COMPONENT_MAPPING = {
  image: {
    ...ImageComponent,
    initValue: {
      name: '图片',
      type: 'image',
      src: 'https://fakeimg.pl/300',
      style: { width: '100%', boxSizing: 'border-box' },
    },
  },
  richText: {
    ...RichTextComponent,
    initValue: {
      name: '富文本',
      type: 'richText',
      html: '<h1>Hello</h1>',
    },
  },
};
