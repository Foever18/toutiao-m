import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/Layout'
// 导入路由
const Home = () => import('@/views/Home')
const My = () => import('@/views/My')
const Question = () => import('@/views/Question')
const Video = () => import('@/views/Video')
const Login = () => import('@/views/Login')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'my',
        component: My
      },
      {
        path: 'question',
        component: Question
      },
      {
        path: 'video',
        component: Video
      }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]
const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

export default router
