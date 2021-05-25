/*
 * @Author: jweboy
 * @Date: 2020-02-06 11:00:48
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-24 14:02:02
 */
import axios, { AxiosResponse, AxiosError } from 'axios';
import { message } from 'antd';
import { SspResponse } from '@/typings/common';
import {
  SUCCESS_CODE,
  INVALID_TOKEN_CODE,
  NO_TOKEN_CODE,
  REQUEST_NOT_FOUND,
  REQUEST_SERVER_ERROR,
} from '@/constants';
import
  from '../storage';
import config, { RequestConfig, getContentType } from './config';
import { getRandomHash } from '..';

// 创建请求实例
const instance = axios.create(config);

// 请求拦截器
instance.interceptors.request.use(
  function request(config: RequestConfig) {
    const auth = localStorage.get('auth');

    config.headers.token = auth?.token;
    config.headers['X-B3-TraceId'] = getRandomHash(32);
    config.headers['Content-Type'] = getContentType(config.contentType);

    // 文件类型请求需要将文件内容拼接到form表单里
    if (config.contentType === 'file') {
      const formData = new FormData();
      formData.append('file', config.data);
      config.data = formData;
    }

    return config;
  },
  function response(err: Error) {
    return Promise.reject(err);
  },
);

// 响应拦截器
instance.interceptors.response.use(
  async function request(res: AxiosResponse) {
    const { code, msg, success, type } = res.data;
    const { responseType } = res.config;
    const { UPS_URL } = process.env;

    // 未请求成功，基本是接口内部 rpc 调用异常等场景引起
    if (!success && responseType !== 'blob') {
      // token错误跳转到登录页面
      if (code === INVALID_TOKEN_CODE || code === NO_TOKEN_CODE) {
        message.destroy();
        message.error('登录状态已失效，请重新登录');
        setTimeout(() => {
          window.location.href = '/login';
        }, 300);
        throw Error('登录失效');
      }

      // 其他错误直接往上抛出
      throw Error(msg);
    } else if (responseType === 'blob') {
      // 文件下载用 stu 内部组件，需要返回一个 Promise 以便组件能够继续执行下载操作
      const header = res.headers['content-disposition-ad'] || res.headers['content-disposition'];
      return Promise.resolve({
        type,
        data: res.data,
        // @ts-ignore
        fileName: /filename=(.+)$/.exec(header)[1],
      });
    } else if (code === SUCCESS_CODE) {
      // 请求成功
      return res.data;
    }

    // 默认返回 response
    return res;
  },
  function respHander(err: AxiosError) {
    const { status } = err.response || {};
    // console.log('err =>', err.response);

    let msg = '';
    const isTimeout = err.code === 'ECONNABORTED';
    if (err.message === 'Network Error') {
      msg = '网络错误，请稍候重试';
    } else if (isTimeout) {
      msg = '请求超时，请稍候重试';
    } else if (status === REQUEST_SERVER_ERROR) {
      msg = '服务器错误';
    } else if (status === REQUEST_NOT_FOUND) {
      msg = '请求地址不存在';
    } else {
      msg = err.message;
    }
    throw Error(msg);
  },
);

// get 请求函数
export const get = <T, R = SspResponse<T>>(config: RequestConfig) => {
  const { method, contentType = 'json', ...restProps } = config;

  return instance
    .request<T, R>({ ...restProps, contentType, method: 'GET' } as RequestConfig)
    .catch(err => {
      // 统一捕获错误信息并提示
      message.error(err.message);

      // pending 状态可以中止原 Promise 执行链
      return new Promise(() => {});
    });
};

// post 请求函数
export const post = async <T, R = SspResponse<T>>(config: RequestConfig) => {
  const { method, contentType = 'form', customError, ...restProps } = config;

  return instance
    .request<T, R>({ ...restProps, contentType, method: 'POST' } as RequestConfig)
    .catch((err: Error) => {
      // 如果不存在自定义错误提示就统一处理，否则就放行错误自行处理
      if (!customError) {
        // 统一捕获错误信息并提示
        message.error(err.message);
        // pending 状态可以中止原 Promise 执行链
        return new Promise(() => {});
      }

      return Promise.reject(err);
    });
};
