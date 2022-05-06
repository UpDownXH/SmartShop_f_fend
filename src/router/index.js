// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/views/Index.vue'
import Login from '@/views/Login'
import Intruduce from '@/views/Intruduce'
import UserEcharts from '@/views/UserEcharts'
import Demo from '@/views/DemoApp'
import Search from '@/views/Search'
import Detail from '@/views/Detail'
import Cart from '@/views/Cart'


// import AddGood from '@/views/AddGood'

const router = createRouter({
  history: createWebHashHistory(), // hash 模式
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/demo',
      name: 'demo',
      component: Demo
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/intruduce',
      name: 'intruduce',
      component: Intruduce
    },
    {
      path: '/userEcharts',
      name: 'userEcharts',
      component: UserEcharts
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: Detail
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
  ]
})


export default router