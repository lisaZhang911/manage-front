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
            <dd><a href="user/set.html"><i class="layui-icon">&#xe620;</i>基本设置</a></dd>
            <dd><a href="user/message.html"><i class="iconfont icon-tongzhi" style="top: 4px;"></i>我的消息</a></dd>
            <dd><a href="user/home.html"><i class="layui-icon" style="margin-left: 2px; font-size: 22px;">&#xe68e;</i>我的主页</a></dd>
            <hr style="margin: 5px 0;">
            <dd><a href="/user/logout/" style="text-align: center;">退出</a></dd>
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
      hideId:''
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
    }
  }
}
</script>

<style lang="scss" scoped>
.showMenu {
  display: block
}
</style>
