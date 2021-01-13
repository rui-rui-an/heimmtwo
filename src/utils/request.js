import Vue from 'vue'
import axios from 'axios'
import { getToken } from './tokens'

axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'

// 让axios请求携带cookies解决跨域问题
axios.defaults.withCredentials = true

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = getToken()
    if (token) {
      config.headers.token = token
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
})

Vue.prototype.$axios = axios
