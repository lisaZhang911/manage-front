import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */'./views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */'./views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */'./views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'home' */'./views/home/index.vue')
const Home = () => import(/* webpackChunkName: 'home' */'./views/home/home.vue')
const Ques = () => import(/* webpackChunkName: 'home' */'./views/home/question.vue')

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
    },
    {
      path:'/index',
      name:'index',
      component:Index,
      children:[{
          path: '/home',
          component: Home
        },{
          path: '/ques',
          component: Ques
        }]
    }
  ]
})
