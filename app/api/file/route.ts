import { NextRequest, NextResponse } from 'next/server';
import JSFtp from 'jsftp';
import { v4 } from 'uuid';

export const POST = (req: NextRequest) => {
  return new Promise((resolve, reject) => {
    const ftp = new JSFtp({
      host: '66.112.210.231',
      port: 21,
    });
    ftp.auth('admin_dev', '8c45DaeHAaiknPNp', async (err, res) => {
      if (err) {
        console.log('登录失败', err);
        reject(
          NextResponse.json({
            success: false,
          }),
        );
      }
      console.log('登录成功', res);
      let formData;
      try {
        formData = await req.formData();
      } catch (e) {
        return NextResponse.json({});
      }
      const file =
        (formData.get('files') as File) || (formData.get('file') as File);
      const buffer = Buffer.from(await file.arrayBuffer());
      const name = `${v4()}_${file.name}`;
      ftp.put(buffer, name, (err) => {
        if (err) {
          console.log('上传失败', err);
          reject(
            NextResponse.json({
              success: false,
            }),
          );
        }
        console.log('上传成功');
        resolve(
          NextResponse.json({
            success: true,
            path: `https://leuandev.xyz/access/${name}`,
          }),
        );
      });
    });
  });
};
