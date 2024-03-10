// @ts-nocheck
'use server';
import { mainDb } from '@/prisma/main-db';
import { t_page } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import logger from '@/app/lib/logger';

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

export const saveOrUpdatePage = async (page: Partial<t_page>) => {
  'use server';
  logger.info('保存页面', page);
  if (!page.id) {
    page.id = uuidv4();
    page.status = 1;
    return mainDb.t_page.create({ data: page });
  }
  return mainDb.t_page.update({
    where: {
      id: page.id,
    },
    data: page,
  });
};

export const getPages = async () => {
  'use server';
  return mainDb.t_page.findMany({
    where: {
      status: 1,
    },
    orderBy: {
      pid: 'desc',
    },
  });
};

export const copyPage = async (id: string) => {
  const page = await mainDb.t_page.findUniqueOrThrow({
    where: { id },
  });
  page.id = uuidv4();
  page.name = page.name + '-复制';
  page.access_count = 0;
  page.click_link_count = 0;
  page.ban_count = 0;
  page.pid = undefined;
  return mainDb.t_page.create({ data: page });
};

export const visit = async (pageId: string) => {
  'use server';
  return mainDb.t_page.update({
    where: {
      id: pageId,
    },
    data: {
      access_count: {
        increment: 1,
      },
    },
  });
};
export const clickLink = (pageId: string) => {
  return mainDb.t_page.update({
    where: {
      id: pageId,
    },
    data: {
      click_link_count: {
        increment: 1,
      },
    },
  });
};
