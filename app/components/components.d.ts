export type ComponentType<T> = {
  id: string;
  name: string;
  accept: string[];
  mode: 'add' | 'sort';
  className: string;
  type: string;
  style: any;
  children?: ComponentType<any>[] | string;
};
