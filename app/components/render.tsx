import React from 'react';
import './render.css';
import styles from './render.module.css';
import { ComponentType, RootComponentType } from '@/app/components/components';
import { Droppable } from 'react-beautiful-dnd';
import Component from '@/app/components/component';
import 'animate.css';
const engine = (data: RootComponentType, mode: 'edit' | 'show') => {
  return (
    <>
      {data.children.map((item: ComponentType<any>, index) => {
        return (
          <Component key={item.id} index={index} props={item} mode={mode} />
        );
      })}
    </>
  );
};
const Render = ({
  data,
  mode = 'show',
}: {
  data: any;
  mode?: 'show' | 'edit';
}) => {
  return (
    <Droppable droppableId={'root'}>
      {(provided, snapshot) => {
        return (
          <>
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={`${styles.app} ${snapshot.isDraggingOver && styles.isOver}`}>
              {engine(data, mode)}
              {provided.placeholder}
            </div>
          </>
        );
      }}
    </Droppable>
  );
};

export default Render;
