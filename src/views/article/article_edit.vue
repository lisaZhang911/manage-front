<template>
  <div class="">
    <div class="layui-container fly-marginTop">
      <div class="fly-panel" pad20 style="padding-top: 5px;">
        <div class="layui-form layui-form-pane">
          <div class="layui-tab layui-tab-brief" lay-filter="user">
            <ul class="layui-tab-title">
              <li class="layui-this">编辑帖子</li>
            </ul>
            <div class="layui-form layui-tab-content" id="LAY_ucm" style="padding: 20px 0;">
              <div class="layui-tab-item layui-show">
                <ValidationObserver ref="observer" v-slot="{validate}">
                  <form method="post" @submit.prevent="validate(submit)">
                  <div class="layui-row layui-col-space15 layui-form-item">
                    <!-- 所在专栏 -->
                    <div class="layui-col-md3">
                      <label class="layui-form-label">所在专栏</label>
                        <div class="layui-input-block">
                          <div class="layui-unselect layui-form-select" :class="{'layui-form-selected':selected}">
                            <div class="layui-select-title">
                              <input type="text" name="catalog" placeholder="请选择" v-model="currentIndex_txt_c" readonly class="layui-input layui-unselect">
                            </div>
                            </div>
                          </div>
                      </div>
                    <!-- 标题 -->
                    <div class="layui-col-md9">
                      <label for="L_title" class="layui-form-label">标题</label>
                      <ValidationProvider name="title" rules="required" v-slot="{errors}">
                      <div class="layui-input-block">
                        <input type="text" name="title" class="layui-input" v-model="title">
                      </div>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider>
                    </div>
                  </div>
                  <!-- 内容 -->
                  <div class="layui-form-item layui-form-text ql-edit">
                    <div id="toolbar" slot="toolbar">
                      <button class="ql-bold"></button>
                      <button class="ql-italic"></button>
                      <button class="ql-underline"></button>
                      <button class="ql-strike"></button>
                      <select class="ql-color" value="color" title="字体颜色"></select>
                      <button class="ql-image" type="button"></button>
                      <button class="ql-blockquote" type="button"></button>
                      <button class="ql-code-block" type="button"></button>
                      <button class="ql-link" type="button"></button>
                      <span class="iconfont icon-yxj-expression face_btn" ref="face" @click="toggle_face"></span>
                    </div>
                    <ValidationProvider name="content" rules="required" v-slot="{errors}">
                      <quillEditor ref="editor" id="edit"
                      :options="editorOption" v-model="content"
                      @focus="blurEvent"/>
                      <Face :isShow="faceShow" @closeEvent="closeEvent" @addFaceIcon="addFaceIcon"></Face>
                      <div class="error layui-form-mid">{{errors[0]}}</div>
                    </ValidationProvider >
                  </div>
                  <!-- 积分 -->
                  <div class="layui-col-md3">
                    <label class="layui-form-label">悬赏飞吻</label>
                      <div class="layui-input-block">
                        <div class="layui-unselect layui-form-select" :class="{'layui-form-selected':selected_s}">
                          <div class="layui-select-title">
                            <input type="text" placeholder="请选择" v-model="currentIndex_score" readonly class="layui-input layui-unselect">
                          </div>
                          </div>
                        </div>
                  </div>
                  <div class="layui-form-item">
                    <button class="layui-btn" @click="submit">立即发表</button>
                  </div>
                  </form>
                </ValidationObserver>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Code from '@/mixin/code.js'
import Face from '@/components/module/editor/Face.vue'
import faces from '@/assets/mods/face.js'
import { get_list_detail, edit_post } from '@/service/articleService.js'
import { debounce } from '@/util.js'

import {quillEditor} from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

export default {
  mixins:[Code],
  components:{
    Face,
    quillEditor
  },
  data(){
    return {
      title:'',
      tid:'',
      faceShow:false,
      selected:false,
      selected_s:false,
      currentIndex:-1,
      currentIndex_s:-1,
      currentIndex_txt:'',
      currentIndex_txt_c:'',
      currentIndex_score:'',
      content:'',
      pos:0,
      editorOption:{
        modules:{
          toolbar: '#toolbar'
        }
      }
    }
  },
  watch:{
    content:function(){
      debounce(() => {
        localStorage.setItem('content',this.content)
      },1500)
    }
  },
  methods:{
    _getPostDetail(){
      get_list_detail(this.tid).then(r => {
        if(r.code == 200){
          this.parse_catalog(r.data.catalog)
          this.title = r.data.title
          this.currentIndex_score = r.data.score
          this.content = r.data.content
        } else {
          this.$alert('查询错误')
        }
      })
    },
    parse_catalog(value){
      switch(value){
        case 'ask':
          this.currentIndex_txt_c = '提问'
          break;
        case 'share':
          this.currentIndex_txt_c = '分享'
          break;
        case 'discuss':
          this.currentIndex_txt_c = '讨论'
          break;
        case 'advice':
          this.currentIndex_txt_c = '建议'
          break;
        case 'notice':
          this.currentIndex_txt_c = '公告'
          break;
        case 'news':
          this.currentIndex_txt_c = '动态'
          break;
      }
    },
    addFaceIcon(key){
      const insertContent = faces[key]
      this.quillObj().insertEmbed(this.pos, 'image', insertContent)
    },
    quillObj(){
      const quill = this.$refs['editor'].quill;
      return quill
    },
    blurEvent(){
      const descRage = this.quillObj().getSelection();
      this.pos = descRage.index
    },
    closeEvent(){
      this.faceShow = false
    },
    toggle_face(){
      this.faceShow = !this.faceShow
    },
    async submit(){
      const isValid = await this.$refs.observer.validate()
      if(!isValid){
        return
      }
      edit_post({
        tid:this.tid,
        title:this.title,
        content:this.content
      }).then(r => {
          if(r.code == 200){
            this.$alert('编辑成功')
            setTimeout(() => {
              this.$router.replace('/post_Detail?id='+this.tid)
            },2000)
          }
      })
    },
    handle_body(e){
      e.stopPropagation()
      const ctrl = this.$refs.face
      if(ctrl == undefined) return
      if(!ctrl.contains(e.target)){
        this.closeEvent()
      }
    }
  },
  created(){
    const content = localStorage.getItem('content')
    this.tid = this.$router.currentRoute.query.tid
    if(content){
      this.content = content
    }
  },
  mounted(){
    this.$nextTick(() => {
      document.querySelector('body').addEventListener('click',this.handle_body)
    })
    //获取文章详情
    this._getPostDetail()
  },
  beforeDestory(){
    document.querySelector('body').removeEventListener('click',this.handle_body)
  }
}
</script>

<style lang="scss" scoped>
.layui-word-aux{
  padding: 8px 5px 30px!important
}
.quill-editor{
  height: 400px
}
.ql-edit{
  position: relative;
}
.face_btn {
  cursor: pointer;
}
.layui-form-select .layui-input{
  cursor: auto
}
</style>
