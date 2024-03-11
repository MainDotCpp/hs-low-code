import { userAgent } from 'next/server';
import { useGlobalStore } from '@/store/use-global-store';
import { v4 } from 'uuid';

export default function Page() {
  console.log('page',useGlobalStore.getState().pageId)
  useGlobalStore.getState().setPageId(v4())
  return <div>{useGlobalStore.getState().pageId}</div>;
}
