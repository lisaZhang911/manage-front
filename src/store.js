import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    sid:'',
    isLogin:false,
    token:'',
    userInfo:{},
    baseUrl:'http://localhost:3000'
  },
  mutations:{
    setSid (state,value){
      state.sid = value
    },
    set_login_state (state,value){
      state.isLogin = value
    },
    set_userInfo (state,value){
      state.userInfo = value
    },
    set_token (state,value){
      state.token = value
      console.log(value);
    }
  }
})
