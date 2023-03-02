import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      header: true
    }
  },
  {
    path: '/kyc/:id',
    name: 'Kyc',
    component: () => import('../views/Kyc.vue')
  },
  {
    path: '/tin-tuc/:id',
    component: () => import('../views/Blog.vue'),
    meta: {
      header: true
    }
  },
  {
    path: '/tim-kiem/:id',
    component: () => import('../views/Blog.vue'),
    meta: {
      header: true
    }
  },
  {
    path: '/tin-tuc',
    component: () => import('../views/Blog.vue'),
    meta: {
      header: true
    }
  },
  {
    path: '/bai-viet/:id',
    component: () => import('../views/Detail.vue'),
    meta: {
      header: true
    }
  },
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
