// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import MuseUi from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import VueSocketio from 'vue-socket.io'
import VueI18n from 'vue-i18n'
import LangEn from '../static/lang/en'
import LangZh from '../static/lang/zh'




Vue.use(MuseUi)
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    //this.$i18n.locale // 通过切换locale的值来实现语言切换
    messages: {
      'zh-CN': LangZh,   // 中文语言包
      'en-US': LangEn    // 英文语言包
    }
})

//连接服务器
store.commit("WSconnect","ws://13.231.69.243:3000/")

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>'
})
