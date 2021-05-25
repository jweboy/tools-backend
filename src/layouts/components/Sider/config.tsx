import React from 'react';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';

const menus = [
  {
    path: '/tools',
    name: '常用工具',
    icon: <SettingOutlined />,
    children: [
      {
        path: '/covert-color',
        name: '颜色值转换',
      },
      {
        path: '/remote-file-download',
        name: '远程文件下载',
      },
    ],
  },
];

export default menus;
