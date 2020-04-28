<template>
  <div class="">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li class="layui-this">
              <router-link :to="{ name: 'login'}">登陆</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'reg'}">注册</router-link>
            </li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <ValidationObserver ref="observer" v-slot="{validate}">
                  <form method="post" @submit.prevent="validate(submit)">
                    <ValidationProvider name="name" rules="required" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_email" class="layui-form-label">账号</label>
                        <div class="layui-input-block">
                          <input
                          v-model="email"
                          type="text"
                          id="L_email"
                          name="name"
                          autocomplete="off"
                          class="layui-input">
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="password" rules="required" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_pass" class="layui-form-label">密码</label>
                        <div class="layui-input-block">
                          <input
                          v-model="password"
                          type="password"
                          id="L_pass"
                          name="pass"
                          autocomplete="off"
                          class="layui-input">
                        </div>
                        <div class="error layui-input-inline layui-form-mid">{{errors[0]}}</div>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="code" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input
                          v-model="code"
                          type="text"
                          id="L_vercode"
                          name="vercode"
                          placeholder="请回答后面的问题"
                          autocomplete="off"
                          class="layui-input">
                        </div>
                        <div class="layui-form-mid layui-input-inline">
                          <span style="color: #c00;" v-html="svg" @click="_getCaptcha">1</span>
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                      </div>
                    </ValidationProvider>

                    <div class="layui-form-item">
                      <button class="layui-btn" @click="submit">立即登录</button>
                      <span style="padding-left:20px;">
                        <router-link :to="{ name: 'forget'}">忘记密码</router-link>
                      </span>
                    </div>
                    <div class="layui-form-item fly-form-app">
                      <span>或者使用社交账号登入</span>
                      <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-qq" title="QQ登入"></a>
                      <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" class="iconfont icon-weibo" title="微博登入"></a>
                    </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, login } from '../service/loginService.js'
import { v4 as uuidv4 } from 'uuid'
import { ValidationObserver,ValidationProvider } from 'vee-validate'

export default {
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      email:'',
      password:'',
      code:'',
      svg:''
    }
  },
  methods:{
    _getCaptcha(){
      let sid = this.$store.state.sid
      getCode(sid).then(r => {this.svg = r.data})
    },
    async submit(){
      const isValid = await this.$refs.observer.validate()
      if(!isValid){
        return
      }
      login({
        email: this.email,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(r => {
         if(r.code == 200){
           this.$store.commit('set_login_state',true)
           this.$store.commit('set_userInfo',r.data.user)
           this.$store.commit('set_token',r.data.token)
           this.$router.replace('/home')
         } else if(r.response.data.code ==500){
           this.$alert('密码或用户名错误')
         } else if(r.response.data.code==401){
           this.$alert('验证码错误')
         }
      }).catch(err => {
          console.log('errC', err);
      })
    }
  },
  mounted(){
    let sid = ''
    if(localStorage.getItem('sid')){
      sid = localStorage.getItem('sid')
    } else {
      sid = uuidv4()
      localStorage.setItem('sid',sid)
    }
    this.$store.commit('setSid',sid)
    this._getCaptcha()
  }
}
</script>

<style lang="scss" scoped>

</style>
