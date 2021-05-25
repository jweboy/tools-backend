import { Button, Card, Form, Input, Space } from 'antd';
import React, { Fragment, useState } from 'react';
import CreateColorTemplate from './components/CreateColorTemplate';

const CovertColor = () => {
  return (
    <Space>
      <CreateColorTemplate title="RGB转16进制" target="hex" />
      <CreateColorTemplate title="16进制转RGB" target="rgb" />
    </Space>
  );
};

export default CovertColor;
