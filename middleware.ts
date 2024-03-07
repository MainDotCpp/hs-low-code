import { NextRequest, NextResponse, userAgent } from 'next/server';
import logger from '@/app/lib/logger';
import { check } from '@/app/lib/cloak/cloak';

export async function middleware(request: NextRequest, response: NextResponse) {
  // 正则匹配uuid
  const uuidReg =
    /\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/;
  if (uuidReg.test(request.nextUrl.pathname)) {
    return check(request);
  }
  return NextResponse.next();
}
