import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */'./views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'login' */'./views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'login' */'./views/Forget.vue')

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      name:'login',
      component:Login
    },
    {
      path:'/reg',
      name:'reg',
      component:Reg
    },
    {
      path:'/forget',
      name:'forget',
      component:Forget
    }
  ]
})
