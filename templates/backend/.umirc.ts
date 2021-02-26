import { defineConfig } from 'umi';
import setEnvKeys from './scripts/envFiles';

const isProd = process.env.ENV === 'prod';

// ref: https://umijs.org/config/
const config = defineConfig({
  title: '通用系统模板',
  cssModulesTypescriptLoader: {}, // 自动生成 *.less.d.ts 文件
  dva: false,
  define: setEnvKeys(), // 环境变量
  dynamicImport: {
    loading: '@/components/Loading',
  }, // 页面模块按需加载
  fastRefresh: {}, // 热更新
  terserOptions: {
    // 线上环境删除 console
    compress: {
      drop_console: isProd,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  extraBabelPlugins: [
    // 组件库按需加载
    [
      'babel-plugin-import',
      {
        libraryName: 'stu',
        libraryDirectory: 'lib/base',
        camel2DashComponentName: false,
      },
    ],
  ],
});

export default config;
