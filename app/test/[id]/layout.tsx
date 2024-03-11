import { useGlobalStore } from '@/store/use-global-store';
import { log } from 'console';
import React from 'react';

export default function Layout({ children,params:{id} }: { children: React.JSX.Element,params:{id:string} }) {
  console.log(id)
  useGlobalStore.getState().setPageId(id);
  return (
    <div>
      <h1>Layout</h1>
      <div>123</div>
      <div>params:{id}</div>
      <div>
        {children}
      </div>
    </div>
  );
}
