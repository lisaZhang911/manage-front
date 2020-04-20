<template>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8">
      <SetTop></SetTop>
      <PanelSearch :listData="lists" @getMore="getMore_article"></PanelSearch>
    </div>

    <div class="layui-col-md4">
      <Channel></Channel>
      <Sign></Sign>
      <WeekBoard></WeekBoard>
      <Adver></Adver>
      <LinkShare></LinkShare>
    </div>
  </div>
</template>

<script>
import SetTop from './components/setTop.vue'
import PanelSearch from './components/Panel_search.vue'
import Channel from './components/channel.vue'
import Sign from './components/sign.vue'
import WeekBoard from './components/week_board.vue'
import Adver from './components/adv.vue'
import LinkShare from './components/link.vue'
import { getList } from '../../service/articleService.js'

export default {
  name: "",
  components: {
    SetTop,
    PanelSearch,
    Channel,
    Sign,
    WeekBoard,
    Adver,
    LinkShare
  },
  data(){
    return {
      page:1,
      lists:[]
    }
  },
  methods:{
    getMore_article(){
      this.page+=1
      getList({
        type:0,
        page:this.page,
        catalog:'index'
      }).then(r => {
          this.lists = r
      })
    }
  },
  mounted(){
    getList({
      type:0,
      page:this.page,
      catalog:'index'
    }).then(r => {
        this.lists = r
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
