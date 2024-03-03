import { useDrag } from 'react-dnd';
import React, { useRef } from 'react';
import styles from './component.module.css';
import { v4 as uuid } from 'uuid';
import { ComponentType } from '@/app/components/components';

const ImageComponent = ({
  props,
  btn,
  mode = 'add',
}: {
  name?: string;
  mode?: 'add' | 'sort';
  props?: ComponentType<any>;
  btn?: boolean;
}) => {
  const ref = useRef(null);
  const [, drag] = useDrag({
    type: 'image',
    item: {
      id: mode === 'add' ? uuid() : props?.id,
      mode: mode,
      name: '图片',
      accept: [],
      type: 'image',
      src: 'https://fakeimg.pl/300',
      style: {},
      children: [],
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(ref);
  if (btn) {
    return (
      <div ref={ref} className={styles.component}>
        图片
      </div>
    );
  }
  // @ts-ignore
  // eslint-disable-next-line @next/next/no-img-element
  return <img ref={ref} {...props} alt={''} />;
};

export default ImageComponent;
