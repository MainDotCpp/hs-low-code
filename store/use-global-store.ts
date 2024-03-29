import { create } from 'zustand';
import { combine } from 'zustand/middleware';

export const useGlobalStore = create(
  combine(
    {
      pageId: '1',
    },
    (set, get) => ({
      setPageId: (pageId: string) => set({ pageId: get().pageId }),
    }),
  ),
);
