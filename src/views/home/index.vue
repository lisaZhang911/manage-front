<template>
  <div id="">
    <!-- 顶部导航 -->
    <div class="fly-panel fly-column">
      <div class="layui-container">
        <ul class="layui-clear">
           <router-link to="/home">
             <li><a>首页</a></li>
           </router-link>
           <router-link to="/ques">
             <li><a>提问</a></li>
           </router-link>
          <li><a href="jie/index.html">分享<span class="layui-badge-dot"></span></a></li>
          <li><a href="jie/index.html">讨论</a></li>
          <li><a href="jie/index.html">建议</a></li>
          <li><a href="jie/index.html">公告</a></li>
          <li><a href="jie/index.html">动态</a></li>
          <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><span class="fly-mid"></span></li>

          <!-- 用户登入后显示 -->
          <template v-if="isLogin">
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="user/index.html">我发表的贴</a></li>
            <li class="layui-hide-xs layui-hide-sm layui-show-md-inline-block"><a href="user/index.html#collection">我收藏的贴</a></li>
          </template>
        </ul>

        <div class="fly-column-right layui-hide-xs">
          <span class="fly-search"><i class="layui-icon"></i></span>
          <a href="jie/add.html" class="layui-btn">发表新帖</a>
        </div>
        <div class="layui-hide-sm layui-show-xs-block" style="margin-top: -10px; padding-bottom: 10px; text-align: center;">
          <a href="jie/add.html" class="layui-btn">发表新帖</a>
        </div>
      </div>
    </div>
    <!-- 内容 -->
    <div class="layui-container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

export default {
  name: "",
  data(){
    return {
      isLogin:this.$store.state.isLogin
    }
  }
}
</script>
<style lang="scss" scoped>
.fly-column ul .router-link-exact-active a{
  color: #5FB878
}
</style>
