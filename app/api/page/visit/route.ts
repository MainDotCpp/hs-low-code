import { NextRequest, NextResponse } from 'next/server';
import { VisitLog } from '@prisma/client';
import { mainDb } from '@/prisma/main-db';

export const POST = async (req: NextRequest) => {
  console.log('[记录访问记录]');
  const dto: VisitLog = await req.json();
  console.log(dto);
  await mainDb.visitLog.create({
    data: dto,
  });
  return NextResponse.json({
    success: true,
  });
};
