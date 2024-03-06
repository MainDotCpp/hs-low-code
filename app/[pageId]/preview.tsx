'use client';
import { DragDropContext } from 'react-beautiful-dnd';
import Render from '@/app/components/render';
import { t_page } from '@prisma/client';
// @ts-ignore
import { WOW } from 'wowjs';
import { useEffect } from 'react';

const Preview = ({ data, params }: { data: t_page; params: any }) => {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);
  return (
    <>
      <DragDropContext onDragEnd={(result) => {}}>
        <Render params={params} data={data.content} mode='show'></Render>
      </DragDropContext>
    </>
  );
};

export default Preview;
