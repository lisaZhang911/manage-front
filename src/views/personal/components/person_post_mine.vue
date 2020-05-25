<template lang="">
  <div class="layui-tab-content post-mine" style="padding: 20px 0;">
    <div class="layui-tab-item layui-show">
      <ul class="mine-view jie-row">
        <li v-for="i in lists" :key="i._id">
          <a class="jie-title" target="_blank" :href="'#/post_Detail?id='+i._id">{{i.title}}</a>
          <i>{{i.create_time}}</i>
          <a class="mine-edit">编辑</a>
          <em>{{i.read_s}}阅/{{i.answ_s}}答</em>
        </li>
      </ul>
      <!-- 分页 -->
      <Page class="page" :total="pageTotal" />
    </div>
  </div>
</template>

<script>
import { get_list_id } from '@/service/articleService.js'
import { parse_time } from '@/util.js'

export default {
  data(){
    return {
      pageTotal:100,
      page:0,
      lists:[]
    }
  },
  methods:{
    _getList(){
      let options = {
        page:this.page,
        page_limit:20
      }
      get_list_id(options).then(r => {
        if(r.code == 200){
          this.pageTotal = r.data.totalPage*10
          this.lists = r.data.data.map(x => {
            x.create_time = parse_time(x.create_time)
            return x
          })
        }
      })
    },
    get_article_detail(id){
      this.$router.replace('/post_Detail?id='+id)
    }
  },
  mounted(){
    this._getList()
  }
}
</script>

<style lang="scss" scoped>
.mine-view{
  min-height: 400px
}
</style>
