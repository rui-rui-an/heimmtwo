import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import { getToken } from '@/utils/tokens.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout
  }
]

const router = new VueRouter({
  routes
})

// 全局路由守卫，所有的路由跳转都会先经过这里，所以我们可以在这里判断有没有token，如果有则跳转，没有就打回首页
router.beforeEach((to, from, next) => {
  // console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    const token = getToken()
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
