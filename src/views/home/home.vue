<template>
  <div class="layui-row layui-col-space15">
    <div class="layui-col-md8">
      <SetTop></SetTop>
      <PanelSearch
          :listData="lists"
          @getMore="getMore"
          @changeTags="changeTags"
      >
      </PanelSearch>
    </div>

    <div class="layui-col-md4">
      <Channel></Channel>
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
import WeekBoard from './components/week_board.vue'
import Adver from './components/adv.vue'
import LinkShare from './components/link.vue'
import { getList } from '../../service/articleService.js'
import moment from 'moment'

export default {
  name: "",
  components: {
    SetTop,
    PanelSearch,
    Channel,
    WeekBoard,
    Adver,
    LinkShare
  },
  data(){
    return {
      page:0,
      lists:[],
      newTag_flag:false,
      tags:'',
      sort:'create_time'
    }
  },
  methods:{
    transferCatalog(str){
      let result = ''

      switch (str) {
        case 'index':
          result = '头条'
          break;
        case 'ask':
          result =  '提问'
          break;
        case 'share':
          result =  '分享'
          break;
        case 'discuss':
          result =  '讨论'
          break;
        case 'advice':
          result =  '建议'
          break;
        case 'notice':
          result =  '公告'
          break;
        case 'news':
          result =  '动态'
          break;
      }
      return result
    },
    changeTags(tags,flag){
      if(flag == 'f1'){
        if(tags == '0' ){
          this.tags = ''
        }
        this.tags = tags
        this.newTag_flag = true
      } else {
        this.sort = tags
      }
      this.page = 0
      this._getList()
    },
    getMore(){
      this.newTag_flag = false
      this._getList()
    },
    _getList(){
      let options = {
        page:this.page,
        page_limit:20,
        catalog:'ask',
        sort:this.sort
      }
      if(this.tags != ''){
        options.tags = this.tags
      }
      getList(options).then(r => {
        r.data.forEach(i => {
          i.catalog = this.transferCatalog(i.catalog)
          i.create_time = moment(i.create_time).locale('zh-cn').calendar(new Date());
        })
        if(this.newTag_flag){
          this.lists = r.data
        } else {
          this.lists = [...this.lists,...r.data]
        }
        this.page = this.page+1
      })
    }
  },
  mounted(){
    this._getList()
    this.catalog = 'index'
  }
}
</script>

<style lang="scss" scoped>
</style>
