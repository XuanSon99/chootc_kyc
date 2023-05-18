import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: () => import('../views/Home.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  {
    path: '/:id',
    name: 'Kyc',
    component: () => import('../views/Kyc.vue')
  },
  // {
  //   path: '/danh-muc/:id',
  //   component: () => import('../views/Blog.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  // {
  //   path: '/tim-kiem/:id',
  //   component: () => import('../views/Blog.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  // {
  //   path: '/tin-tuc',
  //   component: () => import('../views/Blog.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  // {
  //   path: '/ngoai-te',
  //   component: () => import('../views/rate/Currency.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  // {
  //   path: '/gia-vang',
  //   component: () => import('../views/rate/Gold.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  // {
  //   path: '/tien-dien-tu',
  //   component: () => import('../views/rate/Crypto.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  // {
  //   path: '/chung-khoan',
  //   component: () => import('../views/rate/Stock.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
  // {
  //   path: '/:id',
  //   component: () => import('../views/Detail.vue'),
  //   meta: {
  //     header: true
  //   }
  // },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior() {
    return { x: 0, y: 0, behavior: 'smooth', };
  },
})

export default router
