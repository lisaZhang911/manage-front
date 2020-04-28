<template>
  <div class="layui-row layui-col-space25 personal">
    <!-- 导航 -->
    <ul class="layui-nav layui-nav-tree layui-col-md2" lay-filter="test">
      <li v-for="(i,index) in menuList" :key="index" class="layui-nav-item layui-nav-itemed">
        <router-link :to="i.link">
          <i class="layui-icon" :class="i.icon"></i> {{i.name}}
        </router-link>
      </li>
    </ul>
    <!-- 内容 -->
    <div class="layui-col-md10">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      height:'auto',
      menuList:[{
        name:'我的主页',
        icon:'layui-icon-home',
        link:'personal_home'
      },{
        name:'我的帖子',
        icon:'layui-icon-form',
        link:'personal_post'
      },{
        name:'基本设置',
        icon:'layui-icon-set',
        link:'personal_setting'
      },{
        name:'我的消息',
        icon:'layui-icon-template',
        link:'personal_msg'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.personal{
  width:90%;min-height: 600px;
  margin:20px auto 0;

  .layui-nav{ min-height: 600px }
  .layui-col-md10 {
    padding-top: 0
  }
  .layui-nav-tree .layui-nav-item .router-link-active{
    background: #009688
  }
}
</style>
