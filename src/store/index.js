import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../server'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: false,
    user: {},
    events: []
  },
  mutations: {
    SET_LOGIN (state, payload) {
      state.isLogin = payload
    },
    SET_USER (state, payload) {
      state.user = payload
    },
    SET_EVENTS (state, payload) {
      state.events = payload
    }
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
    },
    getSingleEvent (_, payload) {
      return axios({
        method: 'GET',
        url: `events/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateEvent (_, payload) {
      const data = payload.data
      return axios({
        method: 'PUT',
        url: `events/update/${payload._id}`,
        data,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateStatus (_, payload) {
      return axios({
        method: 'PATCH',
        url: `events/updateStatus/${payload._id}`,
        data: {
          status: payload.data
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    loginToken ({ commit }) {
      axios({
        method: 'GET',
        url: 'users/login/token',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({ data }) => {
          commit('SET_USER', data.user)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllEvents ({ commit }) {
      axios({
        method: 'GET',
        url: 'events',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then (({ data }) => {
          commit('SET_EVENTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getEventsOrganizer ({ commit }) {
      axios({
        method: 'GET',
        url: 'events/owner',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then (({ data }) => {
          commit('SET_EVENTS', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    addEvents (_, payload) {
      console.log(payload)
      return axios({
        method: 'POST',
        url: 'events',
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateUser(_, payload) {
      return axios({
        method: 'PATCH',
        url: `users`,
        data: payload,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    }
  },
  modules: {
  }
})
