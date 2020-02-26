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
        method: 'PATCH',
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
    createTeam (_, payload) {
      return axios({
        method: 'POST',
        url: 'teams/',
        data: {
          name: payload.name,
          ownerId: payload.ownerId,
          max_size: payload.max_size,
          skillset: payload.skillset,
          eventId: payload.id
        },
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
    },
    addMember (_, payload) {
      return axios({
        method: 'PATCH',
        url: `teams/addmember/${payload.teamId}`,
        data: {
          userId: payload.userId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    addApplicant (_, payload) {
      return axios({
        method: 'PATCH',
        url: `events/addapplicants/${payload.id}`,
        data: {
          teamId: payload.teamId
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    getTeam (_, payload) {
      return axios({
        method: 'GET',
        url: `teams/${payload}`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    getUserRecommendation (_, payload) {
      console.log(payload, 'ini payload')
      return axios({
        method: 'POST',
        url: `users/skill`,
        data: {
          skillset: payload
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
    },
    updateSkill(_, payload) {
      return axios({
        method: 'PATCH',
        url: `users/skillset`,
        headers:{
          token: localStorage.getItem('token')
        },
        data:{
          skill: payload.skill,
          questionId: '1',
          verifiedPoint: 70,
          answer: payload.answer
        }
      })
    }
  },
  modules: {
  }
})
