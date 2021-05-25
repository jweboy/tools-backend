import { CopyTwoTone } from '@ant-design/icons';
import { Button, Card, Form, Input, message, Space } from 'antd';
import React, { FC, Fragment, useCallback, useState } from 'react';
import { IColor } from '../../typings';

const CreateColorTemplate: FC<{
  target: 'hex' | 'rgb';
  title?: string;
}> = (props) => {
  const [color, setColor] = useState('');

  const covertRgbToHex = (color: IColor['color']) => {
    // 如果是rgb颜色表示
    if (/^(rgb|RGB)/.test(color!)) {
      const aColor = color!.replace(/(?:\(|\)|rgb|RGB)*/g, '').split(',');
      let strHex = '#';
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        if (hex.length < 2) {
          hex = '0' + hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = color!;
      }
      return strHex;
    }

    return color;
  };

  const covertHexToRgb = (color: IColor['color']) => {
    let sColor = color!.toLowerCase();
    // 十六进制颜色值的正则表达式
    const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;

    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = '#';
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }

      //处理六位的颜色值
      const sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
      }
      return 'rgb(' + sColorChange.join(',') + ')';
    }

    return sColor;
  };

  const covertColor = useCallback(
    (color) => {
      switch (props.target) {
        case 'hex':
          return covertRgbToHex(color);
        case 'rgb':
          return covertHexToRgb(color);
        default:
          break;
      }
    },
    [props.target],
  );

  const onFinish = (values: IColor) => {
    const result = covertColor(values.color!);
    setColor(result!);
  };

  const onCopy = useCallback(async () => {
    await navigator.clipboard.writeText(color);
    message.success('复制成功');
  }, [color]);

  return (
    <Card title={props.title}>
      <Space direction="vertical">
        <Form onFinish={onFinish}>
          <Form.Item
            label="颜色值"
            name="color"
            rules={[{ required: true, message: '请输入颜色值' }]}
          >
            <Input placeholder="请输入颜色值" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              转换
            </Button>
          </Form.Item>
        </Form>
        <div>
          <span>转换结果：{color}</span>
          {!!color && <CopyTwoTone onClick={onCopy} />}
        </div>
      </Space>
    </Card>
  );
};

export default CreateColorTemplate;
