<template>
  <div class="">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel fly-panel-user" pad20>
        <div class="layui-tab layui-tab-brief" lay-filter="user">
          <ul class="layui-tab-title">
            <li>
              <router-link :to="{ name: 'login'}">登陆</router-link>
            </li>
            <li class="layui-this">
              <router-link :to="{ name: 'reg'}">注册</router-link>
            </li>
          </ul>
          <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
            <div class="layui-tab-item layui-show">
              <div class="layui-form layui-form-pane">
                <ValidationObserver ref="observer" v-slot="{validate}">
                  <form method="post"  @submit.prevent="validate(submit)">
                    <ValidationProvider name="email" rules="required|email" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_email" class="layui-form-label">邮箱</label>
                        <div class="layui-input-block">
                          <input v-model="email" type="text" id="L_email" name="email" class="layui-input" placeholder="将会成为您唯一的登入名">
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="name" rules="required" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_username" class="layui-form-label">昵称</label>
                        <div class="layui-input-block">
                          <input v-model="nickName" type="text" id="L_username" name="name" class="layui-input">
                        </div>
                        <div class="error layui-form-mid">{{errors[0]}}</div>
                      </div>
                    </ValidationProvider>
                    <ValidationProvider name="password" rules="required|min:6|max:16|confirmed:repass" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_pass" class="layui-form-label">密码</label>
                        <div class="layui-input-inline">
                          <input v-model="password" type="password" id="L_pass" name="password" class="layui-input">
                        </div>
                        <div class="layui-form-mid layui-word-aux">6到16个字符</div>
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                    <ValidationProvider name="repass" v-slot="{errors}"  vid="repass" rules="required|min:6|max:16" >
                      <div class="layui-form-item">
                        <label for="L_repass" class="layui-form-label">确认密码</label>
                        <div class="layui-input-inline">
                          <input v-model="repass" type="password" id="L_repass" name="repass" class="layui-input">
                        </div>
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                    <ValidationProvider name="code" rules="required|length:4" v-slot="{errors}">
                      <div class="layui-form-item">
                        <label for="L_vercode" class="layui-form-label">验证码</label>
                        <div class="layui-input-inline">
                          <input v-model="code" type="text" id="L_vercode" name="code" class="layui-input">
                        </div>
                        <div class="layui-form-mid">
                          <span v-html="svg" @click="_getCaptcha">1</span>
                        </div>
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                  <div class="layui-form-item">
                    <button class="layui-btn"  @click="submit">立即注册</button>
                  </div>
                  <div class="layui-form-item fly-form-app">
                    <span>或者直接使用社交账号快捷注册</span>
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
import { getCode, registry } from '@/service/loginService.js'
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
      email:'',
      nickName:'',
      password:'',
      repass:'',
      code:''
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
      registry({
        email: this.email,
        name: this.nickName,
        password: this.password,
        code: this.code,
        sid: this.$store.state.sid
      }).then(r => {
        if(r.code==200 && r.errorMsg=='' ){
          this.$alert('注册成功')
          setTimeout(() => {
            this.$router.replace('/login')
          },1500)
        } else {
          this.$alert(r.msg)
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

    const dict = {
      custom: {
        email: {
          required: '邮箱不能为空'
        },
        name: {
          required: '昵称不能为空'
        },
        password: {
          required: '密码必填'
        },
        repass:{
          required: '密码必填'
        }
      }
    };
    this.$validator.localize('zh-CN', dict);
  }
}
</script>

<style lang="scss" scoped>
</style>
