import type { Metadata } from 'next';
import styles from './admin.module.scss';

export const metadata: Metadata = {
  title: '管理后台',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={styles.main}>{children}</main>;
}
