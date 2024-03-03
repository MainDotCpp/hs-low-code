import { create } from 'zustand';
import { produce } from 'immer';
import localFont from 'next/dist/compiled/@next/font/dist/local';
import { ComponentType } from '@/app/components/components';
import { CompilerNameValues } from 'next/constants';

// 递归查找
export const findComponent = (id: string, page: ComponentType<any>[]): any => {
  for (const item of page) {
    if (item.id === id) {
      return [page, item];
    }
    if (item.children) {
      const [, result] = findComponent(
        id,
        typeof item.children === 'string' ? [] : item.children,
      );
      if (result) {
        return [item.children, result];
      }
    }
  }
  return [page, null];
};

export const usePageStore = create<{
  page: any[];
  setPage: (page: any[]) => void;
  appendComponent: (component: any) => void;
  sortComponent: (
    sourceComponent: ComponentType<any>,
    targetComponent: ComponentType<any>,
  ) => void;
}>((set) => ({
  page: [] as any[],
  setPage: (page: any[]) => set({ page }),
  sortComponent: (
    sourceComponent: ComponentType<any>,
    targetComponent: ComponentType<any>,
  ) => {
    set(
      produce((state) => {
        console.group(
          `[组件排序] sourceComponentId:${sourceComponent.id} targetComponentId:${targetComponent.id}`,
        );
        console.log('[修改前]', JSON.stringify(state.page, null, 2));
        const source = findComponent(sourceComponent.id, state.page);
        const target = findComponent(targetComponent.id, state.page);
        if (source[1]) {
          target[1].children.push(source[1]);
          source[0].splice(source[0].indexOf(source), 1);
        } else {
          target[1].children.push(sourceComponent);
        }
        console.log('[修改后]', JSON.stringify(state.page, null, 2));
        console.groupEnd();
        return state;
      }),
    );
  },
  appendComponent(component: any): void {
    console.log(`[添加组件] `, component);
    set(
      produce((state) => {
        state.page.push(component);
        return state;
      }),
    );
  },
}));
