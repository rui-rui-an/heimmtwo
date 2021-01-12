import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1/heimamm/public'

// 让axios请求携带cookies解决跨域问题
axios.defaults.withCredentials = true

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
})

Vue.prototype.$axios = axios
