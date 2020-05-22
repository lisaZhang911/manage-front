<template>
  <div class="person_home">
    <!-- 个人主页展示 -->
    <div class="fly-home fly-panel layui-container">
      <img :src="$store.state.baseUrl+userInfo.avar" :alt="userInfo.name">
      <!-- <i class="iconfont icon-renzheng" title="Imooc社区认证"></i> -->
      <h1>
        {{userInfo.name}}
        <i class="iconfont icon-nan"></i>
        <!-- <i class="iconfont icon-nv"></i>  -->
        <i class="layui-badge fly-badge-vip" v-show="userInfo.isVip!=0">VIP{{userInfo.isVip}}</i>
        <!--
        <span style="color:#c00;">（管理员）</span>
        <span style="color:#5FB878;">（社区之光）</span>
        <span>（该号已被封）</span>
        -->
      </h1>

      <p style="padding: 10px 0; color: #5FB878;">认证信息：layui 作者</p>

      <p class="fly-home-info">
        <i class="iconfont icon-kiss" title="飞吻"></i><span style="color: #FF7200;">66666 飞吻</span>
        <i class="iconfont icon-shijian"></i><span>2015-6-17 加入</span>
        <i class="iconfont icon-chengshi"></i><span>来自杭州</span>
      </p>
      <p class="fly-home-sign">（人生仿若一场修行）</p>
    </div>
    <!-- 大众文章及签到板块 -->
    <div class="layui-row layui-col-space15">
      <div class="layui-col-md8">
        <PostPanel
            :listData="lists"
        >
        </PostPanel>
      </div>

      <div class="layui-col-md4">
        <Sign></Sign>
      </div>
    </div>
  </div>
</template>

<script>
import PostPanel from './components/person_main_post.vue'
import Sign from '../home/components/sign.vue'
import { getList } from '@/service/articleService.js'

export default {
  data(){
    return {
      userInfo:{},
      lists:[]
    }
  },
  components: {
    PostPanel,
    Sign
  },
  methods:{
    _getList(){
      let options = {
        page:0,
        page_limit:30,
        catalog:'index',
        sort:'create_time'
      }
      getList(options).then(r => {
        r.data.forEach(i => {
          i.uid.avar = this.$store.state.baseUrl+i.uid.avar
        })
          this.lists = r.data
      })
    }
  },
  created(){
    const userInfo = localStorage.getItem('userInfo')
    if( userInfo != null){
      this.userInfo = JSON.parse(userInfo)
    }
  },
  mounted(){
    this._getList()
  }
}
</script>

<style lang="scss" scoped>

</style>
