import React from 'react';
import './render.css';
import styles from './render.module.css';
import { ComponentType, RootComponentType } from '@/app/components/components';
import { Droppable } from 'react-beautiful-dnd';
import Component from '@/app/components/component';
import 'animate.css';
const engine = (
  pageId: string,
  data: RootComponentType,
  mode: 'edit' | 'show',
) => {
  return (
    <>
      {data.children.map((item: ComponentType<any>, index) => {
        return (
          <Component
            pageId={pageId}
            key={item.id}
            index={index}
            props={item}
            mode={mode}
          />
        );
      })}
    </>
  );
};
const Render = ({
  data,
  mode = 'show',
  params,
}: {
  data: any;
  mode?: 'show' | 'edit';
  params: any;
}) => {
  return (
    <Droppable droppableId={'root'}>
      {(provided, snapshot) => {
        return (
          <>
            <div
              style={data.style}
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.app} ${snapshot.isDraggingOver && styles.isOver}`}>
              {engine(params?.pageId, data, mode)}
              {provided.placeholder}
            </div>
          </>
        );
      }}
    </Droppable>
  );
};

export default Render;
