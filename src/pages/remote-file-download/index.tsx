import { downloadFile } from '@/utils/download';
import { Button, Card, Form, Input } from 'antd';
import React from 'react';

interface IDownload {
  fileUrl: string;
}

const DownloadRemoteFiles = () => {
  const onFinish = (values: IDownload) => {
    const names = values.fileUrl.split('/');
    const fileName = names[names.length - 1];

    fetch(values.fileUrl)
      .then((resp) => resp.blob())
      .then((data) => {
        downloadFile(data, fileName);
      });
  };

  return (
    <Card>
      <Form onFinish={onFinish}>
        <Form.Item name="fileUrl">
          <Input.TextArea rows={2} />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          下载
        </Button>
      </Form>
    </Card>
  );
};

export default DownloadRemoteFiles;
