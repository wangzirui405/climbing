import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import person from '@/components/person'
import signIn from '@/components/signIn'
import password from '@/components/password'
import friends from '@/components/friends'
import other from '@/components/other'
import mail from '@/components/mail/mail'
import message from '@/components/mail/message'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: '欢迎来到电路殿堂',
      component: HelloWorld
    },
    {
      path: '/friends',
      name: '好友列表',
      component: friends
    },
    {
      path: '/other/:id',
      component: other
    },
    {
      path: '/message/:id',
      component: message
    },
    {
      path: '/signIn',
      name: '登录',
      component: signIn
    },
    {
      path: '/password',
      name: '修改密码',
      component: password
    },
    {
      path: '/mail',
      name: '邮箱',
      component: mail
    },
    {
      path: '/person',
      name: '个人信息',
      component: person
    }
  ]
})
