<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <Footer></Footer>

    <!-- <div class="layui-container">
      <form class="layui-form layui-form-pane" action="">
        <div class="layui-form-item">
          <label class="layui-form-label">用户名</label>
          <div class="layui-input-block">
            <input
              v-model.trim="name"
              v-validate="'required|email'"
              name="name"
              placeholder="请输入标题"
              autocomplete="off"
              class="layui-input">
          </div>
          <div class="error layui-form-mid">{{errors.first('name')}}</div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">密码</label>
          <div class="layui-input-block">
            <input v-model="password" type="password" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
          </div>
        </div>
        <div class="layui-form-item">
          <label class="layui-form-label">验证码</label>
          <div class="layui-input-inline">
            <input v-model="code" type="text" name="title" required  lay-verify="required" placeholder="请输入标题" autocomplete="off" class="layui-input">
          </div>
          <div class="layui-form-mid layui-word-aux captcha" v-html="svg" @click="getCaptcha">辅助文字</div>
        </div>
      </form>
      <button type="button" class="layui-btn">点击登陆</button>
      <button type="button" class="layui-btn layui-btn-primary">找回密码</button>
    </div> -->
  </div>
</template>

<script>
import axios from 'axios'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components:{
    Header,
    Footer
  },
  data(){
    return {
      svg:'',
      name:'',
      password:'',
      code:''
    }
  },
  methods:{
    getCaptcha(){
      axios.get('http://localhost:3000/demo').then(r => {
        if(r.status == 200){
          if(r.data.code == 200){
            this.svg = r.data.data
          }
        }
      })
    }
  },
  mounted(){
    // this.getCaptcha()
  }
}
</script>

<style lang="scss">
  @import "assets/layui/css/layui.css";
  @import "assets/css/global.css";
  @import "assets/layui/css/modules/layer/default/layer.css";

  .layui-input{
    width:190px
  }
  .error{ color: red}
</style>
