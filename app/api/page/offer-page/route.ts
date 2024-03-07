import { NextRequest, NextResponse } from 'next/server';
import { mainDb } from '@/prisma/main-db';

export async function GET(request: NextRequest) {
  const pageId = request.nextUrl.searchParams.get('pageId');
  console.log(`[阻止访问] pageId=${pageId}`);
  await mainDb.t_page.update({
    where: {
      id: pageId,
    },
    data: {
      ban_count: {
        increment: 1,
      },
    },
  });
  return NextResponse.json({ success: true });
}
