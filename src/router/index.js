import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/utils/tokens.js'

// import Login from '@/views/login'
// import Layout from '@/views/layout'
// import notfound from '@/views/notFound'
// import chart from '@/views/layout/chart'
// import enterprise from '@/views/layout/enterprise'
// import question from '@/views/layout/question'
// import subject from '@/views/layout/subject'
// import user from '@/views/layout/user'
// import Welcome from '@/views/welcome'

const Login = () => import('@/views/login')
const Layout = () => import('@/views/layout')
const notfound = () => import('@/views/notFound')
const chart = () => import('@/views/layout/chart')
const enterprise = () => import('@/views/layout/enterprise')
const question = () => import('@/views/layout/question')
const subject = () => import('@/views/layout/subject')
const user = () => import('@/views/layout/user')
const Welcome = () => import('@/views/welcome')

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
    component: Login,
    meta: { title: '欢迎登录' }
  },
  {
    path: '/layout',
    name: 'Layout',
    component: Layout,
    children: [
      {
        path: 'chart',
        component: chart,
        meta: {
          title: '数据预览',
          icon: 'el-icon-eleme',
          path: '/layout/chart',
          rights: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'enterprise',
        component: enterprise,
        meta: {
          title: '企业列表',
          icon: 'el-icon-office-building',
          path: '/layout/enterprise',
          rights: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'question',
        component: question,
        meta: {
          title: '题库列表',
          icon: 'el-icon-edit-outline',
          path: '/layout/question',
          rights: ['超级管理员', '管理员', '老师', '学生']
        }
      },
      {
        path: 'subject',
        component: subject,
        meta: {
          title: '学科列表',
          icon: 'el-icon-document',
          path: '/layout/subject',
          rights: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'user',
        component: user,
        meta: {
          title: '用户列表',
          icon: 'el-icon-user',
          path: '/layout/user',
          rights: ['超级管理员', '管理员', '老师']
        }
      },
      {
        path: 'welcome',
        component: Welcome,
        meta: {
          title: '欢迎登录',
          icon: 'el-icon-loading',
          path: '/layout/welcome',
          rights: ['超级管理员', '管理员', '老师', '学生']
        }
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

// 后置守卫设置动态标题
router.afterEach((to, from) => {
  // ...
  // console.log(to)
  if (to.meta.title) {
    document.title = to.meta.title || '黑马面面'
  }
})

export default router
