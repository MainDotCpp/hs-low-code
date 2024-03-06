// @ts-nocheck
'use server';
import { mainDb } from '@/prisma/main-db';
import { t_page } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

export const getPage = async (id: string) => {
  'use server';
  return mainDb.t_page.findUnique({
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

export const saveOrUpdatePage = async (page: t_page) => {
  'use server';
  if (!page.id) {
    page.id = uuidv4();
    return mainDb.t_page.create({ data: page });
  }
  return mainDb.t_page.update({
    where: {
      id: page.id,
    },
    update: page,
  });
};

export const copyPage = async (id: string) => {
  const page = await mainDb.t_page.findUniqueOrThrow({
    where: { id },
  });
  page.id = uuidv4();
  page.name = page.name + '-复制';
  return mainDb.t_page.create({ data: page });
};
