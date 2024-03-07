import { NextRequest, NextResponse, userAgent } from 'next/server';
import { getPage } from '@/app/action/page-action';
import { t_page } from '@prisma/client';

const URL = 'https://cloakit.house/api/v1/check';

const ipHeaders = [
  'HTTP_CLIENT_IP',
  'HTTP_X_FORWARDED_FOR',
  'HTTP_CF_CONNECTING_IP',
  'HTTP_FORWARDED_FOR',
  'HTTP_X_COMING_FROM',
  'HTTP_COMING_FROM',
  'HTTP_FORWARDED_FOR_IP',
  'HTTP_X_REAL_IP',
];
const getRealIp = (header: NextRequest['headers']) => {
  for (const ipHeader of ipHeaders) {
    if (header.get(ipHeader)) {
      return header.get(ipHeader) as string;
    }
  }
  return header.get('REMOTE_ADDRESS') || '127.0.0.1';
};

export const check = async (request: NextRequest) => {
  // 获取页面数据
  const pageId = request.nextUrl.pathname.split('/').pop()!!;
  const pageRes = await fetch(
    `http://localhost:3000/api/page?pageId=${pageId}`,
  );
  const pageObj = (await pageRes.json()) as {
    success: boolean;
    data: t_page | null;
  };
  if (pageObj?.success !== true) {
    console.error('获取页面数据失败 pageId:', pageId);
    return NextResponse.next();
  }
  console.log(
    `[cloak] 页面数据: ${pageObj.data?.use_cloak}|${pageObj.data?.cloak_label}|${pageObj.data?.white_url}`,
  );
  // 不使用斗蓬, 直接返回落地页
  if (pageObj?.data?.use_cloak === false) return NextResponse.next();

  // 调用斗蓬接口
  const realIp = getRealIp(request.headers);
  const ua = userAgent(request);
  const formData = new FormData();
  formData.set('label', pageObj.data?.cloak_label || '');
  formData.set('user_agent', ua.ua);
  formData.set('referer', request.headers.get('HTTP_REFERER') || '');
  formData.set('query', request.headers.get('QUERY_STRING') || '');
  formData.set('lang', request.headers.get('HTTP_ACCEPT_LANGUAGE') || '');
  formData.set('ip_address', realIp);
  try {
    const res = await fetch(URL, {
      method: 'POST',
      body: formData,
    });
    const resObj = await res.json();
    console.log(resObj);
    if (resObj['filter_page'] === 'white') {
      // 跳转到白页
      return NextResponse.rewrite(pageObj.data?.white_url || '');
    }
    if (resObj['filter_page'] === 'offer') {
      // 跳转到黑页
      return NextResponse.next();
    }
  } catch (e) {
    console.log(e);
  }
};