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
  updateRoot: (value: any) => void;
  removeComponent: (id: string) => void;
}>((set, get) => ({
  currentComponentId: undefined, // 当前组件id
  page: undefined, // 页面数据

  /**
   * 设置页面
   * @param page
   */
  setPage: (page: RootComponentType) => set({ page }),

  /**
   * 排序组件
   * @param sourceIndex
   * @param targetIndex
   */
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

  /**
   *  添加组件
   * @param component
   * @param index
   */
  appendComponent: function (component: any, index): void {
    console.log(`[添加组件] `, component);
    set(
      produce((state) => {
        state.page.children.splice(index, 0, component);
        return state;
      }),
    );
  },

  /**
   * 更新组件
   * @param componentId 组件id
   * @param value 更新值
   */
  updateComponent: (componentId: string, value: any) => {
    set(
      produce((state) => {
        const component = state.page.children.find(
          (item: any) => item.id === componentId,
        );
        _.merge(component, value);
        value.images && (component.images = value.images);
        console.log(`[更新组件] `, JSON.stringify(component, null, 2));
        return state;
      }),
    );
  },

  /**
   * 更新根组件
   * @param value
   */
  updateRoot: (value: any) => {
    set(
      produce((state) => {
        _.merge(state.page, value);
        return state;
      }),
    );
  },
  /**
   * 设置当前组件
   * @param id
   */
  setCurrentComponentId: (id: string) =>
    set({
      currentComponentId: id,
      currentComponent: get().page?.children.find((item) => item.id === id),
    }),

  /**
   * 移除组件
   * @param id
   */
  removeComponent: (id: string) => {
    set(
      produce((state) => {
        state.page.children = state.page.children.filter(
          (item: any) => item.id !== id,
        );
        state.currentComponentId = undefined;
        state.currentComponent = undefined;
        return state;
      }),
    );
  },
}));
