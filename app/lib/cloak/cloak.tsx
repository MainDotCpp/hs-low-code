import { NextRequest, NextResponse, userAgent } from 'next/server';
import { getPage } from '@/app/action/page-action';
import { t_page, VisitLog } from '@prisma/client';
import { v4 } from 'uuid';

const URL = 'https://cloakit.house/api/v1/check';

const ipHeaders = [
  'client_ip',
  'x-forwarded-for',
  'forwarded-for',
  'cf-connecting-ip',
  'x-coming-from',
  'coming-from',
  'forwarded-for-ip',
  'x-real-ip',
];
const getRealIp = (header: NextRequest['headers']) => {
  for (const ipHeader of ipHeaders) {
    if (header.get(ipHeader)) {
      return header.get(ipHeader) as string;
    }
  }
  return header.get('remote-host') || '127.0.0.1';
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
  if (pageObj?.success !== true || !pageObj.data) {
    console.error('获取页面数据失败 pageId:', pageId);
    return NextResponse.next();
  }
  console.log(
    `[cloak] 页面数据: ${pageObj.data?.use_cloak}|${pageObj.data?.cloak_label}|${pageObj.data?.white_url}`,
  );
  const realIp = getRealIp(request.headers);
  const ua = userAgent(request);
  const visitDto: Omit<VisitLog, 'id'> = {
    pageId: pageId,
    useCloak: pageObj.data?.use_cloak,
    cloakLabel: pageObj.data?.cloak_label,
    whiteUrl: pageObj.data?.white_url,
    ipAddress: realIp,
    userAgent: ua.ua,
    referer: request.headers.get('http-referer') || '',
    query: request.headers.get('query-string') || '',
    lang: request.headers.get('accept-language') || '',
    filterType: 'success',
    filterFlag: false,
    filterPage: 'OFFER',
    createAt: new Date(),
  };

  // 不使用斗蓬, 直接返回落地页
  if (pageObj?.data?.use_cloak === true) {
    // 调用斗蓬接口
    const formData = new FormData();
    formData.set('label', visitDto.cloakLabel || '');
    formData.set('user_agent', visitDto.userAgent);
    formData.set('referer', visitDto.referer!!);
    formData.set('query', visitDto.query!!);
    formData.set('lang', visitDto.lang!!);
    formData.set('ip_address', visitDto.ipAddress);
    console.log('[调用cloak] formData:', formData);
    try {
      const res = await fetch(URL, {
        method: 'POST',
        body: formData,
      });
      const resObj = await res.json();
      console.log('[调用cloak报文]', resObj);
      visitDto.filterType = resObj['filter_type'];
      visitDto.filterFlag = resObj['filter_flag'];
      visitDto.filterPage = resObj['filter_page'].toUpperCase();
    } catch (e) {
      console.log(e);
    }
  }
  fetch('http://localhost:3000/api/page/visit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(visitDto),
  }).then();

  if (visitDto.filterPage === 'WHITE') {
    const offerRes = await fetch(
      `http://localhost:3000/api/page/offer-page?pageId=${pageId}`,
    );
    // 跳转到白页
    return NextResponse.rewrite(visitDto.whiteUrl || '');
  }
  // 跳转到黑页
  return NextResponse.next();
};
