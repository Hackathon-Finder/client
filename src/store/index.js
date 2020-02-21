import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    registerUser (_, payload) {
      return axios({
        method: 'POST',
        url: 'users/register',
        data: payload
      })
    },
    registerOrganizer (_, payload) {
      return axios({
        method: 'POST',
        url: 'users/register',
        data: payload
      })
    },
    login (_, payload) {
      return axios({
        method: 'POST',
        url: 'users/login',
        data: payload
      })
    }
  },
  modules: {
  }
})
