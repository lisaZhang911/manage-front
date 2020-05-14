<template>
  <div class="">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li>
              <router-link :to="{ name: 'login'}">登录</router-link>
            </li>
            <li class="layui-this">找回密码<!--重置密码--></li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <ValidationObserver ref="observer" v-slot="{validate}">
                  <form method="post"  @submit.prevent="validate(submit)">
                    <ValidationProvider name="email" rules="required|email" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_email" class="layui-form-label">邮箱</label>
                        <div class="layui-input-inline">
                          <input v-model="email" type="text"  name="email" class="layui-input">
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="vercode" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input v-model="code" type="text" id="L_vercode" name="vercode" placeholder="输入验证码"  class="layui-input">
                        </div>
                        <div class="layui-form-mid">
                          <span style="color: #c00;" v-html="svg" @click="_getCaptcha">1</span>
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                      </div>
                    </ValidationProvider>
                    <div class="layui-form-item">
                      <button class="layui-btn" @click="submit">提交</button>
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
import { getCode,forget } from '../service/loginService.js'
import { v4 as uuidv4 } from 'uuid'
import { ValidationObserver,ValidationProvider } from 'vee-validate'

export default {
  components:{
    ValidationObserver,
    ValidationProvider
  },
  data(){
    return {
      svg:'',
      code:'',
      email:''
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
      forget({
        email:this.email,
        sid:this.$store.state.sid,
        code:this.code
      }).then(r => {
        if(r.code == 200){
          this.$alert(r.data.result)
        } else {
          this.$alert(r.err_msg)
        }
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
