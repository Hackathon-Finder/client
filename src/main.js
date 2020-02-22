import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import GSignInButton from 'vue-google-signin-button'
import GAuth from 'vue-google-oauth2'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const gauthOption = {
  clientId: process.env.VUE_APP_GOOGLE_ID
}

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(GSignInButton)
Vue.use(GAuth, gauthOption)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
