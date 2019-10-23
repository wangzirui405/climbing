// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.prototype.$axios = axios
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://47.103.100.226/circuitry_game_be/public'
axios.defaults.withCredentials = true
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
