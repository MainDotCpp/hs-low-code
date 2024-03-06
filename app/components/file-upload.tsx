import {
  ProFormUploadButton,
  ProFormUploadDragger,
} from '@ant-design/pro-form';
import { ProFormUploadDraggerProps } from '@ant-design/pro-form/es/components/UploadDragger';
import { UploadFile, UploadProps } from 'antd';
import { v4 } from 'uuid';
import React from 'react';

const FileUpload = (
  props: ProFormUploadDraggerProps & { btn?: boolean; dir?: string },
) => {
  const Element = props.btn ? ProFormUploadButton : ProFormUploadDragger;
  return (
    <Element
      filedConfig={{
        name: 'files',
      }}
      action={'/api/file'}
      max={10}
      fieldProps={{
        multiple: true,
      }}
      {...props}
      convertValue={(value: (string | UploadFile)[] | string) => {
        let fileOb: UploadFile[] = [];
        if (typeof value === 'string') {
          fileOb.push({
            uid: value,
            status: 'done',
            name: value.split('/').pop() || '',
            url: value,
            response: {
              path: value,
            },
          });
        }
        if (Array.isArray(value)) {
          for (let file of value) {
            if (typeof file === 'string') {
              fileOb.push({
                uid: file,
                status: 'done',
                name: file.split('/').pop() || '',
                url: file,
                response: {
                  path: file,
                },
              });
            } else {
              fileOb.push(file);
            }
          }
        }
        return fileOb;
      }}
      transform={(files: (UploadFile | string)[]) => {
        let fileUrl: string[] = [];
        if (Array.isArray(files)) {
          for (let file of files) {
            if (typeof file === 'string') {
              fileUrl.push(file);
            } else {
              file.status === 'done' && fileUrl.push(file.response.path);
            }
          }
        }
        if (props.max === 1) {
          return { [props.name || '']: fileUrl.at(0) || '' };
        }
        return { [props.name || '']: fileUrl };
      }}></Element>
  );
};

export default FileUpload;
