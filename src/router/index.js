import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register-user',
    name: 'RegisterUser',
    component: () => import(/* webpackChunkName: "registerUser" */ '../views/RegisterUser.vue')
  },
  {
    path: '/register-organizer',
    name: 'RegisterOrganizer',
    component: () => import(/* webpackChunkName: "registerOrganizer" */ '../views/registerOrganizer.vue')
  },
  {
    path: '/events/:id',
    name: 'SingleEvent',
    component: () => import(/* webpackChunkName: "SingleEvent" */ '../views/SingleEvent.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
