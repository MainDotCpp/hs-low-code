'use client';
import React from 'react';
import styles from './component.module.css';
import { Draggable } from 'react-beautiful-dnd';
import { COMPONENT_MAPPING } from '@/app/components/component-mapping';
import { usePageStore } from '@/store/use-page-store';

const Component = ({
  props,
  index = 0,
  mode,
}: {
  props?: any;
  index?: number;
  mode: 'edit' | 'show';
}) => {
  // @ts-ignore
  const schema = COMPONENT_MAPPING[props.type];
  let Node = schema.Component;
  if (!props?.id) {
    Node = (params: any) => (
      <div className={styles.component}>
        <div>{props?.name}</div>
      </div>
    );
  }

  const currentComponentId = usePageStore((state) => state.currentComponentId);
  const setCurrentComponentId = usePageStore(
    (state) => state.setCurrentComponentId,
  );

  return (
    <Draggable
      key={props?.id || props.type}
      draggableId={props?.id || props.type}
      isDragDisabled={mode === 'show'}
      index={index}>
      {(provided, snapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => {
              if (mode === 'edit' && props.id) setCurrentComponentId(props.id);
            }}
            className={` ${props.id && currentComponentId === props.id ? styles.activeComponent : ''}`}>
            <Node className={`${props.animated}`} {...props} mode={mode} />
          </div>
        );
      }}
    </Draggable>
  );
};

export default Component;
