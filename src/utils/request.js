import Vue from 'vue'
import axios from 'axios'
import { getToken, removeToken } from './tokens'
import { Message } from 'element-ui'
import router from '@/router'

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
  // console.log(response)
  // 对token过期的处理
  if (response.data.code === 206) {
    // 1.提示 Vue是构造函数，所以不能直接点击
    // Vue.prototype.$message.error('token过期')
    Message.error('token过期')
    // 2.清空本地token
    removeToken()
    // 3.返回登录页面,注意这里不能用this，因为这里不能用vue实例，只有在.vue文件中可以使用
    router.push('/login')
  }
  return response.data
})

Vue.prototype.$axios = axios
