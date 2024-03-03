'use client';
import React, { useRef } from 'react';
import './render.css';
import styles from './render.module.css';
import { useDrop } from 'react-dnd';
import Component from '@/app/components/component';
import { usePageStore } from '@/store/use-page-store';
import { ComponentType } from '@/app/components/components';
import ImageComponent from '@/app/components/image-component';

const mapping = {
  div: (props: any) => <Component props={props} btn={false} key={props.key} />,
  a: (props: any) => <a {...props} key={props.key}></a>,
  image: (props: any) => (
    <ImageComponent props={props} btn={false} key={props.key} />
  ),
  text: (props: any) => (
    <span>
      {props.text} key={props.key}
    </span>
  ),
};

const DropArea = ({
  children,
  component,
}: {
  children: React.JSX.Element;
  component: ComponentType<any>;
}) => {
  const sortComponent = usePageStore((state) => state.sortComponent);
  const ref = useRef(null);
  const [{ isOver }, drop] = useDrop(() => ({
    accept: component.accept,
    drop: (item: any, monitor) => {
      console.log('拖放组件数据: ', item);
      console.log('拖放目标组件id: ', component);
      sortComponent(item, component);
    },
    canDrop: (item: any) => {
      return true;
    },
    collect: (monitor) => ({
      dragging: monitor.didDrop(),
      isOver: monitor.isOver({
        shallow: true,
      }),
    }),
  }));
  drop(ref);
  return React.cloneElement(
    <div ref={ref} className={`  ${isOver ? styles.isOver : ''}`}>
      <div className={styles.componentBox}>
        <div className={styles.componentLabel}>{component.name}</div>
      </div>
      {children}
    </div>,
  );
};

const getElement = ({ children, ...props }: ComponentType<any>) => {
  let els: React.JSX.Element[] = (
    <>{typeof children === 'string' ? [children] : []}</>
  );
  if (children && Array.isArray(children) && children.length > 0) {
    els = children.map((item: any) => {
      return getElement(item);
    });
  }
  props.className = 'el';

  return (
    <DropArea component={props} key={props.id}>
      {/* @ts-ignore */}
      {React.cloneElement(mapping[props.type](props), {
        mode: 'sort',
        children: els,
      })}
    </DropArea>
  );
};

const engine = (data: ComponentType<any>[], mode: 'edit' | 'show' = 'edit') => {
  return (
    <>
      {data.map((item: ComponentType<any>) => {
        return getElement(item);
      })}
    </>
  );
};
const Render = ({ data }: { data: ComponentType<any>[] }) => {
  const appendComponent = usePageStore((state) => state.appendComponent);
  const ref = useRef(null);
  const [{ isOver, canDrop }, drop] = useDrop(() => ({
    accept: ['div', 'image'],
    drop: (item: ComponentType<any>) => {
      appendComponent(item);
    },
    canDrop: (item: ComponentType<any>) => item.mode === 'add',
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      canDrop: monitor.canDrop(),
    }),
  }));
  drop(ref);
  return (
    <div
      ref={ref}
      className={`${styles.app} ${isOver && canDrop ? styles.isOver : ''}`}>
      {engine(data)}
    </div>
  );
};

export default Render;
