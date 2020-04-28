import Vue from 'vue'
import Router from 'vue-router'

const Login = () => import(/* webpackChunkName: 'login' */'./views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */'./views/Reg.vue')
const Forget = () => import(/* webpackChunkName: 'forget' */'./views/Forget.vue')
const Index = () => import(/* webpackChunkName: 'home' */'./views/home/index.vue')
const Home = () => import(/* webpackChunkName: 'home' */'./views/home/home.vue')
const Ques = () => import(/* webpackChunkName: 'question' */'./views/home/question.vue')
const Personal_center = () => import(/* webpackChunkName: 'personal' */'./views/personal/personal_center.vue')
const Personal_home = () => import(/* webpackChunkName: 'personal_home' */'./views/personal/person_main.vue')
const Personal_post = () => import(/* webpackChunkName: 'personal_post' */'./views/personal/person_post.vue')
const Personal_setting = () => import(/* webpackChunkName: 'personal_setting' */'./views/personal/person_set.vue')
const Personal_msg = () => import(/* webpackChunkName: 'personal_msg' */'./views/personal/person_msg.vue')

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
    },{
      path: '/personal_center',
      name:'personal_center',
      component: Personal_center,
      children:[{
        path:'/personal_home',
        component:Personal_home
      },{
        path:'/personal_post',
        component:Personal_post
      },{
        path:'/personal_setting',
        component:Personal_setting
      },{
        path:'/personal_msg',
        component:Personal_msg
      }]
    }
  ]
})
