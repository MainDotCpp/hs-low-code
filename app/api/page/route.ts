import { NextRequest, NextResponse } from 'next/server';
import { mainDb } from '@/prisma/main-db';

export async function GET(req: NextRequest) {
  const pageId = req.nextUrl.searchParams.get('pageId');
  console.log(`[查询页面数据] pageId: ${pageId}`);
  const page = await mainDb.t_page.findUnique({
    where: {
      id: pageId,
    },
  });
  if (!page) {
    return NextResponse.json({
      success: false,
      message: '页面不存在',
    });
  }
  return NextResponse.json({
    success: true,
    data: page,
  });
}
