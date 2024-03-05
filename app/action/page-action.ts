'use server';
import { mainDb } from '@/prisma/main-db';

export const getPage = async (id: string) => {
  'use server';
  return mainDb.t_page.findFirst({
    where: {
      id: id,
    },
  });
};

export const updatePageDocument = async (pageId: string, schema: any) => {
  'use server';
  console.log('更新页面文档', pageId);
  return mainDb.t_page.update({
    where: {
      id: pageId,
    },
    data: {
      content: schema,
    },
  });
};
