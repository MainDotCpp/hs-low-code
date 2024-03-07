'use client';
import { DragDropContext } from 'react-beautiful-dnd';
import Render from '@/app/components/render';
import { t_page } from '@prisma/client';
import Script from 'next/script';

const Preview = ({ data, params }: { data: t_page; params: any }) => {
  return (
    <>
      <DragDropContext onDragEnd={(result) => {}}>
        <Render params={params} data={data.content} mode='show'></Render>
      </DragDropContext>
    </>
  );
};

export default Preview;
