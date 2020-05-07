<template>
  <div class="fly-panel" style="margin-bottom: 0;">
    <ul class="fly-list">
      <li v-for="item in listData" :key="item.tid">
        <a class="fly-avatar">
          <img :src="item.uid.avar">
        </a>
        <h2>
          <a class="layui-badge" v-show="item.catalog!='index'">{{item.catalog}}</a>
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
      <div class="" v-if="!show_moreBtn">
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
