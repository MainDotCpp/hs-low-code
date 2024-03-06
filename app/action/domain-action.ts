'use server';
import { mainDb } from '@/prisma/main-db';

export const getDomainList = async () => {
  return mainDb.t_domain.findMany();
};
