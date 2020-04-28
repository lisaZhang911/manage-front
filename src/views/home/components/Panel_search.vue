<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <div class="fly-panel-title fly-filter">
      <a :class="{'layui-this':f1_state=='0'}" @click="choseItem('0','f1')">综合</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':f1_state=='1'}" @click="choseItem('1','f1')">未结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':f1_state=='2'}" @click="choseItem('2','f1')">已结</a>
      <span class="fly-mid"></span>
      <a :class="{'layui-this':f1_state=='3'}" @click="choseItem('3','f1')">精华</a>
      <span class="fly-filter-right layui-hide-xs">
        <a :class="{'layui-this':f2_state=='create_time'}" @click="choseItem('create_time','f2')">按最新</a>
        <span class="fly-mid"></span>
        <a :class="{'layui-this':f2_state=='answ_s'}" @click="choseItem('answ_s','f2')">按热议</a>
      </span>
    </div>
    <!-- 搜索后展示的帖子 -->
    <ul class="fly-list">
      <li v-for="item in listData" :key="item.tid">
        <a class="fly-avatar">
          <img :src="item.uid.avar">
        </a>
        <h2>
          <a class="layui-badge" >{{item.catalog}}</a>
          <a>{{item.title}}</a>
        </h2>
        <div class="fly-list-info">
          <a>
            <cite>{{item.uid.name}}</cite>
          </a>
          <span>{{item.create_time}}</span>

          <span class="fly-list-kiss layui-hide-xs" title="悬赏飞吻"><i class="iconfont icon-kiss"></i> 60</span>
          <span class="fly-list-nums">
            <i class="iconfont icon-pinglun1" title="回答"></i> {{item.answ_s}}
          </span>
        </div>
        <div class="fly-list-badge">
        </div>
      </li>
    </ul>
    <div style="text-align: center">
      <div class="laypage-main"  v-if="show_moreBtn">
        <a class="laypage-next" @click="getMore">更多求解</a>
      </div>
      <div class="" v-else>
        <p>-没有更多了-</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props:['listData'],
  data(){
    return {
      f1_state:'0',
      f2_state:'create_time'
    }
  },
  computed:{
    show_moreBtn(){
      return this.listData.length >= 20
    }
  },
  methods:{
    getMore(){
      this.$emit('getMore')
    },
    choseItem(index,flag){
      if(flag == 'f1'){
        this.f1_state = index
      } else {
        this.f2_state = index
      }
      this.$emit('changeTags',index,flag)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
