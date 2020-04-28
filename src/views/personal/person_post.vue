<template>
  <div class="person_post">
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <!-- 副导航 -->
      <ul class="layui-tab-title" id="LAY_mine">
        <li
          v-for="(i,index) in tagList"
          :key="index"
          :class="{'layui-this':currentIndex == index}"
          @click="changTag(index)">
        {{i.name}}（<span>{{i.num}}</span>）
      </li>
      </ul>
      <!-- 内容 -->
      <component :is="post_type"></component>
    </div>
  </div>
</template>

<script>
import PostMine from './components/person_post_mine.vue'
import PostCollect from './components/person_post_collect.vue'

export default {
  data(){
    return {
      currentIndex:0,
      currentCompoName:'PostCollect',
      tagList:[{
        name:'我发布的帖子',
        num:98
      },{
        name:'我收藏的帖子',
        num:7
      }]
    }
  },
  components:{
    PostMine,
    PostCollect
  },
  computed:{
    post_type(){
      return this.currentCompoName
    }
  },
  methods:{
    changTag(index){
      this.currentIndex = index
      if(index == 0){
        this.currentCompoName = 'PostMine'
      } else [
        this.currentCompoName = 'PostCollect'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
