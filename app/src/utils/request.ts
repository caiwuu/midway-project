/*
 * @Author: caiwu
 * @Description:
 * @CreateDate:
 * @LastEditor:
 * @LastEditTime: 2022-07-06 14:51:08
 */
import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
const isDev = process.env.NODE_ENV == 'development'
const request = axios.create({
  baseURL: isDev ? '/api' : '',
  timeout: 30000,
})
//请求拦截器
request.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (config.headers) {
      config.headers.token = sessionStorage.getItem('token') || ''
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
//响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)
export default request
