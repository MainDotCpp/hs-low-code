'use client';
import styles from './page.module.scss';
import GroupItem from '@/app/components/group-item';
import Component from '@/app/components/component';
import Render from '@/app/components/render';
import { COMPONENT_MAPPING } from '@/app/components/component-mapping';
import { usePageStore } from '@/store/use-page-store';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import Config from '@/app/design/[pageId]/config';
import { Button, message, Spin } from 'antd';
import { useRequest } from 'ahooks';
import { getPage, updatePageDocument } from '@/app/action/page-action';
import { useRouter } from 'next/navigation';
import {
  ProForm,
  ProFormColorPicker,
  ProFormDigit,
  ProFormSlider,
} from '@ant-design/pro-components';
import { Color } from 'antd/es/color-picker';
import _ from 'lodash';

const Page = ({ params }: { params: { pageId: string } }) => {
  const setPage = usePageStore((state) => state.setPage);
  const { loading } = useRequest(() => getPage(params.pageId), {
    onSuccess: (data) => {
      setPage(data!!.content as any);
    },
  });
  const page = usePageStore((state) => {
    _.defaults(state.page, { style: { maxWidth: 400 } });
    return state.page;
  });
  const appendComponent = usePageStore((state) => state.appendComponent);
  const sortComponent = usePageStore((state) => state.sortComponent);
  const updateRoot = usePageStore((state) => state.updateRoot);

  const router = useRouter();

  const onSavePage = async () => {
    await updatePageDocument(params.pageId, page);
    message.success('保存成功');
  };
  return (
    <DragDropContext
      onDragEnd={(result) => {
        console.log('[拖拽结束]');
        console.table(result);
        // 添加组件
        if (
          result.source.droppableId === 'lib' &&
          result.destination?.droppableId === 'root'
        ) {
          // @ts-ignore
          let schema = COMPONENT_MAPPING[result.draggableId];
          const initValue = JSON.parse(JSON.stringify(schema.initValue));
          initValue.id = uuid();
          schema.convert && schema.convert(initValue);
          appendComponent(initValue, result.destination.index);
        }

        // 排序组件
        if (
          result.source.droppableId === 'root' &&
          result.destination?.droppableId === 'root'
        ) {
          console.log('排序组件');
          sortComponent(result.source.index, result.destination.index);
        }
      }}>
      <div className={styles.layout}>
        <div className={styles.header}>
          <div className={styles.title}>
            <span>落地页设计</span>
            <div>
              <Button
                type='link'
                onClick={() => {
                  router.back();
                }}>
                返回
              </Button>
            </div>
          </div>
          <div>
            {page && (
              <ProForm
                layout='inline'
                initialValues={page}
                submitter={false}
                onValuesChange={updateRoot}>
                <ProFormColorPicker
                  transform={(value: Color | string) => {
                    if (typeof value === 'string') return;
                    return {
                      style: { backgroundColor: `#${value?.toHex?.()}` },
                    };
                  }}
                  name={['style', 'backgroundColor']}
                  label='页面背景色'></ProFormColorPicker>
                <ProFormDigit
                  label={'页面宽度'}
                  name={['style', 'maxWidth']}></ProFormDigit>
                <ProFormSlider
                  label='左右边距'
                  name={['style', 'paddingInline']}></ProFormSlider>
              </ProForm>
            )}
          </div>
          <div className={styles.action}>
            <Button type='primary' onClick={onSavePage}>
              保存
            </Button>
            <Button
              type='primary'
              onClick={async () => {
                await onSavePage();
                window.open(`/${params.pageId}`);
              }}>
              保存并预览
            </Button>
          </div>
        </div>
        <div className={styles.group}>
          <GroupItem name='组件' icon='https://fakeimg.pl/300'></GroupItem>
          <GroupItem name='素材' icon='https://fakeimg.pl/300'></GroupItem>
        </div>
        <div className={styles.sidebar}>
          <Droppable droppableId='lib'>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={styles.componentGroup}>
                {Object.keys(COMPONENT_MAPPING).map((key, index) => {
                  // @ts-ignore
                  const schema = COMPONENT_MAPPING[key];
                  return (
                    <Component
                      mode={'edit'}
                      key={key}
                      index={index}
                      props={schema.initValue}
                      pageId={''}></Component>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        <div className={styles.main}>
          {loading && <Spin />}
          {page && <Render data={page} mode='edit' params={{}} />}
        </div>
        <div className={styles.config}>
          <Config />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Page;
