import moment from 'moment'
import jwt from 'jsonwebtoken'

let timer = null

const _logout =  function(){
  const sign_time = localStorage.getItem('sign_time')
  const count = localStorage.getItem('count')
  const score = localStorage.getItem('score')
  const isSign = localStorage.getItem('isSign')

  localStorage.clear()
  localStorage.setItem('sign_time',sign_time)
  localStorage.setItem('count',count)
  localStorage.setItem('score',score)
  localStorage.setItem('isSign',isSign)

  this.$store.commit('set_login_state',false)
  this.$store.commit('set_userInfo',{})

  if(this.$router.currentRoute.fullPath != '/home'){
    this.$router.replace('/home')
  }
}

const debounce = function(func,delay){
  if(timer){
    clearTimeout(timer)
  }
  timer = setTimeout(func,delay)
}

const parse_time = function(time){
  return moment(time).format('YYYY-MM-DD')
}

const login_state = function(){
    const token = localStorage.getItem('token')
    return token != null && moment().isBefore(moment(jwt.decode(token).exp*1000))
}

const get_token = function(){
  const token = localStorage.getItem('token')
  return jwt.decode(token)
}

export {
  _logout,
  debounce,
  parse_time,
  login_state,
  get_token
}
