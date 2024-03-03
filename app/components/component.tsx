import { useDrag } from 'react-dnd';
import React, { useRef } from 'react';
import styles from './component.module.css';
import { v4 as uuid } from 'uuid';

const Component = ({
  props,
  btn,
  children,
  mode = 'add',
}: {
  mode?: 'add' | 'sort';
  props?: any;
  btn?: boolean;
  children?: React.JSX.Element;
}) => {
  const ref = useRef(null);
  const [, drag] = useDrag({
    type: 'div',
    item: {
      id: uuid(),
      accept: ['div', 'a', 'image', 'text'],
      name: '容器',
      mode: mode,
      type: 'div',
      style: { minHeight: 30 },
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
        容器
      </div>
    );
  }
  return <div ref={ref} {...props}></div>;
};

export default Component;
