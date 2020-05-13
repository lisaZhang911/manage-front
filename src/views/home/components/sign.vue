<template>
  <div class="fly-panel fly-signin">
    <!-- 遮照 -->
    <div class="mask" v-show="show_help_s">
      <div class="showPanel layui-layer layui-layer-page">
        <div class="layui-layer-title" style="cursor: move;">签到说明</div>
        <div id="" class="layui-layer-content">
          <div class="layui-text" style="padding: 20px;">
            <blockquote class="layui-elem-quote">“签到”可获得社区飞吻，规则如下</blockquote>
            <table class="layui-table">
              <thead>
                <tr><th>连续签到天数</th><th>每天可获飞吻</th></tr>
              </thead>
              <tbody>
                <tr><td>＜5</td><td>5</td></tr>
                <tr><td>≥5</td><td>10</td></tr>
                <tr><td>≥15</td><td>15</td></tr>
                <tr><td>≥30</td><td>20</td></tr>
              </tbody>
            </table>
            <ul>
              <li>中间若有间隔，则连续天数重新计算</li>
              <li style="color: #FF5722;">不可利用程序自动签到，否则飞吻清零</li>
            </ul>
          </div>
        </div>
        <span class="layui-layer-setwin">
          <a class="layui-layer-ico layui-layer-close layui-layer-close1" @click="closeMask"></a>
        </span>
        <span class="layui-layer-resize"></span>
      </div>
    </div>
    <div class="fly-panel-title">
      签到
      <i class="fly-mid"></i>
      <a class="fly-link" @click="show_help" >说明</a>
      <i class="fly-mid"></i>
      <!-- <a href="javascript:;" class="fly-link" id="LAY_signinTop">活跃榜<span class="layui-badge-dot"></span></a> -->
      <span class="fly-signin-days">已连续签到<cite>{{count}}</cite>天</span>
    </div>
    <div class="fly-panel-main fly-signin-main">
      <button class="layui-btn layui-btn-danger" :class="{'layui-btn-disabled':isSign}" @click="sign">{{sign_txt}}</button>
      <span>已获得<cite>{{score}}</cite>飞吻</span>
    </div>
  </div>
</template>

<script>
import { sign_today } from '../../../service/userService.js'
import moment from 'moment'

export default {
  data(){
    return {
      show_help_s:false,
      count:0,
      score:0,
      isSign:false
    }
  },
  computed:{
    sign_txt(){
      return this.isSign?'已签到':'今日签到'
    }
  },
  methods:{
    show_help(){
      this.show_help_s = true
    },
    closeMask(){
      this.show_help_s = false
    },
    sign(){
      if(this.isSign){
        return
      }
      sign_today().then(r => {
        this.count = r.data.count
        this.score = r.data.score
        localStorage.setItem('count',r.data.count)
        localStorage.setItem('score',r.data.score)
        localStorage.setItem('isSign',true)
        localStorage.setItem('sign_time',moment().format("YYYY-MM-DD"))
        this.isSign = true
      })
    }
  },
  created(){
    if(localStorage.getItem('sign_time') == moment().format("YYYY-MM-DD")) {
      this.count = localStorage.getItem('count') || 0
      this.score = localStorage.getItem('score') || 0
      this.isSign = localStorage.getItem('isSign') || false
    } else {
      this.count = localStorage.getItem('count')
      this.score = localStorage.getItem('score')
      localStorage.removeItem('isSign')
    }
  }
}
</script>

<style lang="scss" scoped>
.mask{
  position: fixed;
  top:0; left:0;
  width:100%;height: 100%;
  z-index: 1;
  background: rgba(0,0,0,.5);

  .showPanel{
    z-index: 2;
    width: 300px;
    top: 50%;margin-top:-207px;
    left: 50%;margin-left:-150px
  }
}
</style>
