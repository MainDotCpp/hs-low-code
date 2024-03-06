import Component from '@/app/components/component';
import ImageComponent from '@/app/components/image-component';
import RichTextComponent from '@/app/components/rich-text-component';
import SwiperComponent from '@/app/components/swiper-component';

export const COMPONENT_MAPPING = {
  image: {
    ...ImageComponent,
    initValue: {
      name: '图片',
      type: 'image',
      src: 'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE',
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
  swiper: {
    ...SwiperComponent,
    initValue: {
      name: '轮播图',
      type: 'swiper',
      autoplay: true,
      dots: true,
      dotPosition: 'bottom',
      infinite: true,
      speed: 500,
      autoplaySpeed: 3000,
      images: [
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE',
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE',
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE',
      ],
    },
  },
};
