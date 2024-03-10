import React from 'react';
import { ProFormItem } from '@ant-design/pro-components';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const Component = ({ mode, html, pageId, ...props }: any) => {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: html }} {...props}></div>
    </>
  );
};

const Config = () => {
  return (
    <>
      <ProFormItem name='html'>
        <ReactQuill
          theme='snow'
          modules={{
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'], // toggled buttons
              ['blockquote', 'code-block'],
              ['link', 'image', 'video', 'formula'],

              [{ header: 1 }, { header: 2 }], // custom button values
              [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
              [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
              [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
              [{ direction: 'rtl' }], // text direction

              [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
              [{ header: [1, 2, 3, 4, 5, 6, false] }],

              [{ color: [] }, { background: [] }], // dropdown with defaults from theme
              [{ font: [] }],
              [{ align: [] }],

              ['clean'], // remove formatting button
            ],
          }}></ReactQuill>
      </ProFormItem>
    </>
  );
};

export default {
  Component,
  Config,
};
