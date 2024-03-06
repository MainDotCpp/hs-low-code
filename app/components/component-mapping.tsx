import Component from '@/app/components/component';
import ImageComponent from '@/app/components/image-component';
import RichTextComponent from '@/app/components/rich-text-component';
import SwiperComponent from '@/app/components/swiper-component';
import CommentComponent from '@/app/components/comment-component';
import { v4 } from 'uuid';

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
  comment: {
    ...CommentComponent,
    convert: (initValue: any) => {
      return {
        ...initValue,
        comments: initValue.comments.map((item: any) => {
          item.id = v4();
          return item;
        }),
      };
    },
    initValue: {
      name: '评论组件',
      type: 'comment',
      style: {
        paddingBlock: 10,
        paddingInline: 10,
        marginBlock: 10,
        marginInline: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
      },
      comments: [
        {
          avatar:
            'https://api.uomg.com/api/rand.avatar?sort=%E7%94%B7&format=images',
          name: '姓名',
          content: '内容',
        },
        {
          avatar:
            'https://api.uomg.com/api/rand.avatar?sort=%E7%94%B7&format=images',
          name: '姓名',
          content: '内容',
        },
        {
          avatar:
            'https://api.uomg.com/api/rand.avatar?sort=%E7%94%B7&format=images',
          name: '姓名',
          content: '内容',
        },
      ],
    },
  },
};
