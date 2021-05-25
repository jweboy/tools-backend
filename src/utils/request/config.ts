import { AxiosRequestConfig } from 'axios';
import qs from 'qs';

export interface CustomConfig {
  contentType: 'json' | 'form' | 'file';
  customError?: boolean;
}

export type RequestConfig = AxiosRequestConfig & Partial<CustomConfig>;

export const getContentType = (type?: CustomConfig['contentType']) => {
  switch (type) {
    case 'json':
      return 'application/json';
    case 'form':
      return 'application/x-www-form-urlencoded';
    case 'file':
      return 'multipart/form-data';
    default:
      return 'application/json';
  }
};

const config: RequestConfig = {
  baseURL: process.env.API,
  // baseURL: 'http://10.1.8.99:8080',
  responseType: 'json',
  timeout: 10000, // 10s超时
  withCredentials: false, // 是否允许携带cookie
  transformRequest: [
    function transformRequest(data, headers) {
      if (headers['Content-Type'] === 'application/json') {
        return JSON.stringify(data);
      }
      if (headers['Content-Type'] === 'multipart/form-data') {
        return data;
      }
      return qs.stringify(data);
    },
  ],
};

export default config;
