import { create } from 'zustand';
import { produce } from 'immer';
import { RootComponentType } from '@/app/components/components';
import _ from 'lodash';

export const usePageStore = create<{
  page?: RootComponentType;
  currentComponentId: string | undefined;
  currentComponent?: any;
  setPage: (page: RootComponentType) => void;
  appendComponent: (component: any, index: number) => void;
  updateComponent: (componentId: string, value: any) => void;
  sortComponent: (sourceIndex: number, targetIndex: number) => void;
  setCurrentComponentId: (id: string) => void;
}>((set, get) => ({
  currentComponentId: undefined,
  page: undefined,
  setPage: (page: RootComponentType) => set({ page }),
  sortComponent: (sourceIndex: number, targetIndex: number) => {
    set(
      produce((state) => {
        const sourceComponent = state.page.children[sourceIndex];
        state.page.children.splice(sourceIndex, 1);
        state.page.children.splice(targetIndex, 0, sourceComponent);
        return state;
      }),
    );
  },
  appendComponent: function (component: any, index): void {
    console.log(`[添加组件] `, component);
    set(
      produce((state) => {
        state.page.children.splice(index, 0, component);
        return state;
      }),
    );
  },
  updateComponent: (componentId: string, value: any) => {
    set(
      produce((state) => {
        const component = state.page.children.find(
          (item: any) => item.id === componentId,
        );
        _.assign(component, {
          ...value,
          style: _.merge(component.style, value.style),
        });
        console.log(`[更新组件] `, JSON.stringify(component, null, 2));
        return state;
      }),
    );
  },
  setCurrentComponentId: (id: string) =>
    set({
      currentComponentId: id,
      currentComponent: get().page.children.find((item) => item.id === id),
    }),
}));
