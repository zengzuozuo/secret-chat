// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueSocketio from 'vue-socket.io'

Vue.use(MuseUi)

//连接服务器
store.commit("WSconnect","ws://192.168.20.68:3000/")

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
