import { PrismaClient } from '@prisma/client';

export const mainDb = new PrismaClient({
  log: ['query'],
});
