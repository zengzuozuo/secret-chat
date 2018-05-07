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
import FastClick from 'fastclick'

if ('addEventListener' in document) {  // 解决移动端300毫秒延迟
	document.addEventListener('DOMContentLoaded', function () {
		FastClick.attach(document.body)
	}, false)
}


Vue.use(MuseUi)
Vue.use(VueI18n)

const i18n = new VueI18n({
    locale: 'zh-CN',    // 语言标识
    messages: {
      'zh-CN': LangZh,   // 中文语言包
      'en-US': LangEn    // 英文语言包
    }
})

//连接服务器
store.commit("WSconnect","ws://secretchat.org:3000/")

Vue.prototype.$getStrLeng = function(str){ 
  var realLength = 0; 
  var len = str.length; 
  var charCode = -1; 
  for(var i = 0; i < len; i++){ 
      charCode = str.charCodeAt(i); 
      if (charCode >= 0 && charCode <= 128) {  
          realLength += 1;
      }else{  
          // 如果是中文则长度加3 
          realLength += 3; 
      } 
  }  
  return realLength; 
}
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
