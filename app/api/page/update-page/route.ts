import { NextRequest } from 'next/server';

export function POST(request: NextRequest) {
  // 读取请求体
  const body = request.body;
  console.log(body);
  // 返回响应
  return new Response('Hello, world!');
}
