import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Singer from '@/views/Singer'
import Song from '@/views/Song'
import Player from '@/views/Player'
import SetCookie from '@/components/SetCookie'

Vue.use(VueRouter)

const routes = [{
    path: '/singer',
    name: 'singer',
    component: Singer
  },
  {
    path: '/song',
    name: 'song',
    component: Song
  },
  {
    path: '/setcookie',
    name: 'setcookie',
    component: SetCookie
  },
  {
    path: '/player',
    name: 'player',
    component: Player
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router