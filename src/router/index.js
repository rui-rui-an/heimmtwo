import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import notfound from '@/views/notFound'
import chart from '@/views/layout/chart'
import enterprise from '@/views/layout/enterprise'
import question from '@/views/layout/question'
import subject from '@/views/layout/subject'
import user from '@/views/layout/user'
import { getToken } from '@/utils/tokens.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '*',
    component: notfound
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'chart',
        component: chart
      },
      {
        path: 'enterprise',
        component: enterprise
      },
      {
        path: 'question',
        component: question
      },
      {
        path: 'subject',
        component: subject
      },
      {
        path: 'user',
        component: user
      }
    ]
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
