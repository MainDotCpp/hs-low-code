import type { Metadata } from 'next';
import './globals.css';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className='bg-black/5'>
      <AntdRegistry>
        <body>{children}</body>
      </AntdRegistry>
    </html>
  );
}
