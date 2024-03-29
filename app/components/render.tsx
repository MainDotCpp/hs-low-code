import React, { useEffect } from 'react';
import './render.css';
import styles from './render.module.css';
import { ComponentType, RootComponentType } from '@/app/components/components';
import { Droppable } from 'react-beautiful-dnd';
import Component from '@/app/components/component';
import 'animate.css';
import Script from 'next/script';
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
    <>
      <Script
        src='https://cdn.bootcdn.net/ajax/libs/wow/1.1.2/wow.min.js'
        strategy={'beforeInteractive'}
      />
      <Script id='wow' strategy='beforeInteractive'>
        {`
          new WOW({
          }).init();
        document.onload = function () {
        }
        `}
      </Script>
      <Droppable droppableId={'root'}>
        {(provided, snapshot) => {
          return (
            <>
              <div
                style={{ maxWidth: 400, ...data.style }}
                ref={provided.innerRef}
                {...provided.droppableProps}
                id='app'
                className={`${styles.app} ${snapshot.isDraggingOver && styles.isOver}`}>
                {engine(params?.pageId, data, mode)}
                {provided.placeholder}
              </div>
            </>
          );
        }}
      </Droppable>
    </>
  );
};

export default Render;
