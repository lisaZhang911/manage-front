import Vue from 'vue'
import Router from 'vue-router'
import jwt from 'jsonwebtoken'
import moment from 'moment'

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
const Personal_email = () => import(/* webpackChunkName: 'personal_email' */'./views/personal/person_email.vue')
const Personal_resetPwd = () => import(/* webpackChunkName: 'personal_resetPwd' */'./views/personal/person_resetPwd.vue')
const Post_add = () => import(/* webpackChunkName: 'post_add' */'./views/article/post_add.vue')
const Article_Detail = () => import(/* webpackChunkName:'article_detail' */'./views/article/article_detail.vue')

Vue.use(Router)

const route = new Router({
  routes:[
    {
      path:'/',
      redirect:'/home'
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
          path:'/post_Detail',
          component: Article_Detail
        },{
          path: '/ques',
          component: Ques
        },{
          path:'/post_add',
          component:Post_add,
          meta: { requiresAuth: true }
        }]
    },{
      path:'/email',
      component:Personal_email,
      meta: { requiresAuth: true }
    },{
      path:'/reset',
      component:Personal_resetPwd
    },{
      path: '/personal_center',
      component: Personal_center,
      children:[{
        path:'/personal_home',
        component:Personal_home,
        meta: { requiresAuth: true }
      },{
        path:'/personal_post',
        component:Personal_post,
        meta: { requiresAuth: true }
      },{
        path:'/personal_setting',
        component:Personal_setting,
        meta: { requiresAuth: true }
      },{
        path:'/personal_msg',
        component:Personal_msg,
        meta: { requiresAuth: true }
      }]
    }
  ]
})
route.beforeEach((to,from,next) => {
  if(to.meta.requiresAuth){
    const token = localStorage.getItem('token')

    if(token != null && moment().isBefore(moment(jwt.decode(token).exp*1000))){
      next()
    } else {
        const sign_time = localStorage.getItem('sign_time')
        const score = localStorage.getItem('score')
        const count = localStorage.getItem('count')

        localStorage.clear()
        localStorage.setItem('sign_time',sign_time)
        localStorage.setItem('score',score)
        localStorage.setItem('count',count)
        next({ path: '/login' })
    }
  } else {
    next()
  }
})
export default route
