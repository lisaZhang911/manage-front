<template>
  <div class="fly-panel fly-panel-user person-set">
    <div class="layui-tab layui-tab-brief" lay-filter="user">
      <ul class="layui-tab-title" id="LAY_mine">
        <li
          v-for="(i,index) in tagList"
          :key="index"
          :class="{'layui-this':index==currentTag}"
          @click="changeTag(index)">
          {{i}}
        </li>
      </ul>
      <component :is="setting_type"></component>
      <!-- <div class="layui-tab-content" style="padding: 20px 0;">
        <div class="layui-form layui-form-pane layui-tab-item layui-show">






        
        </div> -->

      </div>
    </div>
</template>

<script>
import SetInfo from './components/person_set_info.vue'
import SetPwd from './components/person_set_pwd.vue'
import SetRelate from './components/person_set_relate.vue'

export default {
  data(){
    return {
      setting_type:'SetInfo',
      currentTag:'0',
      tagList:['我的资料','密码','账号绑定']
    }
  },
  components:{
    SetInfo,
    SetPwd,
    SetRelate
  },
  methods:{
    changeTag(index){
      this.currentTag = index

      switch(index){
        case 0:
          this.setting_type = 'SetInfo'
          break;
        case 1:
          this.setting_type = 'SetPwd'
          break;
        case 2:
          this.setting_type = 'SetRelate'
          break;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
