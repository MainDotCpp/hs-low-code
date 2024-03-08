import { Button, Modal } from 'antd';
import { useBoolean } from 'ahooks';
import { animateds } from '@/app/components/animate-select/animated';
import styles from './index.module.scss';

type AnimateSelectProps = {
  value?: string;
  onChange?: (value: string) => void;
};
const AnimateSelect = (props: AnimateSelectProps) => {
  const [open, { setTrue, setFalse }] = useBoolean(false);
  return (
    <>
      <Modal
        title='选择动画'
        open={open}
        onCancel={setFalse}
        destroyOnClose
        width='80%'
        footer={false}>
        <div className={styles.body}>
          {animateds.map((group) => (
            <div key={group.group} className={styles.groupWrapper}>
              <div className={styles.groupHeader}>{group.group}</div>
              <div className={styles.animatedGroup}>
                {group.items.map((animated) => {
                  return (
                    <div
                      key={animated.value}
                      className={styles.animatedBox}
                      onClick={() => {
                        props.onChange?.(animated.value);
                        setFalse();
                      }}>
                      <div
                        className={`${styles.animatedItem} ${animated.value} animate__infinite animate__delay-1s`}></div>
                      <div className={styles.animatedLabel}>
                        {animated.label}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Modal>
      <Button type='dashed' onClick={setTrue}>
        选择动画 (
        {props.value
          ? animateds
              .flatMap((it) => it.items)
              .find((it) => it.value === props.value)?.label
          : '未配置动画'}
        )
      </Button>
    </>
  );
};

export default AnimateSelect;
