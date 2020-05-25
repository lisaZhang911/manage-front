<template lang="">
  <div class="post-collect" style="padding: 20px 0;">
    <div class="layui-tab-item">
      <ul class="mine-view jie-row">
        <li v-for="i in lists" :key="i._id">
          <a class="jie-title" target="_blank" :href="'#/post_Detail?id='+i.tid._id">{{i.tid.title}}</a>
          <i>收藏于{{i.create_time}}</i>  </li>
      </ul>
      <!-- 分页 -->
      <Page class="page" :total="pageTotal" />
    </div>
  </div>
</template>

<script>
import { get_collectList } from '@/service/articleService.js'
import { parse_time } from '@/util.js'

export default {
  data(){
    return {
      pageTotal:10,
      page:0,
      lists:[]
    }
  },
  mounted(){
    let options = {
      page:this.page,
      page_limit:20
    }
    get_collectList(options).then(r => {
      if(r.code == 200){
        this.pageTotal = r.data.totalPage*10
        this.lists = r.data.data.map(x => {
          x.create_time = parse_time(x.create_time)
          return x
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.post-collect {
  .layui-tab-item{
    display: block;
  }
}
</style>
