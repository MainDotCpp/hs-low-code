import Component from '@/app/components/component';
import ImageComponent from '@/app/components/image-component';
import RichTextComponent from '@/app/components/rich-text-component';
import SwiperComponent from '@/app/components/swiper-component';
import CommentComponent from '@/app/components/comment-component';
import { v4 } from 'uuid';
import VideoComponent from '@/app/components/video-component';
import GalleryComponent from '@/app/components/gallery-component';
import CopyComponent from '@/app/components/copy-component';

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
  video: {
    ...VideoComponent,
    initValue: {
      name: '视频组件',
      type: 'video',
      src: 'https://www.w3school.com.cn/i/movie.mp4',
      style: { width: '100%', boxSizing: 'border-box' },
    },
  },
  gallery: {
    ...GalleryComponent,
    initValue: {
      name: '画廊(开发中)',
      type: 'gallery',
      images: [
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE1',
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE2',
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE3',
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE4',
        'https://fakeimg.pl/500x200/282828/eae0d0/?retina=1&text=IMAGE5',
      ],
    },
  },
  copy: {
    ...CopyComponent,
    initValue: {
      name: '复制组件',
      type: 'copy',
    },
  },
};
