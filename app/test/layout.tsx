import { global } from '@/store/use-global-store';
import React from 'react';

export default function Layout({ children }: { children: React.JSX.Element }) {
  // global.getState().setPageId('1');
  return (
    <div>
      <h1>Layout</h1>
      <div>123</div>
      {children}
    </div>
  );
}
