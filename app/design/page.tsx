'use client';
import styles from './page.module.css';
import GroupItem from '@/app/components/group-item';
import Component from '@/app/components/component';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useState } from 'react';
import Render from '@/app/components/render';
import { usePageStore } from '@/store/use-page-store';
import ImageComponent from '@/app/components/image-component';

const Page = () => {
  const page = usePageStore((state) => state.page);
  const setPage = usePageStore((state) => state.setPage);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.layout}>
        <div className={styles.header}></div>
        <div className={styles.group}>
          <GroupItem name='组件' icon='https://fakeimg.pl/300'></GroupItem>
          <GroupItem name='素材' icon='https://fakeimg.pl/300'></GroupItem>
        </div>
        <div className={styles.sidebar}>
          <Component btn={true}></Component>
          <ImageComponent btn={true}></ImageComponent>
        </div>
        <div className={styles.main}>
          <Render data={page}></Render>
        </div>
        <div className={styles.config}>{JSON.stringify(page, null, 2)}</div>
      </div>
    </DndProvider>
  );
};

export default Page;
