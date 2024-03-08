'use client';
import React, { useEffect, useRef, useState } from 'react';
import FileUpload from '@/app/components/file-upload';
import styles from './index.module.scss';

const Component = ({ mode, ...props }: any) => {
  const max = 3;
  const images = useRef([...props.images, ...props.images.splice(0, max)]);
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      // 无限循环
      setCurrent((prev) => (prev + 1) % images.current.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <div>
        {current}
        {JSON.stringify(images)}
        <div className={styles.gallery}>
          {images.current.map((item: string, index: number) => {
            return (
              <div
                key={index}
                style={{
                  width: `${100 / max}%`,
                  translate: `-${current * 100}%`,
                }}
                className={`${styles.item} ${
                  current === index ? styles.active : ''
                }`}
                onClick={() => setCurrent(index)}>
                <img src={item} alt='' />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

const Config = () => {
  return (
    <>
      <FileUpload name='images' max={99} label='图片列表' />
    </>
  );
};

export default {
  Component,
  Config,
};
