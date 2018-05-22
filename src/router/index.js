import Vue from 'vue'
import Router from 'vue-router'


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

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: 'chatlist',
      meta: {
        isLogin: true
      },
      children: [
        {path: 'wallet', name: 'wallet', component: Wallet, meta: {isLogin: true}},
        {path: 'chatlist', name: 'chatlist', component: ChatList, meta: {isLogin: true}},
        {path: 'setting', name: 'setting', component: Setting, meta: {isLogin: true}},
        {path: 'addchat', name: 'addchat', component: AddChat, meta: {isLogin: true}}
      ]
    },
    {
      path: '/chatin',
      component: ChatIn,
      meta: {
        isLogin: true
      }
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

router.beforeEach((to, from, next) => {
	// 登录拦截
	if(to.meta.isLogin) {
		if(!localStorage.getItem("userid")) {
      next({path: "login"})
		} else {
			next(true);
		}
	}else {
		next(true);
	}  
})

export default router
