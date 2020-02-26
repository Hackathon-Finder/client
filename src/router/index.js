import Vue from 'vue'
import VueRouter from 'vue-router'
import Landing from '../views/Landing.vue'
import Monaco from '../views/Monaco.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Landing',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('token')
      if (!valid) {
        next()
      } else {
        next({
          name: "Home" // back to safety route //
        });
      }
    },
    component: Landing
  },
  {
    path: '/login',
    name: 'Login',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('token')
      if (!valid) {
        next()
      } else {
        next({
          name: "Home" // back to safety route //
        });
      }
    },
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('token')
      if (valid) {
        next()
      } else {
        next({
          name: "Login" // back to safety route //
        });
      }
    },
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/register-user',
    name: 'RegisterUser',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('token')
      if (!valid) {
        next()
      } else {
        next({
          name: "Home" // back to safety route //
        });
      }
    },
    component: () => import(/* webpackChunkName: "registerUser" */ '../views/RegisterUser.vue')
  },
  {
    path: '/register-organizer',
    name: 'RegisterOrganizer',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('token')
      if (!valid) {
        next()
      } else {
        next({
          name: "Home" // back to safety route //
        });
      }
    },
    component: () => import(/* webpackChunkName: "registerOrganizer" */ '../views/registerOrganizer.vue')
  },
  {
    path: '/events/:id',
    name: 'SingleEvent',
    component: () => import(/* webpackChunkName: "SingleEvent" */ '../views/SingleEvent.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    beforeEnter: (to, from, next) => {
      const valid = localStorage.getItem('token')
      if (valid) {
        next()
      } else {
        next({
          name: "Login" // back to safety route //
        });
      }
    },
    component: () => import(/* webpackChunkName: "Profile" */ '../views/Profile.vue')
  },
  {
    path: '/team/:id',
    name: 'SingleTeam',
    component: () => import(/* webpackChunkName: "SingleTeam" */ '../views/SingleTeam.vue')
  },
  {
    path: '/skilltest/:skill',
    name: 'skilltest',
    component: Monaco
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
