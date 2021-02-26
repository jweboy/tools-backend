import React from 'react';
import { SettingOutlined, UserOutlined } from '@ant-design/icons';

const menus = [
  {
    path: '/example',
    name: '常用stu组件示例',
    icon: <UserOutlined />,
  },
  {
    path: '/system',
    name: '系统管理',
    icon: <SettingOutlined />,
    children: [
      {
        path: '/role',
        name: '权限管理',
      },
      {
        path: '/assets',
        name: '资源管理',
      },
    ],
  },
];

export default menus;
