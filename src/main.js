import Vue from 'vue'
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from 'vue-wysiwyg'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'vue-wysiwyg/dist/vueWysiwyg.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.config.productionTip = false
Vue.use(wysiwyg, { hideModules: { image: true } })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
