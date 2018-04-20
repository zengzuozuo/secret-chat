import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Index from '@/components/pages/index'
import Wallet from '@/components/pages/wallet'
import ChatList from '@/components/pages/chat_list'
import Setting from '@/components/pages/setting'
import AddChat from '@/components/pages/add_chat'
import ChatIn from '@/components/pages/chat_in'
import Login from '@/components/pages/login'
import Register from '@/components/pages/register'
import Specification from '@/components/pages/specification'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'chatlist',
      children: [
        {path: 'wallet', name: 'wallet', component: Wallet},
        {path: 'chatlist', name: 'chatlist', component: ChatList},
        {path: 'setting', name: 'setting', component: Setting},
        {path: 'addchat', name: 'addchat', component: AddChat}
      ]
    },
    {
      path: '/chatin',
      component: ChatIn
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/specification',
      component: Specification
    }
  ]
})
