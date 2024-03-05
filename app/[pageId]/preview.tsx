'use client';
import { DragDropContext } from 'react-beautiful-dnd';
import Render from '@/app/components/render';
import { t_page } from '@prisma/client';
import { WOW } from 'wowjs';
import { useEffect } from 'react';

const Preview = ({ data }: { data: t_page }) => {
  useEffect(() => {
    const wow = new WOW();
    wow.init();
  }, []);
  return (
    <DragDropContext onDragEnd={(result) => {}}>
      <Render data={data} mode='show'></Render>
    </DragDropContext>
  );
};

export default Preview;
