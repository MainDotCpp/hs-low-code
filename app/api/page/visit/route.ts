import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  console.log('[记录访问记录]');
  const dto = await req.json();
  console.log(dto);
  return NextResponse.json({
    success: true,
  });
};
