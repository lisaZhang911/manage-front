<template>
  <div class="fly-header layui-bg-black">
    <div class="layui-container">
      <a class="fly-logo" href="/">
      </a>
      <ul class="layui-nav fly-nav layui-hide-xs">
        <li class="layui-nav-item layui-this">
          <a><i class="iconfont icon-jiaoliu"></i>交流</a>
        </li>
        <li class="layui-nav-item">
          <a><i class="iconfont icon-iconmingxinganli"></i>案例</a>
        </li>
        <li class="layui-nav-item">
          <a target="_blank"><i class="iconfont icon-ui"></i>框架</a>
        </li>
      </ul>

      <ul class="layui-nav fly-nav-user">

        <!-- 未登入的状态 -->
        <div v-if="!isShow">
          <li class="layui-nav-item">
            <router-link :to="{ name: 'login' }">登录</router-link>
          </li>
          <li class="layui-nav-item">
            <router-link :to="{ name: 'reg'}">注册</router-link>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href="" onclick="layer.msg('正在通过QQ登入', {icon:16, shade: 0.1, time:0})" title="QQ登入" class="iconfont icon-qq"></a>
          </li>
          <li class="layui-nav-item layui-hide-xs">
            <a href="" onclick="layer.msg('正在通过微博登入', {icon:16, shade: 0.1, time:0})" title="微博登入" class="iconfont icon-weibo"></a>
          </li>
        </div>


        <!-- 登入后的状态 -->

        <li class="layui-nav-item" v-else @mouseover="_showMenu" @mouseleave="_hideMenu">
          <a class="fly-nav-avatar" href="javascript:;">
            <cite class="layui-hide-xs">{{user_info.name}}</cite>
            <!-- <i class="iconfont icon-renzheng layui-hide-xs" title="认证信息：layui 作者"></i> -->
            <i v-show="user_info.isVip" class="layui-badge fly-badge-vip layui-hide-xs">VIP{{user_info.isVip}}</i>
            <img :src="'http://localhost:3000'+user_info.avar">
          </a>
          <dl class="layui-nav-child layui-anim layui-anim-upbit" :class="{showMenu:isMenu}" >
            <dd><a @click="goPersonal_page('setting')"><i class="layui-icon">&#xe620;</i>基本设置</a></dd>
            <dd><a @click="goPersonal_page('msg')"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</a></dd>
            <dd><a @click="goPersonal_page('home')"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
            <hr style="margin: 5px 0;">
            <dd><a @click="logout" style="text-align: center;">退出</a></dd>
          </dl>
        </li>


      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isMenu:false,
      showId:'',
      hideId:'',
      userInfo:{}
    }
  },
  computed:{
    isShow(){
      return this.$store.state.isLogin
    },
    user_info(){
      return this.$store.state.userInfo
    }
  },
  methods:{
    _showMenu(){
      console.log('mose');
      clearTimeout(this.hideId)
      this.showId = setTimeout(() => {
        this.isMenu = true
      },500)
    },
    _hideMenu(){
      console.log('live');
      clearTimeout(this.showId)
      this.hideId = setTimeout(() => {
        this.isMenu = false
      },500)
    },
    goPersonal_page(direction){
      switch(direction){
        case 'setting':
          this.$router.replace('/personal_setting')
          break;
        case 'msg':
          this.$router.replace('/personal_msg')
          break;
        case 'home':
          this.$router.replace('/personal_home')
          break;
      }
    },
    logout(){
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
  },
  created(){
    const valid = localStorage.getItem('userInfo')
    if(valid != null && valid != '{}'){
        this.$store.commit('set_login_state',true)
        this.$store.commit('set_userInfo',JSON.parse(localStorage.getItem('userInfo')))
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    }
  }
}
</script>

<style lang="scss" scoped>
.showMenu {
  display: block
}
</style>
