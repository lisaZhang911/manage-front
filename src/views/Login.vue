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
                <form method="post">
                  <div class="layui-form-item">
                    <label for="L_email" class="layui-form-label">用户名</label>
                    <div class="layui-input-block">
                      <input
                      v-model="name"
                      v-validate="'required'"
                      type="text"
                      id="L_email"
                      name="name"
                      autocomplete="off"
                      class="layui-input">
                    </div>
                    <div class="error layui-form-mid">{{errors.first('name')}}</div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_pass" class="layui-form-label">密码</label>
                    <div class="layui-input-block">
                      <input
                      v-model="password"
                      v-validate="'required'"
                      type="password"
                      id="L_pass"
                      name="pass"
                      autocomplete="off"
                      class="layui-input">
                    </div>
                    <div class="error layui-input-inline layui-form-mid">{{errors.first('pass')}}</div>
                  </div>
                  <div class="layui-form-item">
                    <label for="L_vercode" class="layui-form-label">验证码</label>
                    <div class="layui-input-inline">
                      <input
                      v-model="code"
                      v-validate="'required|length:4'"
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
                    <div class="error layui-form-mid">{{errors.first('vercode')}}</div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" lay-filter="*" lay-submit>立即登录</button>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode } from '../service/loginService.js'

export default {
  data(){
    return {
      name:'',
      password:'',
      code:'',
      svg:''
    }
  },
  methods:{
    _getCaptcha(){
      getCode().then(r => this.svg = r)
    }
  },
  mounted(){
    this._getCaptcha()
  }
}
</script>

<style lang="scss" scoped>

</style>
